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
}

function FisherYatesShuffle(){
    var counter = init.length, temp, index;
    var retorno = new Array(counter);
    //copia o vetor inicial pro novo vetor criado
    for(i=0; i<counter; i++)
        retorno[i] = init[i];
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        temp = retorno[counter];
        retorno[counter] = retorno[index];
        retorno[index] = temp;
    }
    return retorno;
}

function embaralhar(){
    var vetor = FisherYatesShuffle();
    var k=0;
    for(i=0; i<3; i++){
        for(j=0; j<3; j++){
            matriz[i][j] = vetor[k];
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
    if(verificarVitoria())
        resetar();
}

function verificarVitoria(){
    var k=0, tamLinha = Math.sqrt(init.length);
    for(i=0; i<tamLinha; i++){
        for(j=0; j<tamLinha; j++){
            if(matriz[i][j] != init[k])
              return false;
            k++;
        }
    }
    if(k == init.length)
        return true;
    return false;
}

function resetar(){
    alert("Parabéns! Você conseguiu com "+numJogadas+" pontos.");
    numJogadas=0;
    embaralhar();
    desenhar();
}

function resolver(){
    //por o codigo aki
}
