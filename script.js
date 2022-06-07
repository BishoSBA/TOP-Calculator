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
const btns = document.querySelectorAll("button");
const backtrack = document.querySelector("#backtrack");
const keyboard = {
	27: "clear",
	191: "divide",
};

function calculate() {
	let a = 0;
	let b = 0;
	if (+currentResult) {
		a = +currentResult;
	} else {
		a = +numberA;
		currentResult = a;
	}
	if (numberB) {
		b = +numberB;
		memoryText = currentResult + symbol[operation] + numberB;
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
				if (b === 0) {
					currentResult = "dividing by 0 :/";
					return;
				}
				currentResult = a / b;
				break;
		}
	}
	updateDisplay();
	numberB = "";
}

//process integer buttons
function calInteger(btn) {
	memoryText += String(btn.value);
	if (!operation) {
		numberA += String(btn.value);
		updateDisplay();
	} else {
		numberB += btn.value;
		updateDisplay();
	}
}

//processes operative functions
function calOperation(btn) {
	calculate();
	if (!["+", "-", "*", "/"].includes(memoryText.slice(-1))) {
		memoryText += String(symbol[btn.value]);
	}
	operation = String(btn.value);
	updateDisplay();
}

//updates display and memory bars
function updateDisplay() {
	memory.textContent = memoryText;
	if (currentResult) {
		if (currentResult[-1] === 0 && currentResult[-2] === ".") {
			currentResult = currentResult.slice[-2];
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

function isInt(num) {
	let result = +num - Math.floor(+num) !== 0;
	return result;
}

for (const btn of btns) {
	btn.addEventListener("click", btnController);
}

function btnController() {
	if (this.classList.contains("numbers")) {
		calInteger(this);
		return;
	} else if (this.classList.contains("op")) {
		calOperation(this);
		return;
	} else if (this.id === "equal") {
		calculate();
		return;
	} else if (this.id === "clear") {
		clear();
		return;
	}
	return;
}

//window.addEventListener("keydown", keyboardSupport)
