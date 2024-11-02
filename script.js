let display = document.getElementById('display');
let expression = '';

function appendToDisplay(value) {
    // Проверяем, чтобы не добавлять два оператора подряд
    const lastChar = expression[expression.length - 1];
    if ((lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') && (value === '+' || value === '-' || value === '*' || value === '/')) {
        return; // Игнорируем добавление, если последний символ - оператор
    }

    // Добавляем пробел перед оператором, если это не первый символ
    if (expression.length > 0 && (value === '+' || value === '-' || value === '*' || value === '/')) {
        expression += ' '; // Добавляем пробел перед оператором
    }

    expression += value; // Добавляем к полному выражению

    // Добавляем пробел после оператора, если это не последний символ
    if (expression.length > 1 && !isNaN(lastChar) && (value === '+' || value === '-' || value === '*' || value === '/')) {
        expression += ' '; // Добавляем пробел после оператора
    }

    display.value = expression; // Обновляем дисплей
}

function clearDisplay() {
    expression = ''; // Очищаем полное выражение
    display.value = '';
}

function removeLast() {
    expression = expression.slice(0, -1); // Удаляем последний символ из полного выражения
    display.value = expression; // Обновляем дисплей
}

function calculateResult() {
    try {
        // Используем функцию new Function для вычисления выражения
        let result = new Function('return ' + expression.replace(/\s+/g, ''))(); // Убираем пробелы при вычислении
        display.value = result; // Показываем результат
        expression = result.toString(); // Обновляем выражение на результат
    } catch (error) {
        display.value = 'Error'; // Обработка ошибок
        expression = ''; // Очищаем выражение при ошибке
    }
}