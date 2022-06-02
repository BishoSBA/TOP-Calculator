let numberA = 0;
let numberB = 0;
let operation = "";

function calculate(op) {
	switch (op) {
		case "add":
			return a + b;
		case "subtract":
			return a - b;
		case "multiply":
			return a * b;
		case "divide":
			return a / b;
	}
}

function calInteger(btn) {
	if (numberA === 0) {
		numberA = btn.value;
	}
}

const btns = document.querySelectorAll("button");
for (const btn in btns) {
	if (Number.isInteger(btn.value)) {
		btn.addEventListener("click", () => calculate());
	}
}
