import fetch from 'node-fetch';


const words = [
 'how', 'what', 'why', 'can', 'should', 'best', 'top', 'most', 'is', 'are', 'do', 'does', 'did', 'where', 'when',
 'which', 'who', 'will', 'would', 'could', 'might', 'can', 'shall', 'has', 'have', 'had', 'make', 'get', 'use',
 'find', 'take', 'come', 'think', 'know', 'go', 'see', 'look', 'want', 'give', 'work', 'call', 'try', 'ask', 'need',
 'feel', 'become', 'leave', 'put', 'mean', 'keep', 'let', 'begin', 'seem', 'help', 'talk', 'turn', 'start', 'show',
 'hear', 'play', 'run', 'move', 'like', 'live', 'believe', 'hold', 'bring', 'happen', 'write', 'provide', 'sit',
 'stand', 'lose', 'pay', 'meet', 'include', 'set', 'learn', 'change', 'lead', 'understand', 'watch', 'follow',
 'stop', 'create', 'speak', 'read', 'allow', 'add', 'spend', 'grow', 'open', 'walk', 'win', 'offer', 'remember',
 'love', 'consider', 'appear', 'buy', 'wait', 'serve', 'send', 'expect', 'build', 'stay', 'fall', 'cut', 'reach',
 'kill', 'remain', 'I', 'you', 'he', 'she', 'it', 'we', 'they', 'his', 'her', 'its', 'us', 'him', 'them', 'my'
];


function getRandomSeedPhrase() {
 const length = Math.floor(Math.random() * 4) + 2; // Generates a number between 2 and 5
 const seedWords = [];
 for (let i = 0; i < length; i++) {
   const randomIndex = Math.floor(Math.random() * words.length);
   seedWords.push(words[randomIndex]);
 }
 return seedWords.join(' ');
}


async function fetchSuggestions(query) {
 try {
   const response = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}`);
   if (!response.ok) {
     throw new Error('Network response was not ok');
   }
   const data = await response.json();
   return data[1];
 } catch (error) {
   console.error(`Error fetching suggestions for query "${query}":`, error);
   return [];
 }
}


export async function fetchAndDisplaySuggestions() {
 let suggestions = [];
 let query = '';
 while (suggestions.length === 0) {
   query = getRandomSeedPhrase();
   suggestions = await fetchSuggestions(query);
 }
 console.log(`Seed phrase: "${query}"`);
 const uniqueSuggestions = [...new Set(suggestions)];
 const randomSuggestion = uniqueSuggestions[Math.floor(Math.random() * uniqueSuggestions.length)];
 // console.log('Random Google search suggestion:');
 // console.log(randomSuggestion);
 return randomSuggestion;
}





