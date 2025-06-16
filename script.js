let operator = "";
let firstOperand = "";
let secondOperand = "";
let operatorSelected = false;
let resultDisplayed = false;


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
            // Check if an operator has been selected
            if (!operatorSelected) {
            // Store the operator
            operator += button.textContent;
            // Display the operator
            updateDisplay(operator);
            // Set the flag to true
            operatorSelected = true;
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
    const display = document.querySelector(".display");
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
    } else {
        console.log(solution)
        console.log(typeof(solution))
        if (solution !== Math.floor(solution)) {
            // Round the solution to four decimal places
            solution = solution.toFixed(4);
            updateDisplay(solution);
        } else {
            solution = solution.toFixed(0);
            updateDisplay(solution);
        }

        // Reset the calculator for the next calculation
        operator = "";
        firstOperand = solution;
        secondOperand = "";
        resultDisplayed = true;
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


function displayOperands() {
    const numberButtons = document.querySelectorAll(".numeric-keys");
    
    // Use .forEach method to iterate over each button.
    numberButtons.forEach((button) => {
        // console.log(button);
        
        // For each button we add a click event listener.
        button.addEventListener("click", () => {
            if (resultDisplayed) {
                // Clear the display and operands
                firstOperand = "";
                secondOperand = "";
                updateDisplay("");

                // Reset the flag
                resultDisplayed = false;
            }
            if (!operatorSelected) {
                firstOperand += button.textContent;
                updateDisplay(firstOperand);
                console.log(firstOperand);
                console.log(typeof(firstOperand));
            } else if (operatorSelected) {
                secondOperand += button.textContent;
                updateDisplay(secondOperand);
                console.log(secondOperand);
                console.log(typeof(secondOperand));
            }
        });
    });
}

displayOperands();
