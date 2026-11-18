a=1
v0y=0
v0x=5
posicionx=50
posiciony=100
dt=0.1
d=20

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(137,200,200);
  v0y=v0y+a
  posiciony=posiciony+v0y
  posicionx=posicionx+v0x
if(posiciony+d>=height){
posiciony=height-d;
v0y=-(v0y)  
} if(posicionx+d>=width || posicionx-d <= 0){
v0x = -(v0x);
}
  fill("lightgreen")
  circle(posicionx,posiciony,d)
}