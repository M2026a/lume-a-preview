/* LUME-A Studio: navigation accessibility and progressively enhanced motion */
document.documentElement.classList.add('lume-js');
const lumeMenu = document.getElementById('mobile-menu');
const lumeToggle = document.querySelector('.nav-toggle');
if (lumeMenu && lumeToggle) {
  const syncMenu = () => {
    const open = document.body.classList.contains('nav-open');
    lumeMenu.inert = !open;
    if (open) lumeMenu.querySelector('a')?.focus({preventScroll:true});
  };
  new MutationObserver(syncMenu).observe(document.body,{attributes:true,attributeFilter:['class']});
  document.addEventListener('keydown', event => {
    if (!document.body.classList.contains('nav-open')) return;
    if (event.key === 'Escape') { lumeToggle.click(); lumeToggle.focus(); }
    if (event.key === 'Tab') {
      const targets = [lumeToggle, ...lumeMenu.querySelectorAll('a')];
      const first=targets[0], last=targets[targets.length-1];
      if (event.shiftKey && document.activeElement===first) {event.preventDefault();last.focus();}
      else if (!event.shiftKey && document.activeElement===last) {event.preventDefault();first.focus();}
    }
  });
  lumeMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    const target=document.querySelector(link.getAttribute('href'));
    target?.setAttribute('tabindex','-1');
    setTimeout(()=>target?.focus({preventScroll:true}),50);
  }));
  window.addEventListener('resize',()=>{if(innerWidth>1040 && document.body.classList.contains('nav-open'))lumeToggle.click();});
}
