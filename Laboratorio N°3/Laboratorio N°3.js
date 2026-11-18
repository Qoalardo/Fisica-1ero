let radiobola=20;
let posbolaestatica,posbolamovil,Vbolamovil,Vbolaestatica;
let simulacion=false,arrastrando=false,choque=false;
let sliderelasticidad,slidervelocidad,botonplay,botonreset;

function setup(){
  createCanvas(800,500);
  createElement('h3','Controles de la Simulación');
  createSpan('Elasticidad (e: 0 = inelástico, 1 = elástico): ');
  sliderelasticidad=createSlider(0,1,1,0.01);
  createDiv();
  createSpan('Velocidad Inicial (v0): ');
  slidervelocidad=createSlider(1,15,5,0.5);
  createDiv();
  botonplay=createButton('Play').mousePressed(iniciarSimulacion);
  botonreset=createButton('Reiniciar').mousePressed(reiniciarSimulacion);
  reiniciarSimulacion();
}

function draw(){
  background(110,110,50);
  if(simulacion){
    posbolamovil.add(Vbolamovil);
    posbolaestatica.add(Vbolaestatica);
    if(dist(posbolamovil.x,posbolamovil.y,posbolaestatica.x,posbolaestatica.y)<=radiobola*2&&!choque){
      let e=sliderelasticidad.value(),v0=Vbolamovil.mag();
      let dir=p5.Vector.sub(posbolaestatica,posbolamovil).normalize();
      posbolamovil=p5.Vector.sub(posbolaestatica,p5.Vector.mult(dir,radiobola*2));

      /*
        
       Formulas después del choque
        
        Se asumen masas iguales (m1 = m2 = m) y bola 2 inicialmente en reposo.
        
        1. Conservación de la Cantidad de Movimiento (Momento Lineal):
           m*v0=m*v1+m*v2  =>  v0=v1+v2 (Ec1)
        
        2. Coeficiente de Restitución (e):
           e = (v2-v1)/v0 => e*v0=v2-v1  (Ec2)
        
        3. Resolución del sistema de ecuaciones:
           - Sumando Ec1 y Ec2:  v0*(1+e)=2*v2  =>  v2=((1+e)/2)*v0
           - Restando Ec2 a Ec1: v0*(1-e)=2*v1  =>  v1=((1-e)/2)*v0
        
      */

      Vbolamovil=dir.copy().mult(((1-e)/2)*v0);
      Vbolaestatica=dir.copy().mult(((1+e)/2)*v0);
      choque=true;
    }
  }else{
    stroke(255,255,255,120);
    line(posbolamovil.x,posbolamovil.y,posbolaestatica.x,posbolaestatica.y);
  }

  stroke(0);
  fill(220,0,0);circle(posbolaestatica.x,posbolaestatica.y,radiobola*2);
  fill(245);circle(posbolamovil.x,posbolamovil.y,radiobola*2);

  if(dist(mouseX,mouseY,posbolamovil.x,posbolamovil.y)<radiobola&&!simulacion){
    fill(255,255,0,100);
    circle(posbolamovil.x,posbolamovil.y,radiobola*2+6);
  }

  fill(255);noStroke();textSize(14);
  text("Elasticidad (e): "+sliderelasticidad.value(),20,30);
  text("Velocidad Inicial (v0): "+slidervelocidad.value()+" px/frame",20,50);
  text("Arrastra la bola blanca con el mouse para cambiar la posición inicial",20,height-20);
}

function mousePressed(){
  if(!simulacion&&dist(mouseX,mouseY,posbolamovil.x,posbolamovil.y)<radiobola)arrastrando=true;
}

function mouseDragged(){
  if(arrastrando&&!simulacion&&dist(mouseX,mouseY,posbolaestatica.x,posbolaestatica.y)>radiobola*2){
    posbolamovil.set(mouseX,mouseY);
  }
}

function mouseReleased(){arrastrando=false;}

function iniciarSimulacion(){
  if(!simulacion){
    Vbolamovil=p5.Vector.sub(posbolaestatica,posbolamovil).normalize().mult(slidervelocidad.value());
    Vbolaestatica=createVector(0,0);
    simulacion=true;
    choque=false;
  }
}

function reiniciarSimulacion(){
  simulacion=false;choque=false;
  posbolaestatica=createVector(width/2,height/2);
  posbolamovil=createVector(150,height/2);
  Vbolamovil=createVector(0,0);
  Vbolaestatica=createVector(0,0);
}