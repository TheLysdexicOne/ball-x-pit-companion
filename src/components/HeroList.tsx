'use client';

import React, { useState, useEffect } from 'react';
import { Hero, HEROES } from '@/data/heroes';
import HeroSprite from './HeroSprite';
import { useProgressData } from '@/hooks/useProgressData';

type SpriteType = 'portrait' | 'small';

// Fixed sizes for consistent overlay dimensions
const PORTRAIT_SIZE = 192; // Larger portrait size for 4-column layout

// Define fixed scales for each sprite type
const SPRITE_SCALES = {
  portrait: 1.2,
  small: 5,
} as const;

export default function HeroList() {
  const { getSortedHeroes, updateHeroOrders } = useProgressData();
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [spriteType, setSpriteType] = useState<SpriteType>('portrait');
  const [draggedHeroId, setDraggedHeroId] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Load heroes from progress data on mount and when data changes externally
  useEffect(() => {
    // Skip reloading if we're in the middle of updating (prevents overwriting our own changes)
    if (isUpdating) {
      setIsUpdating(false);
      return;
    }

    const sortedProgress = getSortedHeroes();
    const sortedHeroes = sortedProgress
      .map(progress => HEROES.find(h => h.id === progress.heroId))
      .filter((h): h is Hero => h !== undefined);
    setHeroes(sortedHeroes);
  }, [getSortedHeroes, isUpdating]);

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

    // Mark that we're updating to prevent reload race condition
    setIsUpdating(true);
    setHeroes(newHeroes);

    // Save the new order to localStorage
    const updates = newHeroes.map((hero, index) => ({
      heroId: hero.id,
      customIndex: index,
    }));
    updateHeroOrders(updates);

    setDraggedHeroId(null);
    setHoveredIndex(null);
  };

  return (
    <div>
      {/* Sprite Type Toggle */}
      <div className="mb-8 flex justify-center gap-4">
        <button onClick={() => setSpriteType('portrait')} className="group relative h-20 w-64">
          <div
            className={`absolute inset-0 transition-opacity ${spriteType === 'portrait' ? '' : 'group-hover:opacity-0'}`}
            style={{
              borderImageSource: `url(/images/ui/${spriteType === 'portrait' ? 'btn4' : 'btn3'}.png)`,
              borderImageSlice: '16 fill',
              borderImageRepeat: 'repeat',
              borderImageWidth: '64px',
              imageRendering: 'pixelated',
            }}
          />
          {spriteType !== 'portrait' && (
            <div
              className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
              style={{
                borderImageSource: 'url(/images/ui/btn4.png)',
                borderImageSlice: '16 fill',
                borderImageRepeat: 'repeat',
                borderImageWidth: '64px',
                imageRendering: 'pixelated',
              }}
            />
          )}
          <span className="absolute inset-0 flex items-center justify-center font-pixel text-4xl tracking-widest">
            PORTRAIT
          </span>
        </button>
        <button onClick={() => setSpriteType('small')} className="group relative h-20 w-64">
          <div
            className={`absolute inset-0 transition-opacity ${spriteType === 'small' ? '' : 'group-hover:opacity-0'}`}
            style={{
              borderImageSource: `url(/images/ui/${spriteType === 'small' ? 'btn4' : 'btn3'}.png)`,
              borderImageSlice: '16 fill',
              borderImageRepeat: 'repeat',
              borderImageWidth: '64px',
              imageRendering: 'pixelated',
            }}
          />
          {spriteType !== 'small' && (
            <div
              className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
              style={{
                borderImageSource: 'url(/images/ui/btn4.png)',
                borderImageSlice: '16 fill',
                borderImageRepeat: 'repeat',
                borderImageWidth: '64px',
                imageRendering: 'pixelated',
              }}
            />
          )}
          <span className="absolute inset-0 flex items-center justify-center font-pixel text-4xl tracking-widest">
            SMALL
          </span>
        </button>
      </div>

      {/* Hero Grid - 4 columns, matching game layout */}
      <div className="grid grid-cols-4 gap-4">
        {heroes.map((hero, index) => (
          <div
            key={hero.id}
            className={`flex items-center justify-center transition-all ${hoveredIndex === index ? 'scale-110' : ''}`}
            onDragOver={handleDragOver(index)}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop(index)}
          >
            {/* Portrait with background */}
            <div
              className="group relative cursor-grab active:cursor-grabbing"
              style={{
                width: PORTRAIT_SIZE,
                height: PORTRAIT_SIZE,
              }}
              draggable
              onDragStart={handleDragStart(hero.id)}
              title={hero.name}
            >
              {/* Background layer - default */}
              <div
                className="absolute inset-0 transition-opacity group-hover:opacity-0"
                style={{
                  borderImageSource: 'url(/images/ui/portrait-bg-1.png)',
                  borderImageSlice: '20 fill',
                  borderImageRepeat: 'repeat',
                  borderImageWidth: '100px',
                  imageRendering: 'pixelated',
                }}
              />
              {/* Background layer - hover */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  borderImageSource: 'url(/images/ui/portrait-bg-2.png)',
                  borderImageSlice: '20 fill',
                  borderImageRepeat: 'repeat',
                  borderImageWidth: '100px',
                  imageRendering: 'pixelated',
                }}
              />
              {/* Sprite centered */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  marginTop: spriteType === 'portrait' ? '-12px' : '0',
                }}
              >
                <HeroSprite
                  hero={hero}
                  type={spriteType}
                  scale={SPRITE_SCALES[spriteType]}
                  highlighted={hoveredIndex === index}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
