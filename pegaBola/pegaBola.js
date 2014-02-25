var barraAltura, barraLargura, jogadorPosicaoX, velocidadeJogador;
var bolaDiametro, bolaPosX, bolaPosY, velocidadeBolaY;
         
function inicializar(){

    barraAltura = 15;
    barraLargura = 90; 
    jogadorPosicaoX = (canvas.width - barraLargura) / 2;
    velocidadeJogador = 20;
    
    bolaDiametro = 10;
    bolaPosX = canvas.width / 2;
    bolaPosY = -10;
    velocidadeBolaY = 10;
    
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
 
    context.fillRect(jogadorPosicaoX, canvas.height - barraAltura, barraLargura, barraAltura);    
    
    document.addEventListener('keydown', keyDown);
    setInterval(gameLoop, 30);
}

function keyDown(e){

    if(e.keyCode == 37){
        if(jogadorPosicaoX > 0)
          jogadorPosicaoX -= velocidadeJogador;
    }
    if(e.keyCode == 39){
        if(jogadorPosicaoX < (canvas.width - barraLargura))
          jogadorPosicaoX += velocidadeJogador;
    }
    
}

function gameLoop(){

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(jogadorPosicaoX, canvas.height - barraAltura, barraLargura, barraAltura);
      
    context.beginPath();
    context.arc(bolaPosX, bolaPosY, bolaDiametro, 0, Math.PI * 2, true);
    context.fill();
    
    if(bolaPosY <= canvas.height)
      bolaPosY += velocidadeBolaY;
    else{
        bolaPosX = Math.random() * 600; 
        bolaPosY = -10;
    }
 
}
