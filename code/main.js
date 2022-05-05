import kaboom from "kaboom"
import patrol from "./patrol"
import loadAssets from "./assets"
import killed from "./killed"

kaboom({
  width: 512,
  heigth: 512,
  background: [155, 171, 165],
  scale: 2
})

loadAssets()

// define some constants
const JUMP_FORCE = 700
let ACCUMULATE_FORCE = 0
const MOVE_SPEED = 160
const FALL_DEATH = 2400
//level 

 const LEVELS = [
	[ "1                              2",
    "|                  |",
    "|                  |",
    "|                  |",
    "|                  |",
    "|                  |",
    "|                  |",
    "|                  |",
    "|                  |",
    "|                  |",
    "|                  |",
    "|                  |",
    "|                  |",
    "|                  |",
    "|                  |",
    "|                  |",
    "|                  |",
    "|                  |",
    "|                  |",
    "|                  |",
    "|                  |",
    "|                  |",
    "|                  |",
    "|                  |",
    "4====2        1====3",
    "     |        |     ",
    "     |        |     ",
    "     |        |     ",
    "     |        |     ",
    "     |        |     ",
    "     | ^      |     ",
		"     4========3     ",
	],   
]
  // define what each symbol means in the level graph
 const levelConf = {
	// grid size
	width: 16, 
	height: 16,
	// define each object as a list of components
	"=": () => [
		sprite("horizontal_border"),
		area(),
		solid(),
		origin("bot"),
	],
   "|": () => [
		sprite("vertical_border"),
		area(),
		solid(),
		origin("bot"),
	],
   "1": () => [
		sprite("top_left_border"),
		area(),
		solid(),
		origin("bot"),
	],
   "2": () => [
		sprite("top_right_border"),
		area(),
		solid(),
		origin("bot"),
	],
   "3": () => [
		sprite("bottom_right_border"),
		area(),
		solid(),
		origin("bot"),
	],
   "4": () => [
		sprite("bottom_left_border"),
		area(),
		solid(),
		origin("bot"),
	],
   "^": () => [
		sprite("floor_spike"),
		area({ scale: 0.5, }),
    solid(),
		origin("bot"),
		"danger",
	],
	 "p": () => [
		sprite("portal"),
		area(),
     pos(0,-12),
    solid(),
		origin("bot"),
    "portal",
	],
	 "c": () => [
		sprite("coin"),
		area(),
		origin("bot"),
    "coin",
	],
	}

scene("game", ({ levelId} = { levelId: 0}) => {
  
	gravity(3200)

	// add level to scene
	const level = addLevel(LEVELS[levelId ?? 0], levelConf)
  
	// define player object
	const player = add([
		sprite("player"),
		pos(200, 180),
		area(), 
		scale(1),
		// makes it fall to gravity and jumpable
		body(),
		origin("bot"),
	])

	// action() runs every frame
	player.onUpdate(() => {
    
    camPos(player.pos.x,player.pos.y)
    
		/* center camera to player when go up
     var currCam = camPos();
    if (currCam.y > player.pos.y) 
        camPos(currCam.x, player.pos.y);    
    */
    
		// check fall death
		if (player.pos.y >= FALL_DEATH) 
			go("lose");
		
	})

	// if player onCollide with any obj with "danger" tag, lose
	player.onCollide("danger", () => {
    play("hit")
    shake(120)
    killed()
    
	})

	player.onCollide("portal", () => {
		if (levelId + 1 < LEVELS.length) {
			go("game", {
				levelId: levelId + 1,
 			})
		} else {
			go("win")
		}
	})

	player.onGround((l) => {
		if (l.is("enemy")) {
			player.jump(JUMP_FORCE * 1.5)
			destroy(l)
			addKaboom(player.pos)
			
		}		
	})

	player.onCollide("enemy", (e, col) => {
		// if it's not from the top, die
		if (!col.isBottom()) {
			go("lose")
		}
	})

  player.onCollide("coin", (coin) => {
    play("pop");
    destroy(coin);
})

	// jump
	onKeyDown("space", () => 
    {
      
		if (player.isGrounded()) 
    {  
      // on space down accumulate force
      if  (ACCUMULATE_FORCE < 450)
              ACCUMULATE_FORCE += 5;
      
      onKeyRelease("space", () => 
        {          
          // on space release jump with original + accumulate force
        if (player.isGrounded()) 
        {
        	player.jump(JUMP_FORCE + ACCUMULATE_FORCE)
          ACCUMULATE_FORCE = 0
        }
      }) 	
		}
	})

	onKeyDown("left", () => {
		if (!player.isGrounded()){
      player.move(-MOVE_SPEED, 0)
    }
	})

	onKeyDown("right", () => {
    if (!player.isGrounded()){
      player.move(MOVE_SPEED, 0)
    }
		
	})

 onKeyPress("f", () => {
		fullscreen(!fullscreen())
	})

})

scene("win", () => {
	add([
		text("You Win"),
	])
	onKeyPress(() => go("game"))
})

scene("lose", () => {
	add([
		text("You Lose"),
	])
	onKeyPress(() => go("game"))
})

go("game")