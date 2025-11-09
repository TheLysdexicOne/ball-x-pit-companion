'use client';

import { useState, useMemo } from 'react';
import type { Ball } from '@/types/ball';
import { getAllBalls, getBasicBalls, getFusionBalls } from '@/data/balls';
import BallListItem from './BallListItem';

type FilterType = 'all' | 'basic' | 'fusion';
type SortType = 'name' | 'encyclopedia';

export default function BallsGrid() {
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
        const aRecipeLength = a.fusionRecipe.length > 0 ? a.fusionRecipe[0].length : 0;
        const bRecipeLength = b.fusionRecipe.length > 0 ? b.fusionRecipe[0].length : 0;

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
      {/* Controls */}
      <div className="mx-8 mb-6 flex flex-wrap gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search balls..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="bg-input_box border-input_highlight min-w-[200px] flex-1 rounded border-2 px-4 py-2 text-primary placeholder:text-gray-400 focus:border-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-800"
        />

        {/* Filter */}
        <select
          value={filter}
          onChange={e => setFilter(e.target.value as FilterType)}
          className="bg-input_box border-input_highlight whitespace-nowrap rounded border-2 px-4 py-2 pr-10 text-primary focus:border-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-800"
        >
          <option value="all">All Balls ({getAllBalls().length})</option>
          <option value="basic">Basic ({getBasicBalls().length})</option>
          <option value="fusion">Fusion ({getFusionBalls().length})</option>
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={e => setSort(e.target.value as SortType)}
          className="bg-input_box border-input_highlight whitespace-nowrap rounded border-2 px-4 py-2 pr-10 text-primary focus:border-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-800"
        >
          <option value="encyclopedia">Sort: Encyclopedia</option>
          <option value="name">Sort: Alphabetical</option>
        </select>
      </div>

      {/* List View */}
      <div className="mx-8">
        {filteredBalls.map(ball => (
          <BallListItem key={ball.id} ball={ball} />
        ))}
      </div>

      {filteredBalls.length === 0 && (
        <p className="py-8 text-center text-gray-500">No balls found matching your criteria.</p>
      )}
    </div>
  );
}
