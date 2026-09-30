const Physics={
  G:1400,
  step(bodies,dt,onContact){
    const n=4,h=dt/n;
    for(let s=0;s<n;s++){
      for(const b of bodies){
        if(b.entering){   // ผลไม้ที่กำลังดันขึ้นจากใต้กล่อง: เคลื่อนที่ขึ้นคงที่ ไม่โดนแรงโน้มถ่วง/พื้น
          b.vx=0;b.vy=-ENTER_V;b.y+=b.vy*h;
          if(b.y<=H-b.r){b.entering=false;b.y=H-b.r;b.vy=0}
          continue;
        }
        b.vy+=this.G*h;b.x+=b.vx*h;b.y+=b.vy*h;b.vx*=.999;
        if(b.x-b.r<0){b.x=b.r;b.vx*=-.2}
        if(b.x+b.r>W){b.x=W-b.r;b.vx*=-.2}
        if(b.y+b.r>H){b.y=H-b.r;b.vy*=-.2;b.vx*=.98}
      }
      for(let i=0;i<bodies.length;i++)for(let j=i+1;j<bodies.length;j++){
        const a=bodies[i],c=bodies[j],dx=c.x-a.x,dy=c.y-a.y,d=Math.hypot(dx,dy),m=a.r+c.r;
        if(d>=m||d===0)continue;
        if(a.entering&&c.entering)continue;
        if(a.entering||c.entering){   // ตัวที่ดันขึ้นมา "ดัน" ผลไม้ในกล่องขึ้นไป (ไม่ถูกดันกลับ)
          const k=a.entering?a:c,o=a.entering?c:a,sg=a.entering?1:-1;
          const ux=dx/d*sg,uy=dy/d*sg,ov=m-d;
          o.x+=ux*ov;o.y+=uy*ov;
          const vn=o.vx*ux+o.vy*uy,kv=-ENTER_V*uy;
          if(vn<kv){o.vx+=(kv-vn)*ux;o.vy+=(kv-vn)*uy}
          continue;
        }
        const nx=dx/d,ny=dy/d,ma=a.r*a.r,mc=c.r*c.r,t=ma+mc,ov=m-d;
        a.x-=nx*ov*mc/t;a.y-=ny*ov*mc/t;c.x+=nx*ov*ma/t;c.y+=ny*ov*ma/t;
        const rv=(c.vx-a.vx)*nx+(c.vy-a.vy)*ny;
        if(rv<0){const k=-1.15*rv/(1/ma+1/mc);a.vx-=k*nx/ma;a.vy-=k*ny/ma;c.vx+=k*nx/mc;c.vy+=k*ny/mc}
        onContact(a,c);
      }
    }
  }
};
