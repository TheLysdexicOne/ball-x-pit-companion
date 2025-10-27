// Hero data structure and utilities

import { getImagePath } from '@/utils/basePath';

export interface Hero {
  id: string;
  name: string;
  gridX: number; // 0-3 (column in sprite sheet)
  gridY: number; // 0-3 (row in sprite sheet)
  unlockOrder?: number;
}

// Placeholder hero data - update with actual hero names
export const HEROES: Hero[] = [
  { id: 'warrior', name: 'The Warrior', gridX: 0, gridY: 0 },
  { id: 'itchy-finger', name: 'The Itchy Finger', gridX: 1, gridY: 0 },
  { id: 'repentant', name: 'The Repentant', gridX: 2, gridY: 0 },
  { id: 'cohabitants', name: 'The Cohabitants', gridX: 3, gridY: 0 },
  { id: 'embedded', name: 'The Embedded', gridX: 0, gridY: 1 },
  { id: 'cogitator', name: 'The Cogitator', gridX: 1, gridY: 1 },
  { id: 'empty-nester', name: 'The Empty Nester', gridX: 2, gridY: 1 },
  { id: 'shade', name: 'The Shade', gridX: 3, gridY: 1 },
  { id: 'shieldbearer', name: 'The Shieldbearer', gridX: 0, gridY: 2 },
  { id: 'spendthrift', name: 'The Spendthrift', gridX: 1, gridY: 2 },
  { id: 'flagellant', name: 'The Flagellant', gridX: 2, gridY: 2 },
  { id: 'juggler', name: 'The Juggler', gridX: 3, gridY: 2 },
  { id: 'physicist', name: 'The Physicist', gridX: 0, gridY: 3 },
  { id: 'tactician', name: 'The Tactician', gridX: 1, gridY: 3 },
  { id: 'makeshift-sysiphus', name: 'The Makeshift Sysiphus', gridX: 2, gridY: 3 },
  { id: 'radical', name: 'The Radical', gridX: 3, gridY: 3 },
];

export const SPRITE_CONFIG = {
  portrait: {
    spriteSheet: getImagePath('/images/heroes/heroes-portrait.png'),
    spriteSize: 124,
    gridSize: 4,
    totalSize: 496, // 124 * 4
  },
  small: {
    spriteSheet: getImagePath('/images/heroes/heroes-small.png'),
    spriteSize: 18,
    gridSize: 4,
    totalSize: 72, // 18 * 4
  },
};

export function getSpritePosition(gridX: number, gridY: number, type: 'portrait' | 'small') {
  const config = SPRITE_CONFIG[type];
  return {
    x: gridX * config.spriteSize,
    y: gridY * config.spriteSize,
  };
}
