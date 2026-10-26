/* Inlined in index.html: the shell can reveal even if the deferred bundle is slow. */
(function(){
 var root=document.documentElement,revealed=false;
 function reveal(){
  if(revealed)return;revealed=true;
  root.classList.remove('page-loading');
  root.dataset.startupState='ready';root.dataset.startupMs=String(Math.round(performance.now()));
  var main=document.getElementById('main'),loader=document.getElementById('page-loader');
  if(main)main.removeAttribute('aria-busy');if(loader){loader.classList.add('is-hidden');setTimeout(function(){loader.remove();},250);}
  window.dispatchEvent(new Event('bloom:page-ready'));
 }
 window.BloomShell={reveal:reveal};
 // This clock does not depend on DOMContentLoaded, fonts, video or the main JS download.
 setTimeout(reveal,1200);
 window.addEventListener('bloom:startup-error',reveal);
})();
