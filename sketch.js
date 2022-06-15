var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop()
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300,300,40,40)
  ghost.addImage(ghostImg)
  ghost.scale = 0.5
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
}

function draw() {
  background(0);
  if(gameState === "play"){
    if(keyDown("right")){
      ghost.x += 3
    }
    if(keyDown("d")){
      ghost.x += 3
    }
    if(keyDown("left")){
      ghost.x -= 3
    }
    if(keyDown("a")){
      ghost.x -= 3
    }
    if(keyDown("space")){
      ghost.velocityY = -8
    }
    ghost.velocityY+=1

    spawnDoors()

    if(tower.y > 400){
      tower.y = 300
    }

    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY = 0
    }
    if(ghost.isTouching(invisibleBlockGroup) || ghost.y > 600){
      gameState = "end"
    }

    drawSprites()

  }
  if(gameState === "end"){
    textSize(30)
    fill("yellow")
    text("GAME OVER",200,300)
  }
}

function spawnDoors(){
  if(frameCount % 200 === 0){
    door = createSprite(Math.round(random(50,550)), 0)
    climber = createSprite(door.x, 60)
    invisibleBlock = createSprite(door.x,70)
    invisibleBlock.debug = true
    invisibleBlock.height = 2

    door.addImage(doorImg)
    climber.addImage(climberImg)
    climber.width = invisibleBlock.width

    door.velocityY = 1
    climber.velocityY = 1
    invisibleBlock.velocityY = 1
    
    door.lifetime = 800
    climber.lifetime = 800
    invisibleBlock.lifetime = 800

    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)

    ghost.depth = door.depth + 1
  }
}