var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//pra fazer o bgl do boneco cair no chão depois de pular, e pra dar um peso pro pulo tbm, se não o player ia ficar pulando infinitamente, mto estranho
const gravidade = 0.5;
const pulo = -14;
//armazena as teclas pressionadas, mto bolado pra movimentação fluida tlg
const keys = {};

//largura do cano
const canoL = 95;
//posição x da camera
let cameraX = 0;
//level atual, nao fiz mta coisa com isso ainda
var levelatual = 1;
let faseMaxima= 1;
//placar de pontuação
let pontuacao = 0;

let blocoL = 48;
let blocoA = 45;

let invulneravel = false;

let ultimoLado = "right";
let tiros = [];
let podeAtirar = true;
const cooldownTiro = 500;

// LEVELS (background, obstáculos, largura e altura do level)
const levels = {
    //1 de Level 1 né burrão
    1: {
        background: "level1-1.png",
        width: 10000,
        height: 1270,
        chao: 600, 
        final: {
            x: 400,
            y: 480,
            width: 50,
            height: 60,
        },
        obstacles: [
            //chão inicial
            {
                x: 0,
                y: 550,
                width: 3270,
                height: 80
            },
            //chão 2
            {
                x: 3365,
                y: 550,
                width: 710,
                height: 80
            },
            //chão 3
            {
                x: 4218,
                y: 550,
                width: 3035,
                height: 80
            },

            //chão ultimo
            {
                x: 7345,
                y: 550,
                width: 3035,
                height: 80
            },
            
            //caixa
            {
                x: 759,
                y: 380,
                width: blocoL,
                height: blocoA
            },

            //caixa2
            {
                x: 945,
                y: 380,
                width: blocoL * 5,
                height: blocoA
            },

            //caixa3
            {
                x: 1042,
                y: 211,
                width: blocoL,
                height: blocoA
            },

            //cano1
            {
                x: 1327,
                y: 465,
                width: canoL,
                height: blocoA * 2
            },

            //cano2
            {
                x: 1801,
                y: 423,
                width: canoL,
                height: blocoA * 3
            },      
            
            //cano3
            {
                x: 2180,
                y: 381,
                width: canoL,
                height: blocoA * 4
            },   

            //cano4
            {
                x: 2701,
                y: 381,
                width: canoL,
                height: blocoA * 4
            },   

            //caixa4
            {
                x: 3648,
                y: 380,
                width: blocoL * 3,
                height: blocoA
            },            

            //caixa5
            {
                x: 3789,
                y: 211,
                width: (blocoL * 8) - 3,
                height: blocoA
            },     
            
            //caixa6
            {
                x: 4455,
                y: 380,
                width: blocoL,
                height: blocoA
            },         

            //caixa7
            {
                x: 4313,
                y: 211,
                width: blocoL * 4,
                height: blocoA
            },    
 
            //caixa8
            {
                x: 4738,
                y: 380,
                width: blocoL * 2,
                height: blocoA
            },   
            
            //caixa9
            {
                x: 5024,
                y: 380,
                width: blocoL,
                height: blocoA
            },    
            
            //caixa10
            {
                x: 5165,
                y: 380,
                width: blocoL,
                height: blocoA
            },           
            
            //caixa11
            {
                x: 5165,
                y: 210,
                width: blocoL,
                height: blocoA
            },
            
            //caixa12
            {
                x: 5308,
                y: 380,
                width: blocoL,
                height: blocoA
            },                
            
            //caixa13
            {
                x: 5592,
                y: 380,
                width: blocoL,
                height: blocoA
            },       

            //caixa14
            {
                x: 5733,
                y: 211,
                width: blocoL * 3,
                height: blocoA
            },               

            //caixa15
            {
                x: 6065,
                y: 211,
                width: blocoL * 4,
                height: blocoA
            },               

            //caixa16
            {
                x: 6112,
                y: 380,
                width: blocoL * 2,
                height: blocoA
            },               

            //escada1-1
            {
                x: 6348,
                y: 506,
                width: blocoL * 4,
                height: blocoA
            },               

            //escada1-2
            {
                x: 6396,
                y: 467,
                width: blocoL * 3,
                height: blocoA
            },               

            //escada1-3
            {
                x: 6443,
                y: 422,
                width: blocoL * 2,
                height: blocoA
            },   
            
            //escada1-4
            {
                x: 6492,
                y: 379,
                width: blocoL,
                height: blocoA
            },         
            
            //escada2-1
            {
                x: 6635,
                y: 506,
                width: blocoL * 4,
                height: blocoA
            },               

            //escada2-2
            {
                x: 6635,
                y: 467,
                width: blocoL * 3,
                height: blocoA
            },               

            //escada2-3
            {
                x: 6635,
                y: 422,
                width: blocoL * 2,
                height: blocoA
            },   
            
            //escada2-4
            {
                x: 6635,
                y: 379,
                width: blocoL,
                height: blocoA
            },   

            //escada3-1
            {
                x: 7012,
                y: 506,
                width: blocoL * 5,
                height: blocoA
            },               

            //escada3-2
            {
                x: 7060,
                y: 467,
                width: blocoL * 4,
                height: blocoA
            },               

            //escada3-3
            {
                x: 7108,
                y: 422,
                width: blocoL * 3,
                height: blocoA
            },   
            
            //escada3-4
            {
                x: 7158,
                y: 379,
                width: blocoL * 2,
                height: blocoA
            },             
            
            //escada4-1
            {
                x: 7345,
                y: 506,
                width: blocoL * 4,
                height: blocoA
            },                   

            //escada4-2
            {
                x: 7345,
                y: 467,
                width: blocoL * 3,
                height: blocoA
            },               

            //escada4-3
            {
                x: 7345,
                y: 422,
                width: blocoL * 2,
                height: blocoA
            },   
            
            //escada4-4
            {
                x: 7345,
                y: 379,
                width: blocoL,
                height: blocoA
            },  

            //cano5
            {
                x: 7724,
                y: 465,
                width: canoL,
                height: blocoA * 2
            },

            //caixa18
            {
                x: 7960,
                y: 380,
                width: blocoL * 4,
                height: blocoA
            },                
                

            //cano6
            {
                x: 8484,
                y: 465,
                width: canoL,
                height: blocoA * 2
            },            

            //escada5-1
            {
                x: 8577,
                y: 506,
                width: blocoL * 9,
                height: blocoA
            }, 

            //escada5-2
            {
                x: 8625,
                y: 465,
                width: blocoL * 8,
                height: blocoA
            },       
            
            //escada5-3
            {
                x: 8674,
                y: 421,
                width: blocoL * 7,
                height: blocoA
            },       
            
            //escada5-4
            {
                x: 8722,
                y: 379,
                width: blocoL * 6,
                height: blocoA
            },      
            
            //escada5-5
            {
                x: 8767,
                y: 339,
                width: blocoL * 5,
                height: blocoA
            },           
            
            //escada5-6
            {
                x: 8814,
                y: 295,
                width: blocoL * 4,
                height: blocoA
            },      
            
            //escada5-7
            {
                x: 8861,
                y: 254,
                width: blocoL * 3,
                height: blocoA
            },     
            
            //escada5-7
            {
                x: 8909,
                y: 209,
                width: blocoL * 2,
                height: blocoA
            },                  
            

            //caixalast
            {
                x: 9383,
                y: 506,
                width: blocoL,
                height: blocoA
            },  
        ],
        

        inimigosOriginais: [
            {
                x: 500,
                y: 500,
                spawnX: 500,
                spawnY: 500,
                width: 40,
                height: 40,
                velX: 1,
                direction: 1,
            },

            {
                x: 1200,
                y: 500,
                spawnX: 1200,
                spawnY: 500,
                width: 40,
                height: 40,
                velX: 1,
                direction: -1
            }
        ],
        

    },
    //Adivinha? aqui é pra ser o level 2 animal, por enquanto não tem nada
    2: {

        background: "level2-2.png",
        width: 19500,
        height: 1140,
        chao: 600,
        final:{
            x: 500,
            //x: 19140,
            y: 460,
            width: 60,
            height: 80,
        },

        obstacles: [
            {
                x: 0,
                y: 547,
                width: 2305,
                height: 100,
            },
            {
                x: 2355,
                y: 547,
                width: 50,
                height: 100,
            },
            {
                x: 2455,
                y: 547,
                width: 100,
                height: 100,
            },
            {
                x: 2605,
                y: 547,
                width: 100,
                height: 100,
            },
            {
                x: 2757,
                y: 547,
                width: 100,
                height: 100,
            },
            {
                x: 2907,
                y: 547,
                width: 5565,
                height: 100,
            },
            {
                x: 8522,
                y: 547,
                width: 50,
                height: 100,
            },
            {
                x: 8622,
                y: 547,
                width: 100,
                height: 100,
            },
            {
                x: 8772,
                y: 547,
                width: 50,
                height: 100,
            },
            {
                x: 8872,
                y: 547,
                width: 100,
                height: 100,
            },
            {
                x: 9022,
                y: 547,
                width: 855,
                height: 100,
            },
            {
                x: 9925,
                y: 547,
                width: 50,
                height: 100,
            },
            {
                x: 10025,
                y: 547,
                width: 50,
                height: 100,
            },
            {
                x: 10125,
                y: 547,
                width: 955,
                height: 100,
            },
            {
                x: 11175,
                y: 547,
                width: 120,
                height: 100,
            },
            {
                x: 11375,
                y: 547,
                width: 505,
                height: 100,
            },
            {
                x: 11930,
                y: 547,
                width: 100,
                height: 100,
            },
            {
                x: 12130,
                y: 547,
                width: 100,
                height: 100,
            },
            {
                x: 12330,
                y: 547,
                width: 2205,
                height: 100,
            },
            {
                x: 14685,
                y: 547,
                width: 100,
                height: 100,
            },
            {
                x: 14940,
                y: 547,
                width: 800,
                height: 100,
            },
            {
                x: 15990,
                y: 547,
                width: 50,
                height: 100,
            },
            {
                x: 16240,
                y: 547,
                width: 1755,
                height: 100,
            },
            {
                x: 18045,
                y: 547,
                width: 50,
                height: 100,
            },
            {
                x: 18145,
                y: 547,
                width: 50,
                height: 100,
            },
            {
                x: 18245,
                y: 547,
                width: 50,
                height: 100,
            },
            {
                x: 18345,
                y: 547,
                width: 1155,
                height: 100,
            },
            {
                x: 18850,
                y: 505,
                width: 50,
                height: 50,
            },
            //cano
            {
                x: 1755,
                y: 378,
                width: 100,
                height: 185,
            },
            {
                x: 3810,
                y: 378,
                width: 100,
                height: 185,
            },
            {
                x: 4110,
                y: 418,
                width: 100,
                height: 185,
            },
            {
                x: 4710,
                y: 378,
                width: 100,
                height: 185,
            },
            {
                x: 5213,
                y: 378,
                width: 100,
                height: 185,
            },
            {
                x: 5765,
                y: 460,
                width: 100,
                height: 185,
            },
            {
                x: 7018,
                y: 418,
                width: 100,
                height: 185,
            },
            {
                x: 11930,
                y: 420,
                width: 100,
                height: 185,
            },
            {
                x: 12130,
                y: 378,
                width: 100,
                height: 185,
            },
            {
                x: 12333,
                y: 336,
                width: 100,
                height: 185,
            },
            {
                x: 17245,
                y: 418,
                width: 100,
                height: 185,
            },
            {
                x: 17795,
                y: 460,
                width: 100,
                height: 185,
            },
            

            //blocos
            {
                x: 7670,
                y: 380,
                width: 50,
                height: 200,
            },
            {
                x: 7720,
                y: 210,
                width: 400,
                height: 50,
            },
            {
                x: 8170,
                y: 380,
                width: 50,
                height: 200,
            },
            {
                x: 9225,
                y: 335,
                width: 400,
                height: 40,
            },
            {
                x: 10527,
                y: 460,
                width: 50,
                height: 80,
            },
            {
                x: 13785,
                y: 505,
                width: 300,
                height: 40,
            },
            {
                x: 13835,
                y: 460,
                width: 250,
                height: 40,
            },
            {
                x: 13885,
                y: 420,
                width: 200,
                height: 40,
            },
            {
                x: 13935,
                y: 380,
                width: 150,
                height: 40,
            },
            {
                x: 13985,
                y: 337,
                width: 100,
                height: 40,
            },
            {
                x: 14035,
                y: 295,
                width: 50,
                height: 40,
            },
            {
                x: 15188,
                y: 462,
                width: 50,
                height: 100,
            },
            {
                x: 15390,
                y: 462,
                width: 50,
                height: 100,
            },
            {
                x: 18045,
                y: 462,
                width: 50,
                height: 100,
            },
            {
                x: 18147,
                y: 377,
                width: 50,
                height: 200,
            },
            {
                x: 18247,
                y: 290,
                width: 50,
                height: 260,
            },
            {
                x: 18347,
                y: 210,
                width: 50,
                height: 340,
            },
            {
                x: 18397,
                y: 210,
                width: 50,
                height: 340,
            },



        ],

        inimigosOriginais: [
            {
                x: 1200,
                y: 300,
                spawnX: 1200,
                spawnY: 500,
                width: 40,
                height: 40,
                velX: 1,
                direction: -1
            }
        ]
    }
};

// CURRENT LEVEL (variáveis do level atual)
let currentLevel = levels[levelatual];
let obstacles = currentLevel.obstacles;
let morte = currentLevel.morte;
let levelWidth = currentLevel.width;
let levelHeight = currentLevel.height;
let vidas = 3
let levelChao = currentLevel.chao
let enemies = currentLevel.inimigosOriginais



const background = new Image();
//pega o level atual e coloca a background definida nele
background.src = currentLevel.background;


// PLAYER BOLADÃO QUE VAI SALTAR, CORRER, (quem sabe atirar) ATÉ O FIM DO MAPA, mas só se for boladão quem tiver controlando ele tbm
let player = {
    x: 50,
    y: 300,
    width: 50,
    height: 50,
    velX: 3,
    velY: 0,
    noChao: false
};


function atirar() {
    let speedX = 10;
    if (ultimoLado == "left") {
        speedX = -10;
    }
    tiros.push({
        x: player.x + cameraX + player.width / 2,
        y: player.y + player.height / 2,
        width: 12,
        height: 6,
        speedX: speedX
    });
}

function atualizarTiros() {
    for (let i = tiros.length - 1; i >= 0; i--) {
        let tiro = tiros[i];
        tiro.x += tiro.speedX;
        let screenX = tiro.x - cameraX;
        // remove if outside screen
        if (
            screenX < -50 ||
            screenX > canvas.width + 50
        ) {
            tiros.splice(i, 1);
        }
    }
}

function desenharTiros() {
    ctx.fillStyle = "yellow";
    for (const tiro of tiros) {
        ctx.fillRect(
            tiro.x - cameraX,
            tiro.y,
            tiro.width,
            tiro.height
        );
    }
}

function desenharEnemies() {
    ctx.fillStyle = "green";
    for (const enemy of enemies) {
        ctx.fillRect(
            enemy.x - cameraX,
            enemy.y,
            enemy.width,
            enemy.height
        );
    }
}

function atualizarEnemies() {
    for (const enemy of enemies) {
        let screenX = enemy.x - cameraX;
        let minX = enemy.spawnX;
        let maxX = enemy.spawnX + 100;
        // only update near screen
        if (
            screenX > -200 &&
            screenX < canvas.width + 200
        ) {

            // move
            enemy.x += enemy.velX * enemy.direction;

            // hit right limit
            if (enemy.x >= maxX) {
                enemy.direction = -1;
            }

            // hit left limit
            if (enemy.x <= minX) {
                enemy.direction = 1;
            }
        }
    }
}


// CHANGE LEVEL, ATUALIZA AS VARIÁVEIS DO LEVEL, OBSTÁCULOS, BACKGROUND, POSIÇÃO DO PLAYER E CAMERA
function carregarLevel(numero) {
    levelatual = numero;
    currentLevel = levels[levelatual];
    obstacles = currentLevel.obstacles;
    enemies = structuredClone(currentLevel.inimigosOriginais);
    morte = currentLevel.morte;
    levelWidth = currentLevel.width;
    levelHeight = currentLevel.height;
    levelChao = currentLevel.chao;
    background.src = currentLevel.background;
    cameraX = 0;
    player.x = 50;
    player.y = 300;
    player.velY = 0;
}



function resetarJogo() {
    // volta pro level 1
    levelatual = 1;
    faseMaxima = 1;
    // reseta score e vidas
    pontuacao = 0;
    vidas = 3;
    // limpa tiros
    tiros = [];
    // carrega level inicial
    carregarLevel(1);
    // reseta enemies
    enemies = structuredClone(currentLevel.inimigosOriginais);;
    // player
    player.x = 50;
    player.y = 300;
    player.velX = 3;
    player.velY = 0;
    player.noChao = false;
    // câmera
    cameraX = 0;
    // fecha mapa se estiver aberto
    miniMapa.fecharMapa();
}


function morrer() {

    if (invulneravel) return;

    invulneravel = true;

    vidas--;

    console.log("Vidas restantes:", vidas);

    player.x = 50;
    player.y = 300;

    player.velX = 3;
    player.velY = 0;

    cameraX = 0;

    tiros = [];

    enemies = structuredClone(currentLevel.inimigosOriginais);

    player.noChao = false;

    if (vidas <= 0) {
        resetarJogo();
        return;
    }

    setTimeout(() => {
        invulneravel = false;
    }, 1000);
}

// DESENHAR background, o x do background é o negativo da cameraX pra criar o efeito de movimento do player e da camera juntos, 
// o width e height do background são os mesmos do level pra preencher todo o espaço do level
function desenharBackground() {

    ctx.drawImage(
        background,
        -cameraX,
        0,
        levelWidth,
        levelHeight
    );
}
// DESENHAR HITBOX DO PLAYER, DEBUG
function desenharPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );
}


// DESENHAR HITBOX DOS OBSTÁCULOS, DEBUG
function desenharObstaculos() {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    for (const obstacle of obstacles) {
        ctx.strokeRect(
            obstacle.x - cameraX,
            obstacle.y,
            obstacle.width,
            obstacle.height
        );
    }
}

//desenhar hitbox do final debug
function desenharFinal() {
    let final = currentLevel.final;
    ctx.fillStyle = "purple";
    ctx.fillRect(
        final.x - cameraX,
        final.y,
        final.width,
        final.height
    );
}


// COLISÃO bolada, checka se o player colidiu com algum obstáculo, se sim, retorna o obstáculo, se não, retorna null
function colisao(px, py) {
    for (const obstacle of obstacles) {
        if (
            px < obstacle.x + obstacle.width &&
            px + player.width > obstacle.x &&
            py < obstacle.y + obstacle.height &&
            py + player.height > obstacle.y
        ) {
            return obstacle;
        }
    }
    return null;
}

function colisaoEnemy(px, py) {
    for (const enemy of enemies) {
        if (
            px < enemy.x + enemy.width &&
            px + player.width > enemy.x &&
            py < enemy.y + enemy.height &&
            py + player.height > enemy.y
        ) {
            return enemy;
        }
    }
    return null;
}

function colisaoTiroEnemy() {
    for (let i = tiros.length - 1; i >= 0; i--) {
        let tiro = tiros[i];
        for (let j = enemies.length - 1; j >= 0; j--) {
            let enemy = enemies[j];
            if (
                tiro.x < enemy.x + enemy.width &&
                tiro.x + tiro.width > enemy.x &&
                tiro.y < enemy.y + enemy.height &&
                tiro.y + tiro.height > enemy.y
            ) {
                // remove bullet
                tiros.splice(i, 1);
                // remove enemy
                enemies.splice(j, 1);
                //pontos
                pontuacao += 10;
                // stop checking this bullet
                break;
            }
        }
    }
}


function colisaoTiroObstacle() {
    for (let i = tiros.length - 1; i >= 0; i--) {
        let tiro = tiros[i];
        for (let j = obstacles.length - 1; j >= 0; j--) {
            let obstacle = obstacles[j];
            if (
                tiro.x < obstacle.x + obstacle.width &&
                tiro.x + tiro.width > obstacle.x &&
                tiro.y < obstacle.y + obstacle.height &&
                tiro.y + tiro.height > obstacle.y
            ) {
                // remove o tiro splice tira o objeto do array
                tiros.splice(i, 1);
                // break
                break;
            }
        }
    }
}

function colisaoFinal() {
    let final = currentLevel.final;
    if (
        player.x + cameraX < final.x + final.width &&
        player.x + cameraX + player.width > final.x &&
        player.y < final.y + final.height &&
        player.y + player.height > final.y
    ) {
        return true;
    }
    return false;
}

//mapa
function criarMiniMapa(ctx, canvas){
    // =========================
    // VARIÁVEIS
    // =========================
    let mapaAberto = false;
    let faseSelecionada = 0;
    const fases = [
        { x: 90, y: 290 },
        { x: 295, y: 290 },
        { x: 500, y: 290 }
    ];
    let quadradoX = fases[0].x;
    let quadradoY = fases[0].y;
    let destinoX = fases[0].x;
    let destinoY = fases[0].y;
    // menor = mais suave
    // maior = mais rápido
    const velocidadeMapa = 0.03;
    let movendoNoMapa = false;
    const imagemMapa = new Image();
    imagemMapa.src = "minimapa.png";


    // =========================
    // CONTROLES
    // =========================


    document.addEventListener("keydown", (e) => {

        if(!mapaAberto) return;
        if(movendoNoMapa) return;
        // esquerda
        if((e.key === "a" || e.key === "A") && faseSelecionada > 0){
            faseSelecionada--;
            destinoX = fases[faseSelecionada].x;
            destinoY = fases[faseSelecionada].y;
            movendoNoMapa = true;
        }

        // direita
        if ((e.key === "d" || e.key === "D") && faseSelecionada < 2 && faseSelecionada + 2 <= faseMaxima) {
            faseSelecionada++;
            destinoX = fases[faseSelecionada].x;
            destinoY = fases[faseSelecionada].y;
            movendoNoMapa = true;
        }
        // entrar na fase
        if(e.key === "Enter"){
            iniciarFase(faseSelecionada + 1);
        }
        });


    // =========================
    // MOVIMENTO
    // =========================

    function updateMapa(){

        // pega a distância entre o quadrado e o destino
        // e move apenas uma parte dela por frame
        // se estiver longe anda rápido
        // se estiver perto desacelera sozinho
        quadradoX += (destinoX - quadradoX) * velocidadeMapa;
        quadradoY += (destinoY - quadradoY) * velocidadeMapa;
        if(
            // Math.abs remove números negativos
            // ajuda a medir a distância real
            Math.abs(quadradoX - destinoX) < 1 &&
            Math.abs(quadradoY - destinoY) < 1
        ){
            quadradoX = destinoX;
            quadradoY = destinoY;
            movendoNoMapa = false;
        }
    }


    // =========================
    // MOSTRAR MAPA
    // =========================

    function desenharMapa(){

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            imagemMapa,
            0,
            0,
            canvas.width,
            canvas.height
        );
        ctx.fillStyle = "blue";
        ctx.fillRect(
            quadradoX,
            quadradoY,
            player.width * 0.8,
            player.height * 0.8
        );
        ctx.fillStyle = "white";
        ctx.font = "28px Arial";
        ctx.fillText(
            "A/D = mover | ENTER = selecionar fase",
            300,
            660
        );
    }

    // =========================
    // FUNÇÕES 
    // =========================

    function abrirMapa(){
        mapaAberto = true;
    }
    function fecharMapa(){
        mapaAberto = false;
    }
    function iniciarFase(numeroDaFase){
        console.log("Entrando na fase " + numeroDaFase);

        fecharMapa();

        carregarLevel(numeroDaFase);
    }
    return {
        abrirMapa,
        fecharMapa,
        iniciarFase,
        updateMapa,
        desenharMapa,

        get aberto() {
            return mapaAberto;
        }
    };
};
const miniMapa = criarMiniMapa(ctx, canvas);


// UPDATE de posição do player, camera e colisão
function atualizar() {
    //let do valor da distancia do mundo (direita pra esquerda) é igual ao x do player mais a camera(630px horizontais)
    //  e o novo valor do mundo é igual a esse valor, depois o movimento vai alterar esse valor do mundo e depois o player
    //  ou a camera vão se mover de acordo com a diferença entre o novo valor do mundo e o valor antigo do mundo
    if (miniMapa.aberto) return;
    let worldX = player.x + cameraX;
    let novoWorldX = worldX;


    // MOVIMENTO altera o valor do novoWorldX 
    if (keys["ArrowRight"]) {
        novoWorldX += player.velX;
        ultimoLado = "right";
    }
    if (keys["ArrowLeft"]) {
        novoWorldX -= player.velX;
        ultimoLado = "left";
    }

    // COLISÃO HORIZONTAL (nao deixa o player sair dos 230 pixeis pro background e o movimento ficarem dinamicos juntos)
    if (!colisao(novoWorldX, player.y)) {
        if (player.x < 230 || keys["ArrowLeft"]) {
            player.x += (novoWorldX - worldX);
        }

        else if (keys["ArrowRight"]) {
            // CAMERA AINDA PODE ANDAR (checka se a camera ainda pode se mover, se sim, move a camera, se não, move o player)
            if (cameraX + canvas.width < levelWidth) {
                cameraX += player.velX;
            }

            // FIM DO MAPA (player consegue se mover alem dos 230px quando chega no final do mapa)
            else {
                player.x += player.velX;
            }
        }
    }

    // PULO(só funciona se o player estiver "no chão", bugado pq da pra cair de uma plataforma e pular mas isso é segredo ;) )
    if (keys["ArrowUp"] && player.noChao) {
        player.velY = pulo;
        player.noChao = false;
    }

    // GRAVIDADE
    player.velY += gravidade;
    let novoY = player.y + player.velY;
    //check de colisão do x em movimento do personagem e da camera e do novo y do personagem
    let obstacle = colisao(
        player.x + cameraX,
        novoY
    );
    // se o check em cima nao encontrou obstáculo no novo y o player sobe
    if (!obstacle) {
        player.y = novoY;
    }
    //se encontou obstaculo e tiver subindo bate a cabeça e começa a cair pq nochao = true então a velocidade y é -12
    else {
        if (player.velY > 0) {
            player.y = obstacle.y - player.height;
            player.noChao = true;
        }
        // se ele tiver descendo e encontrar obstaculo fica em cima dele
        else if (player.velY < 0) {
            player.y = obstacle.y + obstacle.height;
        }
        //se nada acontecer só set velY para 0 pra nao subir nem cair
        player.velY = 0;
    }

    // LIMITES (limitando o player dentro do canva esquerda)
    if (player.x < 0) {
        player.x = 0;
    }
    //limitando direita
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

    let enemyHit = colisaoEnemy(
        player.x + cameraX,
        player.y
    );

    if (player.y > levelChao || (!invulneravel && enemyHit)) {
        morrer();
    }

    // TROCAR LEVEL - MUDAR, ( MATAR ZOMBIES DROPA MOEDA? TIROTEIO INSANO! )
    //COLOCAR PRA CHAMAR O MAPA AQUI E DAI VC CARREGA O LEVEL 2 DEPOIS
    if (colisaoFinal() && !miniMapa.aberto) {

        // desbloqueia próxima fase
        if (levelatual + 1 > faseMaxima) {
            faseMaxima = levelatual + 1;
        }

        miniMapa.abrirMapa();
        return;
    }
}

function desenharHUD() {
    ctx.fillStyle = "white";
    ctx.font = "25px Comic Sans MS";

    // score
    ctx.fillText("Pontuação: " + pontuacao, 20, 40);

    // lives
    ctx.fillText("Vidas: " + vidas, 20, 80);
}

// LOOP do game para constantemente atualizar posições, background, obstáculos e tudo mais
function desenhar() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (miniMapa.aberto) {

        miniMapa.updateMapa();
        miniMapa.desenharMapa();

    } else {

        atualizar();

        desenharBackground();
        desenharObstaculos();
        desenharPlayer();

        atualizarTiros();
        colisaoTiroEnemy();
        colisaoTiroObstacle();

        desenharHUD();

        atualizarEnemies();
        desenharEnemies();

        desenharTiros();
        desenharFinal();
    }
    requestAnimationFrame(desenhar);
}


// INPUT recebe as teclas e armazena em keys enquanto estiver pressionada
document.addEventListener("keydown", function(evento) {
    keys[evento.key] = true;

    if (evento.key == "z" && podeAtirar){
        atirar();
        podeAtirar = false;
        
        setTimeout(function() {
            podeAtirar = true;
        }, cooldownTiro);
    }
});
// se nao tiver pressionada né animal
document.addEventListener("keyup", function(evento) {
    keys[evento.key] = false;
});


// DEBUG pra saber a posição do player e do mundo pra colocar os obstáculos no lugar "certo"
document.addEventListener("keydown", function(evento) {
    keys[evento.key] = true;
    // aperta enter que vai dar console log de tudo isso ai ;)
    if (evento.key == "Enter") {
        console.log("Player X:", player.x);
        console.log("Player Y:", player.y);
        console.log("World X:", player.x + cameraX);
    }
});


// chama o loop do game pra iniciar tudo, é só ler a função desenhar que tem tudo explicado lá BUCETA

desenhar();



// caralho lek achei que o dantas tava chapando em ter 1000+ linhas essa porra aq vai ficar gigantesca >:(