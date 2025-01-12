function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiple(a, b) {
    return a * b;
}

function divide(a, b) {
    return Math.round(a / b * 10000) / 10000;
}

let number1 = undefined;
let operator = undefined;
let number2 = undefined;
let inputArray = [];

function operate(symbol, num1, num2) {
    switch (symbol) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'x':
            return multiple(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            alert(`${symbol} operator is not supported`);
            return undefined;
    }
}

let calculator = document.querySelector("#calculator");
let expression = document.querySelector(".result");
calculator.addEventListener("click", (event) => {
    if (event.target.className.includes("result")) {
        return;
    }

    let validDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    let validOperators = ["+", "-", "x", "/", "=", "C"]

    let inputText = event.target.textContent;
    if (validDigits.includes(inputText)) {
        if (inputArray.length === 0) {
            number1 = parseInt(inputText);
            inputArray.push(number1);
        } else if (inputArray.length === 1) {
            number1 = parseInt(inputArray.shift() + inputText);
            inputArray.push(number1);
        } else if (inputArray.length === 2) {
            number2 = parseInt(inputText);
            if (number2 !== 0) {
                inputArray.push(number2);
            } else {
                alert(`Cannot divide by ${number2}`);
            }
        } else if (inputArray.length === 3) {
            number2 = parseInt(inputArray.pop() + inputText);
            inputArray.push(number2);
        } else {
            console.error(`invalid input ${inputText} when temp array is ${inputArray}`);
        }
    } else if (validOperators.includes(inputText)) {
        if (inputText === "C") {
            inputArray = [0];
        } else {
            if (inputArray.length === 1 && inputText !== "=") {
                inputArray.push(inputText);
            } else if (inputArray.length === 2) {
                inputArray.pop();
                inputArray.push(inputText);
            } else if (inputArray.length === 3) {

                let result = operate(inputArray[1], inputArray[0], inputArray[2]);
                inputArray = inputText === "=" ? [result] : [result, inputText];
            } else {
                console.error(`invalid input ${inputText} when temp array is ${inputArray}`);
            }
        }

    } else {
        console.log(`unsupported action ${inputText}`);
    }

    expression.textContent = inputArray.toString().replaceAll(',', '');


})