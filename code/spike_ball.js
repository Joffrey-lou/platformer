// custom component controlling enemy patrol movement
export default function spike_ball(speed = 120, dir = 1) {
	return {
		id: "patrol",
		require: [ "pos", "area", ],
		add() {
			this.on("collide", (obj, col) => {
				if (col.isLeft() || col.isRight()) { 		
          dir = -dir
				}
			})
		},
		update() {
      if(!this.isGrounded())
               this.move(speed * dir, 0)
       if(this.isGrounded()){
               this.jump(500)
                 play("pop")
       }
		}, 
	} 
}    