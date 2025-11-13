'use client';

import CharacterIcon from './CharacterIcon';
import { getImagePath } from '@/utils/basePath';
import Image from 'next/image';
import type { Character } from '@/data/characters';

interface LevelHeroSpriteProps {
  hero: Character;
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
      <CharacterIcon slug={hero.id} name={hero.name} type="sprite" size={54} />
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
