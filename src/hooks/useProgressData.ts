import { useEffect, useState, useCallback } from 'react';
import { HEROES } from '@/data/heroes';
import type {
  ProgressData,
  HeroProgress,
  LevelCompletion,
  FastTierCompletion,
  SaveSlotData,
  DifficultyTier,
} from '@/types/heroProgress';

// Storage keys
const LEGACY_STORAGE_KEY = 'ball-x-pit-progress';
const LEGACY_DIFFICULTY_KEY = 'currentDifficulty';
const LEGACY_TIER_KEY = 'currentFastTier';
const ACTIVE_SLOT_KEY = 'ball-x-pit-active-slot';
const getSaveSlotKey = (slot: number) => `ball-x-pit-save-${slot}`;

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
    const stored = localStorage.getItem(LEGACY_STORAGE_KEY);
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
 * Migrates legacy localStorage data to save slot 1
 */
function migrateLegacyData(): void {
  if (typeof window === 'undefined') return;

  try {
    // Check if migration already done
    const slot1 = localStorage.getItem(getSaveSlotKey(1));
    if (slot1) return; // Already migrated

    // Check if legacy data exists
    const legacyProgress = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!legacyProgress) return; // No legacy data to migrate

    const progressData = JSON.parse(legacyProgress) as ProgressData;
    const difficulty = (localStorage.getItem(LEGACY_DIFFICULTY_KEY) as DifficultyTier) || 'base';
    const tier = parseInt(localStorage.getItem(LEGACY_TIER_KEY) || '0', 10) as FastTierCompletion;

    // Create save slot 1 with legacy data
    const saveSlot: SaveSlotData = {
      heroProgress: progressData,
      lastDifficulty: difficulty,
      lastTier: tier,
      lastModified: Date.now(),
      name: 'Save 1',
    };

    localStorage.setItem(getSaveSlotKey(1), JSON.stringify(saveSlot));
    localStorage.setItem(ACTIVE_SLOT_KEY, '1');

    // Keep legacy keys for now (can be cleaned up later)
    console.log('Migrated legacy data to save slot 1');
  } catch (error) {
    console.error('Failed to migrate legacy data:', error);
  }
}

/**
 * Gets the active save slot number (1-3)
 */
function getActiveSlot(): number {
  if (typeof window === 'undefined') return 1;

  try {
    const saved = localStorage.getItem(ACTIVE_SLOT_KEY);
    const slot = saved ? parseInt(saved, 10) : 1;
    return slot >= 1 && slot <= 3 ? slot : 1;
  } catch {
    return 1;
  }
}

/**
 * Loads save slot data
 */
function loadSaveSlot(slot: number): SaveSlotData {
  if (typeof window === 'undefined') {
    return {
      heroProgress: createInitialData(),
      lastDifficulty: 'base',
      lastTier: 0,
      lastModified: Date.now(),
      name: `Save ${slot}`,
    };
  }

  try {
    const stored = localStorage.getItem(getSaveSlotKey(slot));
    if (!stored) {
      // Create new empty slot
      return {
        heroProgress: createInitialData(),
        lastDifficulty: 'base',
        lastTier: 0,
        lastModified: Date.now(),
        name: `Save ${slot}`,
      };
    }

    return JSON.parse(stored) as SaveSlotData;
  } catch (error) {
    console.error(`Failed to load save slot ${slot}:`, error);
    return {
      heroProgress: createInitialData(),
      lastDifficulty: 'base',
      lastTier: 0,
      lastModified: Date.now(),
      name: `Save ${slot}`,
    };
  }
}

/**
 * Saves save slot data to localStorage (without dispatching event)
 */
function saveSaveSlot(slot: number, data: SaveSlotData): void {
  if (typeof window === 'undefined') return;

  try {
    const updated = {
      ...data,
      lastModified: Date.now(),
    };
    localStorage.setItem(getSaveSlotKey(slot), JSON.stringify(updated));
  } catch (error) {
    console.error(`Failed to save slot ${slot}:`, error);
  }
}

/**
 * Saves progress data to localStorage (without dispatching event)
 * @deprecated Use saveSaveSlot instead
 */
function saveProgressData(data: ProgressData): void {
  if (typeof window === 'undefined') return;

  try {
    const updated = {
      ...data,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save progress data:', error);
  }
}

/**
 * Saves progress data and notifies other components
 */
function saveAndNotify(activeSlot: number, saveData: SaveSlotData): void {
  saveSaveSlot(activeSlot, saveData);
  dispatchProgressUpdate();
}

/**
 * Custom hook for managing hero progress data with save slots
 */
export function useProgressData() {
  // Run migration once on mount
  useEffect(() => {
    migrateLegacyData();
  }, []);

  const [activeSlot, setActiveSlotState] = useState<number>(() => getActiveSlot());
  const [saveData, setSaveData] = useState<SaveSlotData>(() => loadSaveSlot(activeSlot));
  const [updateTrigger, setUpdateTrigger] = useState(0);

  // Listen for updates from other components
  useEffect(() => {
    const handleUpdate = () => {
      const currentSlot = getActiveSlot();
      setActiveSlotState(currentSlot);
      setSaveData(loadSaveSlot(currentSlot));
      setUpdateTrigger(prev => prev + 1);
    };

    window.addEventListener(PROGRESS_UPDATE_EVENT, handleUpdate);
    return () => window.removeEventListener(PROGRESS_UPDATE_EVENT, handleUpdate);
  }, []);

  /**
   * Gets all heroes sorted by custom index
   */
  const getSortedHeroes = useCallback((): HeroProgress[] => {
    return [...saveData.heroProgress.heroes].sort((a, b) => a.customIndex - b.customIndex);
  }, [saveData.heroProgress.heroes, updateTrigger]);

  /**
   * Gets current difficulty tier
   */
  const getCurrentDifficulty = useCallback((): DifficultyTier => {
    return saveData.lastDifficulty;
  }, [saveData.lastDifficulty]);

  /**
   * Gets current tier completion
   */
  const getCurrentTier = useCallback((): FastTierCompletion => {
    return saveData.lastTier;
  }, [saveData.lastTier]);

  /**
   * Sets current difficulty tier
   */
  const setCurrentDifficulty = (difficulty: DifficultyTier) => {
    const updated = { ...saveData, lastDifficulty: difficulty };
    setSaveData(updated);
    saveAndNotify(activeSlot, updated);
  };

  /**
   * Sets current tier completion
   */
  const setCurrentTier = (tier: FastTierCompletion) => {
    const updated = { ...saveData, lastTier: tier };
    setSaveData(updated);
    saveAndNotify(activeSlot, updated);
  };

  /**
   * Updates the custom order index for a hero
   */
  const updateHeroOrder = (heroId: string, newIndex: number) => {
    const updatedProgress = {
      ...saveData.heroProgress,
      heroes: saveData.heroProgress.heroes.map(hero =>
        hero.heroId === heroId ? { ...hero, customIndex: newIndex } : hero
      ),
    };
    const updated = { ...saveData, heroProgress: updatedProgress };
    setSaveData(updated);
    saveAndNotify(activeSlot, updated);
  };

  /**
   * Updates hero order for multiple heroes at once (for drag-and-drop)
   */
  const updateHeroOrders = (updates: Array<{ heroId: string; customIndex: number }>) => {
    const heroMap = new Map(saveData.heroProgress.heroes.map(h => [h.heroId, h]));
    updates.forEach(({ heroId, customIndex }) => {
      const hero = heroMap.get(heroId);
      if (hero) {
        hero.customIndex = customIndex;
      }
    });
    const updatedProgress = {
      ...saveData.heroProgress,
      heroes: Array.from(heroMap.values()),
    };
    const updated = { ...saveData, heroProgress: updatedProgress };
    setSaveData(updated);
    saveAndNotify(activeSlot, updated);
  };

  /**
   * Updates level completion for a hero
   */
  const updateLevelCompletion = (
    heroId: string,
    levelId: number,
    completion: Partial<LevelCompletion>
  ) => {
    const updatedProgress = {
      ...saveData.heroProgress,
      heroes: saveData.heroProgress.heroes.map(hero => {
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
    const updated = { ...saveData, heroProgress: updatedProgress };
    setSaveData(updated);
    saveAndNotify(activeSlot, updated);
  };

  /**
   * Gets progress for a specific hero
   */
  const getHeroProgress = (heroId: string): HeroProgress | undefined => {
    return saveData.heroProgress.heroes.find(h => h.heroId === heroId);
  };

  /**
   * Switches to a different save slot
   */
  const switchSaveSlot = (slot: number) => {
    if (slot < 1 || slot > 3) return;

    localStorage.setItem(ACTIVE_SLOT_KEY, slot.toString());
    setActiveSlotState(slot);
    const newSaveData = loadSaveSlot(slot);
    setSaveData(newSaveData);
    dispatchProgressUpdate();
  };

  /**
   * Gets all save slot metadata
   */
  const getAllSaveSlots = (): Array<{ slot: number; data: SaveSlotData }> => {
    return [1, 2, 3].map(slot => ({
      slot,
      data: loadSaveSlot(slot),
    }));
  };

  /**
   * Deletes a save slot (resets to empty)
   */
  const deleteSaveSlot = (slot: number) => {
    if (slot < 1 || slot > 3) return;

    const emptySave: SaveSlotData = {
      heroProgress: createInitialData(),
      lastDifficulty: 'base',
      lastTier: 0,
      lastModified: Date.now(),
      name: `Save ${slot}`,
    };

    saveSaveSlot(slot, emptySave);

    // If deleting active slot, reload it
    if (slot === activeSlot) {
      setSaveData(emptySave);
      dispatchProgressUpdate();
    }
  };

  /**
   * Resets all progress data for current save slot
   */
  const resetAllProgress = () => {
    const initial: SaveSlotData = {
      heroProgress: createInitialData(),
      lastDifficulty: 'base',
      lastTier: 0,
      lastModified: Date.now(),
      name: saveData.name || `Save ${activeSlot}`,
    };
    setSaveData(initial);
    saveAndNotify(activeSlot, initial);
  };

  return {
    // Progress data
    progressData: saveData.heroProgress,

    // Current state
    currentDifficulty: saveData.lastDifficulty,
    currentTier: saveData.lastTier,
    activeSlot,

    // Setters for current state
    setCurrentDifficulty,
    setCurrentTier,

    // Hero operations
    updateHeroOrder,
    updateHeroOrders,
    updateLevelCompletion,
    getHeroProgress,
    getSortedHeroes,

    // Save slot operations
    switchSaveSlot,
    getAllSaveSlots,
    deleteSaveSlot,
    resetAllProgress,
  };
}
