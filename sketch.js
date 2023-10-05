var numberOfElements = 100;
var list;
var sorted = false;
var numberOfElementsSlider;
var frameCountSlider;
var iterations = 1;

function setup() 
{
	createCanvas(1000, 700);
	stroke(255);
	noFill();
	list = createList();
	frameRate(200);
	
	var randomizeButton = createButton("Randomize");
	randomizeButton.mousePressed(newList);

	numberOfElementsSlider = createSlider(10, 5000, numberOfElements, 1);
	frameCountSlider = createSlider(1, 60, 60, 1);
	
}


function draw()
{

	strokeWeight(1);
	background(25);

	getSliderValues();
	bubbleSort(list);
	showBars(list);

	showText();

	iterations++;
}

function newList() {
	list = createList();
	iterations = 1;
}

function getSliderValues() {
	numberOfElements = numberOfElementsSlider.value();
	numberOfElementsSlider.changed(newList);

	frameRate(frameCountSlider.value());
}

function bubbleSort(list) {
	sorted = true;
	for (var i = 0; i < list.length-iterations; i++) {
		if (list[i] > list[i+1]) {
			
			var temp = list[i];
			list[i] = list[i+1];
			list[i+1] = temp;

			sorted = false;
			showTime = false;
		}
	}

	if (sorted == true) onSolved();
	
}


function onSolved() {
	showMedianLine();
}

function showText() {
	stroke(255);
	textSize(20);
	text(numberOfElements + " elements in list", 50, 50);
	text(floor(frameCountSlider.value()) + " iterations per second", 50, 100);
}

function showMedianLine() {
	strokeWeight(0.5);
	stroke(255, 0, 0);
	line(0, height, width, 0);
}


function createList() {
	timeSorting = 0;
	var list = [];
	for (var i = 0; i < numberOfElements; i++) {
		list[i] = random(height);
	}
	return list;
}

function showBars(values) {
	getBarColor();
	push();
		translate(5, height);
		for (var i = 0; i < values.length; i++) {
			var x = width /values.length * i;
			var y = values[i];

			line(x, 0, x, -y);
		}
	pop();
}

function getBarColor() {
	if (sorted == true)  stroke(0, 255, 0);
	if (sorted == false) stroke(255, 0, 255);
}