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
	],
    "=": () => [
	  sprite("horizontal_track"),
		origin("bot"),
	],
      "<": () => [
	  sprite("left_end_track"),
		origin("bot"),
	],
      "v": () => [
	  sprite("bottom_end_track"),
		origin("bot"),
	],
      "^": () => [
	  sprite("top_end_track"),
		origin("bot"),
	],
      ">": () => [
	  sprite("right_end_track"),
		origin("bot"),
	],
    "e": () => [
      sprite("background"),
      origin("bot"),
      area({ width: 2, height: 2. }),
      "slider_end"
    ]
 }
}