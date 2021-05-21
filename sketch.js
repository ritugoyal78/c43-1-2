var canvas, backgroundImage;
/*why
database.ref("players").remove()
add this to your reset function
H
in form.js*/

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;
var track, car1_img, car2_img, car3_img, car4_img;
var s,f2,f1,obstacle,finishedPlayers,passedFinish;
var b_img,s_img,g_img
function preload(){
  track = loadImage("../images/track.jpg");
  car1_img = loadImage("../images/car1.png");
  car2_img = loadImage("../images/car2.png");
  car3_img = loadImage("../images/car3.png");
  car4_img = loadImage("../images/car4.png");
  ground = loadImage("../images/ground.png");
  f2=loadImage("../images/f1.png")
  b_img=loadImage("/images/bronze.png")
  s_img=loadImage("/images/silver.png")
 
  g_img=loadImage("/images/gold.png")
 
 
}

function setup(){
  canvas = createCanvas(displayWidth , displayHeight);
  database = firebase.database();
  gameState = 0;
  distance=0
  xVel=0;
  yVel=0
  finishedPlayers=0
  obstacle=createGroup()
  game = new Game();
  game.getState();
  game.start();
  for(i=0;i<5;i++){
  w=random(200,950)
  h=random(-height*4,height-300)
  f1=createSprite(w,h);
  f1.addImage("f1",f2)
  obstacle.add(f1)
  }
}


function draw(){
  if(playerCount === 4 && finishedPlayers===0){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(finishedPlayers===4){
    game.update(2)
  }
  if(gameState === 2 && finishedPlayers===4){
    console.log("indisplay")
    game.displayRanks()
  }
}
