// --- Variables ---
let operator = "";
let firstOperand = "";
let secondOperand = "";
let operatorSelected = false;
let resultDisplayed = false;

// --- DOM Elements ---
const display = document.querySelector(".display");

// --- Functions ---


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
        return "Undefined";
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
    if (value.length < 13) {
        display.textContent = value;  
    }
}

function displayOperator() {
    // Event listener for operator buttons
    const operatorButtons = document.querySelectorAll(".operator-keys");
    operatorButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (firstOperand === "") {
                return;
            } else if (!operatorSelected) {
            // Store the operator
            operator += button.textContent;
            console.log(`Operator: ${operator}`);
            // Display the operator
            updateDisplay(operator);
            // Set the flag to true
            operatorSelected = true;
            resultDisplayed = false;
            }
        });
    });  
}

displayOperator();


// Define the equalsButton
const equalsButton = document.querySelector(".equals-button");

// Event listener for equals button
equalsButton.addEventListener("click", () => {        
    // Convert operands to numbers
    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);
    // Perform the calculation and save it to a variable
    let solution = operate(operator, num1, num2);
    // Set the flag to false after the calculation has finished
    operatorSelected = false;
    
    if (operator === "" || firstOperand === "" || secondOperand === "") {
        return;
    } else if (num2 === 0) {
        updateDisplay(solution);
        operator = "";
        firstOperand = "";
        secondOperand = "";
        resultDisplayed = true;
    } else {
        console.log(`Solution: ${solution}`);
        if (solution !== Math.floor(solution)) {
            // Round the solution to four decimal places
            solution = solution.toFixed(4);
            updateDisplay(solution);
        } else {
            solution = solution.toFixed(0);
            updateDisplay(solution);
        }

        // Reset the calculator for the next calculation
        firstOperand = solution;
        operator = "";
        secondOperand = "";
        resultDisplayed = true;
        console.log("Result displayed is true");
    }
})

function clearDisplay() {
    // Define the clear button
    const clearButton = document.querySelector(".clear-key")

    // Event listener for clear button
    clearButton.addEventListener("click", () => {
        operator = "";
        firstOperand = "";
        secondOperand = "";
        updateDisplay("");
    })   
}

clearDisplay();


// Define backspace button
const backspaceButton = document.querySelector(".backspace-button");

// Event listener for backspace button
backspaceButton.addEventListener("click", () => {
    let currentValue = display.textContent

    if (firstOperand.length > 0) {
        display.textContent = currentValue.slice(0, -1);

        if (!operatorSelected) {
            firstOperand = display.textContent;
            console.log(`First operand after backspace: ${firstOperand}`);
        } else {
            secondOperand = display.textContent;
            console.log(`Second operand after backspace: ${secondOperand}`);
        }
    }
})


// Define decimal button
const decimalButton = document.querySelector(".decimal-key")

// Event listener for decimal button
decimalButton.addEventListener("click", () => {

    // Check if the current display value already contains a decimal
    if (display.textContent.includes('.')) {
        return;
    }

    // Append decimal point to the current operand
    if (!operatorSelected) {
        firstOperand += "."
        updateDisplay(firstOperand);
    } else {
        secondOperand += ".";
        updateDisplay(secondOperand);
    }
})


function displayOperands() {
    const numberButtons = document.querySelectorAll(".numeric-keys");
    
    // Use .forEach method to iterate over each button.
    numberButtons.forEach((button) => {
        
        // For each button we add a click event listener.
        button.addEventListener("click", () => {
            if (resultDisplayed) {
                // Clear the display and secondOperand
                firstOperand = "";
                secondOperand = "";
                console.log("Clearing display");
                updateDisplay("");
                console.log("Display cleared")

                // Reset the flag
                resultDisplayed = false;
            }

            if (!operatorSelected) {
                firstOperand += button.textContent;
                typeof(firstOperand);
                updateDisplay(firstOperand);
                console.log(`First operand: ${firstOperand}`);
            } else if (operatorSelected) {
                secondOperand += button.textContent;
                updateDisplay(secondOperand);
                console.log(`Second operand: ${secondOperand}`);
            }
        });
    });
}

displayOperands();


