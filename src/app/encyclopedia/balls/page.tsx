'use client';

import BallsView from '@/components/BallsView';

export default function Balls() {
  return (
    <main className="min-h-screen p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Content Card */}
        <BallsView />
      </div>
    </main>
  );
}
