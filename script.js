let num1;
let num2;
let operator;

function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    if (b === 0) {
        return "Cannot divide by zero";
    }
    return a / b;
}

function operate(operator, num1, num2) {
    // The switch expression is evaluated once.
    // The value of the expression is compared with the values of each case.
    // If there is a match, the associated code block is executed
    // If there is no match, the default code block is executed
    switch (operator) {
        case "+":
            // Code to execute if operator === "+"
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return "Invalid operator";
    }
}

// operate("+", 2, 3)
