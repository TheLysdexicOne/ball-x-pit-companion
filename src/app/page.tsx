import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-8">
      <div className="flex w-full max-w-4xl flex-col">
        <div className="card-primary">
          <h1 className="mb-2 font-pixel text-4xl tracking-widest sm:text-6xl">
            BALL X PIT COMPANION
          </h1>
          <div className="border-primary mb-4 border-t" />
          <p className="card-text-box">
            A fan-made companion site for tracking your progress and exploring
            game data.
          </p>
        </div>
        {/* Tools Section */}
        <div className="card-primary">
          {/* Main Header */}
          <div className="card-primary-header">
            <h2 className="text-center font-pixel text-4xl tracking-wider">
              TOOLS
            </h2>
          </div>
          {/* Sub-section header */}
          <div className="grid grid-cols-1 p-2">
            <Link href="/tools/fusion" className="btn-body-primary">
              Fusion
            </Link>
          </div>
          <div className="hr-separator" />
          <h3 className="text-center font-pixel text-2xl tracking-wider">
            PROGRESSION
          </h3>
          <div className="grid grid-cols-2 gap-4 p-2">
            <Link href="/tools/progression/level" className="btn-body-primary">
              Level View
            </Link>
            <Link href="/tools/progression/hero" className="btn-body-primary">
              Hero View
            </Link>
          </div>
        </div>
        {/* Encyclopedia Section */}
        <div className="card-primary">
          <div className="card-primary-header">
            <h2 className="text-center font-pixel text-4xl tracking-wider">
              ENCYCLOPEDIA
            </h2>
          </div>
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
          <div className="hr-separator" />
          <h3 className="text-center font-pixel text-2xl tracking-wider">
            THE PIT
          </h3>
          <div className="grid grid-cols-2 gap-4 p-2">
            <Link href="/encyclopedia/pit/levels" className="btn-body-primary">
              Levels
            </Link>
            <Link href="/encyclopedia/pit/enemies" className="btn-body-primary">
              Enemies
            </Link>
          </div>
          <div className="hr-separator" />
          <h3 className="text-center font-pixel text-2xl tracking-wider">
            TOWN
          </h3>
          <div className="grid grid-cols-2 gap-4 p-2">
            <Link
              href="/encyclopedia/town/buildings"
              className="btn-body-primary"
            >
              Town <br /> Buildings
            </Link>
            <Link
              href="/encyclopedia/town/harvesting"
              className="btn-body-primary"
            >
              Town <br /> Harvesting
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
