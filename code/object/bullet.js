export default function bullet(dir){
     return{
       add(){
         this.on("collide",() => {
           destroy(this)
           play("pop")
         })
       }
     }
   }
     
  
