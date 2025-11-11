'use client';

import React from 'react';
import { Hero, SPRITE_CONFIG, getHeroImagePath } from '@/data/heroes';
import { getImagePath } from '@/utils/basePath';

interface HeroSpriteProps {
  hero: Hero;
  type: 'portrait' | 'small';
  scale?: 0.75 | 1 | 1.2 | 2 | 3 | 4 | 5 | 8 | 12 | 16;
  className?: string;
  onClick?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  draggable?: boolean;
  highlighted?: boolean;
}

export default function HeroSprite({
  hero,
  type,
  scale = 1,
  className = '',
  onClick,
  onDragStart,
  onDragOver,
  onDrop,
  draggable = false,
  highlighted = false,
}: HeroSpriteProps) {
  const config = SPRITE_CONFIG[type];
  const displaySize = config.spriteSize * scale;
  const imageSrc = getImagePath(getHeroImagePath(hero, type));

  const inlineStyles: React.CSSProperties = {
    width: displaySize,
    height: displaySize,
    imageRendering: 'pixelated',
    objectFit: 'contain',
  };

  if (highlighted) {
    inlineStyles.filter =
      'drop-shadow(0 0 2px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 4px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))';
  }

  return (
    <img
      src={imageSrc}
      alt={hero.name}
      className={`${className} ${draggable ? 'cursor-grab active:cursor-grabbing' : ''} select-none`}
      style={inlineStyles}
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      title={hero.name}
    />
  );
}
