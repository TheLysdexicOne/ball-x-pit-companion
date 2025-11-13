'use client';

import Link from 'next/link';
import PassivesGrid from '@/components/PassivesGrid';

export default function Passives() {
  return (
    <main className="min-h-screen p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Page Title Card */}
        <div className="card-primary mb-6">
          <h1 className="text-center font-pixel text-3xl tracking-widest sm:text-4xl md:text-5xl">
            ENCYCLOPEDIA | PASSIVES
          </h1>
        </div>

        {/* View Mode Navigation - Placeholder for future views */}
        {/* <div className="card-primary mb-6">
          <div className="card-primary-header">
            <h2 className="text-center font-pixel text-2xl tracking-wider sm:text-3xl">
              VIEW MODE
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 p-2 sm:grid-cols-4">
            <Link href="/encyclopedia/passives" className="btn-body-primary">
              List
            </Link>
            <Link href="/encyclopedia/passives/grid" className="btn-body-primary">
              Grid
            </Link>
          </div>
        </div> */}

        {/* Content Card */}
        <div className="card-primary">
          <PassivesGrid />
        </div>
      </div>
    </main>
  );
}
