import bullet from "../object/bullet"
export default function spawnBullet(x,y,dir) {
    loop(2, () => {
      play("pop")
      add([
        sprite("red_ball"),
        pos(x,y),
        solid(),
        area({width: 6, length: 6.}),
        layer("obj"),  
        bullet(),
        move(dir,120),
        "danger",
      ])
    })
  }
 