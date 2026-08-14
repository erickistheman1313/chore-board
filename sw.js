/* Offline support. Bump CACHE when you change any file so phones pick up the new version. */
var CACHE = "chores-v6";
var ASSETS = [
  "./",
  "./index.html",
  "./app.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icons/icon-152.png",
  "./icons/icon-167.png",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ return k === CACHE ? null : caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

/* Network first for anything that carries logic -- page, styles, script -- so a
   redeploy reaches the kids' phones even if CACHE above wasn't bumped.
   Cache first for icons, which never change. Cached copy is the offline fallback. */
self.addEventListener("fetch", function(e){
  if(e.request.method !== "GET") return;
  var isPage = e.request.mode === "navigate" ||
               /\.(html|webmanifest|js|css)$/.test(new URL(e.request.url).pathname);

  if(isPage){
    e.respondWith(
      fetch(e.request).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
        return res;
      }).catch(function(){
        return caches.match(e.request).then(function(hit){ return hit || caches.match("./index.html"); });
      })
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(function(hit){
      return hit || fetch(e.request).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
        return res;
      });
    })
  );
});
