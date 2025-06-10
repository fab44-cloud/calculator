let firstOperand = "";
let secondOperand = "";
let operator = "";

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
        return "Google is your friend at this moment.";
    }
    return a / b;
}

function operate(operator, firstOperand, secondOperand) {
    // The switch expression is evaluated once.
    // The value of the expression is compared with the values of each case.
    // If there is a match, the associated code block is executed.
    // If there is no match, the default code block is executed.
    switch (operator) {
        case "+":
            // Code to execute if operator === "+"
            return add(firstOperand, secondOperand);
        case "-":
            return subtract(firstOperand, secondOperand);
        case "*":
            return multiply(firstOperand, secondOperand);
        case "/":
            return divide(firstOperand, secondOperand);
        default:
            return "Invalid operator";
    }
}

// operate("+", 2, 3)

function displayDigit() {
    const display = document.querySelector(".display");
    const buttons = document.querySelectorAll(".numeric-keys");
    
    // Use .forEach method to iterate over each button.
    buttons.forEach((button) => {
        // console.log(button);
        
        // For each one we add a click event listener.
        button.addEventListener("click", () => {
            // Retrieves text of each button
            // const buttonNumber = button.textContent;
            // display.textContent += buttonNumber;
            firstOperand += display.textContent;
            console.log(firstOperand);
        });
    });
}

displayDigit();
