import patrol from "./patrol"

export default function loadConf() {
  return {
	// grid size
	width: 16, 
	height: 16,
	// define each object as a list of components
	"=": () => [
		sprite("horizontal_border"),
		area(),
		solid(),
		origin("bot"),
	],
   "|": () => [
		sprite("vertical_border"),
		area(),
		solid(),
		origin("bot"),
	],
   "1": () => [
		sprite("top_left_border"),
		area(),
		solid(),
		origin("bot"),
	],
   "2": () => [
		sprite("top_right_border"),
		area(),
		solid(),
		origin("bot"),
	],
   "3": () => [
		sprite("bottom_right_border"),
		area(),
		solid(),
		origin("bot"),
	],
   "4": () => [
		sprite("bottom_left_border"),
		area(),
		solid(),
		origin("bot"),
	],
   "^": () => [
		sprite("floor_spike"),
		area({ scale: 0.7, }),
    solid(),
		origin("bot"),
		"danger",
	],
    "v": () => [
		sprite("roof_spike"),
		area({ scale: 0.8, }),
    solid(),
		origin("bot"),
		"danger",
	],
    ">": () => [
		sprite("left_wall_spike"),
		area({ scale: 0.8, }),
    solid(),
		origin("bot"),
		"danger",
	],
    "<": () => [
		sprite("right_wall_spike"),
		area({ scale: 0.8, }),
    solid(),
		origin("bot"),
		"danger",
	],
	 "p": () => [
		sprite("door"),
		area({ scale: 0.5,}),
    solid(),
		origin("bot"),
    "door",
	],
	 "c": () => [
		sprite("coin"),
		area(),
		origin("bot"),
    "coin",
	],
   "B": () => [
		sprite("background"),
		origin("bot"),
	],
    "e": () => [
		sprite("enemy"),
		origin("bot"),
    solid(), 
    area({ width: 16, height: 6. }),
    patrol()
	],
 }
}