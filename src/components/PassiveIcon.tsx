'use client';

import Image from 'next/image';
import { getImagePath } from '@/utils/basePath';

interface PassiveIconProps {
  slug: string;
  name: string;
  size?: number; // Pixel size (defaults to 64px - common passive icon size)
  className?: string;
  onClick?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  draggable?: boolean;
  highlighted?: boolean;
  borderColor?: string; // Optional custom border color (for rarity tiers)
}

/**
 * PassiveIcon Component
 *
 * Renders a passive item icon from individual image files in public/images/passives/
 * Supports various sizes, interactions, and visual states.
 *
 * @param slug - Passive identifier (e.g., 'pass_bow', 'pass_armor')
 * @param name - Passive name for accessibility
 * @param size - Pixel dimensions (default: 64)
 * @param className - Additional CSS classes
 * @param onClick - Click handler
 * @param draggable - Enable drag-and-drop
 * @param highlighted - Apply glow effect
 * @param borderColor - Custom border color (for rarity visualization)
 */
export default function PassiveIcon({
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
  borderColor,
}: PassiveIconProps) {
  const imageSrc = getImagePath(`/images/passives/${slug}.png`);

  const inlineStyles: React.CSSProperties = {
    imageRendering: 'pixelated',
    objectFit: 'contain',
  };

  if (highlighted) {
    inlineStyles.filter =
      'drop-shadow(0 0 2px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 4px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))';
  }

  // Wrapper for optional border
  const wrapperClassName = borderColor
    ? `inline-flex items-center justify-center rounded border-2 p-2 ${className}`
    : className;
  const wrapperStyle = borderColor ? { borderColor } : undefined;

  const imageElement = (
    <Image
      src={imageSrc}
      alt={name}
      width={size}
      height={size}
      className={`select-none ${draggable ? 'cursor-grab active:cursor-grabbing' : ''}`}
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

  if (borderColor) {
    return (
      <div className={wrapperClassName} style={wrapperStyle}>
        {imageElement}
      </div>
    );
  }

  return <div className={className}>{imageElement}</div>;
}
