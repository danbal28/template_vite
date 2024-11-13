import { useNavigate, useSearchParams } from 'react-router-dom'

export function useQueryParams() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  function getParams(param: string) {
    return searchParams.get(param)
  }

  function setParams(paramsObj: { [key: string]: string | number }) {
    const keys = Object.keys(paramsObj)
    keys.forEach((key) => {
      searchParams.set(key, String(paramsObj[key]))
    })

    navigate({ search: searchParams.toString() })
  }

  function deleteParams(param: string, ...anotherParams: string[]) {
    searchParams.delete(param)
    anotherParams.forEach((param) => {
      searchParams.delete(param)
    })
    navigate({ search: searchParams.toString() })
  }

  return { getParams, setParams, deleteParams }
}
