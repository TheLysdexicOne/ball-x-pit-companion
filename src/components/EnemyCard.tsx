'use client';

import { useState } from 'react';
import type { EnemyVariant } from '@/types/enemy';
import EnemyIcon from './EnemyIcon';
import { getLevelNameByType } from '@/data/levels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface EnemyCardProps {
  variant: EnemyVariant;
  disableMobileExpand?: boolean;
}

export default function EnemyCard({
  variant,
  disableMobileExpand = false,
}: EnemyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const levelName = getLevelNameByType(variant.levelType);
  const gridSize = `${variant.gridWidth}×${variant.gridHeight}`;

  return (
    <div className="overflow-hidden rounded-lg border-2 border-primary bg-body shadow-md transition-all hover:border-highlight">
      {/* Mobile: Click to expand */}
      <button
        onClick={() => !disableMobileExpand && setIsExpanded(!isExpanded)}
        className={`w-full p-2 text-left sm:p-4 ${disableMobileExpand ? 'cursor-default bg-card-header sm:cursor-default' : isExpanded ? 'bg-card-header' : 'bg-secondary sm:cursor-default sm:bg-card-header'}`}
      >
        <div className="grid h-16 grid-cols-[auto_1fr_auto_auto] items-center gap-3 sm:gap-4">
          {/* Enemy Icon */}
          <div className="flex-shrink-0">
            <EnemyIcon
              iconName={variant.iconName}
              name={variant.displayName}
              className="h-[60px] w-[60px] sm:hidden"
            />
            <EnemyIcon
              iconName={variant.iconName}
              name={variant.displayName}
              className="hidden h-16 w-16 sm:block"
            />
          </div>

          {/* Enemy Name */}
          <div className="min-w-0">
            <h3 className="font-pixel text-2xl tracking-wider text-primary sm:text-2xl md:text-4xl">
              {variant.displayName}
            </h3>
          </div>

          {/* Level Badge */}
          <div className="flex-shrink-0">
            <span
              className={`whitespace-nowrap rounded px-2 py-0.5 text-base sm:text-lg ${isExpanded ? 'bg-secondary' : 'bg-card-header sm:bg-secondary'}`}
            >
              {levelName}
            </span>
          </div>

          {/* Expand Icon (mobile only) */}
          {!disableMobileExpand && (
            <div className="flex-shrink-0 sm:hidden">
              <FontAwesomeIcon
                icon={isExpanded ? faChevronUp : faChevronDown}
                className="h-5 w-5 text-primary"
              />
            </div>
          )}
        </div>
      </button>

      {/* Expanded Content */}
      <div
        className={`${disableMobileExpand ? 'block' : isExpanded ? 'block' : 'hidden'} border-t-2 border-primary p-3 sm:block sm:p-4`}
      >
        {/* Stats Grid */}
        <div className="mb-4">
          <h4 className="mb-2 font-pixel text-sm tracking-wider text-secondary">
            STATS
          </h4>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <div className="flex items-center justify-between rounded border border-primary/30 bg-body/50 px-3 py-1">
              <span className="font-pixel text-xs tracking-wider text-primary/80">
                Grid Size
              </span>
              <span className="font-pixel text-sm font-bold text-secondary">
                {gridSize}
              </span>
            </div>
            <div className="flex items-center justify-between rounded border border-primary/30 bg-body/50 px-3 py-1">
              <span className="font-pixel text-xs tracking-wider text-primary/80">
                Health
              </span>
              <span className="font-pixel text-sm font-bold text-secondary">
                {variant.healthScale}x
              </span>
            </div>
            <div className="flex items-center justify-between rounded border border-primary/30 bg-body/50 px-3 py-1">
              <span className="font-pixel text-xs tracking-wider text-primary/80">
                Speed
              </span>
              <span className="font-pixel text-sm font-bold text-secondary">
                {variant.speedMultiplier}x
              </span>
            </div>
          </div>
        </div>

        {/* Gameplay Description (if available) */}
        {variant.gameplayDescription && (
          <div className="mb-4">
            <h4 className="mb-2 font-pixel text-sm tracking-wider text-secondary">
              DESCRIPTION
            </h4>
            <p className="font-pixel text-sm leading-relaxed text-primary">
              {variant.gameplayDescription}
            </p>
          </div>
        )}

        {/* Template Info */}
        <div className="rounded-lg bg-primary p-2 sm:p-3">
          <span className="font-pixel text-sm text-secondary">
            <strong className="text-primary">Template:</strong>{' '}
            {variant.templateName} ({variant.templateSlug})
          </span>
        </div>
      </div>
    </div>
  );
}
