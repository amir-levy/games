export function generateBoard(words: string[]): string[][] {
  const size = 6;
  const board: string[][] = Array(size).fill(null).map(() => Array(size).fill(''));
  const directions = [
    [0, 1],   // right
    [1, 0],   // down
    [1, 1],   // diagonal right down
    [-1, 1],  // diagonal right up
  ];

  // Place words
  for (const word of words) {
    let placed = false;
    while (!placed) {
      const direction = directions[Math.floor(Math.random() * directions.length)];
      const [dx, dy] = direction;
      
      // Try to find a valid position
      for (let attempt = 0; attempt < 100 && !placed; attempt++) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        
        if (canPlaceWord(board, word, row, col, dx, dy, size)) {
          placeWord(board, word, row, col, dx, dy);
          placed = true;
        }
      }
      
      if (!placed) {
        // If we couldn't place the word, try a different direction
        continue;
      }
    }
  }

  // Fill empty spaces
  const letters = 'אבגדהוזחטיכלמנסעפצקרשת';
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] === '') {
        board[i][j] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return board;
}

function canPlaceWord(
  board: string[][],
  word: string,
  row: number,
  col: number,
  dx: number,
  dy: number,
  size: number
): boolean {
  if (
    row + dx * (word.length - 1) >= size ||
    row + dx * (word.length - 1) < 0 ||
    col + dy * (word.length - 1) >= size ||
    col + dy * (word.length - 1) < 0
  ) {
    return false;
  }

  for (let i = 0; i < word.length; i++) {
    const currentCell = board[row + dx * i][col + dy * i];
    if (currentCell !== '' && currentCell !== word[i]) {
      return false;
    }
  }

  return true;
}

function placeWord(
  board: string[][],
  word: string,
  row: number,
  col: number,
  dx: number,
  dy: number
): void {
  for (let i = 0; i < word.length; i++) {
    board[row + dx * i][col + dy * i] = word[i];
  }
}

export function getWordFromCells(
  board: string[][],
  cells: string[]
): string {
  return cells
    .map(cell => {
      const [row, col] = cell.split('-').map(Number);
      return board[row][col];
    })
    .join('');
}