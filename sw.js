'use strict';
// Bump VERSION whenever any shipped file changes. Keep each installation atomic.
const VERSION='1.0.1';
const PREFIX=`dudu-${self.registration.scope}-`;
const CACHE=PREFIX+VERSION;
const FILES=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest',
 './assets/belly.png','./assets/hands.png','./assets/teeth.png',
 './assets/icon-180.png','./assets/icon-192.png','./assets/icon-512.png','./assets/icon-maskable.png',
 './assets/belly-voice.wav','./assets/hands-voice.wav','./assets/teeth-voice.wav'];
const URLS=FILES.map(file=>new URL(file,self.registration.scope).href);
self.addEventListener('install',event=>{event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(URLS.map(url=>new Request(url,{cache:'reload'})));})());});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const name of await caches.keys())if(name.startsWith(PREFIX)&&name!==CACHE)await caches.delete(name);await self.clients.claim();})());});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting();});
async function ranged(response,range){
 const buffer=await response.arrayBuffer(),length=buffer.byteLength;
 const match=/^bytes=(\d*)-(\d*)$/.exec(range);
 if(!match||(!match[1]&&!match[2]))return new Response(null,{status:416,headers:{'Content-Range':`bytes */${length}`}});
 let start=match[1]?Number(match[1]):Math.max(0,length-Number(match[2]));
 let end=match[1]?(match[2]?Math.min(Number(match[2]),length-1):length-1):length-1;
 if(start>=length||start>end)return new Response(null,{status:416,headers:{'Content-Range':`bytes */${length}`}});
 const headers=new Headers(response.headers);headers.set('Content-Range',`bytes ${start}-${end}/${length}`);headers.set('Content-Length',String(end-start+1));headers.set('Accept-Ranges','bytes');
 return new Response(buffer.slice(start,end+1),{status:206,statusText:'Partial Content',headers});
}
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||!request.url.startsWith(self.registration.scope)||url.origin!==self.location.origin)return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);let response=await cache.match(request.url,{ignoreSearch:true});
  if(!response&&request.mode==='navigate')response=await cache.match(new URL('./index.html',self.registration.scope).href);
  if(response){const range=request.headers.get('Range');return range?ranged(response,range):response;}
  return fetch(request);
 })());
});
