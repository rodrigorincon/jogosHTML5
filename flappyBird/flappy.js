var jogAlt, jogLarg, jogX, jogY, velX, velY;
var cano1X, cano1Y, cano1Larg, cano1Alt, cano2X, cano2Y, cano2Larg, cano2Alt, espacoCano;
var subir, countUp, MAX_COUNT_UP;
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
    espacoCano = 80;
    cano1Y = 0;
    defineTamanhoCano();
    
    subir = false;
    countUp = 0;
    MAX_COUNT_UP = 2;

    if(INIT){
        document.addEventListener('keydown', keyDown);
        setInterval(gameLoop, 30);
    }
}

function keyDown(e){
    if(e.keyCode == 32){
         subir = true;
         countUp = 0;
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
}

function verificaColisao(){
    //se caiu no chão
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


function movimenta(){
    //movimenta os canos
    if(cano1X + cano1Larg <= 0){
        cano1X =  canvas.width;
        cano2X =  canvas.width;
        defineTamanhoCano();
    }else{
        cano1X -=  velX;
        cano2X -=  velX;
    }
    //movimenta o jogador
    if(subir){
        jogY -= velY;
        countUp++;
        if(countUp == MAX_COUNT_UP){
            countUp = 0;
            subir = false;
        }
    }else{
        jogY += velY;    
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
    movimenta();
    desenhar();
}
