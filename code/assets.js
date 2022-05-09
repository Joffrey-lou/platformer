export default function loadAssets() {

  //sprite 
  
	loadSprite("player", "sprites/player.png");
  loadSprite("door", "sprites/door.png");
  loadSprite("spike_ball", "sprites/spike_ball.png");
  loadSprite("red_ball", "sprites/red_ball.png");
	loadSprite("coin", "sprites/coin.png");
  loadSprite("background", "sprites/background.png");
  loadSprite("cube", "sprites/cube.png");
  
  loadSprite("floor_spike", "sprites/spike/spike_0.png");
  loadSprite("left_wall_spike", "sprites/spike/spike_1.png");
  loadSprite("roof_spike", "sprites/spike/spike_2.png");
  loadSprite("right_wall_spike", "sprites/spike/spike_3.png");

  //Complexe border

  loadSprite("horizontal_border", "sprites/border/border_0.png");
  loadSprite("vertical_border", "sprites/border/border_1.png");
  loadSprite("top_left_border", "sprites/border/border_2.png");
  loadSprite("top_right_border", "sprites/border/border_3.png");
  loadSprite("bottom_right_border", "sprites/border/border_4.png");
  loadSprite("bottom_left_border", "sprites/border/border_5.png");
  loadSprite("left_end_border", "sprites/border/border_6.png");
  loadSprite("right_end_border", "sprites/border/border_7.png");
  loadSprite("top_end_border", "sprites/border/border_8.png");
  loadSprite("bottom_end_border", "sprites/border/border_9.png");
  
  //complexe track

  loadSprite("vertical_track", "sprites/track/track_0.png");
  loadSprite("horizontal_track", "sprites/track/track_1.png");
  loadSprite("bottom_end_track", "sprites/track/track_2.png");
  loadSprite("top_end_track", "sprites/track/track_3.png");
  loadSprite("right_end_track", "sprites/track/track_4.png");
  loadSprite("left_end_track", "sprites/track/track_5.png");

  //complex cannon

    loadSprite("right_cannon", "sprites/canon/canon_0.png");
    loadSprite("left_cannon", "sprites/canon/canon_1.png");
    loadSprite("top_cannon", "sprites/canon/canon_2.png");
    loadSprite("bottom_cannon", "sprites/canon/canon_3.png");

  //complexe roll

  loadSprite("conveyor", "/sprites/conveyor.png", {
	// The image contains 6 frames layed out horizontally, slice it into individual frames    
	sliceX: 6,
	// Define animations
	anims: {
		"right": {
			// Starts from frame 0, ends at frame 1
			from: 0,
			to: 1,
			// Frame per second
			speed: 2,
			loop: true,
		},
		"center": {
			// Starts from frame 2, ends at frame 3
			from: 2,
			to: 3,
			// Frame per second
			speed: 2,
			loop: true,
		},
    "left": {
			// Starts from frame 4, ends at frame 5
			from: 4,
			to: 5,
			// Frame per second
			speed: 2,
			loop: true,
		},
}})
  
  //sound

  loadSound("pop", "sounds/pop.wav");
  loadSound("hit", "sounds/explode.mp3");
  loadSound("collect", "sounds/coin.wav");
}

