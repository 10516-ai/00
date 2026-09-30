// เสียงสังเคราะห์ด้วย WebAudio (ไม่ต้องใช้ไฟล์เสียง)
const Sound={ac:null,on:true,
  init(){if(!this.ac){try{this.ac=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(this.ac&&this.ac.state==='suspended')this.ac.resume()},
  tone(f,d,type='sine',v=.2,to=0,at=0){
    if(!this.on||!this.ac)return;
    const t=this.ac.currentTime+at,o=this.ac.createOscillator(),g=this.ac.createGain();
    o.type=type;o.frequency.setValueAtTime(f,t);if(to)o.frequency.exponentialRampToValueAtTime(to,t+d);
    g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);
    o.connect(g);g.connect(this.ac.destination);o.start(t);o.stop(t+d);
  },
  drop(){this.tone(420,.1,'triangle',.18,180)},
  merge(lv){const f=330*Math.pow(2,lv/5);this.tone(f,.22,'sine',.28,f*1.8);this.tone(f*2,.12,'triangle',.1,0,.05)},
  big(){[523,659,784,1047].forEach((f,i)=>this.tone(f,.25,'triangle',.22,0,i*.1))},
  over(){[392,330,262,196].forEach((f,i)=>this.tone(f,.3,'sawtooth',.12,0,i*.18))}
};
