'use client';

import { useState } from 'react';
import type { Passive } from '@/data/passives';
import { getPassiveBySlug } from '@/data/passives';
import PassiveIcon from './PassiveIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface PassiveListItemProps {
  passive: Passive;
}

export default function PassiveListItem({ passive }: PassiveListItemProps) {
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3>(1);
  const [isExpanded, setIsExpanded] = useState(false);

  // Get current level properties
  const currentLevelProps =
    passive.propertiesByLevel?.[selectedLevel - 1]?.properties || {};

  // Get main color for highlights
  const getHighlightColor = () => {
    if (!passive.mainColor) return '#f59e0b'; // Fallback to amber-500

    const colorMatch = passive.mainColor.match(
      /r:\s*([\d.]+),\s*g:\s*([\d.]+),\s*b:\s*([\d.]+)/
    );
    if (!colorMatch) return '#f59e0b';

    const r = Math.round(parseFloat(colorMatch[1]) * 255);
    const g = Math.round(parseFloat(colorMatch[2]) * 255);
    const b = Math.round(parseFloat(colorMatch[3]) * 255);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const highlightColor = getHighlightColor();

  // Format description with highlighted values
  const formatDescriptionWithHighlights = () => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    const regex = /\{\[(\w+)\]\}/g;
    let match;

    while ((match = regex.exec(passive.description)) !== null) {
      if (match.index > lastIndex) {
        parts.push(passive.description.substring(lastIndex, match.index));
      }

      const key = match[1];
      const value = currentLevelProps[key];

      if (value !== undefined) {
        let displayValue: string | number = value;

        // Handle percentage values
        if (key.includes('_pct') || key.includes('_chance')) {
          displayValue = `${value}%`;
        }
        // Handle time-based values (deciseconds to seconds)
        else if (
          key.includes('_length') ||
          key.includes('_len') ||
          key.includes('cycle') ||
          key.includes('cooldown') ||
          key.includes('duration')
        ) {
          const numValue =
            typeof value === 'number' ? value : parseFloat(String(value));
          if (!isNaN(numValue)) {
            displayValue = (numValue / 10).toFixed(1);
          }
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

    if (lastIndex < passive.description.length) {
      parts.push(passive.description.substring(lastIndex));
    }

    return parts;
  };

  // Format type display
  const formatType = (type: string) => {
    return `Type ${type}`;
  };

  return (
    <div className="rounded-lg border-2 border-primary bg-body shadow-md transition-all hover:border-highlight">
      {/* Mobile: Click to expand */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 text-left sm:cursor-default sm:p-4"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Passive Icon */}
          <div className="flex-shrink-0">
            <PassiveIcon
              slug={passive.slug}
              name={passive.name}
              className="h-[60px] w-[60px] sm:hidden"
            />
            <PassiveIcon
              slug={passive.slug}
              name={passive.name}
              className="hidden h-20 w-20 sm:block"
            />
          </div>

          {/* Passive Name & Type */}
          <div className="min-w-0 flex-1">
            <h3 className="font-pixel text-lg tracking-wider text-primary sm:text-2xl md:text-3xl">
              {passive.name}
            </h3>
            <div className="mt-1 flex flex-wrap gap-1 sm:gap-2">
              <span className="text-body rounded bg-primary px-2 py-0.5 font-pixel text-xs sm:text-sm">
                {formatType(passive.type)}
              </span>
              {passive.tags &&
                passive.tags.length > 0 &&
                passive.tags.map((tag, idx) => (
                  <span
                    key={`${tag}-${idx}`}
                    className="rounded bg-secondary px-2 py-0.5 font-pixel text-xs text-primary sm:text-sm"
                  >
                    {tag}
                  </span>
                ))}
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
        {/* Level Selector - Only show if passive has multiple levels */}
        {passive.propertiesByLevel && passive.propertiesByLevel.length > 1 && (
          <div className="mb-3 flex gap-2">
            {passive.propertiesByLevel.map((levelData, idx) => {
              const level = (idx + 1) as 1 | 2 | 3;
              return (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`flex-1 rounded-lg border-2 px-3 py-2 font-pixel text-sm tracking-wider transition-colors sm:text-base ${
                    selectedLevel === level
                      ? 'border-highlight bg-highlight text-primary'
                      : 'border-primary bg-secondary text-primary hover:border-highlight'
                  }`}
                >
                  Level {level}
                </button>
              );
            })}
          </div>
        )}

        {/* Description */}
        <div className="mb-3 rounded-lg border-2 border-primary bg-secondary p-3 sm:p-4">
          <p className="font-pixel text-sm leading-relaxed text-secondary sm:text-base">
            {formatDescriptionWithHighlights()}
          </p>
        </div>

        {/* Evolution Info */}
        {passive.evolutionSlugs && passive.evolutionSlugs.length > 0 && (
          <div className="space-y-1 font-pixel text-xs text-secondary sm:text-sm">
            <div className="rounded-lg bg-secondary p-2 sm:p-3">
              <strong className="text-primary">Evolves into:</strong>{' '}
              {passive.evolutionSlugs
                .map(slug => getPassiveBySlug(slug)?.name || slug)
                .join(', ')}
            </div>
          </div>
        )}

        {/* Merge Components Info */}
        {passive.mergeComponents && passive.mergeComponents.length > 0 && (
          <div className="mt-1 space-y-1 font-pixel text-xs text-secondary sm:text-sm">
            <div className="rounded-lg bg-secondary p-2 sm:p-3">
              <strong className="text-primary">Merge Recipe:</strong>{' '}
              {passive.mergeComponents
                .map(slug => getPassiveBySlug(slug)?.name || slug)
                .join(' + ')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
