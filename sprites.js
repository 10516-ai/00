// วาดผลไม้น่ารักด้วยโค้ด: บลูเบอร์รี สตรอว์เบอร์รี องุ่น เลมอน ส้ม แอปเปิล พีช มะพร้าว สับปะรด เมล่อน แตงโม
const PAL=[['#8aa2ff','#3c54d8','#26339a'],['#ff7b8c','#dc2f4c','#9c1b33'],['#b98af0','#7a3fc4','#4e2585'],['#fff27a','#d9d12c','#8f8a14'],['#ffbe55','#f07f14','#a4520b'],['#ff6b66','#cf232c','#8a141b'],['#ffd3dc','#f596ae','#b9566f'],['#c98a68','#7d4830','#4d2a1a'],['#ffdc62','#e3981e','#a5620d'],['#c5efa0','#7fc95c','#4a8b34'],['#4fb96b','#1f7a40','#125228']];
const INK='#4a2a1a',K=2;
function body(c,r,lv){const p=PAL[lv],g=c.createRadialGradient(-r*.3,-r*.35,r*.1,0,0,r);g.addColorStop(0,p[0]);g.addColorStop(1,p[1]);c.fillStyle=g;c.strokeStyle=p[2];c.lineWidth=Math.max(2,r*.07);c.beginPath();c.arc(0,0,r*.97,0,7);c.fill();c.stroke()}
function gloss(c,r){c.fillStyle='rgba(255,255,255,.55)';c.beginPath();c.ellipse(-r*.42,-r*.5,r*.2,r*.11,-.7,0,7);c.fill();c.beginPath();c.arc(-r*.16,-r*.68,r*.045,0,7);c.fill()}
function leaf(c,x,y,len,ang,col='#5bbf4a'){c.save();c.translate(x,y);c.rotate(ang);c.fillStyle=col;c.strokeStyle='#2f7d32';c.lineWidth=1.5;c.beginPath();c.ellipse(len/2,0,len/2,len*.28,0,0,7);c.fill();c.stroke();c.restore()}
function clipC(c,r){c.beginPath();c.arc(0,0,r*.95,0,7);c.clip()}
function face(c,r,eyes,mouth,dy=0){
  const ey=dy-r*.02,ex=r*.34,s=Math.max(1.6,r*.075);
  c.strokeStyle=c.fillStyle=INK;c.lineWidth=Math.max(1.6,r*.05);c.lineCap=c.lineJoin='round';
  c.save();c.fillStyle='rgba(255,90,110,.35)';for(const sx of[-1,1]){c.beginPath();c.ellipse(sx*r*.56,ey+r*.24,r*.13,r*.08,0,0,7);c.fill()}c.restore();
  for(const sx of[-1,1]){const x=sx*ex;c.beginPath();
    if(eyes==='dot'){c.arc(x,ey,s*1.3,0,7);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x-s*.4,ey-s*.45,s*.5,0,7);c.fill();c.fillStyle=INK}
    else if(eyes==='sleep')c.arc(x,ey-s*.4,s*1.5,.1*Math.PI,.9*Math.PI);
    else if(eyes==='happy')c.arc(x,ey+s*.6,s*1.5,1.1*Math.PI,1.9*Math.PI);
    else{c.moveTo(x+sx*s,ey-s);c.lineTo(x-sx*s,ey);c.lineTo(x+sx*s,ey+s)}
    if(eyes!=='dot')c.stroke()}
  c.beginPath();const my=ey+r*.26;
  if(mouth==='smile')c.arc(0,my-r*.06,r*.09,.15*Math.PI,.85*Math.PI);
  else if(mouth==='o'){c.arc(0,my,r*.05,0,7);c.fill()}
  else{c.moveTo(-r*.06,my);c.lineTo(r*.06,my)}
  if(mouth!=='o')c.stroke();
}
const ART=[
 (c,r)=>{body(c,r,0);c.fillStyle='#22307f';c.beginPath();c.arc(0,-r*.7,r*.13,0,7);c.fill();gloss(c,r);face(c,r,'sleep','smile',r*.05)},
 (c,r)=>{body(c,r,1);c.fillStyle='#ffe58a';[[-.4,-.35],[.4,-.35],[-.68,.05],[.68,.05],[-.4,.6],[.4,.6],[0,.8]].forEach(([x,y])=>{c.beginPath();c.ellipse(x*r,y*r,r*.05,r*.08,0,0,7);c.fill()});[-2.5,-1.57,-.65].forEach(a=>leaf(c,0,-r*.85,r*.42,a));gloss(c,r);face(c,r,'dot','smile')},
 (c,r)=>{body(c,r,2);[[-.5,-.4],[.5,-.4],[-.68,.2],[.68,.2],[-.3,.68],[.3,.68]].forEach(([x,y])=>{c.fillStyle='rgba(255,255,255,.18)';c.strokeStyle='rgba(0,0,0,.15)';c.lineWidth=1;c.beginPath();c.arc(x*r,y*r,r*.17,0,7);c.fill();c.stroke()});leaf(c,0,-r*.9,r*.45,-.9);gloss(c,r);face(c,r,'dot','o')},
 (c,r)=>{body(c,r,3);leaf(c,0,-r*.92,r*.45,-.9);gloss(c,r);face(c,r,'chev','flat')},
 (c,r)=>{body(c,r,4);[-2.4,-1.57,-.75].forEach(a=>leaf(c,0,-r*.9,r*.34,a));gloss(c,r);face(c,r,'sleep','flat')},
 (c,r)=>{body(c,r,5);c.strokeStyle='#7a4a24';c.lineWidth=Math.max(2,r*.07);c.beginPath();c.moveTo(0,-r*.85);c.quadraticCurveTo(r*.02,-r*1.05,r*.14,-r*1.15);c.stroke();leaf(c,r*.05,-r*.95,r*.5,-.4);gloss(c,r);face(c,r,'dot','smile')},
 (c,r)=>{body(c,r,6);c.strokeStyle='#e0708f';c.lineWidth=Math.max(1.5,r*.04);c.beginPath();c.moveTo(r*.15,-r*.95);c.quadraticCurveTo(r*.78,0,r*.15,r*.9);c.stroke();leaf(c,-r*.05,-r*.92,r*.5,-2.5);gloss(c,r);face(c,r,'sleep','smile')},
 (c,r)=>{body(c,r,7);c.fillStyle='rgba(255,255,255,.14)';c.beginPath();c.arc(r*.35,r*.4,r*.35,0,7);c.fill();gloss(c,r);face(c,r,'sleep','smile')},
 (c,r)=>{[-2.3,-1.9,-1.57,-1.25,-.85].forEach(a=>leaf(c,0,-r*.8,r*.6,a,'#4fae3f'));body(c,r,8);c.save();clipC(c,r);c.strokeStyle='rgba(165,98,13,.35)';c.lineWidth=1.5;c.beginPath();for(let k=-6;k<=6;k++){c.moveTo(k*r*.35-r,-r);c.lineTo(k*r*.35+r,r);c.moveTo(k*r*.35+r,-r);c.lineTo(k*r*.35-r,r)}c.stroke();c.restore();gloss(c,r);face(c,r,'happy','smile')},
 (c,r)=>{body(c,r,9);c.save();clipC(c,r);c.strokeStyle='rgba(255,255,255,.4)';c.lineWidth=2;c.beginPath();for(let k=-4;k<=4;k++){c.moveTo(k*r*.3,-r);c.quadraticCurveTo(k*r*.45,0,k*r*.3,r)}c.stroke();c.restore();leaf(c,0,-r*.92,r*.4,-.9);gloss(c,r);face(c,r,'dot','smile')},
 (c,r)=>{body(c,r,10);c.save();clipC(c,r);c.strokeStyle='#17592f';c.lineWidth=r*.11;c.beginPath();for(let k=-4;k<=4;k++){c.moveTo(k*r*.3,-r);c.quadraticCurveTo(k*r*.5,0,k*r*.3,r)}c.stroke();c.restore();leaf(c,0,-r*.92,r*.35,-.9);gloss(c,r);face(c,r,'happy','smile')}
];
const Sprites={cache:{},urls:{},
  size(lv){return Math.ceil(RADII[lv]*2.6)},
  get(lv){if(!this.cache[lv]){const S=this.size(lv),cv=document.createElement('canvas');cv.width=cv.height=S*K;const c=cv.getContext('2d');c.scale(K,K);c.translate(S/2,S/2);ART[lv](c,RADII[lv]);this.cache[lv]=cv}return this.cache[lv]},
  url(lv){return this.urls[lv]||(this.urls[lv]=this.get(lv).toDataURL())}
};
