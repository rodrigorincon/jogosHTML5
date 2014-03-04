var canvas, context;
var txtQuadroX, txtQuadroY;

function desenhaQuadro(){
	context.fillStyle = 'rgb(0,0,255)';
	context.fillRect(canvas.width/4-30, canvas.height/5, canvas.width/2+60, canvas.height);
	context.fillStyle = 'rgb(0,0,0)';
}

function escreveNoQuadro(texto){
	context.font = "12pt Tahoma";
	context.fillText(texto, txtQuadroX, txtQuadroY);
	txtQuadroY+=18;
}

function rankingInverso(cv, ctx, nomeJogo, pontuacao){
	canvas = cv, context = ctx;
	txtQuadroX = canvas.width/4 - 10;
	txtQuadroY = canvas.height/5 + 20;
	desenhaQuadro();
		
	//caso já exista uma lista (não seja a 1ª vez a ser executada)
	if( JSON.parse(localStorage.getItem(nomeJogo+"rank0")) ){
		var i=0, rank = new Array(), posicaoAtual, numNovoValor=-1, menor=false;
		//guarda no vetor e imprime no quadro azul enquanto houver um valor na posição rank+i
		while(posicaoAtual = JSON.parse(localStorage.getItem(nomeJogo+"rank"+i)) ){
			//só aceita 10 posições no rank
			if(i<10){
				rank[i] = posicaoAtual;
				escreveNoQuadro((i+1)+": "+posicaoAtual.nome+" "+posicaoAtual.pontos);
				//verifica e guarda a posição onde o novo recorde irá entrar no vetor
				if(!menor && pontuacao < posicaoAtual.pontos){
					numNovoValor = i;
					menor = true;
				}
				i++;
			}else
				break;
		}
		//se encerrou por causa que havia menos de 10 valores, mas todos eram maiores q o atual, então ele será inserido no final
		if(numNovoValor==-1 && i!=10)
			numNovoValor = i;			
			
		//reescreve o vetor e os valores locais na ordem correta inserindo o valor atual
		if(numNovoValor!=-1){
			var nome = prompt("Parabéns! Voce ficou em "+(numNovoValor+1)+"\nDigite seu nome");
			var novo = {'nome':nome,'pontos':pontuacao};
			var anterior = rank[numNovoValor] ? rank[numNovoValor] : null;
			rank[numNovoValor] = novo;
			localStorage.setItem(nomeJogo+"rank"+numNovoValor,JSON.stringify(novo));
			if(!anterior)
				return;
			var size = rank.length+1;
			for(j=numNovoValor+1; j<10 && j<size; j++){
				novo = anterior;
				if(j<rank.length)
					anterior = rank[j];
				rank[j] = novo;
				localStorage.setItem(nomeJogo+"rank"+j,JSON.stringify(novo));
			}
		}
		
	}else{//caso seja a 1ª vez a ser executada
		escreveNoQuadro("Parabéns! Voce é o 1!");
		escreveNoQuadro("Nenhum recorde");
		var nome = prompt("digite seu nome");
		localStorage.setItem(nomeJogo+"rank0",JSON.stringify({'nome':nome,'pontos':pontuacao}));
	}
}
