const passState = {
    'numbers': true,
    'upperCase': true,
    'specialSybmbols': true,
};

const generateBtn = document.querySelector('#generateBtn');
const lengthRange = document.querySelector('#passLength');
const passBox = document.querySelector('.content__password');
const rangeValue = document.querySelector('#rangeValue');

const passInputs = document.querySelectorAll('[name="passProperties"]');
const [numbers, upperCase, specialSybmbols] = Array.from(passInputs);

function handleCheckbox({target}) {
    if (target.tagName === 'INPUT') {
        passState[target.value] = !passState[target.value];
    }
}

const inputsBox = document.querySelector('.content__selectors');
inputsBox.addEventListener('click', handleCheckbox);

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabetUpperCase = alpha.map((x) => String.fromCharCode(x));
const alphabetLowerCase = alphabetUpperCase.map(letter => letter.toLowerCase());
const allNumbers = Array.from(Array(10).keys());
const specialSymbols = ['+', '-', '_', '/', '$', '#', '@', ';', ':'];

function createPassword(length) {
    let allChar = [...alphabetLowerCase];

    if (passState.numbers === true && passState.upperCase === true && passState.specialSybmbols === true) {
        allChar = [...allChar, ...alphabetUpperCase, ...allNumbers, ...specialSymbols];
    } else {
        const propList = {
            'numbers': allNumbers, 
            'upperCase': alphabetUpperCase, 
            'specialSybmbols': specialSymbols,
        };

        for (prop in passState) {
            if (passState[prop]) {
                allChar = [...allChar, ...propList[prop]];
            }
        }
    }

    allChar = [...allChar, ...allChar];
   
    allChar.sort(function() { return 0.5 - Math.random() });
    const newPassword = allChar.slice(0, length).join('');
    
    passBox.innerHTML = highlightPassword(newPassword);
}

function highlightPassword(password) {
    const passChars = [...password];
    const highlightedPass = passChars.reduce((acc, char) => {
        if (!isNaN(+char)) {
            return acc += `<span class='number'>${char}</span>`;
        } else if (char.match(/\+|\-|\_|\$|\/|\#|\@|\;|\:/)) {
            return acc += `<span class='symbol'>${char}</span>`;
        } else {
            return acc += char;
        }
    }, '');
    return highlightedPass;
}

lengthRange.addEventListener('input', ({target}) => {
    rangeValue.innerHTML = target.value;
});

generateBtn.addEventListener('click', () => {
    createPassword(+lengthRange.value);
});

(() => {
    createPassword(+lengthRange.value);
    rangeValue.innerHTML = lengthRange.value;
})();
