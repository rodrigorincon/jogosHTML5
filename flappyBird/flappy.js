//variaveis que controlam o jogador
var jogAlt, jogLarg, jogX, jogY, velY;
//variaveis de controle em geral
var pontosJogador, distanciaCanosX;
//vetor com todos os canos da tela
var canos;
//variaveis de controle do movimento do jogador
var subir, countUp, MAX_COUNT_UP, MAX_COUNT_DOWN;

function Cano(){

	//inicializa só as constantes e chama a função que inicializa as demais
	this.init = function(){
	    this.canoX = canvas.width;
		this.canoLarg = 40;
		this.espacoCano = 120;
		this.cano1Y = 0;
		this.velX = 5;
		this.jaPassou = false;
		this.defineTamanho();
	};
	
	this.defineTamanho = function(){
		this.cano1Alt = Math.random() * (canvas.height - this.espacoCano);
		this.cano2Y = this.cano1Alt + this.espacoCano;
		this.cano2Alt = this.cano2Y==canvas.height ? 0 : canvas.height - this.cano2Y;	
	};

	this.desenhar = function(){
		context.fillRect(this.canoX, this.cano1Y, this.canoLarg, this.cano1Alt);
		context.fillRect(this.canoX, this.cano2Y, this.canoLarg, this.cano2Alt);
	};
	
	this.verificaColisao = function(){		
		if(jogX+jogLarg >= this.canoX && jogX < this.canoX+this.canoLarg && this.cano1Y+this.cano1Alt >= jogY )
			return true;
		if(jogX+jogLarg >= this.canoX && jogX < this.canoX+this.canoLarg && jogY+jogAlt >= this.cano2Y )
			return true;
		return false;
	};
	
	this.verificaPassagem = function(){
		if(jogY > this.cano1Y+this.cano1Alt && jogY+jogAlt < this.cano2Y  && jogX > this.canoX && jogX < this.canoX+this.canoLarg && !this.jaPassou){
			this.jaPassou = true;
			return true;
		}
		return false;
	};
		
	this.movimenta = function(){
		if(this.canoX + this.canoLarg <= 0)
			this.init();
		else
			this.canoX -=  this.velX;
	};
	
	this.cano1Y, this.canoLarg, this.espacoCano, this.velX;
	this.canoX, this.cano1Alt, this.cano2Y, this.cano2Alt, this.jaPassou;
	this.init();
}

function initJogador(){
    jogLarg = 20;
    jogAlt = 20;
    jogX = 200;
    jogY = (canvas.height- jogAlt)/2;
    velY = 5;
	pontosJogador = 0;
}

//inicializa as variaveis de controle do jogo, o jogador e os canos
function inicializar(){
	initJogador();
	canos = new Array(new Cano());
	subir = false;
    countUp = 1;
    MAX_COUNT_UP = 6;
    MAX_COUNT_DOWN = 3;
	distanciaCanosX = canos[0].velX*50;
}

//função que inicia o jogo e adiciona os eventos
function start(){
	canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
	inicializar();
	document.addEventListener('keyup', keyUp);
    setInterval(gameLoop, 30);
}

function keyUp(e){
    if(e.keyCode == 32){
         subir = true;
         countUp = 1;
    }
}

//verifica se houve colisão e se o personagem ta passando no meio dos canos pra ganhar ponto
function verificacoes(){
	//ver se caiu no chão
    if(jogY + jogAlt >= canvas.height)
        return true;
    //ver se bateu no teto
    if(jogY <= 0)
        jogY = 0;
	
	for(i=0; i<canos.length; i++){
		//verifica colisão
		if( canos[i].verificaColisao() )
			return true;
		//verifica se ta no meio dos canos pra ganhar ponto
		if( canos[i].verificaPassagem() ){
			pontosJogador++;
			break;
		}
	}
	return false;
}

//movimenta a todos e desenha os canos, para diminuir o processamento
function movimenta(){
    //movimenta os canos e os desenha
    canos.forEach(function(cano,index){
		cano.movimenta();
		cano.desenhar();
	});
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
        if(countUp<=MAX_COUNT_DOWN)
          countUp++;     
    }
}

function desenhar(){
	//limpa a tela
    context.clearRect(0, 0, canvas.width, canvas.height);
	//faz as movimentações junto com o desenho por uma questão de desempenho
	movimenta();//movimenta e desenha os canos
    //jogador
	context.fillRect(jogX, jogY, jogLarg, jogAlt);
    //pontuacao
    context.font = "32pt Tahoma";
    context.fillText(pontosJogador, canvas.width - 70, 50);
}

function gameLoop(){
    var colisao = verificacoes();
    if(colisao){
        alert("morreu");
        inicializar();
        return;
    }
    desenhar();
}
