var canvas;
var c;
var canvasWidth;
var canvasHeight;
var Width,Height;
var rect2,rect1;
var rect,ball,player1,player2;

var paddle1Y = 100;
var paddle2Y = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;
var circleX,circleY;
var dx=8;
var dy=3;
const radius=10;
var stat=true;

function getBounds(){   
    rect = canvas.getBoundingClientRect();
	Width=window.innerWidth;
	Height=window.innerHeight;
	canvas.width="1000";
	canvas.height="500";
	circleY=canvas.height/2;
	circleX=canvas.width/2;
   
}

window.onload=function(){
    canvas = document.querySelector("canvas");
    c= canvas.getContext("2d");
    getBounds();
    c.clearRect(0,0,innerWidth,innerHeight);
	
	 create();
	 setInterval(function(){
	 	  c.clearRect(0,0,window.innerWidth,innerHeight);
	 	  console.log("sa");
	 	  status(stat);
          

        },40)

}

function create(){
	ball= new Circle(circleX,circleY,radius,dx,dy,'blue');
	rect1 = new Rect(0,0,PADDLE_THICKNESS,PADDLE_HEIGHT,'green');
	rect2 = new Rect(canvas.width-PADDLE_THICKNESS,0,PADDLE_THICKNESS,PADDLE_HEIGHT,'green');
	player1=new player(0,"player1");
	player2=new player(0,"player2");
}

window.addEventListener('mousemove',function(event){
	if((event.clientY>=rect.top) && event.clientY<(canvas.height+rect.top-PADDLE_HEIGHT) ){
		if( (event.clientX>(rect.left+canvas.width/2) )){
		    paddle2Y=event.clientY-rect.top;
		}
	    else if((event.clientX<(rect.left+canvas.width/2) && event.clientX>rect.left )) {
	     	paddle1Y=event.clientY-rect.top;
	    }
		//console.log(event.clientY,paddle2Y,event.clientX,rect.bottom,canvas.width/2)	
	}
    
});

function Rect(xpos,ypos,width,height,color){
	   this.x=xpos;
	   this.y=ypos;
	   this.width=width;
	   this.height=height;
	   this.color=color;
	   this.draw = function(){
		   	c.fillRect(this.x,this.y,this.width,this.height);
		   	c.fillStyle=this.color;
	   }
       this.update = function(y){
	       	this.y=y;
	       	this.draw();
       }
}

function Circle(x,y,r,dx,dy,color){
	this.x=x;
	this.y=y;
	this.radius=r;
	this.dy=dy;
	this.dx=dx;
    this.color=color;
	this.draw =function(){
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		c.fillStyle=this.color;
		c.fill();
		c.closePath();

	} 
	this.update=function(){
	     if(this.x+this.radius>canvas.width || this.x-this.radius<0){
	     	if( (ball.y>rect2.y && ball.y<rect2.y+PADDLE_HEIGHT && ball.x>canvas.width/2) || (ball.y>rect1.y && ball.y<rect1.y+PADDLE_HEIGHT && ball.x<canvas.width/2) ){
	     		this.dx=-this.dx;
	     		
	     	}
	     	else{
	     		if(this.x<canvas.width/2){
	     			player2.update();
	     		}
	     		if(this.x>canvas.width/2){
	     			player1.update();
	     		}
	     		clear();
                
                
	     	}
		    
		}
		this.x+=this.dx;
		if(this.y+this.radius>canvas.height || this.y-this.radius<0){
			this.dy=-this.dy;
		}
		this.y+=this.dy;
		/////Interaction
        this.draw();
	}
}

function clear(){
 		ball.x=canvas.width/2;
        ball.y=canvas.height/2;

}
function clearScore(){
		player2.score=0;
    	player1.score=0;
    	document.getElementById(player1.name).innerHTML=player1.score;
    	document.getElementById(player2.name).innerHTML=player2.score;
}
function player(score,player){
    this.score=score;
    this.name=player;
    this.update=function(){
    	this.score+=1;
    	clear();
    	document.getElementById(this.name).innerHTML=this.score;
    	if(this.score>=10){
        		alert(""+this.name +" won the match "+ "scores : "+player1.score +" - "+ player2.score);
        		clearScore();
    	}

    }
}
function status(el){
	stat=el;
	if(stat){
        ball.update();
        rect2.update(paddle2Y);
        rect1.update(paddle1Y);
	}
	ball.draw();
	rect1.draw();
	rect2.draw();
}
function changeStatus(){
	if(stat){
		stat=false;
		document.getElementById("pause").value="start";
	}
	else{
		stat=true;
		document.getElementById("pause").value="pause";
	}
}