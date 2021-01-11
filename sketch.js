var helicopterIMG, helicopterSprite;
var packageSprite,packageIMG;
var packageBody,ground;
var boxLeftSprite, boxBase, boxRightSprite;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png");
	packageIMG=loadImage("package.png");
}

function setup() 
{
	createCanvas(800, 600);
	
	helicopterSprite=createSprite(width/2,200,10,10);
	helicopterSprite.addImage(helicopterIMG);
	helicopterSprite.scale=0.6;

	packageSprite=createSprite(410,210,10,10);
	packageSprite.addImage(packageIMG);
	packageSprite.scale=0.2;

	// package appears in front of helicopter
	// following lines will adjust the depth and helicopter appears first 
	helicopterSprite.depth = packageSprite.depth;
	helicopterSprite.depth = helicopterSprite.depth + 1;

	groundSprite=createSprite(width/2, height-8, width,10);
	groundSprite.shapeColor=color("brown");

	engine = Engine.create();
	world = engine.world;

	// set restitution for package so that it bounces when released from helicopter
	// before release, static property is set to true
	// after release, static property will be set to false
	var packageBody_option = {

		restitution: 0.8,
		isStatic: true
	
	}

	var ground_option = {
		isStatic:true
	}

	var box_option = {
		isStatic:true
	}

	// assume package to be a circle and set x coordinate, y coordinate and radius 
	packageBody=Bodies.circle(410,220,5,packageBody_option)
	World.add(world,packageBody)
	// assume ground to be a rectangle and set x,y,width and height
		ground=Bodies.rectangle(400,650,width,150,ground_option)
		World.add(world,ground)

	boxleftSprite=createSprite(200, height-50, 20,100);
	boxleftSprite.shapeColor="red";
	 
	boxBase=createSprite(300, height-10, 200,20);
	boxBase.shapeColor="red"; 
	 
	boxRightSprite=createSprite(400 , height-50, 20,100);
 	boxRightSprite.shapeColor="red";

	Engine.run(engine);
  
}


function draw() 
{
  // can change to another color
  background("skyblue");
  
  //so that package image moves with the circle
  packageSprite.x= packageBody.position.x;
  packageSprite.y= packageBody.position.y;
 
  drawSprites();
 
}

function keyPressed() 
{

	// when left arrow key is pressed, helicopter and package should shift to the left
	if (keyCode === LEFT_ARROW) 
	{

		helicopterSprite.x=helicopterSprite.x-20;    
		translation={x:-20,y:0};
		// when package is with helicopter, it should move with helicopter
		// once package is released, it should not move with helicopter
		if(packageSprite.y===220){
			Matter.Body.translate(packageBody, translation);
		}
	}
	//when right arrow key is pressed, helicopter and package should shift to the right
	else if (keyCode === RIGHT_ARROW) 
	{
		helicopterSprite.x=helicopterSprite.x+20;
		translation={x:20,y:0};
		if(packageSprite.y===220){
			Matter.Body.translate(packageBody, translation);
		}
	}
	// when down arrow key is pressed, package should be released from the helicopter
	//after release, package static property is set to false	
	else if (keyCode === DOWN_ARROW)
	{ Matter.Body.setStatic(packageBody,false)
	 	
	} 

}

