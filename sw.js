importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.precaching.precacheAndRoute([
  'index.html',
  'offline.html',
  'musica.html',
  'music.js',
  'icons/chajma-128.png',
  'css/bootstrap.css',
  'style.css',
  'js/bootstrap.bundle.min.js',
]);

workbox.routing.registerRoute(
  ({request}) => request.destination === "image",
  new workbox.strategies.NetworkOnly()
);

/*workbox.routing.registerRoute(
  ({request}) => request.destination === "document",
  new workbox.strategies.CacheFirst()
);*/
/*workbox.routing.registerRoute(
  ({request}) => request.destination === "document",
  new workbox.strategies.CacheOnly()
);*/
  workbox.routing.registerRoute(
  ({request}) => request.destination === "document",
  new workbox.strategies.NetworkFirst()
  );

//Si hay una respuesta que genere error
workbox.routing.setCatchHandler(async context=>{
  // console.log("entro");  
  console.log(context);
  console.log(context.request);
  // Return the precached offline page if a document is being request
  if (context.request.destination === 'image'){
    return workbox.precaching.matchPrecache('icons/offline.jpg');}
  else if(context.request.destination === 'document'){
      return workbox.precaching.matchPrecache('offline.html');
  }
  return Response.error();
});