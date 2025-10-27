'use client';

import HeroSprite from './HeroSprite';
import { getImagePath } from '@/utils/basePath';
import Image from 'next/image';
import type { Hero } from '@/data/heroes';

interface LevelHeroSpriteProps {
  hero: Hero;
  levelId: number;
  isComplete: boolean;
  onToggle: (heroId: string, levelId: number) => void;
  isClient?: boolean;
}

export default function LevelHeroSprite({
  hero,
  levelId,
  isComplete,
  onToggle,
  isClient = true,
}: LevelHeroSpriteProps) {
  return (
    <div
      className="relative cursor-pointer transition-all hover:drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]"
      onClick={() => onToggle(hero.id, levelId)}
      title={hero.name}
    >
      <HeroSprite hero={hero} type="small" scale={3} />
      {isClient && isComplete && (
        <Image
          src={getImagePath('/images/ui/check.png')}
          alt="Complete"
          width={54}
          height={54}
          className="pointer-events-none absolute inset-0"
          style={{ imageRendering: 'pixelated' }}
        />
      )}
    </div>
  );
}
