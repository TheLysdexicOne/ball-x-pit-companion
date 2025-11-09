'use client';

import { useState } from 'react';
import type { Ball } from '@/types/ball';
import { formatDescription, getBallBySlug } from '@/data/balls';
import { getBallIconStyle } from '@/data/ballIcons';

interface BallListItemProps {
  ball: Ball;
}

export default function BallListItem({ ball }: BallListItemProps) {
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3>(1);

  const currentLevelProps = ball[`level${selectedLevel}` as 'level1' | 'level2' | 'level3'];
  const iconStyle = getBallIconStyle(ball.slug, 2); // 2x scale for list view

  // Determine ball tier
  const tier =
    ball.fusionRecipe.length === 0
      ? 'Basic'
      : ball.fusionRecipe[0].length >= 3
        ? 'Legendary'
        : 'Evolved';

  // Get damage type color from BallColor property
  const getDamageTypeColor = () => {
    // Convert Unity color format "r: 0.61, g: 0.50, b: 0.57, a: 1.00" to hex
    if (!ball.ballColor) return '#734325'; // Fallback to parchment highlight

    const colorMatch = ball.ballColor.match(/r:\s*([\d.]+),\s*g:\s*([\d.]+),\s*b:\s*([\d.]+)/);
    if (!colorMatch) return '#734325';

    const r = Math.round(parseFloat(colorMatch[1]) * 255);
    const g = Math.round(parseFloat(colorMatch[2]) * 255);
    const b = Math.round(parseFloat(colorMatch[3]) * 255);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const highlightColor = getDamageTypeColor();

  // Get readable damage type name
  const getDamageTypeName = () => {
    const damageType = ball.damageType.replace('k', '');
    if (damageType.toLowerCase().includes('fire')) return 'Burn';
    return damageType;
  };

  // Format description with highlighted values
  const formatDescriptionWithHighlights = () => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    const regex = /\{\[(\w+)\]\}/g;
    let match;

    while ((match = regex.exec(ball.description)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(ball.description.substring(lastIndex, match.index));
      }

      // Add the highlighted value
      const key = match[1];
      const value = currentLevelProps[key];

      if (value !== undefined) {
        // Convert deciseconds to seconds for time-based properties
        let displayValue: string | number = value;
        if (
          key.includes('_length') ||
          key.includes('_len') ||
          key.includes('cycle') ||
          key.includes('cooldown')
        ) {
          const numValue = typeof value === 'number' ? value : parseFloat(String(value));
          if (!isNaN(numValue)) {
            displayValue = (numValue / 10).toFixed(1);
          }
        } else if (key.includes('_chance')) {
          // Handle percentage values
          displayValue = `${value}%`;
        }

        parts.push(
          <span key={match.index} className="font-bold" style={{ color: highlightColor }}>
            {String(displayValue)}
          </span>
        );
      } else {
        parts.push(match[0]);
      }

      lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < ball.description.length) {
      parts.push(ball.description.substring(lastIndex));
    }

    return parts;
  };

  return (
    <div
      className="group relative mb-3 p-3 shadow-md transition-all hover:shadow-lg"
      style={{
        borderImage: 'url(/images/backgrounds/enc_bg.png)',
        borderImageSlice: '16 fill',
        borderImageRepeat: 'repeat',
        borderImageWidth: '100px',
        imageRendering: 'pixelated',
      }}
    >
      {/* Hover background overlay */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          borderImage: 'url(/images/backgrounds/enc_highlight.png)',
          borderImageSlice: '16 fill',
          borderImageRepeat: 'repeat',
          borderImageWidth: '100px',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div className="relative z-10 m-1 flex items-center gap-6">
        {/* Ball Icon Container */}
        {iconStyle && (
          <div className="flex flex-shrink-0 items-center justify-center rounded border-2 border-[#452c1f] p-2">
            <div style={iconStyle} aria-label={`${ball.name} icon`} />
          </div>
        )}

        {/* Main Content - Two Column Layout */}
        <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-[2fr_3fr]">
          {/* Left Column: Name, Tags, Recipe/Evolution Info */}
          <div className="space-y-3">
            {/* Header */}
            <div>
              <h3 className="mb-2 font-pixel text-4xl tracking-widest text-primary">{ball.name}</h3>
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-[#452c1f] px-3 py-1 text-sm text-primary">{tier}</span>
                <span className="rounded bg-[#452c1f] px-3 py-1 text-sm text-primary">
                  {getDamageTypeName()}
                </span>
                {ball.isSpawner && (
                  <span className="rounded bg-[#452c1f] px-3 py-1 text-sm text-primary">
                    Spawner
                  </span>
                )}
              </div>
            </div>

            {/* Footer Info */}
            <div className="space-y-1 text-sm text-secondary">
              {ball.fusionRecipe.length > 0 && (
                <div>
                  <strong className="text-primary">Recipe:</strong>{' '}
                  {ball.fusionRecipe
                    .map(recipe =>
                      recipe.map(slug => getBallBySlug(slug)?.name || slug).join(' + ')
                    )
                    .join(' | ')}
                </div>
              )}
              {ball.evolvesInto.length > 0 && (
                <div>
                  <strong className="text-primary">Evolves into:</strong>{' '}
                  {ball.evolvesInto.map(slug => getBallBySlug(slug)?.name || slug).join(', ')}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Level Selector + Description */}
          <div className="space-y-2">
            {/* Level Selector */}
            <div className="flex gap-2">
              {[1, 2, 3].map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level as 1 | 2 | 3)}
                  className={`flex-1 rounded px-4 py-1 text-sm font-semibold transition-colors ${
                    selectedLevel === level
                      ? 'bg-[#734325] text-primary'
                      : 'bg-[#452c1f] text-primary hover:bg-[#633f2a]'
                  }`}
                >
                  Level {level}
                </button>
              ))}
            </div>

            {/* Description with highlighted values */}
            <div className="rounded border border-[#452c1f] bg-[#000]/15 p-3">
              <p className="text-base leading-relaxed text-secondary">
                {formatDescriptionWithHighlights()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
