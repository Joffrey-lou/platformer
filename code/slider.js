// make border slide if touch vertical slider
export default function slider(rot,speed = 1, dir = 1) {
	return {
		id: "platform",
		require: [ "pos", "area", ],
		add() {
			this.onCollide("slider_end", () => {
					dir = -dir
			})
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
 
