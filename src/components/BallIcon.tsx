'use client';

import Image from 'next/image';
import { getImagePath } from '@/utils/basePath';

interface BallIconProps {
  slug: string;
  name: string;
  size?: number; // Pixel size (defaults to 50px - native ball icon size)
  className?: string;
  onClick?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  draggable?: boolean;
  highlighted?: boolean;
  borderColor?: string; // Optional custom border color
}

/**
 * BallIcon Component
 *
 * Renders a ball icon from individual image files in public/images/balls/
 * Supports various sizes, interactions, and visual states.
 *
 * @param slug - Ball identifier (e.g., 'fireball', 'iceball')
 * @param name - Ball name for accessibility
 * @param size - Pixel dimensions (default: 50, native ball icon size)
 * @param className - Additional CSS classes
 * @param onClick - Click handler
 * @param draggable - Enable drag-and-drop
 * @param highlighted - Apply glow effect
 * @param borderColor - Custom border color (for damage type visualization)
 */
export default function BallIcon({
  slug,
  name,
  size = 50,
  className = '',
  onClick,
  onDragStart,
  onDragOver,
  onDrop,
  draggable = false,
  highlighted = false,
  borderColor,
}: BallIconProps) {
  const imageSrc = getImagePath(`/images/balls/${slug}.png`);

  const inlineStyles: React.CSSProperties = {
    imageRendering: 'pixelated',
    objectFit: 'contain',
  };

  if (highlighted) {
    inlineStyles.filter =
      'drop-shadow(0 0 2px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 4px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))';
  }

  // Wrapper for optional border
  const WrapperComponent = borderColor ? 'div' : 'div';
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
      <WrapperComponent className={wrapperClassName} style={wrapperStyle}>
        {imageElement}
      </WrapperComponent>
    );
  }

  return <div className={className}>{imageElement}</div>;
}
