self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => {
        caches.delete(cacheName)
      })
    })
  }
})

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {}
  const title = data.title || 'New Notification'
  const options = {
    body: data.body,
    icon: '/images/pwa/icon-192x192.png',
    badge: '/images/pwa/icon-192x192.png',
    data: { url: data?.url },
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const urlToOpen = event.notification.data?.url

  if (urlToOpen) {
    event.waitUntil(clients.openWindow(urlToOpen))
  }
})

// Runtime caching
self.addEventListener('fetch', (event) => {
  const BASE_URL = 'https://api.bitmail.app'
  const LOCAL_URL = 'http://localhost:3000'
  const NON_CACHE_PATHS = ['/fonts', '/src', '/node_modules', '/@vite']

  const url = new URL(event.request.url)
  if (
    (url.origin === BASE_URL || url.origin === LOCAL_URL) &&
    event.request.method === 'GET' &&
    !NON_CACHE_PATHS.some((path) => url.pathname.startsWith(path))
  ) {
    event.respondWith(networkFirst(event.request))
  }
})

async function networkFirst(request) {
  const cache = await caches.open('API_CACHE')
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    const cachedResponse = await cache.match(request)
    if (cachedResponse) return cachedResponse
    throw error
  }
}
