
//------- begin of the chessBoard -------
var canvas = document.querySelector('.chessBoard');

if(innerHeight>innerWidth){
    canvas.height = innerWidth;
    canvas.width = innerWidth;
}else{
    canvas.height = innerHeight;
    canvas.width = innerHeight;
}
var c = canvas.getContext('2d');
var chessRadius = 20; 
var interval = (canvas.width - 2 * 20) / 18;
drawChessBoard();
drawStar();
//var startingline 

function drawChessBoard(){
    //draw the outter line
        c.beginPath();
        c.moveTo(20,20);
        c.lineTo(20,canvas.height - 20);

        c.lineTo(canvas.width - 20, canvas.height - 20);
        c.lineTo(canvas.width - 20, 20);
        c.lineTo(20,20);
    //draw the inner line
    for(var i = 1; i<18; i++){
        c.moveTo(20+interval*i,20);
        c.lineTo(20+interval*i,canvas.height - 20);
    }   
    for(var i = 1; i<18; i++){
        c.moveTo(20,20+interval*i);
        c.lineTo(canvas.width-20,20+interval*i);
    }
}

function drawStar(){
    
    //draw the dot 
    c.fillRect(20+interval*3-3,20+interval*3-3,6,6); 
    c.fillRect(20+interval*3-3,20+interval*9-3,6,6);
    c.fillRect(20+interval*3-3,20+interval*15-3,6,6);
    c.fillRect(20+interval*9-3,20+interval*3-3,6,6);
    c.fillRect(20+interval*9-3,20+interval*9-3,6,6);
    c.fillRect(20+interval*9-3,20+interval*15-3,6,6);
    c.fillRect(20+interval*15-3,20+interval*3-3,6,6);
    c.fillRect(20+interval*15-3,20+interval*9-3,6,6);
    c.fillRect(20+interval*15-3,20+interval*15-3,6,6);
    
    c.stroke();
};


function Point(x,y){
    this.x = x;
    this.y = y;
}
var chessArr = [];
function Chess(x,y){
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.draw = function(){


        c.clearRect(0,0,canvas.width,canvas.height);
        drawChessBoard();
        drawStar();
		drawChessOnTheBoard(chessArr);
        c.beginPath();

        c.arc(this.x, this.y,this.radius,Math.PI*2,false);
        c.stroke();
		
        
        
    };
    this.update = function(mouse){
        for(var i =0;i<pointArr.length;i++){
            if(mouse.x - pointArr[i].x < interval/2 && mouse.x - pointArr[i].x > -interval/2 &&
               mouse.y - pointArr[i].y < interval/2 && mouse.y - pointArr[i].y > -interval/2){
                this.x = pointArr[i].x; 
                this.y = pointArr[i].y;    
            }
        }
		canvas.addEventListener('click', function(){
			chessArr.push(this);//这里应该push的是棋子 push的是整个canvas
			console.log(this);
		});
    }
}

var pointArr = [];
for(var i=0;i<19;i++){
    for(var j=0;j<19;j++){
        var point = new Point(20+interval*i,20+interval*j);
        pointArr.push(point);
    }
}

function drawChessOnTheBoard(chessArray){
	for(var i =0; i<chessArray.length;i++){
		c.arc(chessArr[i].x, chessArr[i].y,chessArr[i].chessRadius,Math.PI*2,false);
	}
}


canvas.addEventListener('mousemove',function(event){
    var chess = new Chess();
    chess.update(event);
    chess.draw();

});





(function animate(){
   

    requestAnimationFrame(animate);
})();


//-----end of the chessBoard ----

var resignButton = document.getElementById('resignButton');
