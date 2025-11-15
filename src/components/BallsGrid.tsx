'use client';

import { useState } from 'react';
import type { Ball } from '@/types/ball';
import { formatDescription } from '@/data/balls';
import BallIcon from './BallIcon';

interface BallsGridProps {
  ball: Ball;
}

export default function BallsGrid({ ball }: BallsGridProps) {
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3>(1);

  const currentLevelProps =
    ball[`level${selectedLevel}` as 'level1' | 'level2' | 'level3'];
  const formattedDescription = formatDescription(
    ball.description,
    currentLevelProps
  );

  // Determine ball tier
  const tier =
    ball.fusionRecipe.length === 0
      ? 'Basic'
      : ball.fusionRecipe[0].length >= 3
        ? 'Legendary'
        : 'Evolved';

  return (
    <div
      className="group relative p-4 shadow-lg transition-transform"
      style={{
        borderImage: 'url(/images/backgrounds/enc_bg.png)',
        borderImageSlice: '16 fill ',
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
          borderImageSlice: '16 fill ',
          borderImageRepeat: 'repeat',
          borderImageWidth: '100px',
          pointerEvents: 'none',
        }}
      />

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
        {/* Ball Icon and Header */}
        <div className="mb-2 flex items-start gap-3">
          {/* Ball Icon */}
          <div className="flex-shrink-0">
            <BallIcon slug={ball.slug} name={ball.name} size={50} />
          </div>

          {/* Header Text */}
          <div className="flex-1">
            <h3 className="font-pixel text-2xl font-bold tracking-widest">
              {ball.name}
            </h3>
            <div className="flex gap-2 text-xs">
              <span className="rounded bg-amber-200 px-2 py-1">{tier}</span>
              <span className="rounded bg-blue-200 px-2 py-1">
                {ball.damageType.replace('k', '')}
              </span>
            </div>
          </div>
        </div>

        {/* Level Selector */}
        <div className="mb-3 flex gap-1">
          {[1, 2, 3].map(level => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level as 1 | 2 | 3)}
              className={`flex-1 rounded px-2 py-1 text-sm font-semibold transition-colors ${
                selectedLevel === level
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-200 text-amber-800 hover:bg-amber-300'
              }`}
            >
              Lvl {level}
            </button>
          ))}
        </div>

        {/* Description */}
        <p className="mb-3 text-sm text-gray-700">{formattedDescription}</p>

        {/* Fusion Recipe */}
        {ball.fusionRecipe.length > 0 && (
          <div className="mt-3 rounded bg-amber-100 p-2">
            <p className="mb-1 text-xs font-semibold text-amber-900">Recipe:</p>
            {ball.fusionRecipe.map((recipe, idx) => (
              <p key={idx} className="text-xs text-gray-600">
                {recipe.join(' + ')}
              </p>
            ))}
          </div>
        )}

        {/* Evolutions */}
        {ball.evolvesInto.length > 0 && (
          <div className="mt-2 rounded bg-green-100 p-2">
            <p className="mb-1 text-xs font-semibold text-green-900">
              Evolves into:
            </p>
            <p className="text-xs text-gray-600">
              {ball.evolvesInto.length} evolution(s)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
