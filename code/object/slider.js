// make border slide if touch vertical slider
export default function slider(rot,speed = 2, dir = 1) {
	return {
		id: "platform",
		require: [ "pos", "area", ],
		add() {
			this.onCollide("slider_end", () => {
					dir = -dir
			})
      this.onCollide("spike",(spike) =>{
      })


      // isnt implemented yet
      /*
      this.onCollide("danger",(spike) =>{
        this.add ([
		        sprite("floor_spike"),
		        area({ scale: 0.7, }),
            pos(spike.pos.x,spike,pos.y),
            solid(),
	        	origin("bot"),
	        	"danger",
	           ],)
        destroy(spike) 
      })
      */
		},
		update() {
      switch(rot){
        case 'v':
          this.pos.y -= (speed/4 * dir);
          break;
        case 'h':
          this.pos.x -= (speed/4 * dir);
          break;
      }
			      
		}, 
	} 
}
 
