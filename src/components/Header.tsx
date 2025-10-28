'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getImagePath } from '@/utils/basePath';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDungeon,
  faHouseChimney,
  faCircleRadiation,
  faGear,
  faBookSkull,
} from '@fortawesome/free-solid-svg-icons';
import SettingsModal from './SettingsModal';

interface NavButtonProps {
  icon: any;
  label: string;
  href?: string;
  onClick?: () => void;
}

function NavButton({ icon, label, href, onClick }: NavButtonProps) {
  const content = (
    <button className="group relative mx-4 h-24 w-24" title={label} onClick={onClick}>
      <Image
        src={getImagePath('/images/ui/btn1.png')}
        alt=""
        fill
        className="object-contain transition-opacity group-hover:opacity-0"
      />
      <Image
        src={getImagePath('/images/ui/btn2.png')}
        alt=""
        fill
        className="object-contain opacity-0 transition-opacity group-hover:opacity-100"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <FontAwesomeIcon icon={icon} className="text-4xl" />
      </span>
    </button>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

export default function Header() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <div className="mx-auto mb-12 mt-8">
        {/* Navigation and Logo Container */}
        <div className="flex items-center justify-center gap-2">
          {/* Left Navigation Buttons */}
          <NavButton icon={faDungeon} label="Heroes" href="/" />
          <NavButton icon={faHouseChimney} label="Homestead" href="/town" />

          {/* Logo */}
          <Image
            src={getImagePath('/images/logo/logo.png')}
            alt="Ball X Pit Logo"
            width={500}
            height={200}
            className="mx-12 h-auto w-72"
          />

          {/* Right Navigation Buttons */}
          <NavButton icon={faBookSkull} label="Encyclopedia" href="/encyclopedia" />
          <NavButton icon={faGear} label="Settings" onClick={() => setIsSettingsOpen(true)} />
        </div>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
