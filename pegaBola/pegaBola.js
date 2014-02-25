var barraAltura, barraLargura, jogadorPosicaoX, velocidadeJogador;
var bolaDiametro, bolaPosX, bolaPosY, velocidadeBolaY, velocidadeBolaX, direcaoBola;
var pontosJogador, colisao;
var mover, lado;   
         
function inicializar(){

    barraAltura = 15;
    barraLargura = 90; 
    jogadorPosicaoX = (canvas.width - barraLargura) / 2;
    velocidadeJogador = 20;
    
    bolaDiametro = 10;
    bolaPosX = Math.random() * 600;
    if(Math.random() * 2 <= 1)
        velocidadeBolaX = -10;
    else
        velocidadeBolaX = 10;
    bolaPosY = -10;
    velocidadeBolaY = 10;
    
    pontosJogador = 0;
    colisao = false;
    mover=false;
 
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.fillRect(jogadorPosicaoX, canvas.height - barraAltura, barraLargura, barraAltura);    
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    setInterval(gameLoop, 30);
}

function keyDown(e){
    mover = true;
    lado = e.keyCode;
}
function keyUp(e){
    mover = false;
}

function gameLoop(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(jogadorPosicaoX, canvas.height - barraAltura, barraLargura, barraAltura);
    context.font = "32pt Tahoma";
    context.fillText(pontosJogador, canvas.width - 70, 50);
      
    context.beginPath();
    context.arc(bolaPosX, bolaPosY, bolaDiametro, 0, Math.PI * 2, true);
    context.fill();

    if(mover){
        switch(lado){
        case 37:
            if(jogadorPosicaoX > 0)
                jogadorPosicaoX -= velocidadeJogador;
            break;
        case 39: 
            if(jogadorPosicaoX < (canvas.width - barraLargura))
                jogadorPosicaoX += velocidadeJogador;
            break;   
        }
    }

    if(bolaPosY <= canvas.height)
    {
        bolaPosY += velocidadeBolaY;
        if(bolaPosX <= 0 || bolaPosX >= canvas.width)
           velocidadeBolaX = -velocidadeBolaX;
        bolaPosX += velocidadeBolaX;
    }else{
        bolaPosX = Math.random() * 600;
        if(Math.random() * 2 <= 1)
            velocidadeBolaX = -10;
        else
            velocidadeBolaX = 10; 
        bolaPosY = -10;
        colisao = false;
    }
    
    if((bolaPosX > jogadorPosicaoX && bolaPosX < jogadorPosicaoX + barraLargura) && bolaPosY >= canvas.height - barraAltura && colisao == false){
        pontosJogador++;
        colisao = true;
    } 

}
