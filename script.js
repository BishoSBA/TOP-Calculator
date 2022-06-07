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
		// if (!isInt(currentResult)) {
		// 	currentResult = currentResult.toFixed(1);
		// } else {
		// 	currentResult = currentResult.toFixed(0);
		// }
	}
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

for (const btn of numberBtns) {
	btn.addEventListener("click", calInteger);
}
for (const btn of opBtns) {
	btn.addEventListener("click", calOperation);
}

equal.addEventListener("click", calculate);
clearC.addEventListener("click", clear);

function keyboardSupport() {
	if (this.classList.contains("numbers")) {
		calInteger();
		return;
	} else if (this.classList.contains("op")) {
		calOperation();
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
