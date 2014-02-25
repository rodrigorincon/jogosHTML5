var jogAlt, jogLarg, jogX, jogY;
var cano1X, cano1Y, cano1Larg, cano1Alt, cano2X, cano2Y, cano2Larg, cano2Alt, espacoCano;

function inicializar(){

    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    
    jogLarg = 20;
    jogAlt = 20;
    jogX = 200;
    jogY = canvas.height/2 - jogAlt/2;
   
    cano1X = cano2X = 400;
    cano1Larg = cano2Larg = 40;
    espacoCano = 80;
    cano1Y = 0;
    defineTamanhoCano();
    
   
    document.addEventListener('keydown', keyDown);
    setInterval(gameLoop, 30);
}

function keyDown(e){
    
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



function gameLoop(){
     desenhar();
}
