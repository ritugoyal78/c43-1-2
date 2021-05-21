class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car1.debug="true"
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car2.debug="true"
    car3 = createSprite(500,200);
    car3.debug="true"
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.debug="true"
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
passedFinish=false;
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getFinishedPlayers();
    if(allPlayers !== undefined){
      //var display_position = 100;
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);

      //index of the array
      var index =0;

      //x and y position of the cars
      var x =200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = 200+(index*200)+allPlayers[plr].xPos;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        textAlign(CENTER)
        textSize(20)
        text(allPlayers[plr].name,cars[index-1].x,cars[index-1].y+75)
        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
          if(cars[index-1].isTouching(obstacle)){
            yVel-=.2
          }
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    //if(keyIsDown(UP_ARROW) && player.index !== null){
      //player.distance +=10
     
   // }
   if(player.distance<3200){
    if(keyIsDown(38) && player.index!==null){
      yVel+=.9;
      if(keyIsDown(37)){
        xVel-=.2;
      }
      if(keyIsDown(39)){
        xVel+=.2
      }
    }else if(keyIsDown(38) && yVel>0 && player.index!==null){
      yVel-=.1;
      xVel*=.9;
    }else{
      yVel*=.985
      xVel*=.985
    }
  }else if(passedFinish===false){
    yVel*=.7
    xVel*=.7
    Player.updateFinishedPlayers();
    player.place=finishedPlayers;
    player.update();
    passedFinish=true
  }
  else{
    yVel*.8;
    xVel*=.8
  }
   // if(player.distance > 3860){
     // gameState = 2;
   // }
   player.distance+=yVel
   yVel*=.98
   player.xPos+=xVel
   xVel*=.985
   player.update();
    drawSprites();
  }

  displayRanks(){
    camera.position.x=0;
    camera.position.y=0;
   imageMode(CENTER)
   Player.getPlayerInfo();

 image(b_img,displayWidth/-4,-100+displayHeight/9,200,240)
 image(s_img,displayWidth/4,-100+displayHeight/10,225,270);
 image(gold_img,0,-100,250,300)

 textAlign(CENTER)
 textSize(50)
 for(var plr in allPlayers){
  if(allPlayers[plr].place===1){
  text("1st :"+allPlayers[plr].name,0,85)
  }else if(allPlayers[plr].place===2){
   text("2nd :"+allPlayers[plr].name,displayWidth/4,displayHeight/9+73)
  }else if(allPlayers[plr].place===3){
    text("3rd :"+allPlayer[plr].name,displayWidth/-4,displayHeight/10+76)
  }else{
    textSize(30)
    text("Honourable Mention :"+allPlayers[plr].name,0,225)
  }


      }
    }
  }

