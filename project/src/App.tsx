import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import Board from './components/Board';
import WordList from './components/WordList';
import { generateBoard, getWordFromCells } from './utils/gameLogic';
import { motion } from 'framer-motion';
import { WORD_CONFIG, type WordType } from './config/words';

const WORDS = Object.keys(WORD_CONFIG);

function App() {
  const [board, setBoard] = useState<string[][]>([]);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [foundWords, setFoundWords] = useState<WordType[]>([]);
  const [foundWordCells, setFoundWordCells] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);

  useEffect(() => {
    setBoard(generateBoard(WORDS));
  }, []);

  const handleCellClick = (row: number, col: number) => {
    const cellKey = `${row}-${col}`;
    
    // If cell is part of a found word, do nothing
    if (foundWordCells.has(cellKey)) return;

    const newSelectedCells = new Set(selectedCells);
    
    if (selectedCells.has(cellKey)) {
      newSelectedCells.delete(cellKey);
    } else {
      newSelectedCells.add(cellKey);
    }
    
    setSelectedCells(newSelectedCells);

    // Check if selected cells form a word
    const selectedWord = getWordFromCells(board, Array.from(newSelectedCells));
    
    if (WORDS.includes(selectedWord) && !foundWords.includes(selectedWord as WordType)) {
      // Word found!
      setFoundWords([...foundWords, selectedWord as WordType]);
      setScore(score + selectedWord.length * 100);
      
      // Add cells to foundWordCells
      newSelectedCells.forEach(cell => {
        foundWordCells.add(cell);
      });
      setFoundWordCells(new Set(foundWordCells));
      
      // Clear selected cells
      setSelectedCells(new Set());
    }
  };

  const isGameComplete = foundWords.length === WORDS.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">Word Search</h1>
          <div className="flex items-center justify-center gap-2 text-xl font-semibold text-indigo-700">
            <Trophy className="w-6 h-6" />
            <span>Score: {score}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <Board
              board={board}
              selectedCells={selectedCells}
              onCellClick={handleCellClick}
              foundWordCells={foundWordCells}
            />
          </div>

          <div className="space-y-6">
            <WordList words={WORDS as WordType[]} foundWords={foundWords} />
            
            {isGameComplete && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-green-100 p-4 rounded-lg shadow-lg text-center"
              >
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  Congratulations!
                </h3>
                <p className="text-green-700">
                  You've found all the words! Final score: {score}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;