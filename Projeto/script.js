const popup = document.getElementById("popup");
const yes = document.getElementById("yes");
const mensagem = document.getElementById("mensagem");

let tentativas = 0;

function abrirPopup(){

    popup.style.display = "flex";
}

function fecharPopup(){

    popup.style.display = "none";

    mensagem.innerHTML = "";

    tentativas = 0;

    yes.style.transform = "translate(0px, 0px)";
}

yes.addEventListener("mouseover", () => {

    const maxX = 350;
    const maxY = 80;

    const randomX = Math.random() * maxX - 150;
    const randomY = Math.random() * maxY - 40;

    yes.style.transform = `translate(${randomX}px, ${randomY}px)`;

    tentativas++;

    if(tentativas === 5){

        mensagem.innerHTML = "BRO JUST CLICK NO !!";
    }

});

const fineScreen = document.getElementById("fineScreen");

yes.addEventListener("click", () => {

    fineScreen.style.display = "flex";

    setTimeout(() => {

        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1";

    }, 3000)});
