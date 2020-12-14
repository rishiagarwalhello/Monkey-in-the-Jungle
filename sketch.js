var ground1, ground2, ground_img;//Background
var inv_ground;//Invisible Ground
var monkey, monkey_ani;//Monkey
var stone, stone_img;//Stone
var banana, banana_img;//Banana
var score=0;//Score
var replay, replay_img;//Replay Button
var play=1, end=2, gs=play;//Game States

function preload() {
  ground_img=loadImage("bkg.jpeg");
  stone_img=loadImage("stone.png");
  banana_img=loadImage("banana.png");
  replay_img=loadImage("replay.png");
  monkey_ani=loadAnimation("m1.png","m2.png","m3.png","m4.png","m5.png","m6.png","m7.png","m8.png","m9.png","m10.png");
}

function setup() {
  createCanvas(810,622);
  //Canvas adjusts is dimensions according to the screen.
  
  inv_ground=createSprite(405,550,810,10);
  
  ground1 = createSprite(405,311);
  ground1.addImage(ground_img);
  ground2 = createSprite(1215,311);
  ground2.addImage(ground_img);
  
  monkey=createSprite(120,485);
  monkey.addAnimation("monkey",monkey_ani);
  monkey.scale=0.2;
  
  replay=createSprite(405,520);
  replay.addImage(replay_img);
  
  banana_grp=new Group();
  stone_grp=new Group();
}

function draw() {
  background("white");

  if(gs===play) {
    inv_ground.visible=false;//Ground will be invisible.
    replay.visible=false;

    ground1.velocityX=-6;
    ground2.velocityX=-6;
    
    if(ground1.x<-405) {
      ground1.x=405;
      ground2.x=1215;
    }

    if(keyDown("space")&&monkey.y>110) {
      monkey.velocityY=-12;
    }

    monkey.velocityY=monkey.velocityY+0.8;//Gravity

    monkey.collide(inv_ground);//Monkey stands on the invisible ground.

    if(monkey.isTouching(banana_grp)) {
      banana_grp.destroyEach();
      score++;
    }

    stones();
    bananas();

    drawSprites();

    textSize(30);
    stroke("red");
    fill("white");
    text("Score :: "+score,25,50);
    
    if(monkey.isTouching(stone_grp)) {
      gs=end;
    }
  } else if(gs===end) {
    monkey.visible=false;
    stone_grp.destroyEach();
    banana_grp.destroyEach();
    ground1.velocityX=0;
    ground2.velocityX=0;
    replay.visible=true;
    
    if(mousePressedOver(replay)) {
      gs=play; 
      replay.visible=false;
      monkey=createSprite(120,485);
      monkey.addAnimation("monkey",monkey_ani);
      monkey.scale=0.2
      score=0;
      if(monkey.isTouching(stone_grp)) {
        gs=end;
        replay.visible=true;
      }
    }
    
    drawSprites();
    
    textSize(100);
    stroke("red");
    fill("purple");
    text("Your Score is...",90,300);
    textSize(110);
    stroke("purple");
    fill("red");
    text(score+" Point(s) !!",120,425);
  }
}
function stones() {
  if(frameCount%120===0) {
    stone=createSprite(900,485);
    stone.addImage(stone_img);
    stone.scale=0.35;
    stone.velocityX=-6;
    stone.setCollider("rectangle",0,0,480,440);
    stone.depth=monkey.depth-1;
    stone.lifetime=200;
    stone_grp.add(stone);
  }
}
function bananas() {
  if(frameCount%100===0) {
    banana=createSprite(900,Math.round(random(20,485)));
    banana.addImage(banana_img);
    banana.scale=0.15;
    banana.velocityX=-6;
    banana.lifetime=200;
    banana_grp.add(banana);
  }
}