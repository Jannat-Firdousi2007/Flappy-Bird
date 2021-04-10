var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// Load Images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeSouth = new Image();
var pipeNorth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeSouth = "images/pipeSouth.png";
pipeNorth = "images/pipeNorth.png";

// Creating Variables
var gap = 85;
var constant;
var bX = 10;
var bY = 150;
var gravity = 1.5;
var score = 0;
var fly = new Audio();
var score = new Audio();
fly.src = "sounds/fly.mp3";
score.src = "sounds/score.mp3";

// On Key Down
document.addEventListener("keydown", moveUp);

function moveUp(){
    bY = 25;
    fly.play();
}

// Pipe Cordinents
var pipe = [];
pipe[0] = {
    x:cvs.width,
    y:0
}

function draw(){
    ctx.drawImage(bg,0,0);
    for(var i=0; i<pipe.length; i++){
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
        pipe[i].x--;

    if(pipe[i].x==125){
        pipe.push({
            x:cvs.width,
            y:Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
        })
        }
        // Detect Collision
        if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >= cvs.height - fg.height){
            location.reload();
            // Reload the page
        }
        if(pipe[i].x==5){
            score++;
            score.play();
        }
    }
    ctx.drawImage(fg,0,cvs.height-fg.height);
    ctx.drawImage(bird.bX,bY);
    bY+=gravity;
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " +score,10,cvs.height-20);
    requestAnimationFrame(draw);
} 
draw();