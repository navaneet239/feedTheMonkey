var PLAY = 1,
  END = 2;

var gameState = PLAY

var bk, bkk;

var monkey, monkeybk;

var obstacle, obstaclebk;

var patthar, pattharbk, pattharGroup;

var score = 0,
  ate = 0;

var invisibleG;

var kela, kelabk, keleGroup;

var jump,jumpbk;
 
var eat = "number of bannanas eaten: ";

function preload() {

  bkk = loadImage("town bkkk012.jpg");

  monkeybk = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  kelabk = loadImage("banana.png");

  pattharbk = loadImage("obstacle.png");
  
  jumpbk = loadImage("jump button.png")

}



function setup() {

  createCanvas(windowWidth, windowHeight);
  background("white")



  bk = createSprite(width/2, 175, 350, 350);
  bk.addImage(bkk);
  bk.scale = 2.25;



  invisibleG = createSprite(width/2, 330, width, 32.5);

  monkey = createSprite(40, 260, 25, 25);
  monkey.addAnimation("running", monkeybk);
  monkey.scale = 0.12
  monkey.debug = true;
  monkey.setCollider("circle", 0, 0, 200)

  keleGroup = createGroup();
  pattharGroup = createGroup();

}


function draw() {

  drawSprites();

  text("Score: " + score, width/2, 35, fill("white"));

  text(eat + ate, width/2 - 50, 50, fill("white"));

  monkey.collide(invisibleG);

  invisibleG.visible = false;

  spawnkele();
  spawnpatthar();

  if (gameState === PLAY) {
    
    up();

    score = score + Math.round(setFrameRate() / 60);

    bk.velocityX = -(4 + 3 * score / 100);

    if (bk.x < 0) {
      bk.x = bk.width / 2;
    }

    if ( mousePressedOver(jump) && monkey.y >=120) {
      monkey.velocityY = -13;
    }


    monkey.velocityY = monkey.velocityY + 0.8

    if (keleGroup.isTouching(monkey)) {
      keleGroup.setVelocityXEach(0);
      keleGroup.destroyEach();

      ate = ate + 1;
    }

    if (pattharGroup.isTouching(monkey)) {
      gameState = END;
      monkey.velocityY = 0;
    }
    
    

  }

  if (gameState === END) {
    bk.velocityX = 0;
    keleGroup.setVelocityXEach(0);
    keleGroup.destroyEach();
    pattharGroup.setVelocityXEach(0);
    pattharGroup.destroyEach();

    keleGroup.setLifetimeEach(-1);
    pattharGroup.setLifetimeEach(-1);

    tell();
  }

}

function spawnkele() {

  if (frameCount % 80 === 0) {
    kela = createSprite(width + 5, 200, 25, 25);
    kela.addImage(kelabk);
    kela.y = Math.round(random(175, 225));
    kela.velocityX = -(4 + 3 * score / 100);

    kela.scale = 0.10;
    kela.lifetime = -100;

    keleGroup.add(kela);

    kela.depth = monkey.depth
    monkey.depth = monkey.depth + 1;
  }

}

function spawnpatthar() {

  if (frameCount % 150 === 0) {
    patthar = createSprite(width + 5, 310, 40, 10);
    patthar.addImage(pattharbk)
    patthar.scale = random(0.10, 0.12);
    patthar.velocityX = -(5 + 3 * score / 100);

    patthar.lifetime = -80;

    pattharGroup.add(patthar);
  }

}

function tell() {

  text("click on the" ,width/2 - 20,height/2 - 90, fill("red"),textFont("Colonna MT"), textSize(30));
  
    text("monkey to" ,width/2 - 10,height/2 - 60, fill("red"),textFont("Colonna MT"), textSize(30));
  
    text("revive yourself" ,width/2 - 40,height/2 - 30, fill("red"),textFont("Colonna MT"), textSize(30));

  if (mousePressedOver(monkey)) {

    replay();

  }

}

function up (){
  
  jump = createSprite(110, invisibleG.y - 250,20,20);
  jump.addImage(jumpbk);
  jump.scale = 0.12;
  
}

function replay() {

  gameState = PLAY;
  score = 0;
  ate = 0;

}