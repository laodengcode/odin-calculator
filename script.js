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
    return a / b;
}

let number1 = undefined;
let operator = undefined;
let number2 = undefined;

function operate(symbol, num1, num2) {
    switch (symbol) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
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

    let validOperators = ["+", "-", "x", "/", "=", ".", "C"]

    let inputText = event.target.textContent;
    if (validOperators.includes(inputText) || validDigits.includes(inputText)) {
        let userInput = document.createTextNode(inputText);
        expression.appendChild(userInput);
    }


})