'use client';

import Header from '@/components/Header';
import HeroList from '@/components/HeroList';
import HeroSprite from '@/components/HeroSprite';
import LevelHeroSprite from '@/components/LevelHeroSprite';
import { HEROES } from '@/data/heroes';
import { useProgressData } from '@/hooks/useProgressData';
import { getImagePath } from '@/utils/basePath';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import type { Hero } from '@/data/heroes';
import type { DifficultyTier, FastTierCompletion } from '@/types/heroProgress';

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
  const [showHeroOverlay, setShowHeroOverlay] = useState(false);
  const { getSortedHeroes, updateLevelCompletion, getHeroProgress } = useProgressData();
  const [sortedHeroes, setSortedHeroes] = useState<Hero[]>(HEROES);
  const [currentDifficulty, setCurrentDifficulty] = useState<DifficultyTier>('base');
  const [currentFastTier, setCurrentFastTier] = useState<FastTierCompletion>(1);
  const [isClient, setIsClient] = useState(false);

  // Set client flag after hydration to prevent SSR mismatch
  useEffect(() => {
    setIsClient(true);

    // Load saved navigation state from localStorage
    const savedDifficulty = localStorage.getItem('currentDifficulty');
    const savedFastTier = localStorage.getItem('currentFastTier');

    if (savedDifficulty && DIFFICULTY_TIERS.some(t => t.value === savedDifficulty)) {
      setCurrentDifficulty(savedDifficulty as DifficultyTier);
    }

    if (savedFastTier) {
      const tierValue = parseInt(savedFastTier, 10);
      if (tierValue >= 1 && tierValue <= 11) {
        setCurrentFastTier(tierValue as FastTierCompletion);
      }
    }
  }, []);

  // Load sorted heroes from progress data
  useEffect(() => {
    const sortedProgress = getSortedHeroes();
    const heroes = sortedProgress
      .map(progress => HEROES.find(h => h.id === progress.heroId))
      .filter((h): h is Hero => h !== undefined);
    setSortedHeroes(heroes);
  }, [getSortedHeroes]);

  // Navigate difficulty tiers
  const navigateDifficulty = (direction: 'prev' | 'next') => {
    const currentIndex = DIFFICULTY_TIERS.findIndex(t => t.value === currentDifficulty);
    let newDifficulty: DifficultyTier | null = null;

    if (direction === 'prev' && currentIndex > 0) {
      newDifficulty = DIFFICULTY_TIERS[currentIndex - 1].value;
    } else if (direction === 'next' && currentIndex < DIFFICULTY_TIERS.length - 1) {
      newDifficulty = DIFFICULTY_TIERS[currentIndex + 1].value;
    }

    if (newDifficulty) {
      setCurrentDifficulty(newDifficulty);
      localStorage.setItem('currentDifficulty', newDifficulty);
    }
  };

  // Navigate fast tiers
  const navigateFastTier = (direction: 'prev' | 'next') => {
    const currentIndex = FAST_TIERS.findIndex(t => t.value === currentFastTier);
    let newFastTier: FastTierCompletion | null = null;

    if (direction === 'prev' && currentIndex > 0) {
      newFastTier = FAST_TIERS[currentIndex - 1].value;
    } else if (direction === 'next' && currentIndex < FAST_TIERS.length - 1) {
      newFastTier = FAST_TIERS[currentIndex + 1].value;
    }

    if (newFastTier) {
      setCurrentFastTier(newFastTier);
      localStorage.setItem('currentFastTier', newFastTier.toString());
    }
  };

  // Check if a hero has completed a specific level at current difficulty/fast tier
  const isHeroLevelComplete = (heroId: string, levelId: number): boolean => {
    const progress = getHeroProgress(heroId);
    if (!progress) return false;

    const completion = progress.levelCompletions.find(
      lc => lc.levelId === levelId && lc.difficulty === currentDifficulty
    );

    // If no completion record, not complete
    if (!completion) return false;

    // Check if fast tier is at or above current
    return completion.fastTier >= currentFastTier;
  };

  // Toggle hero completion for a level
  const toggleHeroCompletion = (heroId: string, levelId: number) => {
    const isComplete = isHeroLevelComplete(heroId, levelId);

    // If already complete at this tier, set to 0 (uncomplete)
    // If not complete, set to current fast tier (which auto-completes lower tiers)
    updateLevelCompletion(heroId, levelId, {
      difficulty: currentDifficulty,
      fastTier: isComplete ? 0 : currentFastTier,
    });
  };

  const currentDifficultyLabel =
    DIFFICULTY_TIERS.find(t => t.value === currentDifficulty)?.label || 'Base Level';
  const currentFastTierLabel = FAST_TIERS.find(t => t.value === currentFastTier)?.label || 'Normal';

  return (
    <main className="min-h-screen p-8">
      <Header />
      {/* Main content container with max-width */}
      <div className="mx-auto max-w-6xl">
        {/* Sub-navigation buttons */}
        <div className="mb-2 flex justify-center gap-4">
          <button className="group relative h-20 w-64">
            <div
              className="absolute inset-0 transition-opacity"
              style={{
                borderImageSource: `url(${getImagePath('/images/ui/btn4.png')})`,
                borderImageSlice: '16 fill',
                borderImageRepeat: 'repeat',
                borderImageWidth: '64px',
                imageRendering: 'pixelated',
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap px-8 font-pixel text-4xl tracking-widest">
              LEVELS
            </span>
          </button>
          <button className="group relative h-20 w-64">
            <div
              className="absolute inset-0 transition-opacity group-hover:opacity-0"
              style={{
                borderImageSource: `url(${getImagePath('/images/ui/btn3.png')})`,
                borderImageSlice: '16 fill',
                borderImageRepeat: 'repeat',
                borderImageWidth: '64px',
                imageRendering: 'pixelated',
              }}
            />
            <div
              className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
              style={{
                borderImageSource: `url(${getImagePath('/images/ui/btn4.png')})`,
                borderImageSlice: '16 fill',
                borderImageRepeat: 'repeat',
                borderImageWidth: '64px',
                imageRendering: 'pixelated',
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap px-8 font-pixel text-4xl tracking-widest">
              HEROES
            </span>
          </button>
        </div>
        <div className="mb-8 flex justify-center">
          <button className="group relative h-14" onClick={() => setShowHeroOverlay(true)}>
            <div
              className="absolute inset-0 transition-opacity group-hover:opacity-0"
              style={{
                borderImageSource: `url(${getImagePath('/images/ui/btn3.png')})`,
                borderImageSlice: '16 fill',
                borderImageRepeat: 'repeat',
                borderImageWidth: '64px',
                imageRendering: 'pixelated',
              }}
            />
            <div
              className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
              style={{
                borderImageSource: `url(${getImagePath('/images/ui/btn4.png')})`,
                borderImageSlice: '16 fill',
                borderImageRepeat: 'repeat',
                borderImageWidth: '64px',
                imageRendering: 'pixelated',
              }}
            />
            <span className="relative inset-0 flex items-center justify-center whitespace-nowrap px-8 font-pixel text-3xl tracking-widest">
              REORDER HEROES
            </span>
          </button>
        </div>

        {/* Content area with parchment background */}
        <div className="mx-0 max-w-screen-xl">
          <div
            className="px-8 py-12"
            style={{
              borderImageSource: `url(${getImagePath('/images/backgrounds/parchment.png')})`,
              borderImageSlice: '100 100 100 100 fill',
              borderImageRepeat: 'repeat',
              borderImageWidth: '400px',
              imageRendering: 'pixelated',
            }}
          >
            <div className="flex justify-center gap-8 px-8">
              <div
                className="relative flex w-full items-center justify-center py-4"
                style={{
                  borderImageSource: `url(${getImagePath('/images/backgrounds/text-bg1.png')})`,
                  borderImageSlice: '50 50 50 50 fill',
                  borderImageRepeat: 'repeat',
                  borderImageWidth: '400px',
                  imageRendering: 'pixelated',
                }}
              >
                {/* Left Arrow */}
                {currentDifficulty !== 'base' && (
                  <button
                    className="group absolute left-8 h-8 w-8 select-none"
                    onClick={() => navigateDifficulty('prev')}
                  >
                    <Image
                      src={getImagePath('/images/ui/left-arrow-1.png')}
                      alt=""
                      fill
                      className="object-contain transition-opacity group-hover:opacity-0"
                      style={{ imageRendering: 'pixelated' }}
                    />
                    <Image
                      src={getImagePath('/images/ui/left-arrow-2.png')}
                      alt=""
                      fill
                      className="object-contain opacity-0 transition-opacity group-hover:opacity-100"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </button>
                )}

                <h1 className="select-none text-center font-pixel text-4xl tracking-widest">
                  {currentDifficultyLabel}
                </h1>

                {/* Right Arrow */}
                {currentDifficulty !== 'ng-plus-9' && (
                  <button
                    className="group absolute right-8 h-8 w-8 select-none"
                    onClick={() => navigateDifficulty('next')}
                  >
                    <Image
                      src={getImagePath('/images/ui/right-arrow-1.png')}
                      alt=""
                      fill
                      className="object-contain transition-opacity group-hover:opacity-0"
                      style={{ imageRendering: 'pixelated' }}
                    />
                    <Image
                      src={getImagePath('/images/ui/right-arrow-2.png')}
                      alt=""
                      fill
                      className="object-contain opacity-0 transition-opacity group-hover:opacity-100"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </button>
                )}
              </div>

              <div
                className="relative flex w-full items-center justify-center py-4"
                style={{
                  borderImageSource: `url(${getImagePath('/images/backgrounds/text-bg1.png')})`,
                  borderImageSlice: '50 50 50 50 fill',
                  borderImageRepeat: 'repeat',
                  borderImageWidth: '400px',
                  imageRendering: 'pixelated',
                }}
              >
                {/* Left Arrow */}
                {currentFastTier !== 1 && (
                  <button
                    className="group absolute left-8 h-8 w-8 select-none"
                    onClick={() => navigateFastTier('prev')}
                  >
                    <Image
                      src={getImagePath('/images/ui/left-arrow-1.png')}
                      alt=""
                      fill
                      className="object-contain transition-opacity group-hover:opacity-0"
                      style={{ imageRendering: 'pixelated' }}
                    />
                    <Image
                      src={getImagePath('/images/ui/left-arrow-2.png')}
                      alt=""
                      fill
                      className="object-contain opacity-0 transition-opacity group-hover:opacity-100"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </button>
                )}

                <h1 className="select-none text-center font-pixel text-4xl tracking-widest">
                  {currentFastTierLabel}
                </h1>

                {/* Right Arrow */}
                {currentFastTier !== 11 && (
                  <button
                    className="group absolute right-8 h-8 w-8 select-none"
                    onClick={() => navigateFastTier('next')}
                  >
                    <Image
                      src={getImagePath('/images/ui/right-arrow-1.png')}
                      alt=""
                      fill
                      className="object-contain transition-opacity group-hover:opacity-0"
                      style={{ imageRendering: 'pixelated' }}
                    />
                    <Image
                      src={getImagePath('/images/ui/right-arrow-2.png')}
                      alt=""
                      fill
                      className="object-contain opacity-0 transition-opacity group-hover:opacity-100"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </button>
                )}
              </div>
            </div>

            {/* Levels background */}
            <div className="mt-8">
              <div className="relative overflow-hidden">
                <div className="relative left-1/2 -translate-x-1/2" style={{ width: '1024px' }}>
                  <Image
                    src={getImagePath('/images/levels/00-the-pit.png')}
                    alt="Level Base"
                    width={800}
                    height={600}
                    className="h-auto w-full select-none"
                  />
                </div>
              </div>
              <div>
                <div className="relative overflow-hidden">
                  <div className="relative left-1/2 -translate-x-1/2" style={{ width: '1024px' }}>
                    <Image
                      src={getImagePath('/images/levels/01-bone-yard.png')}
                      alt="Level Base"
                      width={800}
                      height={600}
                      className="h-auto w-full select-none"
                    />
                  </div>
                  <div className="absolute left-1/2 top-4 -translate-x-1/2">
                    <div className="group relative h-14">
                      <div
                        className="absolute inset-0"
                        style={{
                          borderImageSource: `url(${getImagePath('/images/ui/btn3.png')})`,
                          borderImageSlice: '16 fill',
                          borderImageRepeat: 'repeat',
                          borderImageWidth: '64px',
                          imageRendering: 'pixelated',
                        }}
                      />
                      <h2 className="relative inline-flex h-full select-none items-center justify-center whitespace-nowrap px-8 font-pixel text-3xl tracking-widest">
                        THE BONE <span className="align-top text-2xl">&nbsp;x&nbsp;</span> YARD
                      </h2>
                    </div>
                  </div>
                  {/* Hero sprites - 2 rows of 8 */}
                  <div className="absolute left-1/2 top-20 -translate-x-1/2">
                    <div
                      className="relative p-2"
                      style={{
                        borderImageSource: `url(${getImagePath('/images/ui/border1.png')})`,
                        borderImageSlice: '14 fill',
                        borderImageRepeat: 'repeat',
                        borderImageWidth: '20px',
                        imageRendering: 'pixelated',
                      }}
                    >
                      {/* Background inset */}
                      <div
                        className="absolute inset-[6px]"
                        style={{
                          backgroundColor: '#1f191a',
                          imageRendering: 'pixelated',
                        }}
                      />
                      {/* Sprite grid */}
                      <div className="relative flex flex-col gap-2 p-2">
                        <div className="flex gap-2">
                          {[...sortedHeroes.slice(0, 4), ...sortedHeroes.slice(8, 12)].map(hero => (
                            <LevelHeroSprite
                              key={hero.id}
                              hero={hero}
                              levelId={1}
                              isComplete={isHeroLevelComplete(hero.id, 1)}
                              onToggle={toggleHeroCompletion}
                              isClient={isClient}
                            />
                          ))}
                        </div>
                        <div className="flex gap-2">
                          {[...sortedHeroes.slice(4, 8), ...sortedHeroes.slice(12, 16)].map(
                            hero => (
                              <LevelHeroSprite
                                key={hero.id}
                                hero={hero}
                                levelId={1}
                                isComplete={isHeroLevelComplete(hero.id, 1)}
                                onToggle={toggleHeroCompletion}
                                isClient={isClient}
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="relative overflow-hidden">
                  <div className="relative left-1/2 -translate-x-1/2" style={{ width: '1024px' }}>
                    <Image
                      src={getImagePath('/images/levels/02-snowy-shores.png')}
                      alt="Level Base"
                      width={800}
                      height={600}
                      className="h-auto w-full select-none"
                    />
                  </div>
                  <div className="absolute left-1/2 top-4 -translate-x-1/2">
                    <div className="group relative h-14">
                      <div
                        className="absolute inset-0"
                        style={{
                          borderImageSource: `url(${getImagePath('/images/ui/btn3.png')})`,
                          borderImageSlice: '16 fill',
                          borderImageRepeat: 'repeat',
                          borderImageWidth: '64px',
                          imageRendering: 'pixelated',
                        }}
                      />
                      <h2 className="relative inline-flex h-full select-none items-center justify-center whitespace-nowrap px-8 font-pixel text-3xl tracking-widest">
                        THE SNOWY <span className="align-top text-2xl">&nbsp;x&nbsp;</span> SHORES
                      </h2>
                    </div>
                  </div>
                  {/* Hero sprites - 2 rows of 8 */}
                  <div className="absolute left-1/2 top-20 -translate-x-1/2">
                    <div
                      className="relative p-2"
                      style={{
                        borderImageSource: `url(${getImagePath('/images/ui/border1.png')})`,
                        borderImageSlice: '14 fill',
                        borderImageRepeat: 'repeat',
                        borderImageWidth: '20px',
                        imageRendering: 'pixelated',
                      }}
                    >
                      {/* Background inset */}
                      <div
                        className="absolute inset-[6px]"
                        style={{
                          backgroundColor: '#1f191a',
                          imageRendering: 'pixelated',
                        }}
                      />
                      {/* Sprite grid */}
                      <div className="relative flex flex-col gap-2 p-2">
                        <div className="flex gap-2">
                          {[...sortedHeroes.slice(0, 4), ...sortedHeroes.slice(8, 12)].map(hero => (
                            <LevelHeroSprite
                              key={hero.id}
                              hero={hero}
                              levelId={2}
                              isComplete={isHeroLevelComplete(hero.id, 2)}
                              onToggle={toggleHeroCompletion}
                              isClient={isClient}
                            />
                          ))}
                        </div>
                        <div className="flex gap-2">
                          {[...sortedHeroes.slice(4, 8), ...sortedHeroes.slice(12, 16)].map(
                            hero => (
                              <LevelHeroSprite
                                key={hero.id}
                                hero={hero}
                                levelId={2}
                                isComplete={isHeroLevelComplete(hero.id, 2)}
                                onToggle={toggleHeroCompletion}
                                isClient={isClient}
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="relative overflow-hidden">
                  <div className="relative left-1/2 -translate-x-1/2" style={{ width: '1024px' }}>
                    <Image
                      src={getImagePath('/images/levels/03-liminal-desert.png')}
                      alt="Level Base"
                      width={800}
                      height={600}
                      className="h-auto w-full select-none"
                    />
                  </div>
                  <div className="absolute left-1/2 top-4 -translate-x-1/2">
                    <div className="group relative h-14">
                      <div
                        className="absolute inset-0"
                        style={{
                          borderImageSource: `url(${getImagePath('/images/ui/btn3.png')})`,
                          borderImageSlice: '16 fill',
                          borderImageRepeat: 'repeat',
                          borderImageWidth: '64px',
                          imageRendering: 'pixelated',
                        }}
                      />
                      <h2 className="relative inline-flex h-full select-none items-center justify-center whitespace-nowrap px-8 font-pixel text-3xl tracking-widest">
                        THE LIMINAL <span className="align-top text-2xl">&nbsp;x&nbsp;</span> DESERT
                      </h2>
                    </div>
                  </div>
                  {/* Hero sprites - 2 rows of 8 */}
                  <div className="absolute left-1/2 top-20 -translate-x-1/2">
                    <div
                      className="relative p-2"
                      style={{
                        borderImageSource: `url(${getImagePath('/images/ui/border1.png')})`,
                        borderImageSlice: '14 fill',
                        borderImageRepeat: 'repeat',
                        borderImageWidth: '20px',
                        imageRendering: 'pixelated',
                      }}
                    >
                      {/* Background inset */}
                      <div
                        className="absolute inset-[6px]"
                        style={{
                          backgroundColor: '#1f191a',
                          imageRendering: 'pixelated',
                        }}
                      />
                      {/* Sprite grid */}
                      <div className="relative flex flex-col gap-2 p-2">
                        <div className="flex gap-2">
                          {[...sortedHeroes.slice(0, 4), ...sortedHeroes.slice(8, 12)].map(hero => (
                            <div
                              key={hero.id}
                              className="transition-all hover:drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]"
                            >
                              <HeroSprite hero={hero} type="small" scale={3} />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          {[...sortedHeroes.slice(4, 8), ...sortedHeroes.slice(12, 16)].map(
                            hero => (
                              <div
                                key={hero.id}
                                className="transition-all hover:drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]"
                              >
                                <HeroSprite hero={hero} type="small" scale={3} />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="relative overflow-hidden">
                  <div className="relative left-1/2 -translate-x-1/2" style={{ width: '1024px' }}>
                    <Image
                      src={getImagePath('/images/levels/04-fungal-forest.png')}
                      alt="Level Base"
                      width={800}
                      height={600}
                      className="h-auto w-full select-none"
                    />
                  </div>
                  <div className="absolute left-1/2 top-4 -translate-x-1/2">
                    <div className="group relative h-14">
                      <div
                        className="absolute inset-0"
                        style={{
                          borderImageSource: `url(${getImagePath('/images/ui/btn3.png')})`,
                          borderImageSlice: '16 fill',
                          borderImageRepeat: 'repeat',
                          borderImageWidth: '64px',
                          imageRendering: 'pixelated',
                        }}
                      />
                      <h2 className="relative inline-flex h-full select-none items-center justify-center whitespace-nowrap px-8 font-pixel text-3xl tracking-widest">
                        THE FUNGAL <span className="align-top text-2xl">&nbsp;x&nbsp;</span> FOREST
                      </h2>
                    </div>
                  </div>
                  {/* Hero sprites - 2 rows of 8 */}
                  <div className="absolute left-1/2 top-20 -translate-x-1/2">
                    <div
                      className="relative p-2"
                      style={{
                        borderImageSource: `url(${getImagePath('/images/ui/border1.png')})`,
                        borderImageSlice: '14 fill',
                        borderImageRepeat: 'repeat',
                        borderImageWidth: '20px',
                        imageRendering: 'pixelated',
                      }}
                    >
                      {/* Background inset */}
                      <div
                        className="absolute inset-[6px]"
                        style={{
                          backgroundColor: '#1f191a',
                          imageRendering: 'pixelated',
                        }}
                      />
                      {/* Sprite grid */}
                      <div className="relative flex flex-col gap-2 p-2">
                        <div className="flex gap-2">
                          {[...sortedHeroes.slice(0, 4), ...sortedHeroes.slice(8, 12)].map(hero => (
                            <div
                              key={hero.id}
                              className="transition-all hover:drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]"
                            >
                              <HeroSprite hero={hero} type="small" scale={3} />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          {[...sortedHeroes.slice(4, 8), ...sortedHeroes.slice(12, 16)].map(
                            hero => (
                              <div
                                key={hero.id}
                                className="transition-all hover:drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]"
                              >
                                <HeroSprite hero={hero} type="small" scale={3} />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="relative overflow-hidden">
                  <div className="relative left-1/2 -translate-x-1/2" style={{ width: '1024px' }}>
                    <Image
                      src={getImagePath('/images/levels/05-gory-grasslands.png')}
                      alt="Level Base"
                      width={800}
                      height={600}
                      className="h-auto w-full select-none"
                    />
                  </div>
                  <div className="absolute left-1/2 top-4 -translate-x-1/2">
                    <div className="group relative h-14">
                      <div
                        className="absolute inset-0"
                        style={{
                          borderImageSource: `url(${getImagePath('/images/ui/btn3.png')})`,
                          borderImageSlice: '16 fill',
                          borderImageRepeat: 'repeat',
                          borderImageWidth: '64px',
                          imageRendering: 'pixelated',
                        }}
                      />
                      <h2 className="relative inline-flex h-full select-none items-center justify-center whitespace-nowrap px-8 font-pixel text-3xl tracking-widest">
                        THE GORY <span className="align-top text-2xl">&nbsp;x&nbsp;</span>{' '}
                        GRASSLANDS
                      </h2>
                    </div>
                  </div>
                  {/* Hero sprites - 2 rows of 8 */}
                  <div className="absolute left-1/2 top-20 -translate-x-1/2">
                    <div
                      className="relative p-2"
                      style={{
                        borderImageSource: `url(${getImagePath('/images/ui/border1.png')})`,
                        borderImageSlice: '14 fill',
                        borderImageRepeat: 'repeat',
                        borderImageWidth: '20px',
                        imageRendering: 'pixelated',
                      }}
                    >
                      {/* Background inset */}
                      <div
                        className="absolute inset-[6px]"
                        style={{
                          backgroundColor: '#1f191a',
                          imageRendering: 'pixelated',
                        }}
                      />
                      {/* Sprite grid */}
                      <div className="relative flex flex-col gap-2 p-2">
                        <div className="flex gap-2">
                          {[...sortedHeroes.slice(0, 4), ...sortedHeroes.slice(8, 12)].map(hero => (
                            <div
                              key={hero.id}
                              className="transition-all hover:drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]"
                            >
                              <HeroSprite hero={hero} type="small" scale={3} />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          {[...sortedHeroes.slice(4, 8), ...sortedHeroes.slice(12, 16)].map(
                            hero => (
                              <div
                                key={hero.id}
                                className="transition-all hover:drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]"
                              >
                                <HeroSprite hero={hero} type="small" scale={3} />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="relative overflow-hidden">
                  <div className="relative left-1/2 -translate-x-1/2" style={{ width: '1024px' }}>
                    <Image
                      src={getImagePath('/images/levels/06-smoldering-depths.png')}
                      alt="Level Base"
                      width={800}
                      height={600}
                      className="h-auto w-full select-none"
                    />
                  </div>
                  <div className="absolute left-1/2 top-4 -translate-x-1/2">
                    <div className="group relative h-14">
                      <div
                        className="absolute inset-0"
                        style={{
                          borderImageSource: `url(${getImagePath('/images/ui/btn3.png')})`,
                          borderImageSlice: '16 fill',
                          borderImageRepeat: 'repeat',
                          borderImageWidth: '64px',
                          imageRendering: 'pixelated',
                        }}
                      />
                      <h2 className="relative inline-flex h-full select-none items-center justify-center whitespace-nowrap px-8 font-pixel text-3xl tracking-widest">
                        THE SMOLDERING <span className="align-top text-2xl">&nbsp;x&nbsp;</span>{' '}
                        DEPTHS
                      </h2>
                    </div>
                  </div>
                  {/* Hero sprites - 2 rows of 8 */}
                  <div className="absolute left-1/2 top-20 -translate-x-1/2">
                    <div
                      className="relative p-2"
                      style={{
                        borderImageSource: `url(${getImagePath('/images/ui/border1.png')})`,
                        borderImageSlice: '14 fill',
                        borderImageRepeat: 'repeat',
                        borderImageWidth: '20px',
                        imageRendering: 'pixelated',
                      }}
                    >
                      {/* Background inset */}
                      <div
                        className="absolute inset-[6px]"
                        style={{
                          backgroundColor: '#1f191a',
                          imageRendering: 'pixelated',
                        }}
                      />
                      {/* Sprite grid */}
                      <div className="relative flex flex-col gap-2 p-2">
                        <div className="flex gap-2">
                          {[...sortedHeroes.slice(0, 4), ...sortedHeroes.slice(8, 12)].map(hero => (
                            <div
                              key={hero.id}
                              className="transition-all hover:drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]"
                            >
                              <HeroSprite hero={hero} type="small" scale={3} />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          {[...sortedHeroes.slice(4, 8), ...sortedHeroes.slice(12, 16)].map(
                            hero => (
                              <div
                                key={hero.id}
                                className="transition-all hover:drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]"
                              >
                                <HeroSprite hero={hero} type="small" scale={3} />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="relative overflow-hidden">
                  <div className="relative left-1/2 -translate-x-1/2" style={{ width: '1024px' }}>
                    <Image
                      src={getImagePath('/images/levels/07-heavenly-gates.png')}
                      alt="Level Base"
                      width={800}
                      height={600}
                      className="h-auto w-full select-none"
                    />
                  </div>
                  <div className="absolute left-1/2 top-4 -translate-x-1/2">
                    <div className="group relative h-14">
                      <div
                        className="absolute inset-0"
                        style={{
                          borderImageSource: `url(${getImagePath('/images/ui/btn3.png')})`,
                          borderImageSlice: '16 fill',
                          borderImageRepeat: 'repeat',
                          borderImageWidth: '64px',
                          imageRendering: 'pixelated',
                        }}
                      />
                      <h2 className="relative inline-flex h-full select-none items-center justify-center whitespace-nowrap px-8 font-pixel text-3xl tracking-widest">
                        THE HEAVENLY <span className="align-top text-2xl">&nbsp;x&nbsp;</span> GATES
                      </h2>
                    </div>
                  </div>
                  {/* Hero sprites - 2 rows of 8 */}
                  <div className="absolute left-1/2 top-20 -translate-x-1/2">
                    <div
                      className="relative p-2"
                      style={{
                        borderImageSource: `url(${getImagePath('/images/ui/border1.png')})`,
                        borderImageSlice: '14 fill',
                        borderImageRepeat: 'repeat',
                        borderImageWidth: '20px',
                        imageRendering: 'pixelated',
                      }}
                    >
                      {/* Background inset */}
                      <div
                        className="absolute inset-[6px]"
                        style={{
                          backgroundColor: '#1f191a',
                          imageRendering: 'pixelated',
                        }}
                      />
                      {/* Sprite grid */}
                      <div className="relative flex flex-col gap-2 p-2">
                        <div className="flex gap-2">
                          {sortedHeroes.slice(0, 8).map(hero => (
                            <div
                              key={hero.id}
                              className="transition-all hover:drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]"
                            >
                              <HeroSprite hero={hero} type="small" scale={3} />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          {sortedHeroes.slice(8, 16).map(hero => (
                            <div
                              key={hero.id}
                              className="transition-all hover:drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]"
                            >
                              <HeroSprite hero={hero} type="small" scale={3} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="relative overflow-hidden">
                  <div className="relative left-1/2 -translate-x-1/2" style={{ width: '1024px' }}>
                    <Image
                      src={getImagePath('/images/levels/08-vast-void.png')}
                      alt="Level Base"
                      width={800}
                      height={600}
                      className="h-auto w-full select-none"
                    />
                  </div>
                  <div className="absolute left-1/2 top-4 -translate-x-1/2">
                    <div className="group relative h-14">
                      <div
                        className="absolute inset-0"
                        style={{
                          borderImageSource: `url(${getImagePath('/images/ui/btn3.png')})`,
                          borderImageSlice: '16 fill',
                          borderImageRepeat: 'repeat',
                          borderImageWidth: '64px',
                          imageRendering: 'pixelated',
                        }}
                      />
                      <h2 className="relative inline-flex h-full select-none items-center justify-center whitespace-nowrap px-8 font-pixel text-3xl tracking-widest">
                        THE VAST <span className="align-top text-2xl">&nbsp;x&nbsp;</span> VOID
                      </h2>
                    </div>
                  </div>
                  {/* Hero sprites - 2 rows of 8 */}
                  <div className="absolute left-1/2 top-20 -translate-x-1/2">
                    <div
                      className="relative p-2"
                      style={{
                        borderImageSource: `url(${getImagePath('/images/ui/border1.png')})`,
                        borderImageSlice: '14 fill',
                        borderImageRepeat: 'repeat',
                        borderImageWidth: '20px',
                        imageRendering: 'pixelated',
                      }}
                    >
                      {/* Background inset */}
                      <div
                        className="absolute inset-[6px]"
                        style={{
                          backgroundColor: '#1f191a',
                          imageRendering: 'pixelated',
                        }}
                      />
                      {/* Sprite grid */}
                      <div className="relative flex flex-col gap-2 p-2">
                        <div className="flex gap-2">
                          {[...sortedHeroes.slice(0, 4), ...sortedHeroes.slice(8, 12)].map(hero => (
                            <div
                              key={hero.id}
                              className="transition-all hover:drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]"
                            >
                              <HeroSprite hero={hero} type="small" scale={3} />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          {[...sortedHeroes.slice(4, 8), ...sortedHeroes.slice(12, 16)].map(
                            hero => (
                              <div
                                key={hero.id}
                                className="transition-all hover:drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]"
                              >
                                <HeroSprite hero={hero} type="small" scale={3} />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
      {/* End max-w-6xl container */}
      {/* Hero List Overlay */}
      {showHeroOverlay && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-8"
          onClick={() => setShowHeroOverlay(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-screen-lg overflow-auto"
            onClick={e => e.stopPropagation()}
            style={{
              borderImageSource: `url(${getImagePath('/images/backgrounds/parchment.png')})`,
              borderImageSlice: '100 100 100 100 fill',
              borderImageRepeat: 'repeat',
              borderImageWidth: '400px',
              imageRendering: 'pixelated',
            }}
          >
            {/* Close button */}
            <button
              className="absolute right-4 top-4 z-10 font-pixel text-4xl leading-none text-primary hover:text-red-600 sm:right-8 sm:top-8 sm:text-6xl"
              onClick={() => setShowHeroOverlay(false)}
            >
              ×
            </button>

            <div className="p-6 sm:p-12">
              <HeroList />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
