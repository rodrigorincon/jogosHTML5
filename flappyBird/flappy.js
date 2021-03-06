var jogAlt, jogLarg, jogX, jogY, velX, velY;
var cano1X, cano1Y, cano1Larg, cano1Alt, cano2X, cano2Y, cano2Larg, cano2Alt, espacoCano;
var pontosJogador, numCanos, subir, countUp, MAX_COUNT_UP, MAX_COUNT_DOWN;
var INIT = true;
         
function inicializar(){

    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    
    jogLarg = 20;
    jogAlt = 20;
    jogX = 200;
    jogY = canvas.height/2 - jogAlt/2;
    velX = 5;
    velY = 5;
    
    cano1X = cano2X = canvas.width;
    cano1Larg = cano2Larg = 40;
    espacoCano = 120;
    cano1Y = 0;
    defineTamanhoCano();
    
    pontosJogador = 0;
    numCanos = 1;
    subir = false;
    countUp = 1;
    MAX_COUNT_UP = 6;
    MAX_COUNT_DOWN = 3;

    if(INIT){
        document.addEventListener('keyup', keyUp);
        setInterval(gameLoop, 30);
    }
}

function keyUp(e){
    if(e.keyCode == 32){
         subir = true;
         countUp = 1;
    }
}

function defineTamanhoCano(){
    cano1Alt = Math.random() * (canvas.height - espacoCano);
    cano2Y = cano1Alt + espacoCano;
    cano2Alt = cano2Y==canvas.height ? 0 : canvas.height - cano2Y;
}

function desenhar(){
    //jogador
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(jogX, jogY, jogLarg, jogAlt);
    //canos
    context.fillRect(cano1X, cano1Y, cano1Larg, cano1Alt);
    context.fillRect(cano2X, cano2Y, cano2Larg, cano2Alt);
    //pontuacao
    context.font = "32pt Tahoma";
    context.fillText(pontosJogador, canvas.width - 70, 50);
}

function verificaColisao(){
    //se caiu no ch�o
    if(jogY + jogAlt >= canvas.height)
        return true;
    //se bateu no teto
    if(jogY < 0)
        jogY = 0;
    //se colidiu com o cano1
    if(jogX+jogLarg >= cano1X && jogX < cano1X+cano1Larg && cano1Y+cano1Alt >= jogY )
        return true;
    //se colidiu com o cano2
    if(jogX+jogLarg >= cano2X && jogX < cano2X+cano2Larg && jogY+jogAlt >= cano2Y )
        return true;  
    return false; 
}

function verificaPontuacao(){
    if(jogY > cano1Y+cano1Alt && jogY+jogAlt < cano2Y  && jogX > cano1X && jogX < cano1X+cano1Larg){
        if(pontosJogador < numCanos)
            pontosJogador++;
    }
}

function movimenta(){
    //movimenta os canos
    if(cano1X + cano1Larg <= 0){
        cano1X =  canvas.width;
        cano2X =  canvas.width;
        defineTamanhoCano();
        numCanos++;
    }else{
        cano1X -=  velX;
        cano2X -=  velX;
    }
    //movimenta o jogador
    if(subir){
        jogY -= velY*(MAX_COUNT_UP-countUp);
        countUp++;
        if(countUp == MAX_COUNT_UP){
            countUp = 1;
            subir = false;
        }
    }else{
        jogY += velY*countUp/2;
        if(countUp<MAX_COUNT_DOWN)
          countUp++;     
    }
}

function gameLoop(){
    var colisao = verificaColisao();
    if(colisao){
        alert("morreu");
        INIT = false;
        inicializar();
        return;
    }
    verificaPontuacao();
    movimenta();
    desenhar();
}
