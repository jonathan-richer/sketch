
const sgn = x => {
	if (x > 0) return 1;
	else if (x < 0) return -1;
	else return 0;
}

const r = 5;
const walkers = [];
const grid = [];
const colored = [];
const rWidth = 800;
let looping = false;
let autoRestart = false;
let s;
let stopped = true;

function setup() {
	createCanvas(1000, 800);

	const res = r;
	for (let x = 0; x < rWidth; x += res) for (let y = 0; y < height - 7; y += res) grid.push({ x: x, y: y });

	background(255);
	s = createSlider(1, 50, 1, 1);
	s.style("position", "absolute");
	s.style("top", width / 2 - 20 + "px");
	s.style("left", (width - s.width) - 30 + "px");
	colorMode(HSB);
	stroke(0);
	strokeWeight(5);
	noFill();
	rect(3, 3, rWidth, height - 7);
	stroke(0);
	strokeWeight(5);
	noFill();
	rect(0, 0, width, height);
}

function draw() {

	if (looping) {
		for (const w of walkers) {
			w.show();
			for (const g of grid) if (g.x == w.pos.x && g.y == w.pos.y) colored.push(g);
		}
		stroke(0);
		strokeWeight(5);
		noFill();
		rect(3, 3, rWidth, height - 7);
	}

	if (stopped) {
		background(255);
		if (s.value() > walkers.length) walkers.push(new RandomWalker(random(grid), r));
		else if (s.value() < walkers.length) walkers.pop();
		noStroke();
		// stroke(0);
		fill(255);
		rect(810, 0, 200, height);
		textSize(30);
		fill(0);
		text("Walkers: " + s.value(), 815, 450);
		stroke(0);
		strokeWeight(5);
		noFill();
		rect(3, 3, rWidth, height - 7);
	} else {
		if (s.value() != walkers.length) s.value(walkers.length);
	}

	push();
	colorMode(RGB);
	rectMode(CENTER);
	// \ Play \ \ Pause \ circle
	const d = dist(940, 750, mouseX, mouseY);
	noStroke();
	if (d < 25) {
		fill(100);
		if (mouseIsPressed) fill(0);
	}
	else fill(32);
	ellipse(940, 750, 50);
	if (looping) {
		// Pause sign
		fill(255);
		rect(948, 750, 10, 25);
		rect(933, 750, 10, 25);

	} else {
		// Play triangle
		fill(255);
		beginShape();
		vertex(width - 45, height - 50);
		vertex(width - 70, height - 35);
		vertex(width - 70, height - 65);
		endShape(CLOSE);
	}
	// Stop circle
	noStroke();
	const d2 = dist(mouseX, mouseY, width - 60, height - 150);
	if (d2 < 25) {
		fill(100);
		if (mouseIsPressed) fill(0);
	}
	else fill(32);
	ellipse(940, 650, 50);

	pop();
	// Replay button
	push();
	let x, y;
	translate(940, 650);
	// strokeWeight(1);
	stroke(255);
	noFill();
	beginShape();
	for (let a = 0; a < TWO_PI - PI / 4; a += PI / 50) {
		x = sin(a) * 11;
		y = cos(a) * 11;
		vertex(x, y);
	}
	endShape();
	beginShape();
	vertex(x - 7, y - 1);
	vertex(x, y);
	vertex(x + 5, y - 5);
	endShape();
	pop();

	push();
	translate(900, 50);
	colorMode(RGB);

	const n = 6;
	const a = 1;
	const b = 1;
	const na = 2 / n;

	// Title
	noStroke();
	fill(32);
	beginShape();
	for (let i = 0; i < TWO_PI; i += PI / 1000) {
		const x = pow(abs(cos(i)), na) * a * sgn(cos(i)) * 80;
		const y = pow(abs(sin(i)), na) * b * sgn(sin(i)) * 30;
		vertex(x, y);
	}
	endShape(CLOSE);
	noStroke();
	fill(255, 0, 150);
	textSize(23);
	text("Randomness", -73, 10);
	pop();

	if (autoRestart) {
		if (colored.length > 10000) {
			background(255);
			for (let i = colored.length; i >= 0; i--) colored.pop();
		}
	}
	stroke(0);
	strokeWeight(5);
	noFill();
	rect(0, 0, width, height);


}

function mousePressed() {
	const d = dist(mouseX, mouseY, width - 60, height - 50);
	const d1 = dist(mouseX, mouseY, width - 60, height - 150);

	if (d < 25) {
		if (looping) looping = false;
		else {
			looping = true;
			stopped = false;
		}
	}

	if (d1 < 25) {
		// end();
		for (let i = colored.length; i >= 0; i--) colored.pop();
		for (let i = walkers.length; i >= 0; i--) walkers.pop();
		looping = false;
		stopped = true;
		background(255);
		stroke(0);
		strokeWeight(5);
		noFill();
    rect(3, 3, rWidth, height - 7);
	}

	// console.log(mouseX + " , " + mouseY);

}

function end() {

}




