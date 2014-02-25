var init = ['1','2','3','4','5','6','7','8',' '];
var matriz=[ [,,],[,,],[,,] ];
var vazioI, vazioJ, numJogadas;
        
function inicializar(){
    
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
     
    embaralhar();
    
    for(i=0; i<3; i++){
        for(j=0; j<3; j++){
            if(matriz[i][j] == ' '){
                vazioI = i;
                vazioJ = j;
                break;
            }
        }
    } 
    numJogadas = 0;
    desenhar(); 

    document.addEventListener('keydown', keyDown);
    setInterval(gameLoop, 30);
}

function FisherYatesShuffle(){
    var counter = init.length, temp, index;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        temp = init[counter];
        init[counter] = init[index];
        init[index] = temp;
    }
}

function embaralhar(){
    FisherYatesShuffle();
    var k=0;
    for(i=0; i<3; i++){
        for(j=0; j<3; j++){
            matriz[i][j] = init[k];
            k++;
        }
    }   
}

function desenhar(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "40pt Tahoma";
    for(i=0;i<3;i++)
      for(j=0;j<3;j++)
        context.fillText(matriz[i][j], j*100, i*100+50);
    document.getElementById("jogadas").innerHTML = numJogadas;
}

function keyDown(e){

    switch(e.keyCode){
    case 37:
        if(vazioJ!=2){
            matriz[vazioI][vazioJ] = matriz[vazioI][vazioJ+1];
            matriz[vazioI][vazioJ+1] = ' ';
            vazioJ +=1; 
            numJogadas++;  
        }
        break;
    case 38:
        if(vazioI!=2){
            matriz[vazioI][vazioJ] = matriz[vazioI+1][vazioJ];
            matriz[vazioI+1][vazioJ] = ' ';
            vazioI +=1; 
            numJogadas++;   
        }
        break;
    case 39:
        if(vazioJ!=0){
            matriz[vazioI][vazioJ] = matriz[vazioI][vazioJ-1];
            matriz[vazioI][vazioJ-1] = ' ';
            vazioJ -=1;  
            numJogadas++;  
        }
        break;
    case 40:
        if(vazioI!=0){
            matriz[vazioI][vazioJ] = matriz[vazioI-1][vazioJ];
            matriz[vazioI-1][vazioJ] = ' ';
            vazioI -=1; 
            numJogadas++;   
        }
        break;     
    }
    desenhar();
}

function resolver(){
    //por o codigo aki
}

function gameLoop(){
     
}
