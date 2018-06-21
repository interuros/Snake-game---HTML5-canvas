function Apple(x, y){

    
    this.x = x;
    this.y = y;
    this.a = snakeCanvas.width / 50;

    //DRAWS SQUARE PART OF SNAKE
    this.drawApple = function(){
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(this.x, this.y, this.a, this.a);
    }


    this.correctPosition = function(){
        if(this.x + this.a / 2 > snakeCanvas.width){
            this.x = snakeCanvas.width - this.a;
        } else if(this.x - this.a / 2 < 0){
            this.x = 0 + this.a ;
        }

        if(this.y + this.a / 2 > snakeCanvas.height){
            this.y = snakeCanvas.height - this.a;
        } else if(this.y - this.a / 2 < 0){
            this.y = 0 + this.a;
        }
    }


    this.collided = function(){
        for(let el of snakeArr){
            if(((this.x < el.x + el.side) && (this.x + this.a > el.x )
                && ((this.y < el.y + el.side) && (this.y + this.a > el.y )))){
                
                    updateScore();
                    apple();
                    console.clear();
                    console.log(applesArray);
                    
                    
                    for(let i = 0; i < snakeArr.length; i++){
                        console.log('snake number: ' + i  + ' - ' + snakeArr[i].v);
                    }

                    

                    
                    

            }

            
        }
    }


}