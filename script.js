// --- Variables ---
let operator = "";
let firstOperand = "";
let secondOperand = "";
let operatorSelected = false;
let resultDisplayed = false;

// --- DOM Elements ---
const display = document.querySelector(".display");

// --- Functions ---
// Create functions for the basic math operators
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

// Create function that takes an operator and two numbers and then calls
// one of the basic math functions
function operate(operator, firstOperand, secondOperand) {
    // The switch expression is evaluated once.
    // The input of the expression is compared with the values of each case.
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

function updateDisplay(input) {
    const display = document.querySelector(".display");
    if (input.length < 13) {
        display.textContent = input;  
    }
}

// Create event listener for number buttons
const numberButtons = document.querySelectorAll(".numeric-keys");
// Use .forEach method to iterate over each button.
numberButtons.forEach((button) => {
        
    // For each button we add a click event listener.
    button.addEventListener("click", () => {
        handleOperandInput(button.textContent);
    });
});

// Create function for the first and second operands
function handleOperandInput(input) {
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
        firstOperand += input;
        if (firstOperand.length < 13) {
            updateDisplay(firstOperand);
            console.log(`First operand: ${firstOperand}`);  
        }
    } else if (operatorSelected) {
        secondOperand += input;
        if (secondOperand.length < 13) {
            updateDisplay(secondOperand);
            console.log(`Second operand: ${secondOperand}`);
        }
    }
}

// Create event listener for operator buttons
const operatorButtons = document.querySelectorAll(".operator-keys");
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        handleOperatorInput(button.textContent);
    });
});  

// Create function for the operator 
function handleOperatorInput(input) {
    if (firstOperand === "") {
        return;
    } else if (!operatorSelected) {
        // Store the operator
        operator = input;
        console.log(`Operator: ${operator}`);
        // Display the operator
        updateDisplay(operator);
        // Set the flag to true
        operatorSelected = true;
        resultDisplayed = false;
    }
}

// Define the equalsButton
const equalsButton = document.querySelector(".equals-button");
// Event listener for equals button
equalsButton.addEventListener("click", () => {
    calculate();
})
    
function calculate() {
        // Convert operands to numbers
    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);
    // Perform the calculation and save it to a variable
    let solution = operate(operator, num1, num2);
    // Set the flag to false after the calculation has finished
    operatorSelected = false;
    
    if (operator === "" || firstOperand === "" || secondOperand === "") {
        return;
    } else if (solution === "Undefined") {
        updateDisplay(solution);
        firstOperand = "";
        operator = "";
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
    }
}

// Define backspace button
const backspaceButton = document.querySelector(".backspace-button");

// Event listener for backspace button
backspaceButton.addEventListener("click", () => {
    backspace();
})

function backspace() {
    if (secondOperand !== "") {
        secondOperand = secondOperand.slice(0, -1);
        updateDisplay(secondOperand);
        console.log(`Second operand after backspace: ${secondOperand}`);
    } else if (firstOperand !== "") {
        firstOperand = firstOperand.slice(0, -1);
        updateDisplay(firstOperand);
        console.log(`First operand after backspace: ${firstOperand}`);
    }
}

// Define the clear button
const clearButton = document.querySelector(".clear-key")

// Event listener for clear button
clearButton.addEventListener("click", () => {
    clearDisplay();    
})    

function clearDisplay() {
    operator = "";
    firstOperand = "";
    secondOperand = "";
    updateDisplay("");
}

// Define decimal button
const decimalButton = document.querySelector(".decimal-key")

// Event listener for decimal button
decimalButton.addEventListener("click", () => {
    displayDecimal();
})

function displayDecimal() {
    // Check if the current display input already contains a decimal
    if (display.textContent.includes('.')) {
        return;
    }
    // Append decimal point to the current operand
    if (!operatorSelected) {
        firstOperand += "."
        updateDisplay(firstOperand);
    } else if (operatorSelected) {
        secondOperand += ".";
        updateDisplay(secondOperand);
    }
}

// Add keyboard support with an event listener
document.addEventListener('keydown', function(e) {
// Get the pressed key
const key = e.key;
    
switch (key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
        console.log(key);
        handleOperandInput(key);
        // Prevent default browser behavior (e.g., typing in a form field)
        e.preventDefault();
        break;
    case '+':
    case '-':
    case '*':
    case '/':
        console.log(key);
        handleOperatorInput(key);
        // Prevent default browser behavior
        e.preventDefault();
        break;
    case 'Enter':
    case '=':
        calculate();
        // Prevent default browser behavior (e.g., submitting a form)
        e.preventDefault();
        break;
    case 'Backspace':
        backspace();
        // Prevent default browser behavior
        e.preventDefault();
        break;
    case 'c':
    case 'C':
    case 'Escape':
        clearDisplay();
        e.preventDefault();
        break;
    case '.':
        displayDecimal();
        e.preventDefault();
        break;
    }
});







