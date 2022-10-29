const lengthRange = document.querySelector('#passLength');
const passBox = document.querySelector('.content__password');
const rangeValue = document.querySelector('#rangeValue');

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));
const alphabetLowerCase = alphabet.map(letter => letter.toLowerCase());
const numbers = Array.from(Array(10).keys());
const specialSymbols = ['+', '-', '_', '/', '$', '#', '@', ';', ':'];

function createPassword(length) {
    const allChar = [...alphabet, ...alphabetLowerCase, ...numbers, ...specialSymbols];
    allChar.sort(function() { return 0.5 - Math.random() });
    const newPassword = allChar.slice(0, length);
    passBox.innerHTML = newPassword.join('');
}

lengthRange.addEventListener('input', ({target}) => {
    createPassword(+target.value);
    rangeValue.innerHTML = target.value;
});

(() => {
    createPassword(+lengthRange.value);
    rangeValue.innerHTML = lengthRange.value;
})();
