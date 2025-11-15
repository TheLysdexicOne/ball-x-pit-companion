'use client';

import { useState, useMemo } from 'react';
import type { Ball } from '@/types/ball';
import { getAllBalls, getBasicBalls, getFusionBalls } from '@/data/balls';
import BallsList from './BallsList';
import BallsGrid from './BallsGrid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

type FilterType = 'all' | 'basic' | 'fusion';
type SortType = 'name' | 'encyclopedia';
type ViewType = 'list' | 'grid';

export default function BallsView() {
  const [viewType, setViewType] = useState<ViewType>('list');
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('encyclopedia');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

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
      <div className="card-primary my-4 space-y-3">
        {/* View Toggle */}
        <div className="flex gap-3">
          <button
            onClick={() => setViewType('list')}
            className={`flex-1 rounded-lg px-4 py-2 font-pixel text-2xl tracking-wider transition-colors sm:text-4xl ${
              viewType === 'list'
                ? 'bg-btn-primary-highlight text-primary'
                : 'card-text-box'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setViewType('grid')}
            className={`flex-1 rounded-lg px-4 py-2 font-pixel text-2xl tracking-wider transition-colors sm:text-4xl ${
              viewType === 'grid'
                ? 'bg-btn-primary-highlight text-primary'
                : 'card-text-box'
            }`}
          >
            Grid View
          </button>
        </div>

        {/* Expand/Collapse Button (hidden on lg+) */}
        <button
          onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
          className="flex w-full items-center justify-between rounded-lg border-2 border-primary bg-primary px-4 py-2 text-base tracking-wider text-primary transition-colors hover:border-highlight sm:text-lg lg:hidden"
        >
          <span>Search & Filters</span>
          <FontAwesomeIcon
            icon={isFiltersExpanded ? faChevronUp : faChevronDown}
            className="h-4 w-4"
          />
        </button>

        {/* Collapsible Filters Section */}
        <div
          className={`space-y-3 ${isFiltersExpanded ? 'block' : 'hidden'} lg:block`}
        >
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search balls..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border-2 border-primary bg-primary px-4 py-2 text-base text-primary placeholder:text-primary/50 focus:border-highlight focus:ring-0 sm:text-lg"
          />

          {/* Filters Row */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Filter Dropdown */}
            <select
              value={filter}
              onChange={e => setFilter(e.target.value as FilterType)}
              className="w-full cursor-pointer rounded-lg border-2 border-primary bg-primary px-4 py-2 text-base tracking-wider text-primary focus:border-highlight focus:ring-0 sm:text-lg"
            >
              <option value="all">All Balls ({getAllBalls().length})</option>
              <option value="basic">Basic ({getBasicBalls().length})</option>
              <option value="fusion">Fusion ({getFusionBalls().length})</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortType)}
              className="w-full cursor-pointer rounded-lg border-2 border-primary bg-primary px-4 py-2 text-base tracking-wider text-primary focus:border-highlight focus:ring-0 sm:text-lg"
            >
              <option value="encyclopedia">Sort: Encyclopedia</option>
              <option value="name">Sort: Alphabetical</option>
            </select>
          </div>
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
        <div className="space-y-4">
          {filteredBalls.map(ball => (
            <BallsList key={ball.id} ball={ball} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBalls.map(ball => (
            <BallsGrid key={ball.id} ball={ball} />
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
