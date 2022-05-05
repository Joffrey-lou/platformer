export default function loadAssets() {

  //sprite 
  
	loadSprite("player", "sprites/player.png");
  loadSprite("portal", "sprites/portal.png");
  loadSprite("box", "sprites/box.png");
  loadSprite("enemy", "sprites/enemy.png");
	loadSprite("coin", "sprites/coin.png");
  
  loadSprite("floor_spike", "sprites/spike/spike_0.png");

  loadSprite("horizontal_border", "sprites/border/border_0.png");
  loadSprite("vertical_border", "sprites/border/border_1.png");
  loadSprite("top_left_border", "sprites/border/border_2.png");
  loadSprite("top_right_border", "sprites/border/border_3.png");
  loadSprite("bottom_right_border", "sprites/border/border_4.png");
    loadSprite("bottom_left_border", "sprites/border/border_5.png");


  //sound

  loadSound("pop", "sounds/pop.mp3");
  loadSound("hit", "sounds/explode.mp3");
}

