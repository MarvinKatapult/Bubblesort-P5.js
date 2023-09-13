var numberOfElements = 100;
var list;
var sorted = false;
var timeSorting = 0;
var showTime = false;
var numberOfElementsSlider;
var frameCountSlider;

function setup() 
{
	createCanvas(1000, 700);
	stroke(255);
	noFill();
	list = createList();
	frameRate(200);
	
	var randomizeButton = createButton("Randomize");
	randomizeButton.mousePressed(newList);

	numberOfElementsSlider = createSlider(50, 5000, numberOfElements, 1);
	frameCountSlider = createSlider(1, 500, 60, 1);
	
}



function draw()
{

	strokeWeight(1);
	background(25);

	getSliderValues();
	bubbleSort(list);
	showBars(list);
	
	setTime();
	
	
}

function newList() {
	list = createList();
}

function getSliderValues() {
	numberOfElements = numberOfElementsSlider.value();
	numberOfElementsSlider.changed(newList);

	frameRate(frameCountSlider.value());
}

function bubbleSort(list) {
	sorted = true;
	for (var i = 0; i < list.length-1; i++) {
		if (list[i] > list[i+1]) {
			stroke(255);
			var temp = list[i];
			list[i] = list[i+1];
			list[i+1] = temp;

			sorted = false;
			showTime = false;
		}
	}

	if (sorted == true) onSolved();
}

function setTime() {
	if (frameCount % 10 == 0 && sorted == false) {
		timeSorting += 1;
	}
}

function onSolved() {
	showTime = true;
	
	showTimeText();
	showMedianLine();
}

function showMedianLine() {
	strokeWeight(0.5);
	stroke(255, 0, 0);
	line(0, height, width, 0);
}

function showTimeText() {
	textSize(22);
	stroke(255);
	text("Time: " + timeSorting + "s", 50, 50);
}

function createList() {
	var list = [];
	for (var i = 0; i < numberOfElements; i++) {
		list[i] = random(height);
	}
	return list;
}

function showBars(values) {
	getBarColor();
	push();
		translate(0, height);
		for (var i = 0; i < values.length; i++) {
			var x = width /values.length * i;
			var y = values[i];

			line(x, 0, x, -y);
		}
	pop();
}

function getBarColor() {
	if (sorted == true)  stroke(0, 255, 0);
	if (sorted == false) stroke(255);
}