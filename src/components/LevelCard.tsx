'use client';

import type { Level } from '@/types/level';
import type { EnemyVariant } from '@/types/enemy';
import EnemyIcon from './EnemyIcon';

interface LevelCardProps {
  level: Level;
  enemies: EnemyVariant[];
}

export default function LevelCard({ level, enemies }: LevelCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border-2 border-primary bg-body shadow-md transition-all hover:border-highlight">
      {/* Header */}
      <div className="bg-card-header p-2 sm:p-4">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Level Name */}
          <div className="min-w-0">
            <h3 className="font-pixel text-2xl tracking-wider text-primary sm:text-2xl md:text-4xl">
              {level.name}
            </h3>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="border-t-2 border-primary p-3 sm:p-4">
        {/* Description */}
        <div className="mb-4">
          <p className="font-pixel text-sm leading-relaxed text-primary">
            {level.description}
          </p>
        </div>

        {/* Level Stats */}
        <div className="mb-4">
          <h4 className="mb-2 font-pixel text-sm tracking-wider text-secondary">
            LEVEL INFO
          </h4>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <div className="flex items-center justify-between rounded border border-primary/30 bg-body/50 px-3 py-1">
              <span className="font-pixel text-xs tracking-wider text-primary/80">
                Turn Length
              </span>
              <span className="font-pixel text-sm font-bold text-secondary">
                {level.defaultTurnLength}
              </span>
            </div>
            <div className="flex items-center justify-between rounded border border-primary/30 bg-body/50 px-3 py-1">
              <span className="font-pixel text-xs tracking-wider text-primary/80">
                XP Multiplier
              </span>
              <span className="font-pixel text-sm font-bold text-secondary">
                {level.xpMultiplier}x
              </span>
            </div>
            <div className="flex items-center justify-between rounded border border-primary/30 bg-body/50 px-3 py-1">
              <span className="font-pixel text-xs tracking-wider text-primary/80">
                Enemies
              </span>
              <span className="font-pixel text-sm font-bold text-secondary">
                {enemies.length}
              </span>
            </div>
          </div>
        </div>

        {/* Enemy Grid */}
        <div className="mb-4">
          <h4 className="mb-2 font-pixel text-sm tracking-wider text-secondary">
            ENEMIES
          </h4>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
            {enemies.map((enemy, index) => (
              <div
                key={`${enemy.templateSlug}-${index}`}
                className="group relative aspect-square rounded border-2 border-primary/30 bg-body/50 p-1 transition-all hover:border-highlight"
                title={enemy.displayName}
              >
                <EnemyIcon
                  iconName={enemy.iconName}
                  name={enemy.displayName}
                  className="h-full w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Boss Turns */}
        {level.bossTurns.length > 0 && (
          <div className="rounded-lg bg-primary p-2 sm:p-3">
            <span className="font-pixel text-sm text-secondary">
              <strong className="text-primary">Boss Turns:</strong>{' '}
              {level.bossTurns.join(', ')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
