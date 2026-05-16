var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//pra fazer o bgl do boneco cair no chão depois de pular, e pra dar um peso pro pulo tbm, se não o player ia ficar pulando infinitamente, mto estranho
const gravidade = 0.5;
const pulo = -14;
//armazena as teclas pressionadas, mto bolado pra movimentação fluida tlg
const keys = {};

//tamanho dos blocos
const blocoL = 48;
const blocoA = 45;
//largura do cano
const canoL = 95;
//posição x da camera
let cameraX = 0;
//level atual, nao fiz mta coisa com isso ainda
var levelatual = 1;
//placar de pontuação
let pontos = 0;

let ultimoLado = "right";
let tiros = [];
let podeAtirar = true;
const cooldownTiro = 500;

// LEVELS (background, obstáculos, largura e altura do level)
const levels = {
    //1 de Level 1 né burrão
    1: {
        background: "NES - Super Mario Bros. - Stages - World 1-1.png",
        width: 10000,
        height: 1270,
        chao: 600,
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
        

        enemies: [
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

        background: "level2.png",

        width: 8000,
        height: 600,

        obstacles: [
            {
                x: 0,
                y: 500,
                width: 8000,
                height: 1
            },

            {
                x: 300,
                y: 350,
                width: 200,
                height: 20
            },

            {
                x: 700,
                y: 280,
                width: 150,
                height: 20
            },

            {
                x: 1200,
                y: 180,
                width: 100,
                height: 20
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
let enemies = currentLevel.enemies;


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
    enemies = currentLevel.enemies;
    morte = currentLevel.morte;
    levelWidth = currentLevel.width;
    levelHeight = currentLevel.height;
    background.src = currentLevel.background;
    cameraX = 0;
    player.x = 50;
    player.y = 300;
    player.velY = 0;
}



function morrer() {
    vidas--;
    console.log("Vidas restantes:", vidas);
    // volta player pro início
    player.x = 50;
    player.y = 300;
    // reseta velocidades
    player.velX = 5;
    player.velY = 0;
    // reseta câmera
    cameraX = 0;
    //enemies
    for (const enemy of enemies) {
        enemy.x = enemy.spawnX;
        enemy.y = enemy.spawnY
    }
    // evita bug de pulo
    player.noChao = false;
    // game over
    if (vidas <= 0) {
        alert("GAME OVER");
        vidas = 3;
        // reinicia tudo
        player.x = 50;
        player.y = 300;
        cameraX = 0;
    }
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

// UPDATE de posição do player, camera e colisão
function atualizar() {
    //let do valor da distancia do mundo (direita pra esquerda) é igual ao x do player mais a camera(630px horizontais)
    //  e o novo valor do mundo é igual a esse valor, depois o movimento vai alterar esse valor do mundo e depois o player
    //  ou a camera vão se mover de acordo com a diferença entre o novo valor do mundo e o valor antigo do mundo
    let worldX = player.x + cameraX;
    let novoWorldX = worldX;

    pontuacao = 0;


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

    let enemies = colisaoEnemy(
        player.x + cameraX,
        player.y
    );

    if (player.y > levelChao || enemies) {
        morrer()
    }

    // TROCAR LEVEL - MUDAR, ( MATAR ZOMBIES DROPA MOEDA? TIROTEIO INSANO! )

 //   if (cameraX >= levelWidth - canvas.width - 10) {
//
  //      if (levelatual == 1) {

    //        carregarLevel(2);
      //  }
    //}
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
    // LIMPAR TELA
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //chama as funções, É SÓ LER ELAS
    atualizar();
    desenharBackground();
    //hitbox dos obstáculos
    //desenharObstaculos();
    desenharPlayer();
    atualizarTiros();
    colisaoTiroEnemy();
    colisaoTiroObstacle();
    //desenha hud
    desenharHUD();
    //atualizar inimigo
    atualizarEnemies();
    desenharEnemies();
    desenharTiros();

  

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