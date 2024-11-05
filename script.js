let display = document.getElementById('display');
let expression = '';

function appendToDisplay(value) {

    const lastChar = expression[expression.length - 1];
    if ((lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') && (value === '+' || value === '-' || value === '*' || value === '/')) {
        return;
    }

    if (expression.length > 0 && (value === '+' || value === '-' || value === '*' || value === '/')) {
        expression += ' '; 
    }
    
    expression += value;

    if (expression.length > 1 && !isNaN(lastChar) && (value === '+' || value === '-' || value === '*' || value === '/')) {
        expression += ' '; 
    }

    updateDisplay(); 
}

function clearDisplay() {
    expression = ''; 
    display.innerHTML = ''; 
}

function removeLast() {
    expression = expression.slice(0, -1); 
    updateDisplay(); 
}

function calculateResult() {
    try {
        let result = eval(expression.replace(/\s+/g, ''));
        result = Math.round(result * 100) / 100; 
        display.innerHTML = `<span style="color: black;">${result}</span>`;
        expression = result.toString(); 
    } catch (error) {
        expression = '';
    }
}

function updateDisplay() {
    const parts = expression.split(' ').map((part, index) => {
        return `<span style="color: ${index === expression.split(' ').length - 1 ? 'black' : 'gray'};">${part}</span>`;
    });
    display.innerHTML = parts.join(' ');
}