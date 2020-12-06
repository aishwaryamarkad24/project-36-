//Create variables here
var dog,Hdog,database,foodS,foodStock;
var dog1,foodObj;
var x=20;
var TimeJson,Time;
var datetime,hour;
var lastfed,fedTime;

function preload()
{
  //milk = loadImage("images/Milk.png");
  dog = loadImage("dogImg1.png");
  Hdog = loadImage("dogImg.png");
}

function setup() {
  database = firebase.database();
  createCanvas(900,600);
  
  foodObj = new milk();
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  
 
  button=createButton('Feed The Dog');
  buy=createButton('add Food');
 
  button.position(700,95);
  buy.position(800,95);
  
  button.mousePressed(feedDog);
  buy.mousePressed(addFoods);
  
  dog1 = createSprite(730,300,30,30);
  dog1.addImage("s",dog);
  dog1.scale=0.3;
  
  
  
}


function draw() {  
  background(0,20,90);
  background("pink");
    foodObj.display();
    fedTime=database.ref('FeedTime');
    fedTime.on("value",(data)=>{
      lastfed=data.val();
    });
  fill(255,255,254);
  textSize(15);
  if (lastfed>=12)
  {
    text("Last Fed: " + lastfed%12+"PM",350,30);
  }else if(lastfed===0)
  {
    text("Last Fed: 12 AM",350,30);
  }else {
    text("Last Fed: "+ lastfed + " AM",350,30);
  }

 // getTime();
  drawSprites();
  
  
}

function readStock(data){
  foodStock = data.val();
  foodObj.updateFoodStock(foodStock);
    
}

function feedDog(){
  dog1.addImage(Hdog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}


function addFoods(){
  foodStock++;
  database.ref('/').update({
    Food:foodStock
  })
}
