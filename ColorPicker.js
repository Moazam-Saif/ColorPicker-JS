const container = document.querySelector('body');
const buttonContainer = document.querySelector('.left-right-buttons');
const colorpicker = document.querySelector('.color-picker');
const leftButton = document.getElementById('left-button');
const rightButton = document.getElementById('right-button');
const leftColorPicker = document.getElementById('color-picker-left');
const rightColorPicker = document.getElementById('color-picker-right');
const codeContainer = document.querySelector('.code p');

let leftColor = '#ffffff';
let rightColor = '#000000';

const updateBackgroundGradient = () => {
    const code = `linear-gradient(to right, ${leftColor}, ${rightColor})`;
    container.style.background = code;
    if (codeContainer) {
        codeContainer.textContent = `background: ${code}`;
    }
};

const setButtonColors = () => {
    leftButton.style.backgroundColor = leftColor;
    rightButton.style.backgroundColor = rightColor;
    leftButton.textContent = leftColor;
    rightButton.textContent = rightColor;
};

const randomColor = () => {
    const colorString = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += colorString[Math.floor(Math.random() * 16)];
    }
    return color;
};

const initializeColors = () => {
    leftColor = randomColor();
    rightColor = randomColor();
    leftColorPicker.value = leftColor;
    rightColorPicker.value = rightColor;
    setButtonColors();
    updateBackgroundGradient();
};

window.addEventListener('DOMContentLoaded', initializeColors);

buttonContainer.addEventListener('click', (e) => {
    const color = randomColor();
    if (e.target === leftButton) {
        leftColor = color;
        leftColorPicker.value = color;
    } else if (e.target === rightButton) {
        rightColor = color;
        rightColorPicker.value = color;
    }
    setButtonColors();
    updateBackgroundGradient();
});

colorpicker.addEventListener('input', (e) => {
    if (e.target === leftColorPicker) {
        leftColor = leftColorPicker.value.toUpperCase();
    } else if (e.target === rightColorPicker) {
        rightColor = rightColorPicker.value.toUpperCase();
    }
    setButtonColors();
    updateBackgroundGradient();
});

codeContainer.addEventListener('click', () => {
    const code = codeContainer.textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert('Gradient code copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});