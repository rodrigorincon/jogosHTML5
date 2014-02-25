var init = ['1','2','3','4','5','6','7','8',' '];
var matriz=[ [,,],[,,],[,,] ];
        
function inicializar(){
    
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    
    var k=0;
    for(i=0;i<3;i++){
      for(j=0;j<3;j++){
          matriz[i][j] = init[k];
          k++
      }
    }
     
    desenhar(); 

    document.addEventListener('keydown', keyDown);
    setInterval(gameLoop, 30);
}

function desenhar(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "40pt Tahoma";
    for(i=0;i<3;i++)
      for(j=0;j<3;j++)
        context.fillText(matriz[i][j], j*100, i*100+50);
}

function keyDown(e){

}

function gameLoop(){
     
}
