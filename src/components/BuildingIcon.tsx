'use client';

import Image from 'next/image';
import { getImagePath } from '@/utils/basePath';

interface BuildingIconProps {
  slug: string;
  name: string;
  size?: number; // Pixel size (defaults to 64px)
  className?: string;
  onClick?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  draggable?: boolean;
  highlighted?: boolean;
}

/**
 * BuildingIcon Component
 *
 * Renders a building icon from individual image files in public/images/buildings/
 * Supports various sizes, interactions, and visual states.
 *
 * @param slug - Building identifier (e.g., 'bld_bank', 'bld_market')
 * @param name - Building name for accessibility
 * @param size - Pixel dimensions (default: 64)
 * @param className - Additional CSS classes
 * @param onClick - Click handler
 * @param draggable - Enable drag-and-drop
 * @param highlighted - Apply glow effect
 */
export default function BuildingIcon({
  slug,
  name,
  size = 64,
  className = '',
  onClick,
  onDragStart,
  onDragOver,
  onDrop,
  draggable = false,
  highlighted = false,
}: BuildingIconProps) {
  const imageSrc = getImagePath(`/images/buildings/${slug}.png`);

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
      width={size}
      height={size}
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
