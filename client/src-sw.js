// Import necessary Workbox modules and functions
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache and route files specified in the __WB_MANIFEST
precacheAndRoute(self.__WB_MANIFEST);

// Define caching strategy for pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warm the page cache for certain URLs
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Register route to cache assets using CacheFirst strategy
registerRoute(
  ({ request }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'image',
  new CacheFirst({
    cacheName: 'assets-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

// Implement offline fallback for navigation requests
offlineFallback({
  pageFallback: '/offline.html', // The URL to serve when offline
  whitelist: [
    '^/api/', // Match all URLs starting with /api/
    '/login', // Match the exact URL /login
    '/settings', // Match the exact URL /settings
  ],
});
