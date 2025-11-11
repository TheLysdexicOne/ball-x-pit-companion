'use client';

import React, { useState, useEffect } from 'react';
import { Hero, HEROES } from '@/data/heroes';
import HeroSprite from '@/components/HeroSprite';
import { useProgressData } from '@/hooks/useProgressData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  KeyboardSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface HeroItemProps {
  hero: Hero;
  isDragging?: boolean;
  dragHandleProps?: any;
}

function HeroItem({
  hero,
  isDragging = false,
  dragHandleProps,
}: HeroItemProps) {
  return (
    <div
      className={`group flex items-center gap-4 rounded-lg border-2 bg-nav/70 px-4 py-2 transition-colors sm:px-5 ${
        isDragging
          ? 'border-highlight bg-nav/60 shadow-[0_0_15px_rgba(226,170,97,0.3)]'
          : 'border-primary/60 hover:border-highlight hover:bg-nav/60'
      }`}
    >
      <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border-2 border-primary/60 bg-body sm:h-20 sm:w-20">
        <HeroSprite
          hero={hero}
          type="portrait"
          scale={0.75}
          highlighted={isDragging}
        />
      </div>
      <div className="flex flex-1 items-center justify-between gap-4">
        <span className="font-pixel text-lg uppercase tracking-widest text-secondary sm:text-xl">
          {hero.name}
        </span>
      </div>
      <button
        type="button"
        aria-label={`Reorder ${hero.name}`}
        className="flex h-12 w-12 cursor-grab items-center justify-center rounded-lg text-xl text-primary hover:text-secondary active:cursor-grabbing"
        {...dragHandleProps}
      >
        <FontAwesomeIcon icon={faGripVertical} />
      </button>
    </div>
  );
}

interface SortableHeroItemProps {
  hero: Hero;
  index: number;
  isDragging: boolean;
}

function SortableHeroItem({ hero, index, isDragging }: SortableHeroItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: hero.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 200ms ease',
    opacity: isDragging ? 0.3 : 1,
  };

  const dragHandleProps = {
    ...attributes,
    ...listeners,
    style: { touchAction: 'manipulation' },
  };

  return (
    <li ref={setNodeRef} style={style}>
      <HeroItem
        hero={hero}
        isDragging={isDragging}
        dragHandleProps={dragHandleProps}
      />
    </li>
  );
}

export default function ReorderHeroesPage() {
  const { getSortedHeroes, updateHeroOrders } = useProgressData();
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Sensor setup: MouseSensor for PC (instant), TouchSensor for mobile (long-press)
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load heroes from progress data on mount and when data changes externally
  useEffect(() => {
    // Skip reloading if we're in the middle of updating (prevents overwriting our own changes)
    if (isUpdating) {
      setIsUpdating(false);
      return;
    }

    const sortedProgress = getSortedHeroes();
    const sortedHeroes = sortedProgress
      .map(progress => HEROES.find(h => h.id === progress.heroId))
      .filter((h): h is Hero => h !== undefined);
    setHeroes(sortedHeroes);
  }, [getSortedHeroes, isUpdating]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = heroes.findIndex(item => item.id === active.id);
      const newIndex = heroes.findIndex(item => item.id === over.id);

      const newHeroes = arrayMove(heroes, oldIndex, newIndex);

      // Update state immediately
      setHeroes(newHeroes);

      // Mark that we're updating to prevent reload race condition
      setIsUpdating(true);

      // Defer the save until after render completes
      setTimeout(() => {
        const updates = newHeroes.map((hero, index) => ({
          heroId: hero.id,
          customIndex: index,
        }));
        updateHeroOrders(updates);
      }, 0);
    }

    setActiveId(null);
  };

  const activeHero = activeId ? heroes.find(h => h.id === activeId) : null;

  return (
    <main className="flex flex-col items-center justify-center p-2 sm:p-8">
      <div className="flex w-full max-w-4xl flex-col">
        <div className="card-primary">
          <div className="card-text-box m-0 font-pixel text-sm uppercase tracking-widest text-secondary sm:text-base">
            Drag heroes up or down to change the order they appear.
          </div>
        </div>
        <div className="card-primary">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={heroes.map(h => h.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul className="flex flex-col gap-2">
                {heroes.map((hero, index) => (
                  <SortableHeroItem
                    key={hero.id}
                    hero={hero}
                    index={index}
                    isDragging={activeId === hero.id}
                  />
                ))}
              </ul>
            </SortableContext>
            <DragOverlay>
              {activeHero ? <HeroItem hero={activeHero} /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </main>
  );
}
