function add(a, b) {
    return Math.round((a + b) * 10000) / 10000;
}

function subtract(a, b) {
    return Math.round((a - b) * 10000) / 10000;
}

function multiple(a, b) {
    return Math.round(a * b * 10000) / 10000;
}

function divide(a, b) {
    return Math.round(a / b * 10000) / 10000;
}

let inputArray = ['0'];

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
let validDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", '.'];

let validOperators = ["+", "-", "x", "/", "=", "C", "Del"];
calculator.addEventListener("click", (event) => {
    if (event.target.className.includes("result")) {
        return;
    }


    let pointButton = document.querySelector("#point");
    let inputText = event.target.textContent;

    if (inputText === '^_^') {
        alert('Time gives you answer ^_^');
        return;
    }

    if (validDigits.includes(inputText)) {
        if (inputArray.length === 1) {
            if (inputArray[0].includes('.') && inputText === '.') {
                return;
            }

            let existingElement = inputArray.shift();
            existingElement === '0' ? inputArray.push(inputText) : inputArray.push(existingElement + inputText);
            if (inputArray[0].includes('.')) {
                pointButton.setAttribute('disabled', true);
            }
        } else if (inputArray.length === 2) {
            inputArray.push(inputText);
        } else if (inputArray.length === 3) {
            if (inputArray[2].includes('.') && inputText === '.') {
                return;
            }
            inputArray.push(inputArray.pop() + inputText);
            if (inputArray[2].includes('.')) {
                pointButton.setAttribute('disabled', true);
            }
        } else {
            console.error(`invalid input ${inputText} when temp array is ${inputArray}`);
        }
    } else if (validOperators.includes(inputText)) {
        if (inputText === "C") {
            inputArray = ['0'];
        } else if (inputText === "Del") {
            let inputString = inputArray.toString();
            if (inputString.length === 1) {
                inputArray = ['0'];
            } else {
                inputString = inputString.substring(0, inputString.length - 1);
                inputArray = inputString.split(',');
                if (inputArray.at(-1) === '') {
                    inputArray.pop();
                }
            }
        } else {
            if (inputArray.length === 1 && inputText !== "=") {
                if (inputArray[0] === ".") {
                    alert("Incomplet number.");
                    inputArray = ['0'];
                } else {
                    inputArray.push(inputText);
                }
            } else if (inputArray.length === 2 && inputText !== "=") {
                inputArray.pop();
                inputArray.push(inputText);
            } else if (inputArray.length === 3) {
                if (inputArray[2] === "." || (parseFloat(inputArray[2]) === 0 && inputArray[1] === '/')) {
                    alert(`Invalid operation ${inputArray.toString().replaceAll(',', '')}`);
                    inputArray = ['0'];
                } else {
                    let result = operate(inputArray[1], parseFloat(inputArray[0]), parseFloat(inputArray[2]));
                    inputArray = inputText === "=" ? [result.toString()] : [result.toString(), inputText];
                }
            } else {
                console.error(`invalid input ${inputText} when temp array is ${inputArray}`);
            }
        }
    } else {
        console.log(`unsupported action ${inputText}`);
    }

    expression.textContent = inputArray.toString().replaceAll(',', '');
    if (!inputArray.at(-1).includes('.')) {
        pointButton.removeAttribute('disabled');
    }


})


let body = document.querySelector('body');
body.addEventListener('keydown', (event) => {
    let keyName = event.key;



    switch (keyName) {
        case "*":
            keyName = "x";
            break;
        case "Backspace":
            keyName = "Del";
            break;
        case "Escape":
            keyName = "C";
            break;
        case "Enter":
            keyName = "=";
            break;
    }

    if (!validDigits.includes(keyName) && !validOperators.includes(keyName)) {
        console.warn(`${keyName} is not supported.`);
        return;
    }

    const buttons = calculator.querySelectorAll('button');
    const targetButton = Array.from(buttons).find(button => button.textContent === keyName);

    if (targetButton === undefined) {
        console.error(`No button with key ${keyName}`);
        return;
    }

    targetButton.click();


})


