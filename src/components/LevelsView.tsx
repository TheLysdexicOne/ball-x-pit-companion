'use client';

import { useState, useEffect } from 'react';
import type { Level } from '@/types/level';
import type { EnemyVariant } from '@/types/enemy';
import LevelCard from './LevelCard';
import { getEnemyVariantsForLevel } from '@/data/enemies';

interface LevelsViewProps {
  levels: Level[];
}

export default function LevelsView({ levels }: LevelsViewProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Level list */}
      <div className="space-y-4">
        {levels.map(level => {
          const enemies = getEnemyVariantsForLevel(level);
          return <LevelCard key={level.id} level={level} enemies={enemies} />;
        })}
      </div>
    </div>
  );
}
