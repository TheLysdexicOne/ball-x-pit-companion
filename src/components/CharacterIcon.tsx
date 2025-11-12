'use client';

import Image from 'next/image';
import { getImagePath } from '@/utils/basePath';

interface CharacterIconProps {
  slug: string;
  name: string;
  type: 'portrait' | 'sprite';
  size?: number; // Pixel size (defaults to native: portrait=124px, sprite=18px)
  className?: string;
  onClick?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  draggable?: boolean;
  highlighted?: boolean;
}

const NATIVE_SIZES = {
  portrait: 124,
  sprite: 18,
} as const;

/**
 * CharacterIcon Component
 *
 * Renders a character icon from individual image files in public/images/characters/
 * Supports both portrait (124x124) and sprite (18x18) sizes.
 *
 * @param slug - Character identifier (e.g., 'char_default', 'char_recaller')
 * @param name - Character name for accessibility
 * @param type - Icon type: 'portrait' or 'sprite'
 * @param size - Pixel dimensions (defaults to native size)
 * @param className - Additional CSS classes
 * @param onClick - Click handler
 * @param draggable - Enable drag-and-drop
 * @param highlighted - Apply glow effect
 */
export default function CharacterIcon({
  slug,
  name,
  type,
  size,
  className = '',
  onClick,
  onDragStart,
  onDragOver,
  onDrop,
  draggable = false,
  highlighted = false,
}: CharacterIconProps) {
  const displaySize = size ?? NATIVE_SIZES[type];
  const imageSrc = getImagePath(`/images/characters/${type}/${slug}.png`);

  const inlineStyles: React.CSSProperties = {
    imageRendering: 'pixelated',
    objectFit: 'contain',
  };

  if (highlighted) {
    inlineStyles.filter =
      'drop-shadow(0 0 2px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 4px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))';
  }

  return (
    <Image
      src={imageSrc}
      alt={name}
      width={displaySize}
      height={displaySize}
      className={`select-none ${draggable ? 'cursor-grab active:cursor-grabbing' : ''} ${className}`}
      style={inlineStyles}
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      title={name}
      unoptimized
    />
  );
}
