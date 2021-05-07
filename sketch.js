var car, carImage;
var road,roadImage;
var car1,car1Image;
var car2,car2Image;
var car3,car3Image;
var car4,car4Image;
var cars, carsGroup;
var hole,holeImage,holeGroup;
var gameOverSound;
var fuelSound;
var gameOver,gameOverImage;
var fuel,fuelImage,fuelGroup;
var score = 0;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  carImage = loadImage("car.jpeg");
  roadImage = loadImage("Road.jpg");
  car1Image = loadImage("car1.jpeg");
  car2Image = loadImage("car2.jpeg");
  car3Image = loadImage("car3.jpeg");
  car4Image = loadImage("car4.jpeg");
  holeImage = loadImage("HOLES.jpeg");
  gameOverSound = loadSound("CRASH.mp3");
  fuelSound = loadSound("FUEL.wav");
  gameOverImage = loadImage("gameOver.png");
  fuelImage = loadImage("fuel.jpeg")
}

function setup() {
  createCanvas(600,600);
  road = createSprite(300,200);
  road.addImage("roads",roadImage);
  road.scale=1.3;
  
  car = createSprite(300,250);
  car.addImage("cars",carImage);
  car.scale=0.4;
    
  gameOver = createSprite (280,300);
  gameOver.addImage("gameover",gameOverImage);
  
  carsGroup = new Group();
  fuelGroup = new Group();
  holeGroup = new Group();  
  
  score = 0;
  
  

}

function draw() {
       
 

 
  if(gameState === PLAY){
    gameOver.visible = false;
  
    if(keyDown("left")){
      car.x = car.x - 10;
    }    
    
    if(keyDown("right")){
      car.x = car.x + 10;
    }
    
    road.velocityY=20;
    
    if(road.y>325){
      road.y=200;
    }
    
     if(car.isTouching(fuelGroup)){
      score = score+50;
      fuelGroup.destroyEach(); 
      fuelSound.play(); 
     }
    
    if(car.x === 0 || car.x === 600){
      score = score-30
    }
    
    
   EnemyCars();
   khada();   
   petrol();
    
    if(car.isTouching(carsGroup) || car.isTouching(holeGroup) || car.x < -1 || car.x >601){
      gameState = END;
      gameOverSound.play();
    }
  
  } 
  else if(gameState === END){
    gameOver.visible = true
    carsGroup.velocityY=0;
    road.velocityY=0;
    car.velocityY=0;
    carsGroup.setVelocityYEach(0);
    holeGroup.setVelocityYEach(0);
    fuelGroup.setVelocityYEach(0);

  }
   drawSprites();

       textSize(20);
       fill("white")
       text("Score : "+score,100,30)
}


function EnemyCars(){
  if(World.frameCount % 80 === 0){
    cars = createSprite(500,0);
    cars.scale=0.4;
    var r = Math.round(random(1,4))
    if(r == 1){
      cars.addImage("car1",car1Image);
    }
    else if(r == 2){
      cars.addImage("car2",car2Image);
    }    
    else if(r == 3){
      cars.addImage("car3",car3Image);
    }
    else if(r == 4){
      cars.addImage("car4",car4Image);
    }
    cars.x = Math.round(random(100,500));
    carsGroup.lifetime = 300;
    carsGroup.add(cars);
    cars.velocityY=7;
  }
}

function khada(){
  if(World.frameCount % 200 === 0){
    hole = createSprite(500,0);
    hole.addImage("holes",holeImage);
    hole.scale=0.2;
    var rand = Math.round(random(100,500));
    hole.velocityY = 7;
    holeGroup.lifetime = 300;
    holeGroup.add(hole);
  }
}

function petrol(){
  if(World.frameCount % 250 === 0){
    fuel = createSprite(500,0);
    fuel.addImage("fuels",fuelImage);
    fuel.scale=0.15
    var ran = Math.round(random(100,500))
    fuel.velocityY = 7;
    fuelGroup.lifetime = 300;
    fuelGroup.add(fuel);
  }
}
















