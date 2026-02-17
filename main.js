const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const html = document.documentElement;

const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#e67e22'];

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function displayNumbers(numbers) {
    lottoNumbersContainer.innerHTML = '';
    numbers.forEach((number, index) => {
        const ball = document.createElement('div');
        ball.className = 'lotto-ball';
        ball.textContent = number;
        ball.style.backgroundColor = colors[index];
        lottoNumbersContainer.appendChild(ball);
    });
}

generateBtn.addEventListener('click', () => {
    const numbers = generateLottoNumbers();
    displayNumbers(numbers);
});

themeToggleBtn.addEventListener('click', () => {
    if (html.dataset.theme === 'dark') {
        html.dataset.theme = 'light';
        localStorage.setItem('theme', 'light');
    } else {
        html.dataset.theme = 'dark';
        localStorage.setItem('theme', 'dark');
    }
});

// On page load, check for saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.dataset.theme = savedTheme;
});

// Initial generation
const initialNumbers = generateLottoNumbers();
displayNumbers(initialNumbers);