'use client';

import { useState } from 'react';
import { useProgressData } from '@/hooks/useProgressData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faDungeon } from '@fortawesome/free-solid-svg-icons';
import HeroList from './HeroList';
import { getImagePath } from '@/utils/basePath';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { activeSlot, switchSaveSlot, getAllSaveSlots, deleteSaveSlot } = useProgressData();
  const [showHeroOverlay, setShowHeroOverlay] = useState(false);

  if (!isOpen) return null;

  const saveSlots = getAllSaveSlots();

  const handleSlotClick = (slot: number) => {
    if (slot !== activeSlot) {
      switchSaveSlot(slot);
    }
  };

  const handleDeleteSlot = (slot: number, e: React.MouseEvent) => {
    e.stopPropagation();

    if (
      confirm(
        `Are you sure you want to delete ${saveSlots.find(s => s.slot === slot)?.data.name || `Save ${slot}`}? This cannot be undone.`
      )
    ) {
      deleteSaveSlot(slot);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-lg border-4 border-[#8b7355] bg-[#2a1810] p-8 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-3xl text-white/70 transition-colors hover:text-white"
          title="Close"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        {/* Title */}
        <h2 className="mb-8 text-center text-4xl font-bold text-[#f4e4c1]">Settings</h2>

        {/* Save Slots Section */}
        <div className="mb-8">
          <h3 className="mb-4 text-2xl font-semibold text-[#f4e4c1]">Save Slots</h3>
          <div className="space-y-3">
            {saveSlots.map(({ slot, data }) => (
              <div
                key={slot}
                onClick={() => handleSlotClick(slot)}
                className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                  slot === activeSlot
                    ? 'border-yellow-500 bg-yellow-500/10'
                    : 'border-[#8b7355] bg-[#1a0f08] hover:border-yellow-700 hover:bg-yellow-900/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-[#f4e4c1]">
                        {data.name || `Save ${slot}`}
                      </span>
                      {slot === activeSlot && (
                        <span className="rounded bg-yellow-600 px-2 py-1 text-xs font-bold text-white">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-sm text-gray-400">
                      Last modified: {formatDate(data.lastModified)}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {data.lastDifficulty} • Tier {data.lastTier}
                    </div>
                  </div>
                  <button
                    onClick={e => handleDeleteSlot(slot, e)}
                    className="ml-4 rounded bg-red-600 px-3 py-1 text-sm font-bold text-white transition-colors hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="mb-4 text-2xl font-semibold text-[#f4e4c1]">Quick Links</h3>
          <button
            onClick={() => setShowHeroOverlay(true)}
            className="flex w-full items-center gap-3 rounded-lg border-2 border-[#8b7355] bg-[#1a0f08] p-4 transition-colors hover:border-yellow-700 hover:bg-yellow-900/20"
          >
            <FontAwesomeIcon icon={faDungeon} className="text-2xl text-[#f4e4c1]" />
            <span className="text-xl font-bold text-[#f4e4c1]">Reorder Heroes</span>
          </button>
        </div>
      </div>

      {/* Hero List Overlay */}
      {showHeroOverlay && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-8"
          onClick={() => setShowHeroOverlay(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-screen-lg overflow-auto"
            onClick={e => e.stopPropagation()}
            style={{
              borderImageSource: `url(${getImagePath('/images/backgrounds/parchment.png')})`,
              borderImageSlice: '100 100 100 100 fill',
              borderImageRepeat: 'repeat',
              borderImageWidth: '400px',
              imageRendering: 'pixelated',
            }}
          >
            {/* Close button */}
            <button
              className="absolute right-4 top-4 z-10 font-pixel text-4xl leading-none text-primary hover:text-red-600 sm:right-8 sm:top-8 sm:text-6xl"
              onClick={() => setShowHeroOverlay(false)}
            >
              ×
            </button>

            <div className="p-6 sm:p-12">
              <HeroList />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
