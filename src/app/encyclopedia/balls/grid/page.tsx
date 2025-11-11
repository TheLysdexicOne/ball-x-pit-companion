'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import BallsGrid from '@/components/BallsGrid';
import { getImagePath } from '@/utils/basePath';

export default function BallsGridPage() {
  return (
    <main className="min-h-screen p-8">
      <Header title="Encyclopedia | Balls | Grid" />
      {/* Main content container with max-width */}
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 text-center font-pixel text-6xl tracking-widest">
          ENCYCLOPEDIA
        </div>

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
              BALLS
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
              ITEMS
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
              ENEMIES
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
              TOWN
            </span>
          </button>
        </div>
        <div className="mb-8 flex justify-center gap-4">
          <Link href="/encyclopedia/balls" className="group relative h-14">
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
              LIST
            </span>
          </Link>
          <Link href="/encyclopedia/balls/grid" className="group relative h-14">
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
            <span className="relative inset-0 flex items-center justify-center whitespace-nowrap px-8 font-pixel text-3xl tracking-widest">
              GRID
            </span>
          </Link>
          <Link
            href="/encyclopedia/balls/chart"
            className="group relative h-14"
          >
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
              CHART
            </span>
          </Link>
          <Link
            href="/encyclopedia/balls/fusing"
            className="group relative h-14"
          >
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
              FUSING
            </span>
          </Link>
        </div>

        {/* Content Area with parchment background */}
        <div
          className="mx-0 max-w-screen-xl px-8 py-12"
          style={{
            borderImageSource: `url(${getImagePath('/images/backgrounds/parchment.png')})`,
            borderImageSlice: '100 100 100 100 fill',
            borderImageRepeat: 'repeat',
            borderImageWidth: '400px',
            imageRendering: 'pixelated',
          }}
        >
          <BallsGrid viewType="grid" />
        </div>
      </div>
    </main>
  );
}
