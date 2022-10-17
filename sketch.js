var caminho1,caminho2,caminho3,caminho4,caminho5,caminho6;
var inimigos, inimigosGroup;
var alvo;
var jogador, jogador2, jogador3;
var bala,balasRoxa,balasAzul;

function setup(){
  createCanvas(windowWidth-50, windowHeight-50);

  caminho1 = createSprite(0, 100, 200, 30);
  caminho2 = createSprite(100, 235, 30, 300);
  caminho3 = createSprite(335, 400, 500, 30);
  caminho4 = createSprite(580, 265, 30, 300);
  caminho5 = createSprite(790, 125, 450, 30);
  caminho6 = createSprite(1005, 385, 30, 550);

  alvo = createSprite(1010, height-40, 200, 200);
  alvo.shapeColor = "brown";

  inimigosGroup = new Group();

  balasRoxa = new Group();
  balasAzul = new Group();
  

  //jogadores
  jogador = createSprite(1200, 100, 40, 40);
  jogador.shapeColor = "blue";
  jogador2 = createSprite(1200, 250, 40, 40);
  jogador2.shapeColor = "yellow";
  jogador3 = createSprite(1200, 400, 40, 40);
  jogador3.shapeColor = "purple";
  
}

function draw(){
  background("green");
  gerarInimigo();
  //console.log(World.mouseY);

  for(var i = 0;i<inimigosGroup.length;i = i+1){
    if(inimigosGroup[i].x === 100){
      inimigosGroup[i].setVelocity(0, 4);
    }
    
    if(inimigosGroup[i].y === 400){
      inimigosGroup[i].setVelocity(4, 0);
    }

    if(inimigosGroup[i].x === 580){
      inimigosGroup[i].setVelocity(0, -4);
      //console.log(inimigosGroup[0].y);
      
    }
    
    if(inimigosGroup[i].x === 580 && inimigosGroup[i].y === 124){
      inimigosGroup[i].setVelocity(4, 0);
      //console.log("entrou");
    }
    if(inimigosGroup[i].x === 1004){
      inimigosGroup[i].setVelocity(0, 4);
      //console.log(inimigosGroup[0].y);
    }
  }

  //verificando colisão do inimigo com o alvo
  if(inimigosGroup.isTouching(alvo)){
  for(var i = 0;i<inimigosGroup.length;i = i+1){
   if(inimigosGroup[i].isTouching(alvo)){
    inimigosGroup[i].destroy();
   } 
  }
} 

  //movimentando jogador com mouse
  if(mousePressedOver(jogador)){
    moverJogadores(jogador);
  }
  if(mousePressedOver(jogador2)){
    moverJogadores(jogador2);
  }
  if(mousePressedOver(jogador3)){
    moverJogadores(jogador3);
  }

  //arma do jogador roxo
  if(keyDown("UP_ARROW")){
    gerarBalas(jogador3.x, jogador3.y, 0, -6, balasRoxa);
  }
  if(keyDown("DOWN_ARROW")){
    gerarBalas(jogador3.x, jogador3.y, 0, 6, balasRoxa);
  }
  if(keyDown("RIGHT_ARROW")){
    gerarBalas(jogador3.x, jogador3.y, 6, 0, balasRoxa);
  }
  if(keyDown("LEFT_ARROW")){
    gerarBalas(jogador3.x, jogador3.y, -6, 0, balasRoxa);
  }
  if(inimigosGroup.isTouching(balasRoxa)){
    for(var i = 0;i<inimigosGroup.length;i = i+1){
      if(inimigosGroup[i].isTouching(balasRoxa)){
       inimigosGroup[i].destroy();
       balasRoxa.destroyEach();
      } 
  }
}

//arma do jogador azul
if(keyDown("W")){
  gerarBalas(jogador.x, jogador.y, 0, -6, balasAzul);
}
if(keyDown("S")){
  gerarBalas(jogador.x, jogador.y, 0, 6, balasAzul);
}
if(keyDown("D")){
  gerarBalas(jogador.x, jogador.y, 6, 0, balasAzul);
}
if(keyDown("A")){
  gerarBalas(jogador.x, jogador.y, -6, 0, balasAzul);
}
if(balasAzul.isTouching(inimigosGroup)){
  for(var i = 0;i<inimigosGroup.length;i = i+1){
    if(inimigosGroup[i].isTouching(balasAzul)){
      if(inimigosGroup[i].velocityY < 0){
        inimigosGroup[i].velocityY = inimigosGroup[i].velocityY - 3;
      }
      if(inimigosGroup[i].velocityY > 0){
        inimigosGroup[i].velocityY = inimigosGroup[i].velocityY + 3;
      }
      if(inimigosGroup[i].velocityX > 0){
        inimigosGroup[i].velocityX = inimigosGroup[i].velocityY + 3;
      }
    }
  }
}


  drawSprites();
}

function gerarInimigo(){
  if(frameCount%Math.round(random(10, 100)) === 0){
    inimigos = createSprite(0, 100, 15, 15);
  inimigos.shapeColor = "red";
  inimigos.velocityX = 4;
inimigosGroup.add(inimigos);
}
  }

  function moverJogadores(index){
    index.x = World.mouseX;
    index.y = World.mouseY;
  }

  function gerarBalas(x,y,vx,vy,group){
    bala = createSprite(x, y, 10, 10);
    bala.velocityY = vy;
    bala.velocityX = vx;
    group.add(bala);
  }