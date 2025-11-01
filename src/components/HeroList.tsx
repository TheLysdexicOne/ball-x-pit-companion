'use client';

import React, { useState, useEffect } from 'react';
import { Hero, HEROES } from '@/data/heroes';
import HeroSprite from './HeroSprite';
import { useProgressData } from '@/hooks/useProgressData';
import { getImagePath } from '@/utils/basePath';

type SpriteType = 'portrait' | 'small';

// Define fixed scales for each sprite type
const SPRITE_SCALES = {
  portrait: 0.75,
  small: 2,
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
      <div className="mb-3 flex flex-col justify-center gap-2 px-8 pt-1 sm:mx-2 sm:flex-row sm:gap-3">
        <button
          onClick={() => setSpriteType('portrait')}
          className="group relative h-12 w-full sm:h-14 sm:w-48"
        >
          <div
            className={`absolute inset-0 transition-opacity ${spriteType === 'portrait' ? '' : 'group-hover:opacity-0'}`}
            style={{
              borderImageSource: `url(${getImagePath('/images/ui/' + (spriteType === 'portrait' ? 'btn4' : 'btn3') + '.png')})`,
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
                borderImageSource: `url(${getImagePath('/images/ui/btn4.png')})`,
                borderImageSlice: '16 fill',
                borderImageRepeat: 'repeat',
                borderImageWidth: '64px',
                imageRendering: 'pixelated',
              }}
            />
          )}
          <span className="absolute inset-0 flex items-center justify-center font-pixel text-xl tracking-widest sm:text-2xl">
            PORTRAIT
          </span>
        </button>
        <button
          onClick={() => setSpriteType('small')}
          className="group relative h-12 w-full sm:h-14 sm:w-48"
        >
          <div
            className={`absolute inset-0 transition-opacity ${spriteType === 'small' ? '' : 'group-hover:opacity-0'}`}
            style={{
              borderImageSource: `url(${getImagePath('/images/ui/' + (spriteType === 'small' ? 'btn4' : 'btn3') + '.png')})`,
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
                borderImageSource: `url(${getImagePath('/images/ui/btn4.png')})`,
                borderImageSlice: '16 fill',
                borderImageRepeat: 'repeat',
                borderImageWidth: '64px',
                imageRendering: 'pixelated',
              }}
            />
          )}
          <span className="absolute inset-0 flex items-center justify-center font-pixel text-xl tracking-widest sm:text-2xl">
            SPRITE
          </span>
        </button>
      </div>

      {/* Hero Grid - 4 columns on small screens, 8 columns on large screens for 2 rows */}
      <div className="grid grid-cols-4 gap-2 md:grid-cols-8">
        {heroes.map((hero, index) => (
          <div
            key={hero.id}
            className={`flex items-center justify-center transition-all ${hoveredIndex === index ? 'scale-110' : ''}`}
            onDragOver={handleDragOver(index)}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop(index)}
          >
            {/* Portrait with background - responsive sizing */}
            <div
              className="group relative aspect-square w-full cursor-grab active:cursor-grabbing"
              draggable
              onDragStart={handleDragStart(hero.id)}
              title={hero.name}
            >
              {/* Background layer - default */}
              <div
                className="absolute inset-0 transition-opacity group-hover:opacity-0"
                style={{
                  borderImageSource: `url(${getImagePath('/images/ui/portrait-bg-1.png')})`,
                  borderImageSlice: '12 fill',
                  borderImageRepeat: 'repeat',
                  borderImageWidth: '24px',
                  imageRendering: 'pixelated',
                }}
              />
              {/* Background layer - hover */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  borderImageSource: `url(${getImagePath('/images/ui/portrait-bg-2.png')})`,
                  borderImageSlice: '12 fill',
                  borderImageRepeat: 'repeat',
                  borderImageWidth: '24px',
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
