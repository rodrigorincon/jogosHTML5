var init;
var matriz, fontText;
var vazioI, vazioJ, numJogadas, TAMANHO_QUADRO;

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function defineNivel(){
   param = getCookie('TAM_QUADRO');
   TAMANHO_QUADRO = param;
   init = new Array(Math.pow(param,2));
   for(i=0; i<init.length-1; i++){
      init[i] = i+1;
   }
   init[init.length-1] = ' ';
   matriz=new Array(param);
   for(i=0; i<param; i++)
      matriz[i] = new Array(param);    
}

function start(){
localStorage.clear();
    defineNivel();
    
    canvas = document.getElementById("canvas");
    canvas.style.height = 100*TAMANHO_QUADRO;
    canvas.style.width = 100*TAMANHO_QUADRO;
    context = canvas.getContext("2d");
    fontText = Math.round(120/TAMANHO_QUADRO);
    document.addEventListener('keydown', keyDown);
	
	inicializar();
}
        
function inicializar(){

    context.font = fontText+"pt Tahoma";
     
    embaralhar();
    
    for(i=0; i<TAMANHO_QUADRO; i++){
        for(j=0; j<TAMANHO_QUADRO; j++){
            if(matriz[i][j] == ' '){
                vazioI = i;
                vazioJ = j;
                break;
            }
        }
    } 
    numJogadas = 0;
    desenhar(); 
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
//    var vetor = FisherYatesShuffle();
var vetor = [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,' ' ];
    var k=0;
    for(i=0; i<TAMANHO_QUADRO; i++){
        for(j=0; j<TAMANHO_QUADRO; j++){
            matriz[i][j] = vetor[k];
            k++;
        }
    }   
}

function desenhar(){
    context.clearRect(0, 0, canvas.width, canvas.height);
	for(i=0;i<TAMANHO_QUADRO;i++)
      for(j=0;j<TAMANHO_QUADRO;j++)
        context.fillText(matriz[i][j], j*300/TAMANHO_QUADRO, i*300/TAMANHO_QUADRO+50);
    document.getElementById("jogadas").innerHTML = numJogadas;
}

function keyDown(e){

    switch(e.keyCode){
    case 37:
        if(vazioJ!=TAMANHO_QUADRO-1){
            matriz[vazioI][vazioJ] = matriz[vazioI][vazioJ+1];
            matriz[vazioI][vazioJ+1] = ' ';
            vazioJ +=1; 
            numJogadas++;  
        }
        break;
    case 38:
        if(vazioI!=TAMANHO_QUADRO-1){
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
    var k=0;
    for(i=0; i<TAMANHO_QUADRO; i++){
        for(j=0; j<TAMANHO_QUADRO; j++){
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
    rankingInverso(canvas,context,'numberz'+TAMANHO_QUADRO,numJogadas);
	inicializar();
}

function resolver(){
    //por o codigo aki
}
