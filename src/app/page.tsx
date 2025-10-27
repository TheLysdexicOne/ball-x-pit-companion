import Header from '@/components/Header';
import HeroList from '@/components/HeroList';
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
          <span className="absolute inset-0 flex items-center justify-center font-pixel text-4xl tracking-widest">
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
          <span className="absolute inset-0 flex items-center justify-center font-pixel text-4xl tracking-widest">
            HEROES
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
                <h2 className="absolute left-1/2 top-4 -translate-x-1/2 text-center font-pixel text-4xl">
                  THE BONE <span className="align-top text-3xl">x</span> YARD
                </h2>
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
                <h2 className="absolute left-1/2 top-4 -translate-x-1/2 text-center font-pixel text-4xl">
                  THE SNOWY <span className="align-top text-3xl">x</span> SHORES
                </h2>
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
                <h2 className="absolute left-1/2 top-4 -translate-x-1/2 text-center font-pixel text-4xl">
                  THE LIMINAL <span className="align-top text-3xl">x</span> DESERT
                </h2>
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
                <h2 className="absolute left-1/2 top-4 -translate-x-1/2 text-center font-pixel text-4xl">
                  THE FUNGAL <span className="align-top text-3xl">x</span> FOREST
                </h2>
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
                <h2 className="absolute left-1/2 top-4 -translate-x-1/2 text-center font-pixel text-4xl">
                  THE GORY <span className="align-top text-3xl">x</span> GRASSLANDS
                </h2>
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
                <h2 className="absolute left-1/2 top-4 -translate-x-1/2 text-center font-pixel text-4xl">
                  THE SMOLDERING <span className="align-top text-3xl">x</span> DEPTHS
                </h2>
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
                <h2 className="absolute left-1/2 top-4 -translate-x-1/2 text-center font-pixel text-4xl">
                  THE HEAVENLY <span className="align-top text-3xl">x</span> GATES
                </h2>
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
                <h2 className="absolute left-1/2 top-4 -translate-x-1/2 text-center font-pixel text-4xl">
                  THE VAST <span className="align-top text-3xl">x</span> VOID
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HeroList />
    </main>
  );
}
