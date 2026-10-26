/* Optional enhancements never hold the initial page behind a media barrier. */
'use strict';
(() => {
 const root=document.documentElement,tasks=new Map(),finalizers=[];
 const frame=()=>new Promise(resolve=>requestAnimationFrame(resolve));
 window.BloomReady={
  add(name,promise){const task=Promise.resolve(promise);task.catch(()=>{});tasks.set(name,task);return task;},
  when:name=>tasks.get(name)||Promise.resolve(),frame,prepare:callback=>finalizers.push(callback)
 };
 document.addEventListener('DOMContentLoaded',()=>{
  // Layout and observers are synchronous; video, fonts and WebGL continue independently.
  window.dispatchEvent(new Event('bloom:before-reveal'));
  finalizers.forEach(callback=>{try{Promise.resolve(callback()).catch(()=>{});}catch{}});
  root.classList.remove('js-pending');
  root.dataset.enhancementsReady='true';
  window.BloomShell?.reveal();
 },{once:true});
})();
