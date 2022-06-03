let numberA = "";
let numberB = "";
let operation = "";
let memoryText = "";
let currentResult = "";
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

function calculate() {
	let a = 0;
	let b = 0;
	if (currentResult) {
		a = parseFloat(currentResult);
	} else {
		a = parseFloat(numberA);
	}
	b = parseFloat(numberB);
	console.log(a, b);
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
	currentResult = currentResult.toFixed(2);
	updateDisplay();
}

function calInteger() {
	memoryText += String(this.value);
	if (!operation) {
		numberA += String(this.value);
		updateDisplay();
	} else {
		numberB += this.value;
		calculate();
	}
}

function calOperation() {
	numberB = "";
	memoryText += String(symbol[this.value]);
	operation = String(this.value);
	updateDisplay();
}

function updateDisplay() {
	memory.textContent = memoryText;
	console.log(currentResult[-1]);
	if (currentResult) {
		if (currentResult[-1] === 0) {
			if (currentResult[-2] === 0) {
				currentResult.slice[-2];
			}
			currentResult.slice[-1];
		}
		display.textContent = currentResult;
	}
	//display.textContent = ` ${numberA} ${symbol[operation]} ${numberB}`;
}

for (const btn of numberBtns) {
	btn.addEventListener("click", calInteger);
}
for (const btn of opBtns) {
	btn.addEventListener("click", calOperation);
}

equal.addEventListener("click", calculate);
