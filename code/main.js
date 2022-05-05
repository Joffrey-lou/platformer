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
const MOVE_SPEED = 160
const FALL_DEATH = 200

let ACCUMULATE_FORCE = 0
let LASTY = 0

//level 

 const LEVELS = [
	[
    "BBB1==================2BBB",
    "BBB|                  |BBB",
    "BBB|                  |BBB",
    "BBB|                  |BBB",
    "BBB|              p   |BBB",
    "BBB|   12        ===  |BBB",
    "BBB|   43             |BBB",
    "BBB|                  |BBB",
    "BBB|                  |BBB",
    "BBB|              1===3BBB",
    "BBB|              |BBBBBBB",
    "BBB|              4===2BBB",
    "BBB|   12             |BBB",
    "BBB|   43             |BBB",
    "BBB|                  |BBB",
    "BBB|                  |BBB",
    "BBB|            ^     |BBB",
    "BBB|   1=2   c  1=2   |BBB",
    "BBB|   |B|>     |B|   |BBB",
    "BBB|   4=3   c  4=3   |BBB",
    "BBB|                  |BBB",
    "BBB|         c        |BBB",
    "BBB|                  |BBB",
    "BBB|                  |BBB",
    "BBB|      1====2>     |BBB",
    "BBB|      |BBBB|      |BBB",
    "BBB|      4====3      |BBB",
    "BBB|>       v         |BBB",
    "BBB|                  |BBB",
    "BBB|                  |BBB",
    "BBB4====2        1====3BBB",
    "BBBBBBBB|        |BBBBBBBB",
    "BBBBBBBB|        |BBBBBBBB",
    "BBBBBBBB|       <|BBBBBBBB",
    "BBBBBBBB|        |BBBBBBBB",
    "BBBBBBBB|        |BBBBBBBB",
    "BBBBBBBB| ^    c |BBBBBBBB",
		"BBBBBBBB4========3BBBBBBBB",
    "BBBBBBBBBBBBBBBBBBBBBBBBBB",
    "BBBBBBBBBBBBBBBBBBBBBBBBBB",
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
		area({ scale: 0.8, }),
    solid(),
		origin("bot"),
		"danger",
	],
    "v": () => [
		sprite("roof_spike"),
		area({ scale: 0.8, }),
    solid(),
		origin("bot"),
		"danger",
	],
    ">": () => [
		sprite("left_wall_spike"),
		area({ scale: 0.8, }),
    solid(),
		origin("bot"),
		"danger",
	],
    "<": () => [
		sprite("right_wall_spike"),
		area({ scale: 0.8, }),
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
   "B": () => [
		sprite("void"),
		origin("bot"),
	],
	}

scene("game", ({ levelId} = { levelId: 0}) => {

	gravity(3200)
LASTY = 1000
  
	// add level to scene
	const level = addLevel(LEVELS[levelId ?? 0], levelConf)
  
	// define player object
	const player = add([
		sprite("player"),
		pos(200  , 480),
		area(), 
		scale(1),
		// makes it fall to gravity and jumpable
		body(),
		origin("bot"),
	])

   camPos(player.pos.x, player.pos.y-100);    
  
	// action() runs every frame
	player.onUpdate(() => {    
    var currCam = camPos()
    camPos(currCam.x,player.pos.y - 80)
		/* center camera to player when go up
    if (currCam.y > player.pos.y) 
        camPos(currCam.x, player.pos.y);     
    */
	})

	// if player onCollide with any obj with "danger" tag, lose
	player.onCollide("danger", () => {
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

  player.onGround(() => {  
    if ( (player.pos.y - LASTY) > FALL_DEATH)
        killed();
    ACCUMULATE_FALL = 0
    LASTY = player.pos.y
  })

  player.onCollide("coin", (coin) => {
    play("collect")
    destroy(coin)
})

	// jump
	onKeyDown("space", () => 
    {
      
		if (player.isGrounded()) 
    {  
      // on space down accumulate force
      if  (ACCUMULATE_FORCE < 450)
              ACCUMULATE_FORCE += 5;
      player.scale.y = 1-( ACCUMULATE_FORCE/1000)
      
      onKeyRelease("space", () => 
        {          
          // on space release jump with original + accumulate force
        if (player.isGrounded()) 
        {
          play("pop")
        	player.jump(JUMP_FORCE + ACCUMULATE_FORCE)
          ACCUMULATE_FORCE = 0
          player.scale.y = 1
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

go("game")