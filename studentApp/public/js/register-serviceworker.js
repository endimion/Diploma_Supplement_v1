
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
  // register service worker
  navigator.serviceWorker.register('/js/install-serviceworker.js', { scope: './' })
    .then(navigator.serviceWorker.ready)
    .then(function () {
      console.log('service worker registered')
    })
    .catch(function (error) {
      console.log('error when registering service worker', error, arguments)
    });
  });
}
