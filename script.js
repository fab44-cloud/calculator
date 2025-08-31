const calculator = {
    operator: null,
    firstOperand: null,
    secondOperand: "",
    operatorSelected: false,
    resultDisplayed: false,
    waitingForSecondOperand: false,
    displayValue: "",
    errorState: false,
};

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

// --- Display Functions ---
function updateDisplay(input) {
    if (input.toString().length < 13) {
        display.textContent = input;  
    }
}

function clearDisplay() {
    calculator.operator = null;
    calculator.firstOperand = null;
    calculator.secondOperand = "";
    calculator.operatorSelected = false;
    calculator.resultDisplayed = false;
    calculator.waitingForSecondOperand = false;
    calculator.displayValue = "";
    updateDisplay("");
}

// --- Operand Input Handler ---
function handleOperandInput(input) {
    if (calculator.errorState) {
        clearDisplay();
        calculator.errorState = false;
        calculator.firstOperand = input;
        console.log(`First operand: ${calculator.firstOperand}`);
        updateDisplay(calculator.firstOperand);
    }
    else if (calculator.resultDisplayed) {
        clearDisplay();
        calculator.firstOperand = input;
        updateDisplay(calculator.firstOperand);
    }
    // Handle operand input after an operator.
    else if (calculator.operatorSelected) {
        console.log(calculator.operatorSelected);
        calculator.secondOperand += input;
        updateDisplay(calculator.secondOperand);
        console.log(`Second operand: ${calculator.secondOperand}`);
    }
    // Handle first operand input.
    else {
        calculator.firstOperand = calculator.firstOperand === null ? input : calculator.firstOperand + input;
        updateDisplay(calculator.firstOperand);
        console.log(`First operand: ${calculator.firstOperand}`);
    }
}

// --- Operator Input Handler --- 
function handleOperatorInput(input) {
    if (calculator.firstOperand === null) {
        return;
    }
    // If an operation is queued, calculate it first.
    if (calculator.operatorSelected && calculator.secondOperand !== "") {
        calculate(); // Calculate result of the previous operation
        // The result of 'calculate()' becomes the new firstOperand
    }

    if (calculator.firstOperand === null && calculator.resultDisplayed) {
        return;
    }
    
    calculator.operator = input;
    calculator.operatorSelected = true;
    calculator.secondOperand = "";
    calculator.resultDisplayed = false;
    updateDisplay(input);
    console.log(`Operator: ${calculator.operator}`);
}

// --- Calculate Function ---
function calculate() {
    if (calculator.firstOperand === null || calculator.secondOperand === "" || calculator.operator === null) {
        return;
    }

    // Convert operands to numbers
    const num1 = parseFloat(calculator.firstOperand);
    const num2 = parseFloat(calculator.secondOperand);
    // Perform the calculation and save it to a variable
    let solution = operate(calculator.operator, num1, num2);

    // Check for division by zero before performing the operation
    if (solution === "Undefined") {
        updateDisplay(solution);
        console.log(solution);
        calculator.errorState = true;
        return;
    }
    
    // Handle floating point results
    if (solution % 1 !== 0) {
        solution = solution.toFixed(4);
    }
    
    updateDisplay(solution);
    // Reset state for next operation
    calculator.firstOperand = solution.toString();
    calculator.secondOperand = "";
    calculator.operator = null;
    calculator.operatorSelected = false;
    calculator.resultDisplayed = true;
    
}

// --- Backspace Function ---
function backspace() {
    if (calculator.resultDisplayed){
        return;
    }
    if (calculator.secondOperand !== "") {
        calculator.secondOperand = calculator.secondOperand.slice(0, -1);
        updateDisplay(calculator.secondOperand === "" ? calculator.firstOperand : calculator.secondOperand);
        console.log(`Second operand after backspace: ${calculator.secondOperand}`);
    } else if (calculator.operatorSelected) {
        calculator.operator = null;
        calculator.operatorSelected = false;
        updateDisplay(calculator.firstOperand);
        console.log(`First operand after backspace: ${calculator.firstOperand}`);
    } else if (calculator.firstOperand !== null) {
        calculator.firstOperand = calculator.firstOperand.slice(0, -1);
        updateDisplay(calculator.firstOperand || "");
    }
}

// --- Decimal Handler ---
function handleDecimal() {
    if (!calculator.operatorSelected) {
        if (calculator.firstOperand === null) {
            calculator.firstOperand = "0.";
            updateDisplay(calculator.firstOperand);
        } else if (!calculator.firstOperand.includes('.')) {
            calculator.firstOperand += '.';
            updateDisplay(calculator.firstOperand);
        }
    } else {
        if (!calculator.secondOperand.includes('.')) {
            calculator.secondOperand += ".";
            updateDisplay(calculator.secondOperand);
        }  
    }
}

// --- Event Listeners ---
const numberButtons = document.querySelectorAll(".numeric-keys");
// Use .forEach method to iterate over each button.
numberButtons.forEach((button) => {
    // For each button we add a click event listener.
    button.addEventListener("click", () => {
        handleOperandInput(button.textContent);
    });
});

// Create event listener for operator buttons
const operatorButtons = document.querySelectorAll(".operator-keys");
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        handleOperatorInput(button.textContent);
    });
});

// Define the equalsButton
const equalsButton = document.querySelector(".equals-button");
// Event listener for equals button
equalsButton.addEventListener("click", () => {
    calculate();
});

// Define backspace button
const backspaceButton = document.querySelector(".backspace-button");
// Event listener for backspace button
backspaceButton.addEventListener("click", () => {
    backspace();
});

// Define the clear button
const clearButton = document.querySelector(".clear-key")
// Event listener for clear button
clearButton.addEventListener("click", () => {
    clearDisplay();    
});

// Define decimal button
const decimalButton = document.querySelector(".decimal-key")
// Event listener for decimal button
decimalButton.addEventListener("click", () => {
    handleDecimal();
});

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
        equalsButton.click();
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
        handleDecimal();
        e.preventDefault();
        break;
    }
});







