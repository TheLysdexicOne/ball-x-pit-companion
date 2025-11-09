'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import BallsGrid from '@/components/BallsGrid';
import { getImagePath } from '@/utils/basePath';

export default function Balls() {
  return (
    <main className="min-h-screen p-8">
      <Header />
      {/* Main content container with max-width */}
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 font-pixel text-4xl tracking-widest">ENCYCLOPEDIA</div>

        {/* Sub-navigation buttons */}
        <div className="mb-8 flex justify-center gap-4">
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
          <h1 className="mb-6 text-center font-pixel text-5xl tracking-widest">BALLS</h1>
          <BallsGrid />
        </div>
      </div>
    </main>
  );
}
