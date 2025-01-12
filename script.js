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

let number1 = 0;
let operator = '+';
let number2 = 0;

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