import kaboom from "kaboom"
import patrol from "./patrol"
import loadAssets from "./assets"
import killed from "./killed"
import loadLevels from "./levels"
import loadLevelConf from "./levelConf"
import loadBackgrounds from "./backgrounds"
import loadBackgroundConf from "./backgroundConf"

// windows settings

kaboom({
  width: 512,
  heigth: 512,
  background: [0,0,0],
  scale: 2,
})

//load sprite
loadAssets()

// define some constants
const JUMP_FORCE = 700
const MOVE_SPEED = 160
const FALL_DEATH = 200

let ACCUMULATE_FORCE = 0
let LASTY = 0

//level definition
const LEVELS = [ loadLevels(1),loadLevels(2),loadLevels(3),loadLevels(4)]
const BACKGROUNDS =[loadBackgrounds(1),loadBackgrounds(2),loadBackgrounds(3),loadBackgrounds(4)]
const START = [[152,576],[37,528],[260,520],[280,60]]
const DIRECTION = ['t','t','t','b']
const backgroundConf = loadBackgroundConf()
const levelConf = loadLevelConf()
const sectionName = ["Complex","","","","",""]

//menu
scene("menu", () => {
	add([
		text("press space to start",{size : 24}),
    pos(vec2(160, 120)),
    origin("center"),
    color(255, 255, 255),
	])
	onKeyPress(() => go("game"))
})

// game scenes
scene("game", ({ levelId} = { levelId: 0}) => {

	gravity(3200)
  LASTY = 1000

	// add level to scene
  const background = addLevel(BACKGROUNDS[levelId ?? 0], backgroundConf)
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

  //define default cam position
  camPos(152, player.pos.y-100);    

  add([
    text(sectionName[Math.round((levelId+1)/10)] + " - " + (levelId + 1), { size: 24 }),
    pos(155,player.pos.y - 150),
    color(255, 255, 255),
    origin("center"),
    layer('ui'),
    lifespan(1, { fade: 0.5 })
  ]);

   
  
	// action() runs every frame
	player.onUpdate(() => {    
    var currCam = camPos()
    switch(DIRECTION[levelId ?? 0]){
      case 't':
        camPos(currCam.x,player.pos.y - 80)
        break;
      case 'b':
        camPos(currCam.x,player.pos.y + 80)
        break;
    }  
  })


	// if player onCollide with any obj with "danger" tag, lose
	player.onCollide("danger", () => {
    killed()   
	})
  
 // door start next level
	player.onCollide("door", () => {
		if (levelId + 1 < LEVELS.length) {
			go("game", {
				levelId: levelId + 1,
 			})
		} else {
			go("menu")
		}
	})

  //detect fall length and  kill player if too high
  player.onGround(() => {  
    if ( (player.pos.y - LASTY) > FALL_DEATH){
      player.scale.y = 0.2
      killed()
    }
    ACCUMULATE_FALL = 0
    LASTY = player.pos.y
  })

  //collect coin
  player.onCollide("coin", (coin) => {
    play("collect")
    destroy(coin)
})

	// detect when space is down
	onKeyDown("space", () => 
    {
      
		if (player.isGrounded()) 
    {  
      // accumulate force until a certain point
      if  (ACCUMULATE_FORCE < 450)
              ACCUMULATE_FORCE += 10;
      player.scale.y = 1-( ACCUMULATE_FORCE/700)
      
      onKeyRelease("space", () => 
        {          
          //when space release jump hight =  base jump force + accumulate force  
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

  //move left only if in the air
	onKeyDown("left", () => {
		if (!player.isGrounded()){
      player.move(-MOVE_SPEED, 0)
    }
	})
  //move right only if in the air
	onKeyDown("right", () => {
    if (!player.isGrounded()){
      player.move(MOVE_SPEED, 0)
    }
		
	})

 
  //active fullscreen  when "f" is press 
 onKeyPress("f", () => {  
		fullscreen(!fullscreen())
	})

})

go("menu")