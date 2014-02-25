                   //VARIAVEIS IMPORTANTES

var barraAltura, barraLargura, jogadorPosicaoX, velocidadeJogador;
var pontosJogador, bolas;
var mover, lado;

function Bola()
{       
    this.bolaDiametro = 10;
    this.bolaPosX = Math.random() * 600;
    this.bolaPosY = -10;
    this.velocidadeBolaY = 10;
    this.velocidadeBolaX = (Math.random() * 2 <= 1) ? -10 : 10;
    this.colisao = false;
    
    this.inicializa = function(){
        this.bolaPosX = Math.random() * 600;
        //determina a direção em que a bola vai ir inicialmente
        if(Math.random() * 2 <= 1)
            this.velocidadeBolaX = -10;
        else
            this.velocidadeBolaX = 10;
        this.bolaPosY = -10;
        this.colisao = false;
    };

    this.mover = function(){
        if(this.bolaPosY <= canvas.height) //movimento normal
        {
            this.bolaPosY += this.velocidadeBolaY;
            if(this.bolaPosX <= 0 || this.bolaPosX >= canvas.width) //faz quicar nas bordas da tela
               this.velocidadeBolaX = -this.velocidadeBolaX;
            this.bolaPosX += this.velocidadeBolaX;
        }else //quando chega no final
            this.inicializa();
    };
    
    this.desenhar = function(){
        context.beginPath();
        context.arc(this.bolaPosX, this.bolaPosY, this.bolaDiametro, 0, Math.PI * 2, true);
        context.fill();
    };
    
    this.verificaColisao = function(){
        if((this.bolaPosX > jogadorPosicaoX && this.bolaPosX < jogadorPosicaoX + barraLargura) && this.bolaPosY >= canvas.height - barraAltura && this.colisao == false){
            pontosJogador++;
            this.colisao = true;
        }
    };
}

                  //FUNÇÕES DE INICIALIZAÇÃO
                                     
//inicializa as constantes, define o valor inicial da pontuação e variaveis de controle e define os eventos
function inicializar(){
    //incializa o tamanho e posição da barra
    barraAltura = 15;
    barraLargura = 90;
    jogadorPosicaoX = (canvas.width - barraLargura) / 2;
    velocidadeJogador = 20;
    //incializa o vetor de bola e já cria a primeira
    bolas = new Array(new Bola());
    //inicializa os pontos do jogador e variáveis de controle
    pontosJogador = 0;  
    mover=false;
    //recupera a tela do html
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    //define os eventos
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    setInterval(gameLoop, 30);
}

          //FUNÇÕES DE EVENTOS DE TECLADO

//diz que ao apertar um botão deve mover o jogador
function keyDown(e){
    mover = true;
    lado = e.keyCode;
}
//diz que ao soltar o botão deve parar o jogador (usado pois só com o keyDown ele empacava por 16 ciclos quando começva a andar)
function keyUp(e){
    mover = false;
}

          //FUNÇÕES DE MOVIMENTO
          
//move a barra para o lado certo e só quando o botão está pressionado
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

            //FUNÇÕES RESTANTES

function desenha(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(jogadorPosicaoX, canvas.height - barraAltura, barraLargura, barraAltura);
    
    bolas.forEach(function(bola,index){
        bola.desenhar();
    }); 
    
    context.font = "32pt Tahoma";
    context.fillText(pontosJogador, canvas.width - 70, 50);
}

function gameLoop(){
    desenha();

    moverBarra(); 
        
    bolas.forEach(function(bola,index){
        bola.mover();
        bola.verificaColisao(); 
    });  
}
