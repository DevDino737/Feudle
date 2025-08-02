import { fetchAndDisplaySuggestions } from './fetchSuggestion.js';
import { createGrid } from './Feudle.js';


let answer = '';
let guessCount = 0;
const maxGuesses = 6;


const guessForm = document.getElementById('guessForm');
const guessBox  = document.getElementById('guessBox');
const results   = document.getElementById('results');
const nextBtn   = document.getElementById('nextRoundBtn');
const tileBoard = document.getElementById('tileBoard');


async function startNewRound() {
 results.innerHTML = '';
 tileBoard.innerHTML = '';
 guessBox.value = '';
 guessBox.disabled = false;
 guessBox.focus();
 guessCount = 0;
 answer = 'apple';
 createGrid(answer.length, maxGuesses);


 console.log('Answer (for testing):', answer); // Remove or comment out later
}


function createTile(letter, color) {
 const tile = document.createElement('div');
 tile.textContent = letter.toUpperCase();
 tile.style.display = 'inline-block';
 tile.style.width = '30px';
 tile.style.height = '30px';
 tile.style.lineHeight = '30px';
 tile.style.margin = '2px';
 tile.style.textAlign = 'center';
 tile.style.fontWeight = 'bold';
 tile.style.borderRadius = '4px';
 tile.style.backgroundColor = color;
 tile.style.color = '#fff';
 return tile;
}


// Return array of colors per letter: 'green', 'yellow', 'gray'
function checkGuess(guess, answer) {
 guess = guess.toLowerCase();
 answer = answer.toLowerCase();


 const colors = Array(guess.length).fill('gray');
 const answerLetterCount = {};


 // Count letters in answer
 for (let char of answer) {
   answerLetterCount[char] = (answerLetterCount[char] || 0) + 1;
 }


 // First pass: mark greens
 for (let i = 0; i < guess.length; i++) {
   if (guess[i] === answer[i]) {
     colors[i] = 'green';
     answerLetterCount[guess[i]] -= 1;
   }
 }


 // Second pass: mark yellows
 for (let i = 0; i < guess.length; i++) {
   if (colors[i] === 'gray' && answerLetterCount[guess[i]] > 0) {
     colors[i] = 'yellow';
     answerLetterCount[guess[i]] -= 1;
   }
 }


 return colors;
}


guessForm.addEventListener('submit', (e) => {
 e.preventDefault();
 if (guessBox.disabled) return; // Don't allow guesses if disabled


 const guess = guessBox.value.trim();
 if (!guess) return;


 if (guess.length !== answer.length) {
   alert(`Your guess must be exactly ${answer.length} letters.`);
   return;
 }


 guessCount++;


 const colors = checkGuess(guess, answer);


 // Show guess in results list
 const li = document.createElement('li');
 li.textContent = guess;
 li.style.color = colors.every(c => c === 'green') ? 'lightgreen' : 'orange';
 results.appendChild(li);


 // Fill the main #grid boxes
 const startIdx = (guessCount - 1) * answer.length;


 for (let i = 0; i < guess.length; i++) {
   const tile = document.getElementById(`box-${startIdx + i}`);
   tile.textContent = guess[i].toUpperCase();


   if (colors[i] === 'green') {
     tile.style.backgroundColor = '#34A853'; // Green
   } else if (colors[i] === 'yellow') {
     tile.style.backgroundColor = '#FBBC05'; // Yellow
   } else {
     tile.style.backgroundColor = '#3a3a3a'; // Gray
   }


   tile.style.color = "#fff"; // Make sure text is readable
 }


 if (colors.every(c => c === 'green')) {
   alert('ðŸŽ‰ Correct! You won!');
   guessBox.disabled = true;
   return;
 }


 if (guessCount >= maxGuesses) {
   alert(`Game over! The correct answer was "${answer.toUpperCase()}".`);
   guessBox.disabled = true;
 }


 guessBox.value = '';
 guessBox.focus();
});


// âœ… START THE GAME AUTOMATICALLY + ENABLE NEXT ROUND
startNewRound();
nextBtn.addEventListener('click', startNewRound);


