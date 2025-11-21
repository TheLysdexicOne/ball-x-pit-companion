'use client';

import { useState, useEffect, useMemo } from 'react';
import type { EnemyVariant } from '@/types/enemy';
import { getAllEnemyVariants } from '@/data/enemies';
import EnemyCard from '@/components/EnemyCard';
import { getAllLevels } from '@/data/levels';

export default function EnemiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [isLoaded, setIsLoaded] = useState(false);

  const variants = getAllEnemyVariants();
  const levels = getAllLevels();

  // Prevent hydration mismatch
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Filter and sort enemies
  const filteredVariants = useMemo(() => {
    let filtered = [...variants];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        variant =>
          variant.displayName.toLowerCase().includes(query) ||
          variant.templateName.toLowerCase().includes(query)
      );
    }

    // Level filter
    if (levelFilter !== 'all') {
      filtered = filtered.filter(variant => variant.levelType === levelFilter);
    }

    // Sort by level ID and EnemyList order
    filtered.sort((a, b) => {
      const levelA = levels.find(l => l.type === a.levelType);
      const levelB = levels.find(l => l.type === b.levelType);

      // First sort by level ID
      if (levelA && levelB && levelA.levelId !== levelB.levelId) {
        return levelA.levelId - levelB.levelId;
      }

      // Within same level, sort by EnemyList order
      if (levelA && a.levelType === b.levelType) {
        const indexA = levelA.enemySlugs.indexOf(a.templateSlug);
        const indexB = levelA.enemySlugs.indexOf(b.templateSlug);
        return indexA - indexB;
      }

      return 0;
    });

    return filtered;
  }, [variants, searchQuery, levelFilter, levels]);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl p-4 pt-0 sm:p-8">
      <div className="space-y-6">
        {/* Search and Filters */}
        <div className="rounded-lg border-2 border-primary bg-body p-4">
          <div className="space-y-4">
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Search enemies..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border-2 border-primary bg-primary px-4 py-2 text-base text-primary placeholder:text-primary/50 focus:border-highlight focus:ring-0 sm:text-lg"
              />
            </div>

            {/* Level Filter */}
            <div>
              <select
                value={levelFilter}
                onChange={e => setLevelFilter(e.target.value)}
                className="w-full cursor-pointer rounded-lg border-2 border-primary bg-primary px-4 py-2 text-base tracking-wider text-primary focus:border-highlight focus:ring-0 sm:text-lg"
              >
                <option value="all">All Levels</option>
                {levels.map(level => (
                  <option key={level.type} value={level.type}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm tracking-wider text-primary/70">
          Showing {filteredVariants.length} of {variants.length} enemies
        </div>

        {/* Enemy list */}
        <div className="space-y-4">
          {filteredVariants.map((variant, index) => (
            <EnemyCard
              key={`${variant.templateSlug}-${variant.levelType}-${index}`}
              variant={variant}
            />
          ))}
        </div>

        {/* No results message */}
        {filteredVariants.length === 0 && (
          <div className="rounded-lg border-2 border-primary bg-body p-8 text-center">
            <p className="font-pixel text-lg tracking-wider text-primary">
              No enemies found
            </p>
            <p className="mt-2 font-pixel text-sm text-primary/70">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
