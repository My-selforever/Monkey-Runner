var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ST = 50;
var InG;
var gS = "play";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  InG = createSprite(75,575,100,10);
}
function setup() {
  createCanvas(600,600);
FoodGroup = createGroup();
  obstacleGroup = createGroup();
  monkey = createSprite(75,500,10,10);
  monkey.addAnimation("MonkeyR",monkey_running);
  monkey.scale = 0.16;
  
}


function draw() {
  background(rgb(25,200,255))
textSize(15);
  fill("black");
  text("Survival Time-"+ST,270,50);
  InG.visible=false;
  
  if (gS==="play")
  {
    spawnRock();
  spawnBanana();
    
 if(keyDown("space")  &&  monkey.y>300)
   {
    monkey.velocityY = -13;
   }
  if(monkey.isTouching(FoodGroup)  )
  {
    ST = ST+1;
    
  }
   
  if(frameCount%35===0)
    {
      ST = ST-1;
    }

  
  if(monkey.isTouching(obstacleGroup)  ||   ST===0)
    {
      gS = "end";
    }
  
  }
  monkey.velocityY = monkey.velocityY+1;
  monkey.collide(InG);
  if (gS==="end")
    {
      reset();
      obstacleGroup.setLifetimeEach = -1;
      FoodGroup.setLifetimeEach = -1;
    }
  drawSprites();
}

function spawnRock()
{
  if (frameCount%300 ===0)
{
  obstacle = createSprite(600,525,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.3;
  obstacle.velocityX = -4;
  obstacleGroup.add(obstacle);
}
}

function spawnBanana()
{
  if(frameCount%160===0)
    {
  var r = Math.round(random(200,300));
  banana = createSprite(600, r,10,10);
  banana.addImage(bananaImage);
      banana.scale = 0.2;
      banana.velocityX = -4;
      FoodGroup.add(banana);
    }
}
function reset()
{
  ST = 0;
  FoodGroup.setVelocityXEach (0);
  obstacleGroup.setVelocityXEach(0);
}