'use client';

import LevelHeroSprite from '@/components/LevelHeroSprite';
import { HEROES } from '@/data/heroes';
import { useProgressData } from '@/hooks/useProgressData';
import { getImagePath } from '@/utils/basePath';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Hero } from '@/data/heroes';
import type { DifficultyTier, FastTierCompletion } from '@/types/heroProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

const LEVELS: { id: number; label: string; backgroundSrc?: string }[] = [
  {
    id: 1,
    label: 'The Bone Yard',
    backgroundSrc: '/images/levels/01-bone-yard.png',
  },
  {
    id: 2,
    label: 'The Snowy Shores',
    backgroundSrc: '/images/levels/02-snowy-shores.png',
  },
  {
    id: 3,
    label: 'The Liminal Desert',
    backgroundSrc: '/images/levels/03-liminal-desert.png',
  },
  {
    id: 4,
    label: 'The Fungal Forest',
    backgroundSrc: '/images/levels/04-fungal-forest.png',
  },
  {
    id: 5,
    label: 'The Gory Grasslands',
    backgroundSrc: '/images/levels/05-gory-grasslands.png',
  },
  {
    id: 6,
    label: 'The Smoldering Depths',
    backgroundSrc: '/images/levels/06-smoldering-depths.png',
  },
  {
    id: 7,
    label: 'The Heavenly Gates',
    backgroundSrc: '/images/levels/07-heavenly-gates.png',
  },
  {
    id: 8,
    label: 'The Vast Void',
    backgroundSrc: '/images/levels/08-vast-void.png',
  },
];

// Difficulty tier options
const DIFFICULTY_TIERS: { value: DifficultyTier; label: string }[] = [
  { value: 'base', label: 'Base Level' },
  { value: 'ng-plus', label: 'New Game +' },
  { value: 'ng-plus-2', label: 'New Game ++' },
  { value: 'ng-plus-3', label: 'New Game +3' },
  { value: 'ng-plus-4', label: 'New Game +4' },
  { value: 'ng-plus-5', label: 'New Game +5' },
  { value: 'ng-plus-6', label: 'New Game +6' },
  { value: 'ng-plus-7', label: 'New Game +7' },
  { value: 'ng-plus-8', label: 'New Game +8' },
  { value: 'ng-plus-9', label: 'New Game +9' },
];

// Fast tier options
const FAST_TIERS: { value: FastTierCompletion; label: string }[] = [
  { value: 1, label: 'Normal' },
  { value: 2, label: 'Fast' },
  { value: 3, label: 'Fast +' },
  { value: 4, label: 'Fast ++' },
  { value: 5, label: 'Fast +3' },
  { value: 6, label: 'Fast +4' },
  { value: 7, label: 'Fast +5' },
  { value: 8, label: 'Fast +6' },
  { value: 9, label: 'Fast +7' },
  { value: 10, label: 'Fast +8' },
  { value: 11, label: 'Fast +9' },
];

export default function Home() {
  const router = useRouter();
  const {
    getSortedHeroes,
    updateLevelCompletion,
    getHeroProgress,
    currentDifficulty,
    currentTier,
    setCurrentDifficulty,
    setCurrentTier,
  } = useProgressData();
  const [sortedHeroes, setSortedHeroes] = useState<Hero[]>(HEROES);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const sortedProgress = getSortedHeroes();
    const heroes = sortedProgress
      .map(progress => HEROES.find(h => h.id === progress.heroId))
      .filter((hero): hero is Hero => hero !== undefined);
    setSortedHeroes(heroes);
  }, [getSortedHeroes]);

  const navigateDifficulty = (direction: 'prev' | 'next') => {
    const currentIndex = DIFFICULTY_TIERS.findIndex(
      tier => tier.value === currentDifficulty
    );
    let nextDifficulty: DifficultyTier | null = null;

    if (direction === 'prev' && currentIndex > 0) {
      nextDifficulty = DIFFICULTY_TIERS[currentIndex - 1].value;
    } else if (
      direction === 'next' &&
      currentIndex < DIFFICULTY_TIERS.length - 1
    ) {
      nextDifficulty = DIFFICULTY_TIERS[currentIndex + 1].value;
    }

    if (nextDifficulty) {
      setCurrentDifficulty(nextDifficulty);
    }
  };

  const navigateFastTier = (direction: 'prev' | 'next') => {
    const currentIndex = FAST_TIERS.findIndex(
      tier => tier.value === currentTier
    );
    let nextTier: FastTierCompletion | null = null;

    if (direction === 'prev' && currentIndex > 0) {
      nextTier = FAST_TIERS[currentIndex - 1].value;
    } else if (direction === 'next' && currentIndex < FAST_TIERS.length - 1) {
      nextTier = FAST_TIERS[currentIndex + 1].value;
    }

    if (nextTier) {
      setCurrentTier(nextTier);
    }
  };

  const isHeroLevelComplete = (heroId: string, levelId: number): boolean => {
    const progress = getHeroProgress(heroId);
    if (!progress) return false;

    const completion = progress.levelCompletions.find(
      entry =>
        entry.levelId === levelId && entry.difficulty === currentDifficulty
    );

    if (!completion) return false;

    return completion.fastTier >= currentTier;
  };

  const toggleHeroCompletion = (heroId: string, levelId: number) => {
    const alreadyComplete = isHeroLevelComplete(heroId, levelId);
    const newFastTier = alreadyComplete
      ? Math.max(0, currentTier - 1)
      : currentTier;

    updateLevelCompletion(heroId, levelId, {
      difficulty: currentDifficulty,
      fastTier: newFastTier as FastTierCompletion,
    });
  };

  const currentDifficultyLabel =
    DIFFICULTY_TIERS.find(tier => tier.value === currentDifficulty)?.label ||
    'Base Level';
  const currentFastTierLabel =
    FAST_TIERS.find(tier => tier.value === currentTier)?.label || 'Normal';

  return (
    <main className="flex flex-col items-center justify-center p-8">
      <div className="flex w-full max-w-4xl flex-col">
        <div className="">
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div className="btn-body-primary relative flex min-h-[72px] items-center justify-center px-6 py-3 sm:px-10">
              {isClient && currentDifficulty !== DIFFICULTY_TIERS[0].value && (
                <button
                  className="absolute left-4 text-3xl text-secondary transition-colors hover:text-primary sm:left-6 sm:text-4xl"
                  onClick={() => navigateDifficulty('prev')}
                  aria-label="Previous difficulty tier"
                >
                  <FontAwesomeIcon icon={faCaretLeft} />
                </button>
              )}
              <h1 className="select-none text-center font-pixel text-2xl tracking-widest text-secondary sm:text-3xl lg:text-4xl">
                {isClient ? currentDifficultyLabel : 'Base Level'}
              </h1>
              {isClient &&
                currentDifficulty !==
                  DIFFICULTY_TIERS[DIFFICULTY_TIERS.length - 1].value && (
                  <button
                    className="absolute right-4 text-3xl text-secondary transition-colors hover:text-primary sm:right-6 sm:text-4xl"
                    onClick={() => navigateDifficulty('next')}
                    aria-label="Next difficulty tier"
                  >
                    <FontAwesomeIcon icon={faCaretRight} />
                  </button>
                )}
            </div>
            <div className="btn-body-primary relative flex min-h-[72px] items-center justify-center px-6 py-3 sm:px-10">
              {isClient && currentTier !== FAST_TIERS[0].value && (
                <button
                  className="absolute left-4 text-3xl text-secondary transition-colors hover:text-primary sm:left-6 sm:text-4xl"
                  onClick={() => navigateFastTier('prev')}
                  aria-label="Previous fast tier"
                >
                  <FontAwesomeIcon icon={faCaretLeft} />
                </button>
              )}
              <h1 className="select-none text-center font-pixel text-2xl tracking-widest text-secondary sm:text-3xl lg:text-4xl">
                {isClient ? currentFastTierLabel : 'Normal'}
              </h1>
              {isClient &&
                currentTier !== FAST_TIERS[FAST_TIERS.length - 1].value && (
                  <button
                    className="absolute right-4 text-3xl text-secondary transition-colors hover:text-primary sm:right-6 sm:text-4xl"
                    onClick={() => navigateFastTier('next')}
                    aria-label="Next fast tier"
                  >
                    <FontAwesomeIcon icon={faCaretRight} />
                  </button>
                )}
            </div>
          </div>
          <div className="space-y-6">
            {LEVELS.map(level => {
              const backgroundUrl = level.backgroundSrc
                ? getImagePath(level.backgroundSrc)
                : null;

              return (
                <section
                  key={level.id}
                  className="border-primary relative overflow-hidden rounded-xl border-2 shadow-lg backdrop-blur"
                >
                  {backgroundUrl && (
                    <>
                      <div
                        className="absolute inset-0 -z-20 bg-cover bg-center"
                        style={{ backgroundImage: `url(${backgroundUrl})` }}
                        aria-hidden="true"
                      />
                      <div
                        className="bg-body/80 absolute inset-0 -z-10"
                        aria-hidden="true"
                      />
                    </>
                  )}

                  <header className="bg-primary relative z-10 flex flex-wrap items-center justify-between gap-3 rounded-t-xl px-4 py-3 sm:px-6 sm:py-4">
                    <h2 className="font-pixel text-2xl tracking-widest text-secondary sm:text-3xl">
                      {level.label}
                    </h2>
                    <span className="text-xs uppercase tracking-[0.45em] text-secondary/70 md:text-sm">
                      Level {level.id.toString().padStart(2, '0')}
                    </span>
                  </header>
                  <div className="relative z-10 px-4 py-4 sm:px-6 sm:py-6">
                    <div className="grid grid-cols-4 justify-items-center gap-3 sm:grid-cols-8">
                      {sortedHeroes.map(hero => (
                        <LevelHeroSprite
                          key={`${level.id}-${hero.id}`}
                          hero={hero}
                          levelId={level.id}
                          isComplete={isHeroLevelComplete(hero.id, level.id)}
                          onToggle={toggleHeroCompletion}
                          isClient={isClient}
                        />
                      ))}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            className="btn-body-primary font-pixel text-xl tracking-widest"
            onClick={() => router.push('/settings/reorder-heroes')}
            type="button"
          >
            REORDER HEROES
          </button>
        </div>
      </div>
    </main>
  );
}
