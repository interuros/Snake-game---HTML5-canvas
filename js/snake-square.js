function Snake(x, y, side, v, id){

    this.side = side;
    this.x = x;
    this.y = y;
    this.v = v;
    this.xConst = x;
    this.yConst = y;
    this.vConst = v;
    this.id = id;

    

    //DRAWS SQUARE PART OF SNAKE
    this.draw = function(){
        ctx.fillStyle = "#23ed04";
        ctx.fillRect(this.x, this.y, this.side, this.side );
    }

    this.move = function(){

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

    this.correctPosition = function(){

        if(this.id === 1){

            if(this.x + this.side >= snakeCanvas.width){
                gameOn = false
            } else if(this.x - this.side < 0){
                gameOn = false
            }

            if(this.y + this.side > snakeCanvas.height){
                gameOn = false
            } else if(this.y - this.side < 0){
                gameOn = false
            }
        }
    }

    this.updateSpeed = function(){

        this.v = this.vConst + applesArray.length / 17.285714285714285714285714285714;
    }


}