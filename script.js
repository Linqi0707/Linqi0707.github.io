if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const layer = document.getElementById('petals');
  for(let i=0;i<12;i++){
    const p=document.createElement('span');p.className='petal';p.textContent=i%3===0?'♡':'✧';
    p.style.left=`${Math.random()*100}%`;p.style.fontSize=`${10+Math.random()*12}px`;p.style.animationDuration=`${14+Math.random()*15}s`;p.style.animationDelay=`-${Math.random()*25}s`;layer.appendChild(p);
  }
}
