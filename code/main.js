
import kaboom from "kaboom"
import patrol from "./patrol"
import loadAssets from "./assets"
import killed from "./killed"
import loadLevels from "./levels"
import loadConf from "./levelConf"
import loadBackgrounds from "./backgrounds"

kaboom({
  width: 512,
  heigth: 512,
  background: [0,0,0],
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

const LEVELS = [ loadLevels(1),loadLevels(2),loadLevels(3)]
const BACKGROUNDS = [loadBackgrounds(1),loadBackgrounds(2),loadBackgrounds(3)]
const START = [[152,576],[37,528],]
const levelConf = loadConf()
  // define what each symbol means in the level graph
 

scene("game", ({ levelId} = { levelId: 0}) => {

	gravity(3200)
  LASTY = 1000

  
  
	// add level to scene
  const background = addLevel(BACKGROUNDS[levelId ?? 0], levelConf)
	const level = addLevel(LEVELS[levelId ?? 0], levelConf)

  
	// define player object
	const player = add([
		sprite("player"),
		pos(START[levelId ?? 0]),
		area({ width: 8, height: 16. }), 
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
    console.log(mousePos())    
	})

	// if player onCollide with any obj with "danger" tag, lose
	player.onCollide("danger", () => {
    killed()   

	})

	player.onCollide("door", () => {
		if (levelId + 1 < LEVELS.length) {
			go("game", {
				levelId: levelId + 1,
 			})
		} else {
			go("win")
		}
	})

  player.onGround(() => {  
    if ( (player.pos.y - LASTY) > FALL_DEATH){
      player.scale.y = 0.2
      killed()
    }
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
              ACCUMULATE_FORCE += 10;
      player.scale.y = 1-( ACCUMULATE_FORCE/700)
      
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