'use client';

import { useState, useMemo } from 'react';
import type { Ball } from '@/types/ball';
import { getAllBalls, getBasicBalls, getFusionBalls } from '@/data/balls';
import BallListItem from './BallListItem';
import BallCard from './BallCard';

type FilterType = 'all' | 'basic' | 'fusion';
type SortType = 'name' | 'encyclopedia';
type ViewType = 'list' | 'grid';

interface BallsGridProps {
  viewType?: ViewType;
}

export default function BallsGrid({ viewType = 'list' }: BallsGridProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('encyclopedia');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBalls = useMemo(() => {
    let balls: Ball[];

    switch (filter) {
      case 'basic':
        balls = getBasicBalls();
        break;
      case 'fusion':
        balls = getFusionBalls();
        break;
      default:
        balls = getAllBalls();
    }

    // Apply search filter
    if (searchQuery) {
      balls = balls.filter(
        ball =>
          ball.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ball.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    if (sort === 'encyclopedia') {
      // Sort by recipe length (0 = base, 1 = 2-ball fusion, 2+ = 3+ ball fusion), then alphabetically
      balls = [...balls].sort((a, b) => {
        const aRecipeLength =
          a.fusionRecipe.length > 0 ? a.fusionRecipe[0].length : 0;
        const bRecipeLength =
          b.fusionRecipe.length > 0 ? b.fusionRecipe[0].length : 0;

        if (aRecipeLength !== bRecipeLength) {
          return aRecipeLength - bRecipeLength;
        }

        return a.name.localeCompare(b.name);
      });
    } else {
      // Sort by name only
      balls = [...balls].sort((a, b) => a.name.localeCompare(b.name));
    }

    return balls;
  }, [filter, sort, searchQuery]);

  return (
    <div>
      {/* Controls Section */}
      <div className="mb-4 space-y-3">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search balls..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="focus:ring-highlight w-full rounded-lg border-2 border-primary bg-secondary px-4 py-3 font-pixel text-base tracking-wider text-primary placeholder:text-primary/50 focus:border-highlight focus:outline-none focus:ring-2 sm:text-lg"
        />

        {/* Filters Row */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Filter Dropdown */}
          <select
            value={filter}
            onChange={e => setFilter(e.target.value as FilterType)}
            className="focus:ring-highlight w-full cursor-pointer rounded-lg border-2 border-primary bg-secondary px-4 py-3 font-pixel text-base tracking-wider text-primary focus:border-highlight focus:outline-none focus:ring-2 sm:text-lg"
          >
            <option value="all">All Balls ({getAllBalls().length})</option>
            <option value="basic">Basic ({getBasicBalls().length})</option>
            <option value="fusion">Fusion ({getFusionBalls().length})</option>
          </select>

          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value as SortType)}
            className="focus:ring-highlight w-full cursor-pointer rounded-lg border-2 border-primary bg-secondary px-4 py-3 font-pixel text-base tracking-wider text-primary focus:border-highlight focus:outline-none focus:ring-2 sm:text-lg"
          >
            <option value="encyclopedia">Sort: Encyclopedia</option>
            <option value="name">Sort: Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      {searchQuery && (
        <div className="mb-3 text-center font-pixel text-sm tracking-wider text-secondary sm:text-base">
          Found {filteredBalls.length} ball
          {filteredBalls.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* View Rendering */}
      {viewType === 'list' ? (
        <div className="space-y-3">
          {filteredBalls.map(ball => (
            <BallListItem key={ball.id} ball={ball} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBalls.map(ball => (
            <BallCard key={ball.id} ball={ball} />
          ))}
        </div>
      )}

      {filteredBalls.length === 0 && (
        <div className="card-text-box py-8">
          No balls found matching your criteria.
        </div>
      )}
    </div>
  );
}
