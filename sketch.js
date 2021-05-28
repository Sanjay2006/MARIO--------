var clouds;
var mario;
var Mario;
var ground,invisibleGround;
var pipe,pipes;
var enemy,enemies;
var coin,coins;
var head;
var score = 5;
var count = 0;
var coinCount = 0;
var bullet;
var enemyGroup;
var pipesGroup;
var cloudsGroup;
var bulletsGroup;
var coinsGroup;

function preload() {
  clouds = loadImage("clouds.png")
  ground = loadImage("ground.png")
  pipe = loadImage("pipe.png")
  coin = loadImage("coin.png")
  Bullet = loadImage("bullet.png")
  enemy = loadImage("enemy.png")
  mario = loadAnimation("mario1.png","mario2.png")

}

function setup() {
  createCanvas(1200, 400);
  Mario = createSprite(50,330)
  Mario.addAnimation("hi",mario)
  Mario.scale = 0.3
  ground1 = createSprite(600,395,1200,10)
  ground1.addImage(ground)
  invisibleGround = createSprite(600,376,1200,10);
  invisibleGround.visible = false;

  enemyGroup = new Group()
  cloudsGroup = new Group()
  pipesGroup = new Group()
  coinsGroup = new Group()
  bulletsGroup = new Group()

}
function draw() {                  
  background("SkyBlue");

  fill("black")
  textSize(30)
  text(" X ",70,60)

  text(score,120,60)
  textSize(30)

  text("score : " + Math.round(count),320,60)
  text(coinCount,250,60)
  text(" X ",200,60)

  count = count + 0.1
  
  if(keyDown("up_arrow") && Mario.y >= 330) {
    Mario.velocityY = -17;
  } 

  Mario.velocityY = Mario.velocityY + 1
  Mario.collide(invisibleGround)

  ground1.velocityX = -6
  if(ground1.x  <0){
    ground1.x = ground1.width/2
  } 

 if(keyWentDown("space")){
 bullet = createSprite(Mario.x,Mario.y)
 bullet.addImage(Bullet)
 bullet.velocityX = 5
 bullet.scale = 0.1                       
 bulletsGroup.add(bullet)
 }

  spawnPipes()
  spawnClouds()
  spawnEnemy()
  spawnCoins()

  if(enemyGroup.isTouching(Mario)){
    score = score - 1
    count = count - 5
  }

  if(bulletsGroup.isTouching(enemyGroup)){
    enemyGroup.destroyEach()
    bulletsGroup.destroyEach()

  }

  drawSprites();
}
function spawnPipes() {
  if (frameCount % 200 === 0) {
    var pipes = createSprite(1200,315,40,10);
    pipes.addImage(pipe);
    pipes.scale = 0.4;
    pipes.velocityX = -3;
    pipes.lifetime = 400;
    pipesGroup.add(pipes);
  }
}

function spawnClouds() {
  if (frameCount % 100 === 0) {
    var cloud = createSprite(1200,120,40,10);
    cloud.y = Math.round(random(40,150));
    cloud.addImage(clouds);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 400;
    cloudsGroup.add(cloud);
  }
}

function spawnEnemy() {
  if (frameCount % 300 === 0) {
    var enemies = createSprite(1200,338,40,10);
    enemies.addImage(enemy);
    enemies.scale = 0.15;
    enemies.velocityX = -3;
    enemies.lifetime = 400;
    enemyGroup.add(enemies);
  }                                                                                                                 
}

function spawnCoins() {
  if (frameCount % 200 === 0) {
    for (i = 0;i < 5;i++){
    var coins = createSprite(1200 + i * 29,200,40,10);
    coins.addImage(coin);
    coins.scale = 0.07;
    coins.velocityX = -3;
    coins.lifetime = 400;
    coinsGroup.add(coins);
  }
}
}