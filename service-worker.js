const CACHE_NAME='virtual-phone-v2-shell-v1';
const SHELL=['./','./index.html','./manifest.json','./app-icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;if(r.mode==='navigate'){e.respondWith(fetch(r,{cache:'no-store'}).then(res=>{if(res.ok)caches.open(CACHE_NAME).then(c=>c.put('./index.html',res.clone()));return res}).catch(()=>caches.match('./index.html')));return}e.respondWith(caches.match(r).then(c=>c||fetch(r)))});
