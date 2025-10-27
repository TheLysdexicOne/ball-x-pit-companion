import { useEffect, useState, useCallback } from 'react';
import { HEROES } from '@/data/heroes';
import type {
  ProgressData,
  HeroProgress,
  LevelCompletion,
  FastTierCompletion,
} from '@/types/heroProgress';

const STORAGE_KEY = 'ball-x-pit-progress';
const CURRENT_VERSION = 1;

// Custom event for cross-component synchronization
const PROGRESS_UPDATE_EVENT = 'progress-data-updated';

function dispatchProgressUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(PROGRESS_UPDATE_EVENT));
  }
}

/**
 * Creates initial progress data with default values
 */
function createInitialData(): ProgressData {
  return {
    version: CURRENT_VERSION,
    lastUpdated: new Date().toISOString(),
    heroes: HEROES.map((hero, index) => ({
      heroId: hero.id,
      customIndex: index,
      levelCompletions: [],
    })),
  };
}

/**
 * Loads progress data from localStorage
 */
function loadProgressData(): ProgressData {
  if (typeof window === 'undefined') {
    return createInitialData();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return createInitialData();
    }

    const data = JSON.parse(stored) as ProgressData;

    // Validate and merge with current heroes (in case new heroes were added)
    const existingHeroIds = new Set(data.heroes.map(h => h.heroId));
    const newHeroes = HEROES.filter(h => !existingHeroIds.has(h.id)).map((hero, index) => ({
      heroId: hero.id,
      customIndex: data.heroes.length + index,
      levelCompletions: [],
    }));

    return {
      ...data,
      heroes: [...data.heroes, ...newHeroes],
    };
  } catch (error) {
    console.error('Failed to load progress data:', error);
    return createInitialData();
  }
}

/**
 * Saves progress data to localStorage (without dispatching event)
 */
function saveProgressData(data: ProgressData): void {
  if (typeof window === 'undefined') return;

  try {
    const updated = {
      ...data,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save progress data:', error);
  }
}

/**
 * Saves progress data and notifies other components
 */
function saveAndNotify(data: ProgressData): void {
  saveProgressData(data);
  dispatchProgressUpdate();
}

/**
 * Custom hook for managing hero progress data
 */
export function useProgressData() {
  const [progressData, setProgressData] = useState<ProgressData>(() => loadProgressData());
  const [updateTrigger, setUpdateTrigger] = useState(0);

  // Listen for updates from other components (but don't save on our own updates)
  useEffect(() => {
    const handleUpdate = () => {
      setProgressData(loadProgressData());
      setUpdateTrigger(prev => prev + 1);
    };

    window.addEventListener(PROGRESS_UPDATE_EVENT, handleUpdate);
    return () => window.removeEventListener(PROGRESS_UPDATE_EVENT, handleUpdate);
  }, []);

  /**
   * Gets all heroes sorted by custom index
   * Memoized with updateTrigger to force re-calculation when data changes
   */
  const getSortedHeroes = useCallback((): HeroProgress[] => {
    return [...progressData.heroes].sort((a, b) => a.customIndex - b.customIndex);
  }, [progressData.heroes, updateTrigger]);

  /**
   * Updates the custom order index for a hero
   */
  const updateHeroOrder = (heroId: string, newIndex: number) => {
    const updated = {
      ...progressData,
      heroes: progressData.heroes.map(hero =>
        hero.heroId === heroId ? { ...hero, customIndex: newIndex } : hero
      ),
    };
    setProgressData(updated);
    saveAndNotify(updated);
  };

  /**
   * Updates hero order for multiple heroes at once (for drag-and-drop)
   */
  const updateHeroOrders = (updates: Array<{ heroId: string; customIndex: number }>) => {
    const heroMap = new Map(progressData.heroes.map(h => [h.heroId, h]));
    updates.forEach(({ heroId, customIndex }) => {
      const hero = heroMap.get(heroId);
      if (hero) {
        hero.customIndex = customIndex;
      }
    });
    const updated = {
      ...progressData,
      heroes: Array.from(heroMap.values()),
    };
    setProgressData(updated);
    saveAndNotify(updated);
  };

  /**
   * Updates level completion for a hero
   */
  const updateLevelCompletion = (
    heroId: string,
    levelId: number,
    completion: Partial<LevelCompletion>
  ) => {
    const updated = {
      ...progressData,
      heroes: progressData.heroes.map(hero => {
        if (hero.heroId !== heroId) return hero;

        const existingIndex = hero.levelCompletions.findIndex(
          lc => lc.levelId === levelId && lc.difficulty === completion.difficulty
        );

        if (existingIndex >= 0) {
          // Update existing completion
          const updatedCompletions = [...hero.levelCompletions];
          updatedCompletions[existingIndex] = {
            ...updatedCompletions[existingIndex],
            ...completion,
          } as LevelCompletion;
          return { ...hero, levelCompletions: updatedCompletions };
        } else {
          // Add new completion
          return {
            ...hero,
            levelCompletions: [
              ...hero.levelCompletions,
              {
                levelId,
                difficulty: completion.difficulty || 'base',
                fastTier: (completion.fastTier || 0) as FastTierCompletion,
              },
            ],
          };
        }
      }),
    };
    setProgressData(updated);
    saveAndNotify(updated);
  };

  /**
   * Gets progress for a specific hero
   */
  const getHeroProgress = (heroId: string): HeroProgress | undefined => {
    return progressData.heroes.find(h => h.heroId === heroId);
  };

  /**
   * Resets all progress data
   */
  const resetAllProgress = () => {
    const initial = createInitialData();
    setProgressData(initial);
    saveAndNotify(initial);
  };

  return {
    progressData,
    updateHeroOrder,
    updateHeroOrders,
    updateLevelCompletion,
    getHeroProgress,
    getSortedHeroes,
    resetAllProgress,
  };
}
