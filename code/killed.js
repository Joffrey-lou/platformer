export default function killed() {
  play("hit")
  shake(60)
  wait( 0.5, () => {
    go("game");
  })
}