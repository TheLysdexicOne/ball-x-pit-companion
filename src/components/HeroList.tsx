'use client';

import React, { useState } from 'react';
import { Hero, HEROES } from '@/data/heroes';
import HeroSprite from './HeroSprite';

type SpriteType = 'portrait' | 'small';

export default function HeroList() {
  const [heroes, setHeroes] = useState<Hero[]>(HEROES);
  const [spriteType, setSpriteType] = useState<SpriteType>('portrait');
  const [draggedHeroId, setDraggedHeroId] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleDragStart = (heroId: string) => (e: React.DragEvent) => {
    setDraggedHeroId(heroId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (index: number) => (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setHoveredIndex(index);
  };

  const handleDragLeave = () => {
    setHoveredIndex(null);
  };

  const handleDrop = (dropIndex: number) => (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedHeroId) return;

    const dragIndex = heroes.findIndex(h => h.id === draggedHeroId);
    if (dragIndex === dropIndex) return;

    const newHeroes = [...heroes];
    const [draggedHero] = newHeroes.splice(dragIndex, 1);
    newHeroes.splice(dropIndex, 0, draggedHero);

    setHeroes(newHeroes);
    setDraggedHeroId(null);
    setHoveredIndex(null);
  };

  return (
    <div>
      {/* Sprite Type Toggle */}
      <div className="mb-4 flex justify-center gap-4">
        <button
          onClick={() => setSpriteType('portrait')}
          className={`rounded px-4 py-2 font-pixel ${
            spriteType === 'portrait' ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
        >
          Portrait
        </button>
        <button
          onClick={() => setSpriteType('small')}
          className={`rounded px-4 py-2 font-pixel ${
            spriteType === 'small' ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
        >
          Small
        </button>
      </div>

      {/* Hero Grid - 2 rows of 8 */}
      <div className="flex flex-col items-center gap-4">
        {/* First row - 8 heroes */}
        <div className="flex justify-center gap-4">
          {heroes.slice(0, 8).map((hero, index) => (
            <div
              key={hero.id}
              className={`transition-all ${hoveredIndex === index ? 'scale-110' : ''}`}
              onDragOver={handleDragOver(index)}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop(index)}
            >
              <HeroSprite
                hero={hero}
                type={spriteType}
                draggable
                highlighted={hoveredIndex === index}
                onDragStart={handleDragStart(hero.id)}
                className="transition-transform hover:scale-105"
              />
              <p className="mt-2 text-center font-pixel text-sm">{hero.name}</p>
            </div>
          ))}
        </div>

        {/* Second row - 8 heroes */}
        <div className="flex justify-center gap-4">
          {heroes.slice(8, 16).map((hero, index) => (
            <div
              key={hero.id}
              className={`transition-all ${hoveredIndex === index + 8 ? 'scale-110' : ''}`}
              onDragOver={handleDragOver(index + 8)}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop(index + 8)}
            >
              <HeroSprite
                hero={hero}
                type={spriteType}
                draggable
                highlighted={hoveredIndex === index + 8}
                onDragStart={handleDragStart(hero.id)}
                className="transition-transform hover:scale-105"
              />
              <p className="mt-2 text-center font-pixel text-sm">{hero.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
