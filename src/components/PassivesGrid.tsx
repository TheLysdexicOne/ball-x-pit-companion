'use client';

import { useState, useMemo } from 'react';
import type { Passive } from '@/data/passives';
import { getAllPassives } from '@/data/passives';
import PassiveListItem from './PassiveListItem';

type SortType = 'name' | 'type';

export default function PassivesGrid() {
  const [sort, setSort] = useState<SortType>('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Get all unique types
  const allTypes = useMemo(() => {
    const types = new Set(getAllPassives().map(p => p.type));
    return Array.from(types).sort();
  }, []);

  const filteredPassives = useMemo(() => {
    let passives = getAllPassives();

    // Apply type filter
    if (typeFilter !== 'all') {
      passives = passives.filter(p => p.type === typeFilter);
    }

    // Apply search filter
    if (searchQuery) {
      passives = passives.filter(
        passive =>
          passive.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          passive.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    if (sort === 'type') {
      passives = [...passives].sort((a, b) => {
        if (a.type !== b.type) {
          return a.type.localeCompare(b.type);
        }
        return a.name.localeCompare(b.name);
      });
    } else {
      // Sort by name only
      passives = [...passives].sort((a, b) => a.name.localeCompare(b.name));
    }

    return passives;
  }, [sort, searchQuery, typeFilter]);

  return (
    <div>
      {/* Controls Section */}
      <div className="mb-4 space-y-3">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search passives..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="focus:ring-highlight w-full rounded-lg border-2 border-primary bg-secondary px-4 py-3 font-pixel text-base tracking-wider text-primary placeholder:text-primary/50 focus:border-highlight focus:outline-none focus:ring-2 sm:text-lg"
        />

        {/* Filters Row */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Type Filter Dropdown */}
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="focus:ring-highlight w-full cursor-pointer rounded-lg border-2 border-primary bg-secondary px-4 py-3 font-pixel text-base tracking-wider text-primary focus:border-highlight focus:outline-none focus:ring-2 sm:text-lg"
          >
            <option value="all">All Types ({getAllPassives().length})</option>
            {allTypes.map(type => (
              <option key={type} value={type}>
                Type {type} (
                {getAllPassives().filter(p => p.type === type).length})
              </option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value as SortType)}
            className="focus:ring-highlight w-full cursor-pointer rounded-lg border-2 border-primary bg-secondary px-4 py-3 font-pixel text-base tracking-wider text-primary focus:border-highlight focus:outline-none focus:ring-2 sm:text-lg"
          >
            <option value="name">Sort: Alphabetical</option>
            <option value="type">Sort: Type</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      {searchQuery && (
        <div className="mb-3 text-center font-pixel text-sm tracking-wider text-secondary sm:text-base">
          Found {filteredPassives.length} passive
          {filteredPassives.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* List View */}
      <div className="space-y-3">
        {filteredPassives.map(passive => (
          <PassiveListItem key={passive.id} passive={passive} />
        ))}
      </div>

      {filteredPassives.length === 0 && (
        <div className="card-text-box py-8">
          No passives found matching your criteria.
        </div>
      )}
    </div>
  );
}
