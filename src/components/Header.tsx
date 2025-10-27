'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getImagePath } from '@/utils/basePath';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDungeon,
  faHouseChimney,
  faCircleRadiation,
  faSkull,
} from '@fortawesome/free-solid-svg-icons';

interface NavButtonProps {
  icon: any;
  label: string;
  href: string;
}

function NavButton({ icon, label, href }: NavButtonProps) {
  return (
    <Link href={href}>
      <button className="group relative mx-4 h-24 w-24" title={label}>
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
    </Link>
  );
}

export default function Header() {
  return (
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
        <NavButton icon={faCircleRadiation} label="Balls and Passives" href="/balls" />
        <NavButton icon={faSkull} label="Enemies" href="/enemies" />
      </div>
    </div>
  );
}
