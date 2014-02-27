                   //VARIAVEIS IMPORTANTES

var barraAltura, barraLargura, jogadorPosicaoX, velocidadeJogador;
var pontosJogador, totalBolas, bolas;
var mover, lado;

var pontuacoes = new Array(
    {'diametro' : 5, 'pontos' : 5, 'velocidade' : 17},
    {'diametro' : 10, 'pontos' : 3, 'velocidade' : 10},
    {'diametro' : 15, 'pontos' : 1, 'velocidade' : 7}
);  

function Bola()
{     
    this.inicializa = function(){   
        var indice;
        //calculo para determinar a probabilidade de vir cada bola (bolas de + pontos são mais dificeis de ocorrer)
        var porcent = Math.round(Math.random()*99);  // porcent varia de 0 à 99
        if(porcent < 15)
           indice = 0;
        else if(porcent >= 15 && porcent < 55)
            indice = 1;
        else
            indice = 2;  
        //setta os valores nos atributos
        this.bolaDiametro = pontuacoes[indice]['diametro'];
        this.bolaPosX = Math.random() * 600;
        this.bolaPosY = -10;
        this.velocidadeBolaY = pontuacoes[indice]['velocidade'];
        this.velocidadeBolaX = (Math.random() * 2 <= 1) ? -this.velocidadeBolaY : this.velocidadeBolaY;
        this.pontos =  pontuacoes[indice]['pontos'];
        this.destruir = false;         
    };
    
    this.mover = function(){
        if(this.bolaPosY <= canvas.height) //movimento normal
        {
            this.bolaPosY += this.velocidadeBolaY;
            if(this.bolaPosX <= 0 || this.bolaPosX >= canvas.width) //faz quicar nas bordas da tela
               this.velocidadeBolaX = -this.velocidadeBolaX;
            this.bolaPosX += this.velocidadeBolaX;
        }else //quando chega no final
            this.destruir = true;
    };
    
    this.desenhar = function(){
        context.beginPath();
        context.arc(this.bolaPosX, this.bolaPosY, this.bolaDiametro, 0, Math.PI * 2, true);
        context.fill();
    };
    
    this.verificaColisao = function(){
        if((this.bolaPosX > jogadorPosicaoX && this.bolaPosX < jogadorPosicaoX + barraLargura) && this.bolaPosY >= canvas.height - barraAltura && this.destruir == false){
            pontosJogador+=this.pontos;
            this.destruir = true;
        }
    };
 
    this.bolaDiametro;
    this.bolaPosX;
    this.bolaPosY;
    this.velocidadeBolaY;
    this.velocidadeBolaX;
    this.destruir;
    this.pontos;
    
    this.inicializa();
}

                  //FUNÇÕES DE INICIALIZAÇÃO
				  
//inicializa as constantes, define o valor inicial da pontuação e variaveis de controle
function inicializar(){
    //incializa o tamanho e posição da barra
    barraAltura = 15;
    barraLargura = 90;
    jogadorPosicaoX = (canvas.width - barraLargura) / 2;
    velocidadeJogador = 20;
    //incializa o vetor de bola e já cria a primeira
    bolas = new Array(new Bola());
    //inicializa os pontos do jogador e variáveis de controle
    pontosJogador = totalBolas = 0;  
    mover=false;
}

//define os eventos e chama a função que inicializa as variaveis
function start(){
    //recupera a tela do html
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
	//inicializa as variaveis do jogo
	inicializar();
	//define os eventos
	document.addEventListener('keydown', keyDown);
	document.addEventListener('keyup', keyUp);
	setInterval(gameLoop, 30);
	setInterval(criarBola, 1000);
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
    context.fillText(pontosJogador+"/"+totalBolas, canvas.width - 200, 50);
}

function gameLoop(){
    if(totalBolas >= pontosJogador+50){
		alert("game over!");
		bolas.splice(0, bolas.length);
		alert(bolas.length);
		bolas = null;
		inicializar();
	}
	
	desenha();

    moverBarra(); 
        
    bolas.forEach(function(bola,index){
        bola.mover();
        bola.verificaColisao();
        if(bola.destruir){
            totalBolas+=bola.pontos;
            bolas.splice(index, 1);
        }  
    });  
}

function criarBola(){
    bolas.push(new Bola());
}
