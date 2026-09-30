const cv=document.getElementById('c'),ctx=cv.getContext('2d');
const $=id=>document.getElementById(id);
let bodies,pops,parts,cur,nxt,aimX,cool,score,over,last=0,best=0;
let playT,hist,retIdx,retT,retN;
try{best=+(localStorage.getItem('wmBest')||0)}catch(e){}
const rnd=()=>Math.floor(Math.random()*5);
const mk=(lv,x,y)=>({lv,r:RADII[lv],x,y,vx:0,vy:0,age:0,warn:0,sc:1,dead:false,entering:false});

function reset(){
  bodies=[];pops=[];parts=[];score=0;over=false;cool=0;aimX=W/2;cur=rnd();nxt=rnd();
  playT=0;hist=[];retIdx=0;retN=0;retT=RETURN_FIRST;
  $('over').hidden=true;hud();
}
function hud(){$('score').textContent=score;$('best').textContent=best;$('next').src=Sprites.url(nxt)}
function drop(){
  if(over||cool>0)return;
  const r=RADII[cur];
  bodies.push(mk(cur,Math.min(W-r,Math.max(r,aimX)),DROP_Y));
  if(playT<HARD_AFTER)hist.push(cur);   // จำผลไม้ที่หย่อนใน 3 นาทีแรก
  Sound.drop();cur=nxt;nxt=rnd();cool=.5;hud();
}
function returnFruit(){   // เอาผลไม้ที่เคยหย่อนกลับมา ดันขึ้นจากใต้กล่องตามลำดับเดิม
  const lv=hist[retIdx++%hist.length],r=RADII[lv];
  const f=mk(lv,r+Math.random()*(W-2*r),H+r);
  f.entering=true;bodies.push(f);retN++;Sound.drop();
}
function burst(x,y,lv){
  for(let i=0;i<10;i++){const a=Math.random()*6.28,s=80+Math.random()*140;parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-60,t:0,c:PAL[lv][0]})}
}
function merge(pairs){
  for(const [a,b] of pairs){
    if(a.dead||b.dead)continue;
    a.dead=b.dead=true;
    const x=(a.x+b.x)/2,y=(a.y+b.y)/2;
    pops.push({x,y,r:a.r,t:0});burst(x,y,a.lv);
    if(a.lv===10){score+=SCORES[10];Sound.big();continue}   // แตงโมชนกัน = หายไป + โบนัส
    score+=SCORES[a.lv+1];Sound.merge(a.lv+1);
    const n=mk(a.lv+1,x,y);n.vx=(a.vx+b.vx)/2;n.vy=(a.vy+b.vy)/2;n.sc=1.3;bodies.push(n);
  }
  bodies=bodies.filter(b=>!b.dead);
  if(score>best){best=score;try{localStorage.setItem('wmBest',best)}catch(e){}}
  hud();
}
function update(dt){
  parts.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=600*dt;p.t+=dt});parts=parts.filter(p=>p.t<.5);
  pops.forEach(p=>p.t+=dt);pops=pops.filter(p=>p.t<.3);
  if(over)return;
  cool-=dt;playT+=dt;
  if(playT>=HARD_AFTER&&hist.length){
    retT-=dt;
    if(retT<=0){returnFruit();retT=Math.max(RETURN_MIN,RETURN_EVERY-retN*.25)}
  }
  const pairs=[];
  Physics.step(bodies,dt,(a,b)=>{if(a.lv===b.lv)pairs.push([a,b])});
  merge(pairs);
  for(const b of bodies){
    b.age+=dt;b.sc+=(1-b.sc)*Math.min(1,dt*12);
    b.warn=(!b.entering&&b.age>1&&b.y-b.r<LINE)?b.warn+dt:0;
    if(b.warn>2){over=true;Sound.over();$('final').textContent=score;$('over').hidden=false}
  }
}
function fruit(lv,x,y,sc=1,a=1){
  const s=Sprites.size(lv)*sc;
  ctx.globalAlpha=a;ctx.drawImage(Sprites.get(lv),x-s/2,y-s/2,s,s);ctx.globalAlpha=1;
}
function draw(){
  ctx.clearRect(0,0,W,H);
  const danger=bodies.some(b=>b.warn>0);
  ctx.setLineDash([10,8]);ctx.strokeStyle=danger?'#e5303a':'#e5303a66';ctx.lineWidth=danger?4:3;
  ctx.beginPath();ctx.moveTo(0,LINE);ctx.lineTo(W,LINE);ctx.stroke();ctx.setLineDash([]);
  bodies.forEach(b=>fruit(b.lv,b.x,b.y,b.sc));
  pops.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r*(1+p.t*2),0,7);
    ctx.strokeStyle=`rgba(255,255,255,${1-p.t/.3})`;ctx.lineWidth=5;ctx.stroke()});
  parts.forEach(p=>{ctx.globalAlpha=1-p.t/.5;ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(p.x,p.y,5*(1-p.t/.5)+1,0,7);ctx.fill();ctx.globalAlpha=1});
  if(!over){
    const r=RADII[cur],x=Math.min(W-r,Math.max(r,aimX));
    ctx.strokeStyle='#a5622d44';ctx.lineWidth=2;ctx.setLineDash([4,6]);
    ctx.beginPath();ctx.moveTo(x,DROP_Y);ctx.lineTo(x,H);ctx.stroke();ctx.setLineDash([]);
    fruit(cur,x,DROP_Y,1,cool>0?.4:1);
  }
  const left=HARD_AFTER-playT;
  ctx.font='700 14px Fredoka,system-ui,sans-serif';ctx.textAlign='right';
  if(left>0){
    const s=Math.floor(playT);
    ctx.fillStyle='#7a3d10aa';ctx.fillText('⏱ '+Math.floor(s/60)+':'+String(s%60).padStart(2,'0'),W-8,20);
  }else{
    ctx.fillStyle=Math.floor(playT*2)%2?'#e5303a':'#e5303acc';ctx.fillText('⬆️ ผลไม้กำลังดันขึ้น!',W-8,20);
  }
}
function loop(t){
  const dt=Math.min(.033,(t-last)/1000||0);last=t;
  update(dt);draw();requestAnimationFrame(loop);
}
const pos=e=>{const b=cv.getBoundingClientRect();aimX=(e.clientX-b.left)*W/b.width};
cv.addEventListener('pointermove',pos);
cv.addEventListener('pointerdown',e=>{Sound.init();pos(e)});
cv.addEventListener('pointerup',e=>{pos(e);drop()});
$('snd').onclick=()=>{Sound.init();Sound.on=!Sound.on;$('snd').textContent=Sound.on?'🔊':'🔇'};
$('restart').onclick=$('again').onclick=()=>{Sound.init();reset()};
$('chain').innerHTML=RADII.map((_,i)=>`<img src="${Sprites.url(i)}" alt="">`).join('');
reset();requestAnimationFrame(loop);
