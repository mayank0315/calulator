// Calculator functionality
const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = '';

function updateDisplay(value) {
    display.value = value;
}

function handleOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') calculate();
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay(currentInput);
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const key = button.getAttribute('data-key');

        if (key >= '0' && key <= '9' || key === '.') {
            currentInput += key;
            updateDisplay(currentInput);
        } else if (key === 'C') {
            currentInput = '';
            previousInput = '';
            operator = '';
            updateDisplay('');
        } else if (key === '=') {
            calculate();
        } else {
            handleOperator(key);
        }
    });
});

// Keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') {
        currentInput += e.key;
        updateDisplay(currentInput);
    } else if (e.key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
    } else if (e.key === 'Enter') {
        calculate();
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        handleOperator(e.key);
    } else if (e.key === 'Escape') {
        currentInput = '';
        previousInput = '';
        operator = '';
        updateDisplay('');
    }
});
