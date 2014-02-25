                    //VARIAVEIS IMPORTANTES

var barraAltura, barraLargura, jogadorPosicaoX, velocidadeJogador;
var bolaDiametro, bolaPosX, bolaPosY, velocidadeBolaY, velocidadeBolaX, direcaoBola;
var pontosJogador, colisao;
var mover, lado;   
                  //FUN��ES DE INICIALIZA��O
                                     
//inicializa as constantes, define o valor inicial da pontua��o e variaveis de controle e define os eventos   
function inicializar(){
    //incializa o tamanho e posi��o da barra
    barraAltura = 15;
    barraLargura = 90; 
    jogadorPosicaoX = (canvas.width - barraLargura) / 2;
    velocidadeJogador = 20;
    //incializa o tamanho e posi��o da bola
    bolaDiametro = 10;
    velocidadeBolaY = 10;
    iniciaBola();
    //inicializa os pontos do jogador e vari�veis de controle
    pontosJogador = 0;
    colisao = false;
    mover=false;
    //recupera a tela do html
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    //define os eventos
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    setInterval(gameLoop, 30);
}

//define os valores da bola sempre que ela volta pro inicio
iniciaBola(){
    bolaPosX = Math.random() * 600;
    //determina a dire��o em que a bola vai ir inicialmente
    if(Math.random() * 2 <= 1)
        velocidadeBolaX = -10;
    else
        velocidadeBolaX = 10;
    bolaPosY = -10;
    colisao = false;
}

          //FUN��ES DE EVENTOS DE TECLADO

//diz que ao apertar um bot�o deve mover o jogador
function keyDown(e){
    mover = true;
    lado = e.keyCode;
}
//diz que ao soltar o bot�o deve parar o jogador (usado pois s� com o keyDown ele empacava por 16 ciclos quando come�va a andar)
function keyUp(e){
    mover = false;
}

          //FUN��ES DE MOVIMENTO
          
//move a barra para o lado certo e s� quando o bot�o est� pressionado
function moverBarra(){
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
}

function moverBola(){
    if(bolaPosY <= canvas.height)      //movimento normal
    {
        bolaPosY += velocidadeBolaY;
        if(bolaPosX <= 0 || bolaPosX >= canvas.width)    //faz quicar nas bordas da tela
           velocidadeBolaX = -velocidadeBolaX;
        bolaPosX += velocidadeBolaX;
    }else                            //quando chega no final
        iniciaBola();
}

            //FUN��ES RESTANTES

function desenha(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(jogadorPosicaoX, canvas.height - barraAltura, barraLargura, barraAltura);
    context.font = "32pt Tahoma";
    context.fillText(pontosJogador, canvas.width - 70, 50);
      
    context.beginPath();
    context.arc(bolaPosX, bolaPosY, bolaDiametro, 0, Math.PI * 2, true);
    context.fill();
}

function verificaColisao(){
    if((bolaPosX > jogadorPosicaoX && bolaPosX < jogadorPosicaoX + barraLargura) && bolaPosY >= canvas.height - barraAltura && colisao == false){
        pontosJogador++;
        colisao = true;
    } 
}

function gameLoop(){
    desenha();

    moverBarra();

    moverBola();
    
    verificaColisao();

}
