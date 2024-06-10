const wordInput = document.getElementById('wordInput');
const shiftButton = document.getElementById('shiftButton');
const shiftedWordContainer = document.getElementById('shiftedWordContainer');
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const resultContainer = document.getElementById('resultContainer');
const popupContainer = document.getElementById('popupContainer');
const popupMessage = document.getElementById('popupMessage');
const playAgainButton = document.getElementById('playAgainButton');

let shiftedWord;
let shiftValue;

shiftButton.addEventListener('click', () => {
    const word = wordInput.value.toLowerCase();
    if (word) {
        shiftValue = Math.floor(Math.random() * 26); // Random shift value between 0 and 25
        shiftedWord = shiftWord(word, shiftValue);
        shiftedWordContainer.textContent = `Shifted Word: ${shiftedWord}`;
        // wordInput.value = '';
        guessInput.value = '';
        resultContainer.textContent = '';
    }
});

guessButton.addEventListener('click', () => {
    const guess = parseInt(guessInput.value);
    if (guess >= 0 && guess <= 25) {
        if (guess === shiftValue) {
            showPopup('Congratulations! You guessed the correct shift value.', true);
        } else {
            showPopup('Sorry, your guess is incorrect. Please try again.', false);
        }
    } else {
        showPopup('Invalid guess. Please enter a value between 0 and 25.', false);
    }
});

playAgainButton.addEventListener('click', () => {
    hidePopup();
    shiftedWordContainer.textContent = '';
    guessInput.value = '';
    resultContainer.textContent = '';
});

function shiftWord(word, shift) {
    let shiftedString = '';
    for (let i = 0; i < word.length; i++) {
        const charCode = word.charCodeAt(i);
        if (charCode >= 97 && charCode <= 122) {
            shiftedString += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
        } else {
            shiftedString += word[i];
        }
    }
    return shiftedString;
}

function showPopup(message, isCorrect) {
    popupMessage.textContent = message;
    popupContainer.style.display = 'flex';
    if (isCorrect) {
        popupMessage.style.color = 'green';
    } else {
        popupMessage.style.color = 'red';
    }
}

function hidePopup() {
    popupContainer.style.display = 'none';
}