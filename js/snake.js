'use strict';


let snakeContainer = document.querySelector('.snake-container');
let snakeCanvas = document.querySelector('.snake-canvas');
let gameOn = true;

let ctx = snakeCanvas.getContext('2d');
let arrowPressed = "left";
//sizes canvas
function setCanvas(){
    snakeCanvas.width = snakeContainer.offsetWidth - 17;
    snakeCanvas.height = snakeContainer.offsetHeight;
}

setCanvas();//calls function

//size canvas everytime window is resized
window.addEventListener('resize', setCanvas);



//RESET GAME

function reset(){
    clearInterval(GAME);

    let snakeX = snakeCanvas.width / 1.3;
    let snakeY = snakeCanvas.height / 2;
    
    ctx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    ctx.fillStyle = "#23ed04";
    ctx.fillRect(snakeX, snakeY, 10, 10);


    randomizeApple();

    gameOn = true;
    
    GAME();
}





//SCORE
let score = 0;

function updateScore(){
    document.querySelector('.score').textContent = score;

    score ++;
}

updateScore();

//APPLE
//randomizes the position of the apple
let appleX;
let appleY;
function randomizeApple(){

    appleX = Math.random() * snakeCanvas.width;
    appleY = Math.random() * snakeCanvas.height;

    if(appleX + 10 >= snakeCanvas.width){
        appleX = appleX - 20;
    } else if (appleX - 10 <= 0){
        appleX = appleX + 20;
    }

    if(appleY + 10 >= snakeCanvas.height){
        appleY = appleY - 20;
    } else if (appleY - 10 <= 0){
        appleY = appleY + 20;
    }

    ctx.fillStyle = "#ff0000";
    ctx.fillRect(appleX, appleY, 10, 10);

    console.log('passed');
    
}
randomizeApple();//starts first apple


//SNAKE





//GAME
let snakeX = snakeCanvas.width / 1.3;
let snakeY = snakeCanvas.height / 2;



function createSnake(){

    if(arrowPressed === "right"){//arrow RIGHT
        snakeX += 10;
        snakeY += 0;
    } else if(arrowPressed === "up"){ //arrow UP
        snakeX += 0;
        snakeY -= 10;
    } else if(arrowPressed === "down"){ //arrow DOWN
        snakeX += 0;
        snakeY += 10;
    }  else{
        snakeX -= 10;
        snakeY += 0;
    }

    ctx.clearRect(snakeX, snakeY, 10, 10);
    ctx.fillStyle = "#23ed04";
    ctx.fillRect(snakeX, snakeY, 10, 10);

    ateApple();
    wallCollision();

    if(!gameOn){
        
        ctx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);
        reset();
    }

}

function wallCollision(){
    if(snakeX + 10 >= snakeCanvas.width){
        gameOn = false
    } else if(snakeX - 10 < 0){
        gameOn = false
    }

    if(snakeY + 10 > snakeCanvas.height){
        gameOn = false
    } else if(snakeY - 10 < 0){
        gameOn = false
    }

    
}

//WALL COLLISSION

function ateApple(){

    if(((appleX < snakeX + 10) && (appleX + 10 > snakeX )
    && ((appleY < snakeY + 10) && (appleY + 10 > snakeY )))){
        
        ctx.clearRect(0, 0,snakeCanvas.width, snakeCanvas.height);
        randomizeApple();
}



        

        
        

}


function GAME() {setInterval(createSnake, 100);}

GAME();

    
    
//updates the arrowPressed function depending on the pressed arrow
window.addEventListener('keydown', function(event){
    event.preventDefault();

    if(event.code === "ArrowRight" && arrowPressed != "left"){//arrow RIGHT
        arrowPressed = "right";
        console.log(arrowPressed);
        
    } else if(event.code === "ArrowUp" && arrowPressed != "down"){ //arrow UP
        arrowPressed = "up";
        console.log(arrowPressed);
    } else if(event.code === "ArrowDown" && arrowPressed != "up"){ //arrow DOWN
        arrowPressed = "down";
        console.log(arrowPressed);
    } else if(event.code === "ArrowLeft" && arrowPressed != "right"){ //arrow LEFT
        arrowPressed = "left";
        console.log(arrowPressed);
    }
    
});


