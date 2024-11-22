import { Dog, Cat, Snail, Fish, Turtle } from 'lucide-react';

export const WORD_CONFIG = {
  'כלב': {
    icon: Dog,
    letters: 3
  },
  'חתול': {
    icon: Cat,
    letters: 4
  },
   'דג': {
    icon: Fish,
    letters: 2
  },
  'צב': {
    icon: Turtle,
    letters: 2
  },
  'חילזון': {
    icon: Snail,
    letters: 6
  }
} as const;

export type WordType = keyof typeof WORD_CONFIG;