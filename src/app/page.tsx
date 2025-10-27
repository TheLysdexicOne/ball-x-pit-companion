'use client';

import Header from '@/components/Header';
import HeroList from '@/components/HeroList';
import HeroSprite from '@/components/HeroSprite';
import { HEROES } from '@/data/heroes';
import { useProgressData } from '@/hooks/useProgressData';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import type { Hero } from '@/data/heroes';

export default function Home() {
  const [showHeroOverlay, setShowHeroOverlay] = useState(false);
  const { getSortedHeroes } = useProgressData();
  const [sortedHeroes, setSortedHeroes] = useState<Hero[]>(HEROES);

  // Load sorted heroes from progress data
  useEffect(() => {
    const sortedProgress = getSortedHeroes();
    const heroes = sortedProgress
      .map(progress => HEROES.find(h => h.id === progress.heroId))
      .filter((h): h is Hero => h !== undefined);
    setSortedHeroes(heroes);
  }, [getSortedHeroes]);

  return (
    <main className="min-h-screen p-8">
      <Header />

      {/* Sub-navigation buttons */}
      <div className="mb-2 flex justify-center gap-4">
        <button className="group relative h-20 w-64">
          <div
            className="absolute inset-0 transition-opacity"
            style={{
              borderImageSource: 'url(/images/ui/btn4.png)',
              borderImageSlice: '16 fill',
              borderImageRepeat: 'repeat',
              borderImageWidth: '64px',
              imageRendering: 'pixelated',
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center font-pixel text-4xl tracking-widest">
            LEVELS
          </span>
        </button>
        <button className="group relative h-20 w-64">
          <div
            className="absolute inset-0 transition-opacity group-hover:opacity-0"
            style={{
              borderImageSource: 'url(/images/ui/btn3.png)',
              borderImageSlice: '16 fill',
              borderImageRepeat: 'repeat',
              borderImageWidth: '64px',
              imageRendering: 'pixelated',
            }}
          />
          <div
            className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
            style={{
              borderImageSource: 'url(/images/ui/btn4.png)',
              borderImageSlice: '16 fill',
              borderImageRepeat: 'repeat',
              borderImageWidth: '64px',
              imageRendering: 'pixelated',
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center font-pixel text-4xl tracking-widest">
            HEROES
          </span>
        </button>
      </div>
      <div className="mb-8 flex justify-center">
        <button className="group relative h-14 w-96" onClick={() => setShowHeroOverlay(true)}>
          <div
            className="absolute inset-0 transition-opacity group-hover:opacity-0"
            style={{
              borderImageSource: 'url(/images/ui/btn3.png)',
              borderImageSlice: '16 fill',
              borderImageRepeat: 'repeat',
              borderImageWidth: '64px',
              imageRendering: 'pixelated',
            }}
          />
          <div
            className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
            style={{
              borderImageSource: 'url(/images/ui/btn4.png)',
              borderImageSlice: '16 fill',
              borderImageRepeat: 'repeat',
              borderImageWidth: '64px',
              imageRendering: 'pixelated',
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center font-pixel text-3xl tracking-widest">
            REORDER HEROES
          </span>
        </button>
      </div>

      {/* Content area with parchment background */}
      <div className="mx-auto max-w-screen-xl">
        <div
          className="p-12"
          style={{
            borderImageSource: 'url(/images/backgrounds/parchment.png)',
            borderImageSlice: '100 100 100 100 fill',
            borderImageRepeat: 'repeat',
            borderImageWidth: '400px',
            imageRendering: 'pixelated',
          }}
        >
          <div className="flex justify-center gap-8 px-12">
            <div
              className="flex w-full items-center justify-center gap-8 py-4"
              style={{
                borderImageSource: 'url(/images/backgrounds/text-bg1.png)',
                borderImageSlice: '50 50 50 50 fill',
                borderImageRepeat: 'repeat',
                borderImageWidth: '400px',
                imageRendering: 'pixelated',
              }}
            >
              {/* Left Arrow */}
              <button className="group relative h-8 w-8">
                <Image
                  src="/images/ui/left-arrow-1.png"
                  alt=""
                  fill
                  className="object-contain transition-opacity group-hover:opacity-0"
                  style={{ imageRendering: 'pixelated' }}
                />
                <Image
                  src="/images/ui/left-arrow-2.png"
                  alt=""
                  fill
                  className="object-contain opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ imageRendering: 'pixelated' }}
                />
              </button>

              <h1 className="text-center font-pixel text-4xl tracking-widest">Base Levels</h1>

              {/* Right Arrow */}
              <button className="group relative h-8 w-8">
                <Image
                  src="/images/ui/right-arrow-1.png"
                  alt=""
                  fill
                  className="object-contain transition-opacity group-hover:opacity-0"
                  style={{ imageRendering: 'pixelated' }}
                />
                <Image
                  src="/images/ui/right-arrow-2.png"
                  alt=""
                  fill
                  className="object-contain opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ imageRendering: 'pixelated' }}
                />
              </button>
            </div>

            <div
              className="flex w-full items-center justify-center gap-8 py-4"
              style={{
                borderImageSource: 'url(/images/backgrounds/text-bg1.png)',
                borderImageSlice: '50 50 50 50 fill',
                borderImageRepeat: 'repeat',
                borderImageWidth: '400px',
                imageRendering: 'pixelated',
              }}
            >
              {/* Left Arrow */}
              <button className="group relative h-8 w-8 flex-shrink-0">
                <Image
                  src="/images/ui/left-arrow-1.png"
                  alt=""
                  fill
                  className="object-contain transition-opacity group-hover:opacity-0"
                  style={{ imageRendering: 'pixelated' }}
                />
                <Image
                  src="/images/ui/left-arrow-2.png"
                  alt=""
                  fill
                  className="object-contain opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ imageRendering: 'pixelated' }}
                />
              </button>

              <h1 className="text-center font-pixel text-4xl tracking-widest">Normal</h1>

              {/* Right Arrow */}
              <button className="group relative h-8 w-8 flex-shrink-0">
                <Image
                  src="/images/ui/right-arrow-1.png"
                  alt=""
                  fill
                  className="object-contain transition-opacity group-hover:opacity-0"
                  style={{ imageRendering: 'pixelated' }}
                />
                <Image
                  src="/images/ui/right-arrow-2.png"
                  alt=""
                  fill
                  className="object-contain opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ imageRendering: 'pixelated' }}
                />
              </button>
            </div>
          </div>

          {/* Levels background */}
          <div className="mt-8">
            <div>
              <Image
                src="/images/levels/00-the-pit.png"
                alt="Level Base"
                width={800}
                height={600}
                className="h-auto w-full"
              />
            </div>
            <div>
              <div className="relative">
                <Image
                  src="/images/levels/01-bone-yard.png"
                  alt="Level Base"
                  width={800}
                  height={600}
                  className="h-auto w-full"
                />
                <div className="absolute left-1/2 top-4 -translate-x-1/2">
                  <div className="group relative h-14 w-96">
                    <div
                      className="absolute inset-0"
                      style={{
                        borderImageSource: 'url(/images/ui/btn3.png)',
                        borderImageSlice: '16 fill',
                        borderImageRepeat: 'repeat',
                        borderImageWidth: '64px',
                        imageRendering: 'pixelated',
                      }}
                    />
                    <h2 className="absolute inset-0 flex items-center justify-center font-pixel text-3xl tracking-widest">
                      THE BONE <span className="align-top text-2xl">x</span> YARD
                    </h2>
                  </div>
                </div>
                {/* Hero sprites - 2 rows of 8 */}
                <div className="absolute left-1/2 top-20 -translate-x-1/2">
                  <div
                    className="relative p-2"
                    style={{
                      borderImageSource: 'url(/images/ui/border1.png)',
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
              <div className="relative">
                <Image
                  src="/images/levels/02-snowy-shores.png"
                  alt="Level Base"
                  width={800}
                  height={600}
                  className="h-auto w-full"
                />
                <div className="absolute left-1/2 top-4 -translate-x-1/2">
                  <div className="group relative h-14 w-96">
                    <div
                      className="absolute inset-0"
                      style={{
                        borderImageSource: 'url(/images/ui/btn3.png)',
                        borderImageSlice: '16 fill',
                        borderImageRepeat: 'repeat',
                        borderImageWidth: '64px',
                        imageRendering: 'pixelated',
                      }}
                    />
                    <h2 className="absolute inset-0 flex items-center justify-center font-pixel text-3xl tracking-widest">
                      THE SNOWY <span className="align-top text-2xl">x</span> SHORES
                    </h2>
                  </div>
                </div>
                {/* Hero sprites - 2 rows of 8 */}
                <div className="absolute left-1/2 top-20 -translate-x-1/2">
                  <div
                    className="relative p-2"
                    style={{
                      borderImageSource: 'url(/images/ui/border1.png)',
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
              <div className="relative">
                <Image
                  src="/images/levels/03-liminal-desert.png"
                  alt="Level Base"
                  width={800}
                  height={600}
                  className="h-auto w-full"
                />
                <div className="absolute left-1/2 top-4 -translate-x-1/2">
                  <div className="group relative h-14 w-96">
                    <div
                      className="absolute inset-0"
                      style={{
                        borderImageSource: 'url(/images/ui/btn3.png)',
                        borderImageSlice: '16 fill',
                        borderImageRepeat: 'repeat',
                        borderImageWidth: '64px',
                        imageRendering: 'pixelated',
                      }}
                    />
                    <h2 className="absolute inset-0 flex items-center justify-center font-pixel text-3xl tracking-widest">
                      THE LIMINAL <span className="align-top text-2xl">x</span> DESERT
                    </h2>
                  </div>
                </div>
                {/* Hero sprites - 2 rows of 8 */}
                <div className="absolute left-1/2 top-20 -translate-x-1/2">
                  <div
                    className="relative p-2"
                    style={{
                      borderImageSource: 'url(/images/ui/border1.png)',
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
              <div className="relative">
                <Image
                  src="/images/levels/04-fungal-forest.png"
                  alt="Level Base"
                  width={800}
                  height={600}
                  className="h-auto w-full"
                />
                <div className="absolute left-1/2 top-4 -translate-x-1/2">
                  <div className="group relative h-14 w-96">
                    <div
                      className="absolute inset-0"
                      style={{
                        borderImageSource: 'url(/images/ui/btn3.png)',
                        borderImageSlice: '16 fill',
                        borderImageRepeat: 'repeat',
                        borderImageWidth: '64px',
                        imageRendering: 'pixelated',
                      }}
                    />
                    <h2 className="absolute inset-0 flex items-center justify-center font-pixel text-3xl tracking-widest">
                      THE FUNGAL <span className="align-top text-2xl">x</span> FOREST
                    </h2>
                  </div>
                </div>
                {/* Hero sprites - 2 rows of 8 */}
                <div className="absolute left-1/2 top-20 -translate-x-1/2">
                  <div
                    className="relative p-2"
                    style={{
                      borderImageSource: 'url(/images/ui/border1.png)',
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
              <div className="relative">
                <Image
                  src="/images/levels/05-gory-grasslands.png"
                  alt="Level Base"
                  width={800}
                  height={600}
                  className="h-auto w-full"
                />
                <div className="absolute left-1/2 top-4 -translate-x-1/2">
                  <div className="group relative h-14 w-96">
                    <div
                      className="absolute inset-0"
                      style={{
                        borderImageSource: 'url(/images/ui/btn3.png)',
                        borderImageSlice: '16 fill',
                        borderImageRepeat: 'repeat',
                        borderImageWidth: '64px',
                        imageRendering: 'pixelated',
                      }}
                    />
                    <h2 className="absolute inset-0 flex items-center justify-center font-pixel text-3xl tracking-widest">
                      THE GORY <span className="align-top text-2xl">x</span> GRASSLANDS
                    </h2>
                  </div>
                </div>
                {/* Hero sprites - 2 rows of 8 */}
                <div className="absolute left-1/2 top-20 -translate-x-1/2">
                  <div
                    className="relative p-2"
                    style={{
                      borderImageSource: 'url(/images/ui/border1.png)',
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
              <div className="relative">
                <Image
                  src="/images/levels/06-smoldering-depths.png"
                  alt="Level Base"
                  width={800}
                  height={600}
                  className="h-auto w-full"
                />
                <div className="absolute left-1/2 top-4 -translate-x-1/2">
                  <div className="group relative h-14 w-96">
                    <div
                      className="absolute inset-0"
                      style={{
                        borderImageSource: 'url(/images/ui/btn3.png)',
                        borderImageSlice: '16 fill',
                        borderImageRepeat: 'repeat',
                        borderImageWidth: '64px',
                        imageRendering: 'pixelated',
                      }}
                    />
                    <h2 className="absolute inset-0 flex items-center justify-center font-pixel text-3xl tracking-widest">
                      THE SMOLDERING <span className="align-top text-2xl">x</span> DEPTHS
                    </h2>
                  </div>
                </div>
                {/* Hero sprites - 2 rows of 8 */}
                <div className="absolute left-1/2 top-20 -translate-x-1/2">
                  <div
                    className="relative p-2"
                    style={{
                      borderImageSource: 'url(/images/ui/border1.png)',
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
              <div className="relative">
                <Image
                  src="/images/levels/07-heavenly-gates.png"
                  alt="Level Base"
                  width={800}
                  height={600}
                  className="h-auto w-full"
                />
                <div className="absolute left-1/2 top-4 -translate-x-1/2">
                  <div className="group relative h-14 w-96">
                    <div
                      className="absolute inset-0"
                      style={{
                        borderImageSource: 'url(/images/ui/btn3.png)',
                        borderImageSlice: '16 fill',
                        borderImageRepeat: 'repeat',
                        borderImageWidth: '64px',
                        imageRendering: 'pixelated',
                      }}
                    />
                    <h2 className="absolute inset-0 flex items-center justify-center font-pixel text-3xl tracking-widest">
                      THE HEAVENLY <span className="align-top text-2xl">x</span> GATES
                    </h2>
                  </div>
                </div>
                {/* Hero sprites - 2 rows of 8 */}
                <div className="absolute left-1/2 top-20 -translate-x-1/2">
                  <div
                    className="relative p-2"
                    style={{
                      borderImageSource: 'url(/images/ui/border1.png)',
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
              <div className="relative">
                <Image
                  src="/images/levels/08-vast-void.png"
                  alt="Level Base"
                  width={800}
                  height={600}
                  className="h-auto w-full"
                />
                <div className="absolute left-1/2 top-4 -translate-x-1/2">
                  <div className="group relative h-14 w-96">
                    <div
                      className="absolute inset-0"
                      style={{
                        borderImageSource: 'url(/images/ui/btn3.png)',
                        borderImageSlice: '16 fill',
                        borderImageRepeat: 'repeat',
                        borderImageWidth: '64px',
                        imageRendering: 'pixelated',
                      }}
                    />
                    <h2 className="absolute inset-0 flex items-center justify-center font-pixel text-3xl tracking-widest">
                      THE VAST <span className="align-top text-2xl">x</span> VOID
                    </h2>
                  </div>
                </div>
                {/* Hero sprites - 2 rows of 8 */}
                <div className="absolute left-1/2 top-20 -translate-x-1/2">
                  <div
                    className="relative p-2"
                    style={{
                      borderImageSource: 'url(/images/ui/border1.png)',
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
          </div>
        </div>
      </div>

      {/* Hero List Overlay */}
      {showHeroOverlay && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-8"
          onClick={() => setShowHeroOverlay(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-screen-lg overflow-auto"
            onClick={e => e.stopPropagation()}
            style={{
              borderImageSource: 'url(/images/backgrounds/parchment.png)',
              borderImageSlice: '100 100 100 100 fill',
              borderImageRepeat: 'repeat',
              borderImageWidth: '400px',
              imageRendering: 'pixelated',
            }}
          >
            {/* Close button */}
            <button
              className="absolute right-8 top-8 z-10 font-pixel text-6xl leading-none text-primary hover:text-red-600"
              onClick={() => setShowHeroOverlay(false)}
            >
              ×
            </button>

            <div className="p-12">
              <HeroList />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
