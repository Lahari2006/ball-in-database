var Ball1;
var database;
var position;


function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  Ball1 = createSprite(250,250,10,10);
  Ball1.shapeColor = "red";


  var Ball1Position = database.ref('ball/position');
  Ball1Position.on("value", readPosition, showError);
}

function draw(){
  background("white");
  if(position !== undefined){
  
    if(keyDown(LEFT_ARROW)){
      changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      changePosition(0,+1);
    }
  }
    drawSprites();
  
}

function changePosition(x,y){
  database.ref('ball/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
