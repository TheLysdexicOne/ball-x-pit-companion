'use client';

import React from 'react';
import { Hero, getSpritePosition, SPRITE_CONFIG } from '@/data/heroes';

interface HeroSpriteProps {
  hero: Hero;
  type: 'portrait' | 'small';
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
  className = '',
  onClick,
  onDragStart,
  onDragOver,
  onDrop,
  draggable = false,
  highlighted = false,
}: HeroSpriteProps) {
  const config = SPRITE_CONFIG[type];
  const position = getSpritePosition(hero.gridX, hero.gridY, type);

  // Quadruple the size for small sprites in display
  const scale = type === 'small' ? 4 : 1;
  const displaySize = config.spriteSize * scale;

  const highlightStyle = highlighted
    ? {
        filter:
          'drop-shadow(0 0 2px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 4px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))',
      }
    : {};

  return (
    <div
      className={`relative overflow-hidden ${className} ${draggable ? 'cursor-grab active:cursor-grabbing' : ''}`}
      style={{
        width: displaySize,
        height: displaySize,
        imageRendering: 'pixelated',
        ...highlightStyle,
      }}
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      title={hero.name}
    >
      <div
        style={{
          width: config.totalSize * scale,
          height: config.totalSize * scale,
          backgroundImage: `url(${config.spriteSheet})`,
          backgroundPosition: `-${position.x * scale}px -${position.y * scale}px`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${config.totalSize * scale}px ${config.totalSize * scale}px`,
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
}
