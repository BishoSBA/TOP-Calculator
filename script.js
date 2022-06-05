let numberA = "";
let numberB = "";
let operation = "";
let memoryText = "";
let currentResult = "0";
const symbol = {
	add: "+",
	subtract: "-",
	multiply: "x",
	divide: "/",
};
const memory = document.querySelector(".memory p");
const display = document.querySelector(".display p");
const numberBtns = document.querySelectorAll(".numbers");
const opBtns = document.querySelectorAll(".op");
const equal = document.querySelector("#equal");
const clearC = document.querySelector("#clear");
const backtrack = document.querySelector("#backtrack");

function calculate() {
	let a = 0;
	let b = 0;
	if (currentResult) {
		a = parseFloat(currentResult);
	} else {
		a = parseFloat(numberA);
	}
	if (numberB) {
		b = parseFloat(numberB);
		switch (operation) {
			case "add":
				currentResult = a + b;
				break;
			case "subtract":
				currentResult = a - b;
				break;
			case "multiply":
				currentResult = a * b;
				break;
			case "divide":
				currentResult = a / b;
				break;
		}
		currentResult = currentResult.toFixed(1);
	}
	memoryText = currentResult;
	updateDisplay();
	numberB = "";
}

//process integer buttons
function calInteger() {
	memoryText += String(this.value);
	if (!operation) {
		numberA += String(this.value);
		updateDisplay();
	} else {
		numberB += this.value;
		updateDisplay();
	}
}

//processes operative functions
function calOperation() {
	calculate();
	if (!["+", "-", "*", "/"].includes(memoryText.slice(-1))) {
		memoryText += String(symbol[this.value]);
	}
	operation = String(this.value);
	updateDisplay();
}

//updates display and memory bars
function updateDisplay() {
	memory.textContent = memoryText;
	if (currentResult) {
		if (currentResult[-1] === 0) {
			if (currentResult[-2] === 0) {
				currentResult.slice[-2];
			}
			currentResult.slice[-1];
		}
	}
	display.textContent = currentResult;
}

function clear() {
	numberA = "";
	numberB = "";
	memoryText = "";
	currentResult = "0";
	updateDisplay();
}

for (const btn of numberBtns) {
	btn.addEventListener("click", calInteger);
}
for (const btn of opBtns) {
	btn.addEventListener("click", calOperation);
}

equal.addEventListener("click", calculate);
clearC.addEventListener("click", clear);
