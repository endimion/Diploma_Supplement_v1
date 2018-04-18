
const CACHE_NAME = "assets";

const urlsToCache = ["/img/uaegean.png","/img/docs.gif","/img/hyperledger.png","/img/eidas.png",
"/img/manage-documents.png","/img/publish-document.png","/img/manage-user.png","/img/office.jpg","/img/user.png",
'/landing/css/bootstrap.css',
'/landing/css/bootstrap.min.css',
'/landing/css/full-width-pics.css',
'/landing/js/bootstrap.min.js',
'/landing/js/jquery.js',]; // list of urls to be cached




self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});


// this is the service worker which intercepts all http requests
self.addEventListener('fetch', function fetcher (event) {
  var request = event.request;
  // check if request
  if (request.url.indexOf('138.68.103.237') > -1) {
    // contentful asset detected
    event.respondWith(
      caches.match(event.request).then(function(response) {
        // return from cache, otherwise fetch from network
        return response || fetch(request);
      })
    );
  }
  // otherwise: ignore event
});
