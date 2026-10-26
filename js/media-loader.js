/* Native lazy images, local skeletons and viewport-based CSS artwork. */
'use strict';
(() => {
 const root=document.documentElement;
 const critical=[...document.querySelectorAll('.site-header img,#hero .hero-portrait img')];
 function observeImage(img){
  if(img.complete&&img.naturalWidth){img.dataset.mediaState='ready';return Promise.resolve(true);}
  img.dataset.mediaState='loading';
  return new Promise(resolve=>{
   let retried=false,settled=false;
   const settle=ok=>{if(!settled){settled=true;clearTimeout(timer);resolve(ok);}};
   const loaded=()=>{if(!img.naturalWidth)return;img.dataset.mediaState='ready';settle(true);clean();};
   const clean=()=>{img.removeEventListener('load',loaded);img.removeEventListener('error',failed);};
   const failed=()=>{
    const selected=img.currentSrc||img.src;
    if(!retried&&img.closest('picture')&&/\.avif(?:\?|$)/.test(selected)){
     retried=true;img.closest('picture').querySelectorAll('source').forEach(s=>s.remove());img.removeAttribute('srcset');img.src=selected.replace(/\.avif(?=\?|$)/,'.webp');return;
    }
    img.dataset.mediaState='error';settle(false);clean();
   };
   // A slow image can finish later; it never blocks the page or other images.
   const timer=setTimeout(()=>settle(false),8000);
   img.addEventListener('load',loaded);img.addEventListener('error',failed);
   if(img.complete){if(img.naturalWidth)loaded();else if(img.currentSrc)failed();}
  });
 }
 const promises=new Map([...document.images].map(img=>[img,observeImage(img)]));
 window.BloomImagesReady=Promise.all(critical.map(img=>promises.get(img))).then(results=>{
  root.dataset.mediaState=results.every(Boolean)?'ready':'partial';
  window.dispatchEvent(new Event('bloom:media-ready'));
 });
 window.BloomReady?.add('images',window.BloomImagesReady);
 const artwork=[...document.querySelectorAll('[data-lazy-background]')];
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(!entry.isIntersecting)return;entry.target.classList.add('is-nearby');observer.unobserve(entry.target);
  }),{rootMargin:'800px 0px'});
  artwork.forEach(element=>observer.observe(element));
 }else artwork.forEach(element=>element.classList.add('is-nearby'));
})();
