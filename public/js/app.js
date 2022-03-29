
// To ensure that the browser supports the service worker
if ('serviceWorker' in navigator) {
    // declaring scope manually
    navigator.serviceWorker.register('/serviceWorker.js', { scope: './' })
        .then(function (registration) {
            console.log('Registering serive worker was a succes:', registration);
        }, /*.catch*/ function (error) {
            console.log('Unfortunately registering the service worker failed:', error);
        });
}
else {
    console.log('Service workers are not supported.');
}




// // Service worker load event 
// window.addEventListener('load', e => {
//     new PWAConfApp();
//     registerSW();
// });

// // To ensure that the browser supports it. 
// async function registerSW() {
//     if ('serviceWorker' in navigator) {
//         try {
//             await navigator.serviceWorker.register('./serviceWorker.js');
//         } catch (e) {
//             alert('ServiceWorker registration failed. Sorry about that.');
//         }
//     } else {
//         document.querySelector('.alert').removeAttribute('hidden');
//     }
// }