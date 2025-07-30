export function createGrid(wordLength, maxGuesses) {
  const grid = document.getElementById('grid');
  grid.innerHTML = ''; // Clear previous grid

  for (let row = 0; row < maxGuesses; row++) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    rowDiv.style.display = 'flex';

    for (let col = 0; col < wordLength; col++) {
      const tileIndex = row * wordLength + col;
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.id = `box-${tileIndex}`;
      tile.style.width = '40px';
      tile.style.height = '40px';
      tile.style.margin = '4px';
      tile.style.border = '2px solid #888';
      tile.style.display = 'flex';
      tile.style.alignItems = 'center';
      tile.style.justifyContent = 'center';
      tile.style.fontWeight = 'bold';
      tile.style.fontSize = '20px';
      tile.style.backgroundColor = '#1e1e1e';
      tile.style.color = '#fff';

      rowDiv.appendChild(tile);
    }

    grid.appendChild(rowDiv);
  }
}  