var timerId = null; //variavel que armazena a chamada da funcao timeout

//funcao que inicia o jogo ao carregar a pagina
function startGame(){

    var url = window.location.search;
    var levelGame = url.replace("?", "");
    
/*  1 easy > 120 segundos

    2 normal > 60 segundos

    3 hard > 30 segundos 
    
    Teste para saber qual a quantidade de tempo de jogo */
    
    if(levelGame == 1){
        tempo_segundos = 120;
    }    
    if(levelGame == 2){
        tempo_segundos = 60;
    }    
    if(levelGame == 3){
        tempo_segundos = 30;
    }        

    //inserindo segundos no span
    document.getElementById('cronometro').innerHTML = tempo_segundos;

    //quantidade de baloes
    var qtdBaloes = 80;
    criaBaloes(qtdBaloes);



    //imprimir qtd de baloes inteiros
    document.getElementById('baloesInteiros').innerHTML = qtdBaloes;
    document.getElementById('baloesEstourados').innerHTML = 0;
    
    //contador regressivo
    contadorRegressivo(tempo_segundos + 1);


}


function contadorRegressivo(segundos){

    segundos = segundos - 1;

    if(segundos == -1){
        clearTimeout(timerId) //para a execucao da funcao de setTimeout
        gameOver();
        return false;
    }
    
    document.getElementById("cronometro").innerHTML = segundos;
    timerId = setTimeout("contadorRegressivo("+segundos+")", 1000);

}

function gameOver(){
    alert("Cabou o tempo morou. Tu e tao ruim q num consegue estourar uns baloes bixo. ai e foda");
    clearTimeout(timerId);
    window.location.href = 'index.html';
    
}




function criaBaloes(qtdBaloes){
    
    for(var i = 1; i <= qtdBaloes;i++){

        var balao = document.createElement('img');
        balao.src = 'img/balao_azul_pequeno.png';
        balao.style.margin = '10px';
        balao.id = 'b' +i;
        balao.onclick = function(){estourar(this)};
        document.getElementById('cenario').appendChild(balao);

    }

}

function estourar(e){

    var idBalao = e.id;
    
    document.getElementById(idBalao).setAttribute("onclick","");
    document.getElementById(idBalao).src = 'img/balao_azul_pequeno_estourado.png';

    pontuacao(-1);

}

function pontuacao(acao){

    var baloesInteiros = document.getElementById('baloesInteiros').innerHTML;
    var baloesEstourados = document.getElementById('baloesEstourados').innerHTML;

    baloesInteiros = parseInt(baloesInteiros);
    baloesEstourados = parseInt(baloesEstourados);

    baloesInteiros = baloesInteiros + acao;
    baloesEstourados = baloesEstourados - acao;

    document.getElementById('baloesInteiros').innerHTML = baloesInteiros;
    document.getElementById('baloesEstourados').innerHTML = baloesEstourados;

    situacaoJogo(baloesInteiros);

}

function situacaoJogo(baloesInteiros){

    if(baloesInteiros == 0){
        alert("Parabens, vc acabou de perder tempo estourando diversos baloes :D");
        pararJogo();

    }
}
function pararJogo(){
    clearTimeout(timerId);
    window.location.href = 'index.html'
}