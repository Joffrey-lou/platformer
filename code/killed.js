export default function killed() {
  add([
    text("Game Over :(", { size: 24 }),
    pos(toWorld(vec2(160, 120))),
    color(255, 255, 255),
    origin("center"),
    layer('ui'),
  ]);
  wait(2, () => {
    go("lose");
   })
}

