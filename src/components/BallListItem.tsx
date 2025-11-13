'use client';

import { useState } from 'react';
import type { Ball } from '@/types/ball';
import { formatDescription, getBallBySlug } from '@/data/balls';
import BallIcon from './BallIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface BallListItemProps {
  ball: Ball;
}

export default function BallListItem({ ball }: BallListItemProps) {
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3>(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const currentLevelProps =
    ball[`level${selectedLevel}` as 'level1' | 'level2' | 'level3'];

  // Determine ball tier
  const tier =
    ball.fusionRecipe.length === 0
      ? 'Basic'
      : ball.fusionRecipe[0].length >= 3
        ? 'Legendary'
        : 'Evolved';

  // Get damage type color from BallColor property
  const getDamageTypeColor = () => {
    if (!ball.ballColor) return '#f59e0b'; // Fallback to amber-500

    const colorMatch = ball.ballColor.match(
      /r:\s*([\d.]+),\s*g:\s*([\d.]+),\s*b:\s*([\d.]+)/
    );
    if (!colorMatch) return '#f59e0b';

    const r = Math.round(parseFloat(colorMatch[1]) * 255);
    const g = Math.round(parseFloat(colorMatch[2]) * 255);
    const b = Math.round(parseFloat(colorMatch[3]) * 255);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const highlightColor = getDamageTypeColor();

  // Format tag names
  const formatTagName = (tag: string) => {
    const cleaned = tag.replace(/^k/, '');
    if (cleaned === 'Frozen') return 'Freeze';
    if (cleaned === 'LaserHorz' || cleaned === 'LaserVert' || cleaned === 'Ray')
      return 'Laser';
    return cleaned.replace(/([A-Z])/g, ' $1').trim();
  };

  // Filter out tags that match the ball's slug (for spawners)
  const shouldShowTag = (tag: string) => {
    if (!ball.isSpawner) return true;
    const tagCleaned = tag
      .replace(/^k/, '')
      .replace(/^hupg_/, '')
      .toLowerCase();
    const slugCleaned = ball.slug.replace(/^hupg_/, '').toLowerCase();
    return tagCleaned !== slugCleaned;
  };

  // Format description with highlighted values
  const formatDescriptionWithHighlights = () => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    const regex = /\{\[(\w+)\]\}/g;
    let match;

    while ((match = regex.exec(ball.description)) !== null) {
      if (match.index > lastIndex) {
        parts.push(ball.description.substring(lastIndex, match.index));
      }

      const key = match[1];
      const value = currentLevelProps[key];

      if (value !== undefined) {
        let displayValue: string | number = value;
        if (
          key.includes('_length') ||
          key.includes('_len') ||
          key.includes('cycle') ||
          key.includes('cooldown')
        ) {
          const numValue =
            typeof value === 'number' ? value : parseFloat(String(value));
          if (!isNaN(numValue)) {
            displayValue = (numValue / 10).toFixed(1);
          }
        } else if (key.includes('_chance') || key.includes('_pct')) {
          displayValue = `${value}%`;
        }

        parts.push(
          <span
            key={match.index}
            className="font-bold"
            style={{ color: highlightColor }}
          >
            {String(displayValue)}
          </span>
        );
      } else {
        parts.push(match[0]);
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < ball.description.length) {
      parts.push(ball.description.substring(lastIndex));
    }

    return parts;
  };

  // Collect all tags
  const allTags = [
    ...ball.hitEffects.filter(shouldShowTag),
    ...ball.aoeTypes.filter(shouldShowTag),
    ...ball.specials.filter(shouldShowTag),
  ];

  return (
    <div className="rounded-lg border-2 border-primary bg-body shadow-md transition-all hover:border-highlight">
      {/* Mobile: Click to expand */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 text-left sm:cursor-default sm:p-4"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Ball Icon */}
          <div className="flex-shrink-0">
            <BallIcon
              slug={ball.slug}
              name={ball.name}
              size={60}
              className="sm:hidden"
            />
            <BallIcon
              slug={ball.slug}
              name={ball.name}
              size={80}
              className="hidden sm:block"
            />
          </div>

          {/* Ball Name & Tier */}
          <div className="min-w-0 flex-1">
            <h3 className="font-pixel text-lg tracking-wider text-primary sm:text-2xl md:text-3xl">
              {ball.name}
            </h3>
            <div className="mt-1 flex flex-wrap gap-1 sm:gap-2">
              <span className="text-body rounded bg-primary px-2 py-0.5 font-pixel text-xs sm:text-sm">
                {tier}
              </span>
              {ball.isSpawner && (
                <span className="text-body rounded bg-primary px-2 py-0.5 font-pixel text-xs sm:text-sm">
                  Spawner
                </span>
              )}
            </div>
          </div>

          {/* Expand Icon (mobile only) */}
          <div className="flex-shrink-0 sm:hidden">
            <FontAwesomeIcon
              icon={isExpanded ? faChevronUp : faChevronDown}
              className="h-5 w-5 text-primary"
            />
          </div>
        </div>
      </button>

      {/* Expanded Content - Always shown on desktop, click to expand on mobile */}
      <div
        className={`${isExpanded ? 'block' : 'hidden'} border-t-2 border-primary p-3 sm:block sm:p-4`}
      >
        {/* Tags */}
        {allTags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1 sm:gap-2">
            {allTags.map((tag, idx) => (
              <span
                key={`${tag}-${idx}`}
                className="rounded bg-secondary px-2 py-1 font-pixel text-xs text-primary sm:text-sm"
              >
                {formatTagName(tag)}
              </span>
            ))}
          </div>
        )}

        {/* Level Selector */}
        <div className="mb-3 flex gap-2">
          {[1, 2, 3].map(level => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level as 1 | 2 | 3)}
              className={`flex-1 rounded-lg border-2 px-3 py-2 font-pixel text-sm tracking-wider transition-colors sm:text-base ${
                selectedLevel === level
                  ? 'border-highlight bg-highlight text-primary'
                  : 'border-primary bg-secondary text-primary hover:border-highlight'
              }`}
            >
              Level {level}
            </button>
          ))}
        </div>

        {/* Description */}
        <div className="mb-3 rounded-lg border-2 border-primary bg-secondary p-3 sm:p-4">
          <p className="font-pixel text-sm leading-relaxed text-secondary sm:text-base">
            {formatDescriptionWithHighlights()}
          </p>
        </div>

        {/* Footer Info: Recipe & Evolution */}
        <div className="space-y-1 font-pixel text-xs text-secondary sm:text-sm">
          {ball.fusionRecipe.length > 0 && (
            <div className="rounded-lg bg-secondary p-2 sm:p-3">
              <strong className="text-primary">Recipe:</strong>{' '}
              {ball.fusionRecipe
                .map(recipe =>
                  recipe
                    .map(slug => getBallBySlug(slug)?.name || slug)
                    .join(' + ')
                )
                .join(' | ')}
            </div>
          )}
          {ball.evolvesInto.length > 0 && (
            <div className="rounded-lg bg-secondary p-2 sm:p-3">
              <strong className="text-primary">Evolves into:</strong>{' '}
              {ball.evolvesInto
                .map(slug => getBallBySlug(slug)?.name || slug)
                .join(', ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
