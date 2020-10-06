var tower,towerImage;
var door,doorImage;
var doorsGroup;
var climber,climberImage;
var climbersGroup;
var ghost,ghostImage;
var invisibleBlock,invisibleBlockGroup;
var gameState = "Play"
var spooky;


function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  spooky = loadSound("spooky.wav")
  
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}






function setup(){
  createCanvas(600,600)
  
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3;
  

  
}



function draw(){
  background(0);
  //console.log(tower.y)
  if(gameState === "Play"){
    
  
  
  if(tower.y > 400){
    tower.y = 300;
  }
  
  if(keyDown(LEFT_ARROW)){
    ghost.x = ghost.x -3;
  }
  
  if(keyDown(RIGHT_ARROW)){
    ghost.x = ghost.x +3;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  
  ghost.velocityY = ghost.velocityY +0.5; 
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y > 600){
    ghost.destroy();
    gameState = "End"
  }
    
    spooky.loop();
  
  
  spawndoor();
  
  
  drawSprites();
  }
  if(gameState === "End"){
    stroke("yellow")
    fill("yellow")
    textSize(30)
    text("Game Over",230,275)
  }
}

function spawndoor(){
  if(frameCount % 240 === 0){
    door = createSprite(200,-50)
    door.addImage(doorImage)
    
    climber = createSprite(200,10);
    climber.addImage(climberImage);
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    door.x = Math.round(random(120,400))
    door.velocityY = 1;
    climber.x = door.x
    climber.velocityY =1;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityX = 1;
    ghost.depth = door.depth
    ghost.depth = ghost.depth + 1;
    door.lifetime = 800;
    climber.lifetime = 800;
    doorsGroup.add(door)
    climbersGroup.add(climber);
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
    
  }
}
   