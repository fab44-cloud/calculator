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
        return "a/b = c means a = b*c. If b is zero, then a is also zero.";
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

function updateDisplay(value) {
    const display = document.querySelector(".display");
    display.textContent = value;
    console.log(value);
}

function displayOperator() {
    // Event listener for operator buttons
    const operatorButtons = document.querySelectorAll(".operator-keys")
    console.log(operatorButtons);
    operatorButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Store the operator
            operator += button.textContent;
            // Display the operator
            updateDisplay(operator);
        });
    });  
}

displayOperator();

function displayDigit() {
    const buttons = document.querySelectorAll(".numeric-keys");
    
    // Use .forEach method to iterate over each button.
    buttons.forEach((button) => {
        // console.log(button);
        
        // For each button we add a click event listener.
        button.addEventListener("click", () => {
            // Retrieves text of each button
            if (operator === "") {
                firstOperand += button.textContent;
                updateDisplay(firstOperand);
                console.log(firstOperand);  
            } else {
                secondOperand += button.textContent;
                updateDisplay(secondOperand);
                console.log(secondOperand);
                solution = operate(operator, firstOperand, secondOperand);
                console.log(typeof(operator));
                console.log(typeof(firstOperand));
                console.log(solution);
            }
        });
    });
}

displayDigit();
