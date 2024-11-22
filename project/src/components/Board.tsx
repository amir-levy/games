import React from 'react';
import { motion } from 'framer-motion';

interface BoardProps {
  board: string[][];
  selectedCells: Set<string>;
  onCellClick: (row: number, col: number) => void;
  foundWordCells: Set<string>;
}

export default function Board({ 
  board, 
  selectedCells,
  onCellClick,
  foundWordCells
}: BoardProps) {
  const getCellStatus = (row: number, col: number) => {
    const cellKey = `${row}-${col}`;
    if (foundWordCells.has(cellKey)) return 'found';
    if (selectedCells.has(cellKey)) return 'selected';
    return 'default';
  };

  const getCellStyles = (status: 'default' | 'selected' | 'found') => {
    switch (status) {
      case 'found':
        return 'bg-green-500 text-white cursor-not-allowed';
      case 'selected':
        return 'bg-indigo-500 text-white';
      default:
        return 'bg-white text-indigo-800 hover:bg-indigo-200';
    }
  };

  return (
    <div className="grid grid-cols-6 gap-1 bg-indigo-100 p-4 rounded-lg shadow-lg">
      {board.map((row, rowIndex) => (
        row.map((letter, colIndex) => {
          const status = getCellStatus(rowIndex, colIndex);
          return (
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              whileHover={status === 'default' ? { scale: 1.05 } : {}}
              className={`
                w-12 h-12 sm:w-14 sm:h-14 
                flex items-center justify-center 
                rounded-lg font-bold text-xl
                transition-colors duration-200
                ${getCellStyles(status)}
                shadow-sm
              `}
              onClick={() => onCellClick(rowIndex, colIndex)}
            >
              {letter}
            </motion.div>
          );
        })
      ))}
    </div>
  );
}