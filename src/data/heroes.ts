// Hero data structure and utilities

export interface Hero {
  id: string;
  name: string;
  gridX: number; // 0-3 (column in sprite sheet)
  gridY: number; // 0-3 (row in sprite sheet)
  unlockOrder?: number;
}

// Placeholder hero data - update with actual hero names
export const HEROES: Hero[] = [
  { id: 'hero-0-0', name: 'Hero 1', gridX: 0, gridY: 0 },
  { id: 'hero-1-0', name: 'Hero 2', gridX: 1, gridY: 0 },
  { id: 'hero-2-0', name: 'Hero 3', gridX: 2, gridY: 0 },
  { id: 'hero-3-0', name: 'Hero 4', gridX: 3, gridY: 0 },
  { id: 'hero-0-1', name: 'Hero 5', gridX: 0, gridY: 1 },
  { id: 'hero-1-1', name: 'Hero 6', gridX: 1, gridY: 1 },
  { id: 'hero-2-1', name: 'Hero 7', gridX: 2, gridY: 1 },
  { id: 'hero-3-1', name: 'Hero 8', gridX: 3, gridY: 1 },
  { id: 'hero-0-2', name: 'Hero 9', gridX: 0, gridY: 2 },
  { id: 'hero-1-2', name: 'Hero 10', gridX: 1, gridY: 2 },
  { id: 'hero-2-2', name: 'Hero 11', gridX: 2, gridY: 2 },
  { id: 'hero-3-2', name: 'Hero 12', gridX: 3, gridY: 2 },
  { id: 'hero-0-3', name: 'Hero 13', gridX: 0, gridY: 3 },
  { id: 'hero-1-3', name: 'Hero 14', gridX: 1, gridY: 3 },
  { id: 'hero-2-3', name: 'Hero 15', gridX: 2, gridY: 3 },
  { id: 'hero-3-3', name: 'Hero 16', gridX: 3, gridY: 3 },
];

export const SPRITE_CONFIG = {
  portrait: {
    spriteSheet: '/images/heroes/heroes-portrait.png',
    spriteSize: 124,
    gridSize: 4,
    totalSize: 496, // 124 * 4
  },
  small: {
    spriteSheet: '/images/heroes/heroes-small.png',
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
