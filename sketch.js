
  var path,mainCyclist;
  var pathImg,mainRacerImg1,mainRacerImg2;
  var cycleBell,pinkCG,yellowCG,redCG,gameOver,gameOverImg

  var opp1,opp2,opp3,opp1img,opp2img,opp3img,oppfallImage;
  var obstacle1,obstacle2,obstacle1Img,obstacle2Img;

  var END =0;
  var PLAY =1;
  var gameState = PLAY;

  var distance=0;

  function preload(){
    gameOverImg= loadImage("gameOver.png");
   cycleBell =
     loadSound("sounds/bell.mp3");

    obstacle1Img = loadImage("obstacle1.png");
    obstacle2Img = loadImage("obstacle2.png");
    opp1Img = loadAnimation("opponent1.png","opponent2.png");
    opp2Img = loadAnimation("opponent4.png","opponent5.png");
    opp3Img = loadAnimation("opponent7.png","opponent8.png");
    oppfallImage= loadAnimation("opponent3.png");
    pathImg = loadImage("images/Road.png");
    mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
    mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  }

  function setup(){

  createCanvas(600,300);

  // Moving background
  path=createSprite(100,150);
  path.addImage(pathImg);


  gameOver = createSprite(300,150,20,20);
  gameOver.addImage(gameOverImg);
  //creating boy running
  mainCyclist  = createSprite(70,150,20,20);
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.scale=0.07;

  obstaclesGroup = createGroup();
    oppGroup = createGroup();


    mainCyclist.debug = true;
  mainCyclist.setCollider("rectangle",0,0,30,50)
  }

  function draw() {
    background(0);
    drawSprites();
    textSize(20);
    fill(255);
    text("Distance: "+ distance,350,30);

    if(gameState===PLAY){
      gameOver.visible = false;

      if (keyDown("space")){
       cycleBell.play();
      }
      path.velocityX = -(6+2*distance/150);
     distance = distance + Math.round(getFrameRate()/50);
     mainCyclist.y = World.mouseY;
     opponentCyclists();
      spawnObstacles();
     edges= createEdgeSprites();
     mainCyclist.collide(edges);


    //code to reset the background
    if(path.x < 0 ){
      path.x = width/2;
    }

   }
    if (mainCyclist.isTouching(oppGroup)||mainCyclist.isTouching(obstaclesGroup)){
      gameState = END;
    //mainCyclist.changeAnimation("OHH",mainRacerImg2);
      //oppGroup.changeAnimationEach("lol",oppfallImage);
    }
    if (gameState == END){
      path.velocityX = 0;
      oppGroup.setVelocityXEach(0);
      oppGroup.setLifetimeEach(-1);
      obstaclesGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
      gameOver.visible = true;
      text("Press UP arrow to restart",300,280)
      mainCyclist.changeAnimation("SahilRunning",mainRacerImg2);
    }

    if(keyWentDown("up")&& gameState == END){
          reset();
       }
  }
  function opponentCyclists(){
   if (frameCount % 60 === 0){
     var opponent = createSprite(1110,Math.round(random(50,250),10,40));
     opponent.velocityX = -(6 + 2*distance/150);

      //generate random opponents
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: opponent.addAnimation("gg",opp1Img);
                break;
        case 2: opponent.addAnimation("gg2",opp2Img);
                break;
        case 3: opponent.addAnimation("gg3",opp3Img);
                break;
        default: break;
      }
     opponent.scale = 0.06
     opponent.lifetime = 170;
     oppGroup.add(opponent);
   }
  }

  function reset(){
    gameState = PLAY;
    distance = 0;
    oppGroup.destroyEach();
    obstaclesGroup.destroyEach();
  }

  function spawnObstacles(){
   if (frameCount % 100 === 0){
     var obstacle = createSprite(1110,Math.round(random(30,270),10,40));
     obstacle.velocityX = -(6 + 2*distance/150);

     //generate random obstacles
      var rand2 = Math.round(random(1,2));
     switch(rand) {
        case 1: obstacle.addImage("ggg",obstacle1Img);
                break;
        case 2: obstacle.addImage("ggg2",obstacel2Img);
                break;
        default: break;
      }
     obstacle.scale = 0.06
     obstacle.lifetime = 170;
     obstaclesGroup.add(obstacle);
   }
  }