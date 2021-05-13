if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/proyectosjs/login-fire/firebase-auth-example/sw.js')
    .then(function(registration) {
      console.log(
        'Service Worker registration successful with scope: ',
        registration.scope
      );
    })
    .catch(function(err) {
      console.log('Service Worker registration failed: ', err);
    });
}
