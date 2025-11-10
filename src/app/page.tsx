import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-pixel text-4xl tracking-widest sm:text-6xl">BALL X PIT</h1>
        <h2 className="mb-8 font-pixel text-2xl tracking-wider text-secondary sm:text-3xl">
          Companion
        </h2>
        <p className="mb-4 text-base text-secondary sm:text-lg">
          A fan-made companion site for tracking your progress and exploring game data.
        </p>
      </div>

      {/* Tools Section */}
      <div className="mb-12 w-full max-w-4xl">
        <h2 className="text-center font-pixel text-4xl tracking-wider">TOOLS</h2>
        <div className="border-primary mb-4 border-t" />

        <div className="grid grid-cols-2 gap-4 p-2">
          <Link href="/tools/progression/level" className="btn-body-primary">
            Progression <br /> Level View
          </Link>
          <Link href="/tools/progression/hero" className="btn-body-primary">
            Progression <br /> Hero View
          </Link>
        </div>
        <div className="grid grid-cols-1 p-2">
          <Link href="/tools/fusion" className="btn-body-primary">
            Fusion
          </Link>
        </div>
      </div>

      {/* Encyclopedia Section */}
      <div className="w-full max-w-4xl">
        <h2 className="text-center font-pixel text-4xl tracking-wider">ENCYCLOPEDIA</h2>
        <div className="border-primary mb-4 border-t" />

        <div className="grid grid-cols-1 gap-4 p-2">
          <Link href="/encyclopedia/characters" className="btn-body-primary">
            Characters
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 p-2">
          <Link href="/encyclopedia/balls" className="btn-body-primary">
            Balls
          </Link>
          <Link href="/encyclopedia/passives" className="btn-body-primary">
            Passives
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 p-2">
          <Link href="/encyclopedia/pit/levels" className="btn-body-primary">
            The Pit <br /> Levels
          </Link>
          <Link href="/encyclopedia/pit/enemies" className="btn-body-primary">
            The Pit <br /> Enemies
          </Link>
          <Link href="/encyclopedia/town/buildings" className="btn-body-primary">
            Town <br /> Buildings
          </Link>
          <Link href="/encyclopedia/town/harvesting" className="btn-body-primary">
            Town <br /> Harvesting
          </Link>
        </div>
      </div>
    </main>
  );
}
