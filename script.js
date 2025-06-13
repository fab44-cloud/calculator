let operator = "";
let firstOperand = "";
let secondOperand = "";


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
    if (value.length < 13) {
        console.log(value.length);
        display.textContent = value;  
    }
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

// Define the equalsButton
const equalsButton = document.querySelector(".equals-button");

// Event listener for equals button
equalsButton.addEventListener("click", () => {
    if (operator === "" || firstOperand === "" || secondOperand === "") {

    } else {
        // Convert operands to numbers
        const num1 = parseFloat(firstOperand);
        const num2 = parseFloat(secondOperand);
        // Perform the calculation and save it to a variable
        const solution = operate(operator, num1, num2);
        // Convert solution to a string to be able to get the length
        let solutionString = solution.toString();
        console.log(solutionString);
        updateDisplay(solutionString);
        // Reset the calculator for the next calculation
        operator = "";
        firstOperand = solution;
        secondOperand = "";
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
            // Retrieves text of each button
            if (operator === "") {
                firstOperand += button.textContent;
                updateDisplay(firstOperand);
                console.log(firstOperand);
                console.log(typeof(firstOperand));
            } else {
                secondOperand += button.textContent;
                updateDisplay(secondOperand);
                console.log(secondOperand);
            }
        });
    });
}

displayOperands();
