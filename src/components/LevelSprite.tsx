'use client';

import { getImagePath } from '@/utils/basePath';
import Image from 'next/image';

interface LevelSpriteProps {
  levelId: number;
  levelName: string;
  isComplete: boolean;
  onToggle: (levelId: number) => void;
  isClient?: boolean;
}

const LEVEL_ICONS: Record<number, string> = {
  1: '/images/levels/icons/01-the-pit.png',
  2: '/images/levels/icons/02-snowy-shores.png',
  3: '/images/levels/icons/03-liminal-desert.png',
  4: '/images/levels/icons/04-fungal-forest.png',
  5: '/images/levels/icons/05-gory-grasslands.png',
  6: '/images/levels/icons/06-smoldering-depths.png',
  7: '/images/levels/icons/07-heavenly-gates.png',
  8: '/images/levels/icons/08-vast-void.png',
};

export default function LevelSprite({
  levelId,
  levelName,
  isComplete,
  onToggle,
  isClient = true,
}: LevelSpriteProps) {
  const iconSrc = LEVEL_ICONS[levelId];

  return (
    <button
      onClick={() => isClient && onToggle(levelId)}
      className="group relative flex h-16 w-16 items-center justify-center disabled:opacity-50 sm:h-20 sm:w-20"
      disabled={!isClient}
      aria-label={`${levelName} - ${isComplete ? 'Complete' : 'Incomplete'}`}
    >
      <Image
        src={getImagePath(iconSrc)}
        alt={levelName}
        width={64}
        height={64}
        className="h-full w-full object-contain"
        style={{ imageRendering: 'pixelated' }}
        unoptimized
      />
      {isClient && isComplete && (
        <Image
          src={getImagePath('/images/ui/check.png')}
          alt="Complete"
          width={64}
          height={64}
          className="pointer-events-none absolute inset-0"
          style={{ imageRendering: 'pixelated' }}
        />
      )}
    </button>
  );
}
