const Physics={
  G:1400,
  step(bodies,dt,onContact){
    const n=4,h=dt/n;
    for(let s=0;s<n;s++){
      for(const b of bodies){
        b.vy+=this.G*h;b.x+=b.vx*h;b.y+=b.vy*h;b.vx*=.999;
        if(b.x-b.r<0){b.x=b.r;b.vx*=-.2}
        if(b.x+b.r>W){b.x=W-b.r;b.vx*=-.2}
        if(b.y+b.r>H){b.y=H-b.r;b.vy*=-.2;b.vx*=.98}
      }
      for(let i=0;i<bodies.length;i++)for(let j=i+1;j<bodies.length;j++){
        const a=bodies[i],c=bodies[j],dx=c.x-a.x,dy=c.y-a.y,d=Math.hypot(dx,dy),m=a.r+c.r;
        if(d>=m||d===0)continue;
        const nx=dx/d,ny=dy/d,ma=a.r*a.r,mc=c.r*c.r,t=ma+mc,ov=m-d;
        a.x-=nx*ov*mc/t;a.y-=ny*ov*mc/t;c.x+=nx*ov*ma/t;c.y+=ny*ov*ma/t;
        const rv=(c.vx-a.vx)*nx+(c.vy-a.vy)*ny;
        if(rv<0){const k=-1.15*rv/(1/ma+1/mc);a.vx-=k*nx/ma;a.vy-=k*ny/ma;c.vx+=k*nx/mc;c.vy+=k*ny/mc}
        onContact(a,c);
      }
    }
  }
};
