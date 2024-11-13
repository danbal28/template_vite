/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from '@src/utils/local-storage'
import axios from 'axios'

interface FailedQueueItem {
  resolve: (value?: unknown) => void
  reject: (value?: unknown) => void
}

const defaultHeader = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

// for multiple requests
let isRefreshing = false
let failedQueue: FailedQueueItem[] = []

const processQueue = (error: unknown, token: unknown = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

// @ts-ignore
const baseURL: string = String(import.meta.env.VITE_APP_API_ENDPOINT)

// Set up default config for http requests here
const axiosClient = axios.create({
  baseURL: baseURL,
})
// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

//Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    const originalRequest = error.config
    // const navigate = useNavigate()
    if (error.response.status === 401) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token
            return axiosClient.request(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      const refreshToken = getRefreshToken()
      return new Promise(function (resolve, reject) {
        axios
          .post(
            `${baseURL}auth/refresh-tokens`,
            { refreshToken: refreshToken },
            {
              headers: {
                ...defaultHeader,
                Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
              },
            }
          )
          .then((res) => {
            const { data } = res
            // 1) put token to LocalStorage
            if (data) {
              // localStorage.setItem('accessToken', data.access_token)
              // localStorage.setItem('refreshToken', data.refresh_token)
              setAccessToken(data.accessToken)
              setRefreshToken(data.refreshToken)
              // 2) Change Authorization header
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token
              originalRequest.headers['Authorization'] = 'Bearer ' + data.access_token

              processQueue(null, data.access_token)

              // 3) return originalRequest object with Axios
              resolve(axiosClient.request(originalRequest))
            }
          })
          .catch((err) => {
            processQueue(err, null)
            reject(err)
          })
          .finally(() => {
            isRefreshing = false
          })
      })
    }
    return Promise.reject(error)
  }
)

export default axiosClient
