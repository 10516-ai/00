// สร้างไอคอนและ manifest ด้วยโค้ด (ไม่ต้องมีไฟล์ภาพ) แล้วลงทะเบียน service worker
(function(){
  function icon(size,pad){
    const c=document.createElement('canvas');c.width=c.height=size;const x=c.getContext('2d');
    const g=x.createLinearGradient(0,0,0,size);g.addColorStop(0,'#ffbd63');g.addColorStop(1,'#ff9a4d');
    x.fillStyle=g;x.fillRect(0,0,size,size);
    const m=size/2,r=size*(.5-pad)*.95;
    x.save();x.beginPath();x.arc(m,m,r,0,7);x.clip();
    x.fillStyle='#3fae63';x.fillRect(0,0,size,size);
    x.strokeStyle='#1f7a40';x.lineWidth=r*.11;
    for(let k=-4;k<=4;k++){x.beginPath();x.moveTo(m+k*r*.3,m-r);x.quadraticCurveTo(m+k*r*.36,m,m+k*r*.3,m+r);x.stroke()}
    x.restore();
    x.strokeStyle='#125228';x.lineWidth=size/55;x.beginPath();x.arc(m,m,r,0,7);x.stroke();
    x.fillStyle='rgba(255,120,150,.8)';
    for(const s of[-1,1]){x.beginPath();x.ellipse(m+s*r*.56,m+r*.22,r*.14,r*.08,0,0,7);x.fill()}
    x.strokeStyle='#3a1c08';x.lineWidth=r*.07;x.lineCap='round';
    for(const s of[-1,1]){x.beginPath();x.arc(m+s*r*.34,m-r*.02,r*.12,1.1*Math.PI,1.9*Math.PI);x.stroke()}
    x.beginPath();x.arc(m,m+r*.12,r*.18,.15*Math.PI,.85*Math.PI);x.stroke();
    x.fillStyle='#fff';x.beginPath();x.ellipse(m-r*.46,m-r*.6,r*.16,r*.08,-.6,0,7);x.fill();
    return c.toDataURL('image/png');
  }
  const i192=icon(192,.1),i512=icon(512,.1),mask=icon(512,.22);
  const add=(rel,href,extra)=>{const l=document.createElement('link');l.rel=rel;l.href=href;if(extra)l.type=extra;document.head.appendChild(l)};
  add('apple-touch-icon',i192);add('icon',i192,'image/png');
  const mf={
    name:'Watermelon Maker',short_name:'Watermelon',lang:'th',
    start_url:location.origin+location.pathname,scope:new URL('./',location.href).href,
    display:'standalone',orientation:'portrait',background_color:'#ffbd63',theme_color:'#ff9a4d',
    icons:[{src:i192,sizes:'192x192',type:'image/png',purpose:'any'},{src:i512,sizes:'512x512',type:'image/png',purpose:'any'},{src:mask,sizes:'512x512',type:'image/png',purpose:'maskable'}]
  };
  add('manifest',URL.createObjectURL(new Blob([JSON.stringify(mf)],{type:'application/manifest+json'})));
  if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
})();
