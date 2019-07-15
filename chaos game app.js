var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");
var canvasHeight = 700;
var canvasWidth = 1000;

//this gives the starting values for the seed, this can be changed and the fractal will remain
var seedX = canvasWidth/2;
var seedY = canvasHeight/2;
var seedRadius = 2;

var numOfDots = 0;
var delay = 1;
var previousRoll; 

//you must declare the polygon you want to play the chaos game with up here
var numberOfVertices = 5;
var radius = canvasHeight/2 - 50;
var coords = createPolygon(numberOfVertices, radius, canvasWidth/2, canvasHeight/2);

function createPolygon(numberOfSides,r, centreX, centreY){
    points = []
    angle = 2*Math.PI/numberOfSides
    for(var i = 1; i <=numberOfSides; i++){
        var px = r*Math.cos(angle*i)+centreX;
        var py = r*Math.sin(angle*i)+centreY;
        points.push([px, py])
    }
    return points
}

function drawPolygon(){
    for(var i = 0; i < numberOfVertices; i++){
        ctx.beginPath();
        ctx.arc(coords[i][0],coords[i][1], 10, 0, 2*Math.PI)
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
    }
}

function dice(numberOfSides){
    var roll = Math.round(Math.random()*numberOfSides); //gives a value between 0 and numberofsides
    return roll;
}

function drawSeed(sx, sy){
    numOfDots++;
    ctx.beginPath(); 
    ctx.arc(sx,sy,seedRadius,0,2*Math.PI);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
    document.getElementById("con").innerHTML = numOfDots;
}




function updateSeed2(sx,sy){
    var diceRoll = dice(numberOfVertices);
    while(diceRoll == previousRoll){ //this now means the same vertex cannot be chosen twice
        diceRoll = dice(numberOfVertices);
    }
    var px = coords[diceRoll][0];
    var py = coords[diceRoll][1];
    var averageX; 
    var averageY; 
    averageX = (sx+px)/2;
    averageY = (sy+py)/2;
    seedX = averageX;
    seedY = averageY;
    previousRoll = diceRoll; 
}


function draw(){
    updateSeed2(seedX, seedY); //this chooses a corner and halfs the seed distance
    drawSeed(seedX, seedY); //this draws the new seed position
}

drawPolygon();
setInterval(draw, delay);
//cant call setInterval(updateSeed, delay, seedX, seedY) since it will save the values of seedX and Y and not change them for every iteration
