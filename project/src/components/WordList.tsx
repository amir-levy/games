import React from 'react';
import { WORD_CONFIG, type WordType } from '../config/words';

interface WordListProps {
  words: WordType[];
  foundWords: WordType[];
}

export default function WordList({ words, foundWords }: WordListProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-indigo-800">Icons to Find</h2>
      <div className="grid grid-cols-3 gap-4">
        {words.map((word) => {
          const { icon: Icon, letters } = WORD_CONFIG[word];
          return (
            <div 
              key={word}
              className={`
                flex flex-col items-center justify-center gap-2 p-3 rounded
                transition-all duration-300
                ${foundWords.includes(word) 
                  ? 'bg-green-100 text-green-800 scale-110' 
                  : 'bg-gray-100 text-gray-800'}
              `}
            >
              <Icon className="w-6 h-6" />
              <div className="text-xs font-medium mt-1">
                {foundWords.includes(word) ? '✓' : `${letters} letters`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}