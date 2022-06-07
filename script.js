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
	equal: "",
};
const memory = document.querySelector(".memory p");
const display = document.querySelector(".display p");
const btns = document.querySelectorAll("button");
const backtrack = document.querySelector("#backtrack");

function calculate(btn) {
	let a = 0;
	let b = 0;
	if (+currentResult) {
		a = +currentResult;
	} else {
		a = +numberA;
	}
	memoryText = String(a);
	if (!["+", "-", "*", "/", "."].includes(memoryText.slice(-1))) {
		memoryText += String(symbol[operation]);
	}
	if (numberB) {
		b = +numberB;
		memoryText += numberB + String(symbol[btn.value]);
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
	if (btn.value === "." && memoryText.includes(".")) return;
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
	if (!operation) {
		operation = String(btn.value);
	}
	calculate(btn);
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
	operation = "";
	currentResult = "";
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
		calculate(this);
		return;
	} else if (this.id === "clear") {
		clear();
		return;
	}
	return;
}

function keyboardSupport(e) {
	console.log(e.keyCode);
	const btn = document.querySelector(`[data-key="${e.keyCode}"]`);
	if (!btn) return;
	btn.click();
}

window.addEventListener("keydown", keyboardSupport);
