
async function Load() {
  const a = import("https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js")
  const b = import("https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/utils/Draggable.min.js")
  const c = import("https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/DrawSVGPlugin.js?r=6")
  await a
  await b
  await c
  var D = document.createElement('div');
  TweenMax.set('svg',{overflow:"visible"})
  TweenMax.set('.knob',{x:10,y:80})
  
  var tl = new TimelineMax({paused:true})
  .from("#path2",1,{drawSVG:"0%",stroke:'orange',ease:Linear.easeNone})
  .to('.knob',1,{bezier:{type:"quadratic",values:[{x:10,y:80},{x:150,y:0},{x:300,y:80}]},ease:Linear.easeNone},0);
  
  Draggable.create(D,{trigger:".knob",
  type:'x',
  throwProps:true,
  bounds:{minX:0,maxX:300},
  onDrag:Update,
  onThrowUpdate:Update});   
  function Update(){tl.progress(Math.abs(this.x/300))};
  
  TweenMax.to('#path1',0.5,{strokeDashoffset:-10,repeat:-1,ease:Linear.easeNone})
}