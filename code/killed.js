export default function killed() {
  play("hit")
  shake(120)
  wait( 0.5, () => {
    go("game");
  })
}