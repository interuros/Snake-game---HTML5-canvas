        
        let canvasContainer = document.querySelector('.snake');
        let canvas = document.querySelector('canvas');//canvas
        let ctx = canvas.getContext('2d');//canvas properties
        let arrowPressed = "left";//direction of the snake movement
        let squareArr = [];//number of parts the snake is composed of
        let appleArr = [];//number of apples
        let score = 0;//SCORE
        let scores = [];//scores array
        let snakeSpeed = 100; //lower = faster
        let playGame;//loop that initializes game play
        let playButton = document.querySelector('.play');//the play button
        let countdown = document.querySelector('.countdown');
        let countDownNumber = 1;
        let id = 2;
        
        let leaderBoard = document.querySelector('.leaderboard');
        

        let scoreDom = document.querySelector('.score');
        scoreDom.textContent = "SCORE: 0";

        function sizeCanvas(){
            canvas.width = canvasContainer.offsetWidth * 0.999 - (canvasContainer.offsetWidth * 0.999) % 10;
            canvas.height = canvasContainer.offsetHeight * 0.999 - (canvasContainer.offsetHeight * 0.999) % 10;
        }

        sizeCanvas();

        window.addEventListener('resize', sizeCanvas);
        
        console.log(canvas.width);
        console.log(canvas.height);
        



        //starts the game
        function initGame(){
            //creates first part of the snake
            let firstSquare = new Square(canvas.width * 0.5 - (canvas.width * 0.5) % 10, canvas.height * 0.5 - (canvas.height * 0.5) % 10, 9, 10, 1, "#ff0000");//CREATES FIRST SQUARE
            squareArr.push(firstSquare);
            
            scoreDom.textContent = 'SCORE: ' + score;

            console.log(squareArr);
            randomizeApple();//initalizes first apple
            console.log(appleArr);
            updateScore()//called to set initial score
            playGame = setInterval(animate, snakeSpeed);
        }

        //resets game when you lose
        function resetGame(){

            clearInterval(playGame);
            countdown.style.display = "block";
            countdown.textContent = "YOU LOST!";
            
            scores.push(score - 1);

            addScores();


            score = 0;
            appleArr = [];
            squareArr = [];
            snakeSpeed = 100;
            arrowPressed = "left";
            
        }


        //start game on play button click
        playButton.addEventListener('click', function(){

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let countDown = setInterval(function(){

                countdown.textContent = countDownNumber;
                
                countDownNumber ++;

                if(countDownNumber > 3){
                    clearInterval(countDown);
                    countdown.style.display = "none";
                    countDownNumber = 1;
                }

                
            }, 1000);

            setTimeout(initGame, 3000);

        });



        //adds score to leaderboard

        function addScores(){

            while (leaderBoard.firstChild) {
                leaderBoard.removeChild(leaderBoard.firstChild);
            }

            scores.sort(function(a, b){
                return b - a;
            });

            for(let num of scores){
                let leaderBoardItem = document.createElement('li');
                let leaderBoardScore = document.createElement('span');
                leaderBoard.appendChild(leaderBoardItem);
                leaderBoardItem.appendChild(leaderBoardScore);
                leaderBoardScore.textContent = num;
            }

        }
        
        

        console.log(scores);
        




        //SNAKE PART CONSTRUCTOR
        function Square(x, y, size, v, id, color){
            this.x = x;
            this.y = y;
            this.size = size;
            this.v = v;
            this.id = id;
            this.oldX = x;
            this.oldY = y;
            this.color = color;

            this.draw = function(){
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.size, this.size );
            }

            this.move = function(){

                //MOVES ONLY 1ST SNAKE PART BEACUSE THE REST WILL JUST FOLLOW THE PREVIOUS PART
                if(this.id === 1){
                    if(arrowPressed === "right"){//arrow RIGHT
                        this.x += this.v;
                        this.y += 0;
                    } else if(arrowPressed === "up"){ //arrow UP
                        this.x += 0;
                        this.y -= this.v;
                    } else if(arrowPressed === "down"){ //arrow DOWN
                        this.x += 0;
                        this.y += this.v;
                    } else if(arrowPressed === "left"){ //arrow LEFT
                        this.x -= this.v;
                        this.y += 0;
                    }
                }
            }


            this.wallCollision = function(){
                if(this.id === 1){
                    if(this.x + 9 > canvas.width + 10){
                        this.x = -10 ;
                    } else if(this.x - 9 < -10){
                        this.x = canvas.width - 10;
                    }

                    if(this.y + 9 > canvas.height + 10){
                        this.y = -10 ;
                    } else if(this.y - 9 < -10){
                        this.y = canvas.height - 10;
                    }
                }
            }

            this.canibalism = function(){
                if(this.id === 1){
                    for(let i = 1; i < squareArr.length; i++){
                        if(((this.x < squareArr[i].x + 10) && (this.x + 10 > squareArr[i].x )
                        && ((this.y < squareArr[i].y + 10) && (this.y + 10 > squareArr[i].y )))){
                            resetGame();
                        }
                    }
                }
            }
        }

        //APPLE CONSTRUCTOR
        function Apple(x, y){
            this.x = x;
            this.y = y;

            this.drawApple = function(){
                ctx.fillStyle = "ff0000";
                ctx.fillRect(this.x, this.y, 9, 9);
            }

            this.correctPosition = function(){
                if(this.x + 9 > canvas.width){
                    this.x = canvas.width - 9;
                } else if(this.x - 9 < 0){
                    this.x = 9 ;
                }

                if(this.y + 9 > canvas.height){
                    this.y = canvas.height - 9;
                } else if(this.y - 9 < 0){
                    this.y = 9;
                }
            }

            this.eaten = function(){
                for(let el of squareArr){
                    if(((this.x < el.x + el.size) && (this.x + 9 > el.x )
                        && ((this.y < el.y + el.size) && (this.y + 9 > el.y )))){

                        randomizeApple();
                        updateScore();
                        creatSnakePart();
                        console.log('EAT');
                        
                        snakeSpeed /= 1.03;
                        
                        if(snakeSpeed < 30){
                            snakeSpeed = 30;
                        }

                        console.clear();
                        console.log(snakeSpeed);
                        clearInterval(playGame);
                        
                        playGame = setInterval(animate, snakeSpeed);
                        console.log(appleArr);
                        console.log(squareArr);
                        
                        

                    }

                    
                }
            }
        }   


        //updates the score
        function updateScore(){
            scoreDom.textContent = 'SCORE: ' + score;

            score++;
        }

        //randomizes position for the apple and corrects it if needed
        function randomizeApple(){
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            
            x -= x % 10;
            y -= y % 10;

            let apple = new Apple(x, y);

            apple.correctPosition();

            appleArr.push(apple);
        }
    
        //creates snake parts
        function creatSnakePart(){
            let x = undefined;
            let y = undefined;
            let size = 9;
            let v = 10;
            let ID = id;
            let color = "#00ff00";

            let square = new Square(x, y, size, v, ID, color);

            squareArr.push(square);

            id ++;
        }

        //animates everything (sets game in motion)
        function animate(){

            ctx.clearRect(0,0,canvas.width,canvas.height);

            appleArr[appleArr.length - 1].drawApple();
            appleArr[appleArr.length - 1].eaten();

            for (let i = 0; i < squareArr.length; i++) {
                squareArr[i].draw();
                squareArr[i].move();
                squareArr[i].wallCollision();
                squareArr[i].canibalism();

                if(i > 0){

                    squareArr[i].x = squareArr[i - 1].oldX;
                    squareArr[i].y = squareArr[i - 1].oldY;
                    
                    squareArr[i - 1].oldX = squareArr[i - 1].x;
                    squareArr[i - 1].oldY = squareArr[i - 1].y;

                }
            }

            
            

            
        }

        //updates the arrowPressed function depending on the pressed arrow
        window.addEventListener('keydown', function(event){
            event.preventDefault();

            if(event.code === "ArrowRight" && arrowPressed != "left"){//arrow RIGHT
                arrowPressed = "right";
            } else if(event.code === "ArrowUp" && arrowPressed != "down"){ //arrow UP
                arrowPressed = "up";
            } else if(event.code === "ArrowDown" && arrowPressed != "up"){ //arrow DOWN
                arrowPressed = "down";
            } else if(event.code === "ArrowLeft" && arrowPressed != "right"){ //arrow LEFT
                arrowPressed = "left";
            }
            
        });


