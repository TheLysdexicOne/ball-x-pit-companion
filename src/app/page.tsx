import Header from '@/components/Header';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <Header />

      {/* Sub-navigation buttons */}
      <div className="mb-8 flex justify-center gap-4">
        <button className="group relative h-32 w-64">
          <Image
            src="/images/ui/btn4.png"
            alt=""
            fill
            className="object-contain transition-opacity"
          />
          <span className="font-pixel absolute inset-0 flex items-center justify-center text-4xl tracking-widest">
            LEVELS
          </span>
        </button>
        <button className="group relative h-32 w-64">
          <Image
            src="/images/ui/btn3.png"
            alt=""
            fill
            className="object-contain transition-opacity group-hover:opacity-0"
          />
          <Image
            src="/images/ui/btn4.png"
            alt=""
            fill
            className="object-contain opacity-0 transition-opacity group-hover:opacity-100"
          />
          <span className="font-pixel absolute inset-0 flex items-center justify-center text-4xl tracking-widest">
            HEROES
          </span>
        </button>
      </div>

      {/* Content area with parchment background */}
      <div className="mx-auto max-w-screen-lg">
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
          <div
            className="px-12 py-4"
            style={{
              borderImageSource: 'url(/images/backgrounds/text-bg1.png)',
              borderImageSlice: '50 50 50 50 fill',
              borderImageRepeat: 'repeat',
              borderImageWidth: '400px',
              imageRendering: 'pixelated',
            }}
          >
            <h1 className="font-pixel text-center text-4xl tracking-widest">Base Levels</h1>
          </div>
          <p className="mt-4">Welcome to the companion site!</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
          <p className="mt-4">Forcing a scroll</p>
        </div>
      </div>
    </main>
  );
}
