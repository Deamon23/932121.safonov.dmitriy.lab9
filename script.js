let display = document.getElementById('display');
let expression = '';

function appendToDisplay(value) {

    const lastChar = expression[expression.length - 1];
    const lastChar3 = expression[expression.length - 3];

    if (lastChar === '-' && (lastChar3 === '*' || lastChar3 === '/')) {
        expression += value;
    } else if ('*/+-'.includes(lastChar)) {
        expression += ' ' + value;
    } else {
        expression += value;
    }
    updateDisplay();
}

function appendToDisplayOper(value) {

    const lastChar = expression[expression.length - 1];
    const lastChar3 = expression[expression.length - 3];
    
    if (expression.length === 0) {
        if (value === '-') {
            expression += value; 
            updateDisplay();
        }
        return;
    } 
    
    if ((lastChar3 === '*' || lastChar3 === '/') && ('*/+-'.includes(lastChar))) {
        if (value !== '-') {
            expression = expression.slice(0, -3) + value; 
            updateDisplay();
        }
        return;
    }
    
    if ('*/+-'.includes(lastChar)) {
        if (value === '-' && (lastChar === '*' || lastChar === '/')) {
            expression += ' ' + value; 
        } else {
            expression = expression.slice(0, -1) + value; 
        }
        updateDisplay();
        return;
    }
    
    expression += ' ' + value; 
    updateDisplay();
}

function clearDisplay() {
    expression = '';
    display.innerHTML = '';
}

function removeLast() {
    expression = expression.slice(0, -1);
    while (expression.endsWith(' ')) {
        expression = expression.slice(0, -1);
    }
    updateDisplay();
}

function calculateResult() {
    const divisionByZeroPattern = /\/\s*0/; 
    if (divisionByZeroPattern.test(expression)) {
        display.innerHTML = '<span style="color: gray;"> Ошибка </span>';
        expression = ''; 
        return;
    }

    if(expression.length>0) try {
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