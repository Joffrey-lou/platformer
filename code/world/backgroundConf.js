export default function loadBackgroundConf() {
  return {
	// grid size
	width: 16, 
	height: 16,
	// define each object as a list of components
   " ": () => [
		sprite("background"),
		origin("bot"),
	],
   "|": () => [
	  sprite("vertical_track"),
		origin("bot"),
    layer("bg"),
	],
    "=": () => [
	  sprite("horizontal_track"),
		origin("bot"),
    layer("bg"),
	],
      "<": () => [
	  sprite("left_end_track"),
		origin("bot"),
    layer("bg"),
	],
      "v": () => [
	  sprite("bottom_end_track"),
		origin("bot"),
    layer("bg"),
	],
      "^": () => [
	  sprite("top_end_track"),
		origin("bot"),
    layer("bg"),
	],
      ">": () => [
	  sprite("right_end_track"),
		origin("bot"),
    layer("bg"),
	],
    "e": () => [
      sprite("background"),
      origin("bot"),
      area({ width: 2, height: 2. }),
      "slider_end",
      layer("bg"),
    ]
 }
}