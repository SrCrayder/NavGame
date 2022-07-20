var diryJ, dirxJ, jog, velj, pjx, pjy;
var velT;
var jogo;
var frames;
var tamTelaW, tamTelaH;

function teclaDw() {
    var tecla = event.keyCode;
    if (tecla == 38) {//Cima
        diryJ = -1;
    } else if (tecla == 40) {//Baixo
        diryJ = 1;
    }
    if (tecla == 37) {//Esquerda
        dirxJ = -1;
    } else if (tecla == 39) {//Direita
        dirxJ = 1;
    }
    if (tecla == 32) {//Espaço//Tiro
        //Tiro
        atira(pjx + 17, pjy);
    }
}

function teclaUp() {
    var tecla = event.keyCode;
    if ((tecla == 38) || (tecla == 40)) {
        diryJ = 0;
    }
    if ((tecla == 37) || (tecla == 39)) {
        dirxJ = 0;
    }
}
function atira(x, y) {
    var t = document.createElement("div");
    var att1 = document.createAttribute("class");
    var att2 = document.createAttribute("style");
    att1.value = "tiroJog";
    att2.value = "top:" + y + "px;left:" + x + "px";
    t.setAttributeNode(att1);
    t.setAttributeNode(att2);
    document.body.appendChild(t);
}

function controleTiros() {
    var tiros = document.getElementsByClassName("tiroJog");
    var tam = tiros.length;
    for (var i = 0; i < tam; i++) {
        if (tiros[i]) {
            var pt = tiros[i].offsetTop;
            pt -= velT;
            tiros[i].style.top = pt + "px";
            if(pt<0){
                tiros[i].remove();
            }
        }
    }
}


function controlaJogador() {
    pjy += diryJ * velj;
    pjx += dirxJ * velj;
    jog.style.top = pjy + "px";
    jog.style.left = pjx + "px";
}

function gameLoop() {
    if (jogo) {
        //funçoes de controle
        controlaJogador();
        controleTiros();
    }
    frames = requestAnimationFrame(gameLoop);
}

function inicia() {
    jogo = true;

    //Ini Tela
    tamTelaH = window.innerHeight;
    tamTelaW = window.innerWidth;

    //Ini jogador
    dirxJ = diryJ = 0;
    pjx = tamTelaW / 2;
    pjy = tamTelaH / 2;
    velj = velT = 5;
    jog = document.getElementById("navJog");
    jog.style.top = pjy + "px";
    jog.style.left = pjx + "px";

    gameLoop();

}

window.addEventListener("load", inicia);
document.addEventListener("keydown", teclaDw);
document.addEventListener("keyup", teclaUp);
