# Ball X Pit Companion - Project Context

## Project Overview
This is a **GitHub Pages repository** for a companion website to the game **BALL X PIT**. 
- **NOT** the official game site - created by a fan for the community
- Built with Next.js 15.4.6, React 18, TypeScript 5, and Tailwind CSS 3.4
- Static site generation for GitHub Pages deployment
- No backend server - fully client-side with localStorage persistence

## Core Features

### 1. **Progression Tracker** (Primary Goal - Active Development)
Track player progression through the game with comprehensive save system:
- **Level Completion Tracking**: 8 levels (The Bone Yard → The Vast Void)
- **Difficulty Tiers**: 10 tiers (Base Level → New Game +9)
- **Fast Tier System**: 11 speed tiers (Normal → Fast+9)
- **Hero Management**: 16 heroes with custom ordering via drag-and-drop
- **Multiple Save Slots**: 3 independent save slots with slot switching
- **Progress Visualization**: Visual checkmark system on hero sprites per level

### 2. **Game Encyclopedia** (Primary Goal - Planned)
Comprehensive game information resource:
- Ball types and properties
- Game mechanics documentation
- Character/hero information
- Pit levels and enemies
- Town buildings and harvesting
- Tips and strategies

### 3. **Interactive Ball Fusion Tool** (Future Goal)
Interactive tool for experimenting with ball combinations:
- Visual fusion simulator
- Recipe database
- Fusion tree/graph visualization

## Technical Architecture

### Tech Stack
- **Framework**: Next.js 15.4.6 with App Router (`src/app/`)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 3.4 + plugins (forms, typography, animate)
- **Icons**: Font Awesome 7.x (SVG React components)
- **State Management**: React hooks (useState, useEffect, useCallback) + custom hooks
- **Data Persistence**: Browser localStorage (JSON serialization)

### GitHub Pages Deployment
- Static site generation via `next build` with `output: 'export'`
- Base path: `/ball-x-pit-companion` (production only)
- Asset prefix configured for GitHub Pages URL structure
- Unoptimized images (GitHub Pages limitation)
- Deploy script: `npm run deploy` (builds + gh-pages)

### Project Structure
```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout with Nav component
│   ├── page.tsx                  # Home page (navigation cards)
│   ├── globals.css               # Global styles, custom classes, scrollbar
│   └── tools/
│       └── progression/
│           └── level/page.tsx    # Level View progression tracker
├── components/                   # React components
│   ├── Nav.tsx                   # Navigation sidebar + mobile menu
│   ├── Header.tsx                # Page title display (decoupled)
│   ├── SettingsModal.tsx         # Save slot management modal
│   ├── HeroList.tsx              # Drag-and-drop hero ordering
│   ├── HeroSprite.tsx            # Hero sprite renderer (portrait/small)
│   └── LevelHeroSprite.tsx       # Level completion sprite (with checkmark)
├── hooks/
│   └── useProgressData.ts        # Progress data management hook
├── data/
│   ├── heroes.ts                 # Hero definitions (16 heroes, 4x4 grid)
│   ├── balls.ts                  # Ball data (for encyclopedia)
│   └── ballIcons.ts              # Ball icon mappings
├── types/
│   ├── heroProgress.ts           # Progress data TypeScript types
│   └── index.ts                  # Other type exports
└── utils/
    └── basePath.ts               # Asset path helpers (GitHub Pages support)
```

### Data Storage Architecture

#### localStorage Keys
- `ball-x-pit-save-1`, `ball-x-pit-save-2`, `ball-x-pit-save-3`: Save slot data (SaveSlotData)
- `ball-x-pit-active-slot`: Currently active slot number (1-3)
- `ball-x-pit-progress`: **Legacy key** (migrated to save-1 on first load)
- `currentDifficulty`: **Legacy key** (migrated)
- `currentFastTier`: **Legacy key** (migrated)

#### Data Structure Hierarchy
```typescript
SaveSlotData {
  heroProgress: ProgressData {
    version: number                    // Migration version (currently 1)
    lastUpdated: string                // ISO timestamp
    heroes: HeroProgress[] {           // Array of 16 heroes
      heroId: string                   // Hero identifier
      customIndex: number              // Display order (0-15)
      levelCompletions: LevelCompletion[] {
        levelId: number                // 1-8 (level number)
        difficulty: DifficultyTier     // 'base' | 'ng-plus' | ... | 'ng-plus-9'
        fastTier: FastTierCompletion   // 0-11 (0=incomplete, 1=Normal, 2=Fast, ..., 11=Fast+9)
      }
    }
  }
  lastDifficulty: DifficultyTier      // User's last selected difficulty
  lastTier: FastTierCompletion        // User's last selected fast tier
  lastModified: number                // Unix timestamp
  name?: string                       // Optional slot name (default: "Save {N}")
}
```

### Progression System Logic

#### Level Completion Mechanics
**Key Concept**: Completion is **cumulative** - completing a higher fast tier automatically marks all lower tiers as complete.

1. **Difficulty Tiers** (10 total):
   - Base Level (base)
   - New Game + through +9 (ng-plus, ng-plus-2, ..., ng-plus-9)
   - Each difficulty tier has independent completion records

2. **Fast Tier System** (11 levels):
   - 0 = Not completed
   - 1 = Normal (base completion)
   - 2 = Fast
   - 3-11 = Fast+, Fast++, Fast+3 through Fast+9
   - Stored as single integer: higher value = all lower tiers complete

3. **Completion Check Logic**:
   ```typescript
   isComplete = (heroProgress.levelCompletions.find(
     lc => lc.levelId === levelId && lc.difficulty === currentDifficulty
   )?.fastTier ?? 0) >= currentTier
   ```
   - If no completion record exists: not complete
   - If completion.fastTier >= currentTier: complete at this tier
   - Example: fastTier=5 (Fast+3) means tiers 0-5 are all complete

4. **Toggle Behavior**:
   - **Not complete** → Set to current tier (marks complete)
   - **Already complete** → Downgrade to (currentTier - 1)
   - Example: Viewing Fast+2 (tier 4), clicking complete hero:
     * If not complete: set fastTier=4 (completes tiers 0-4)
     * If already tier 4+: set fastTier=3 (uncompletes tier 4, keeps 0-3)

#### Hero Management
- Hero art now loads from individual images in `public/heroes/portrait` (124×124) and `public/heroes/sprites` (18×18)
- Legacy gridX/gridY fields remain on the data model for backwards compatibility but no longer drive rendering
- `customIndex` (0-15) controls display order
- Drag-and-drop reordering updates multiple `customIndex` values atomically

#### Save Slot System
- 3 independent save slots (slots 1-3)
- Each slot stores complete ProgressData + UI state
- Active slot tracked separately
- Slot switching: loads new slot data, updates all components via event
- Delete operation: resets slot to initial empty state
- Migration: Legacy single-save data auto-migrated to slot 1 on first load

### State Management Pattern

#### useProgressData Hook (Central State)
**Location**: `src/hooks/useProgressData.ts`

**Purpose**: Single source of truth for all progression data. Manages localStorage persistence and cross-component synchronization.

**Key Features**:
- Lazy initialization: loads active slot on mount
- Custom event system (`progress-data-updated`) for cross-component sync
- Atomic updates: save + notify pattern prevents race conditions
- Legacy data migration (runs once on mount)

**Exported Interface**:
```typescript
{
  // Current state (read-only)
  progressData: ProgressData          // Full hero progress data
  currentDifficulty: DifficultyTier   // User's selected difficulty
  currentTier: FastTierCompletion     // User's selected fast tier
  activeSlot: number                  // Current save slot (1-3)

  // State setters
  setCurrentDifficulty(difficulty)    // Update difficulty, saves to localStorage
  setCurrentTier(tier)                // Update fast tier, saves to localStorage

  // Hero operations
  getSortedHeroes(): HeroProgress[]   // Get heroes by customIndex
  getHeroProgress(heroId): HeroProgress // Get single hero progress
  updateHeroOrder(heroId, index)      // Update one hero's order
  updateHeroOrders(updates[])         // Bulk update (for drag-and-drop)
  updateLevelCompletion(heroId, levelId, completion) // Mark level complete/incomplete

  // Save slot operations
  switchSaveSlot(slot)                // Change active slot
  getAllSaveSlots(): SlotInfo[]       // Get all 3 slots metadata
  deleteSaveSlot(slot)                // Reset slot to empty
  resetAllProgress()                  // Clear current slot
}
```

**Event Synchronization**:
- All mutating operations call `saveAndNotify()`
- `saveAndNotify()` = `saveSaveSlot()` + `dispatchProgressUpdate()`
- Components listen for `progress-data-updated` custom event
- On event: reload data from localStorage, trigger re-render
- Prevents stale data when multiple components use same hook

**Race Condition Prevention**:
- HeroList sets `isUpdating` flag during drag-and-drop
- Flag prevents reload from overwriting optimistic UI update
- Flow: drag → update local state → save → set flag → skip next event reload

### Component Architecture

#### Navigation System
**Components**: Nav.tsx (sidebar + mobile menu) + Header.tsx (title only)

**Design**: Decoupled architecture
- **Nav**: Manages menu state, mobile overlay, settings modal, includes Header
- **Header**: Pure display component, receives title prop, no menu logic
- **Layout**: Renders Nav at root, adds pt-20 (header space) + lg:ml-64 (sidebar space)

**Responsive Behavior**:
- **Mobile** (< 1024px): Hamburger button (fixed right-4 top-4, z-50), slide-in sidebar, black overlay (z-30), scroll lock on body
- **Desktop** (≥ 1024px): Sidebar always visible (z-40), no button, no overlay

**Z-Index Hierarchy**:
- Menu button: z-50 (highest, above overlay)
- Sidebar: z-40
- Overlay + Header: z-30

**Title System**:
- Pathname-based mapping in Nav.getPageTitle()
- Dynamic formatting: mobile stacked ("Progression\nLevel View"), desktop inline ("Progression | Level View")
- Split on pipe character, render with sm:hidden/hidden sm:block

#### Level View Page (Progression Tracker)
**Location**: `src/app/tools/progression/level/page.tsx`

**Structure**:
1. **Header Controls**: Reorder Heroes button (opens HeroList modal)
2. **Difficulty/Tier Selectors**: Two sections with FontAwesome caret navigation
3. **Level Sections**: 8 sections (The Bone Yard → The Vast Void)
  - Uniform parchment-style cards with blurred nav background; per-level background art removed for responsive layout
  - Header row shows level name + badge ("Level 01" → "Level 08")
  - Hero grid uses responsive Tailwind classes: 4 columns on phones, 8 columns from sm breakpoint upward (still arranged by customIndex)
4. **Hero Sprites**: LevelHeroSprite components (18x18 @ scale 3, checkmark overlay)

**State**:
- Local: showHeroOverlay (modal), sortedHeroes (current order), isClient (SSR flag)
- Hook: currentDifficulty, currentTier, getHeroProgress, updateLevelCompletion

**SSR Handling**:
- `isClient` flag set in useEffect (prevents hydration mismatch)
- Default labels shown until client-side: "Base Level", "Normal"
- Navigation arrows hidden until isClient=true

#### Settings Modal
**Location**: `src/components/SettingsModal.tsx`

**Features**:
- Save slot list: shows all 3 slots with metadata (name, last modified, difficulty/tier)
- Active slot highlighted with "ACTIVE" badge
- Click slot to switch (if different from active)
- Delete button per slot (with confirmation)
- Quick Links section: "Reorder Heroes" button (opens HeroList)
- Nested modal support: HeroList can open over SettingsModal

**Integration**:
- Triggered from Nav via onClick (not a route)
- Modal state: isSettingsOpen in Nav component
- Uses useProgressData hook for all save operations

### Design System

#### Custom CSS Classes (globals.css)
```css
/* Primary button/card style - unified design system */
.btn-body-primary {
  @apply rounded-lg border-2 border-primary bg-body px-6 py-4 
         transition-colors hover:border-secondary hover:bg-btn-primary-hover;
}

/* Scroll prevention for mobile menu overlay */
body:has(.no-doc-scroll) {
  overflow: hidden;
  position: fixed;
  width: 100%;
}

/* Custom scrollbar for nav menu */
nav::-webkit-scrollbar { width: 8px; }
nav::-webkit-scrollbar-track { background-color: #1f191a; }
nav::-webkit-scrollbar-thumb { background-color: #452c1f; }
nav::-webkit-scrollbar-thumb:hover { background-color: #734325; }
```

#### Theme Colors (Tailwind)
- **Primary**: `#e8d6b4` (parchment/light text)
- **Secondary**: `#f5e6d3` (hover/accent)
- **Body**: `#1f191a` (dark background)
- **Border**: `#452c1f` (UI borders)
- **Nav Background**: `#2d1e1a`
- **Button Hover**: `#3a2620`

#### Game Asset Integration
- Border images: `border-image-source: url()` with `border-image-slice`, `border-image-repeat`
- Pixel art: `image-rendering: pixelated` on all game assets
- Common assets: parchment.png (backgrounds), btn3.png/btn4.png (buttons), portrait-bg-1/2.png (hero frames)
- Hero sprites: sprite sheet with grid positioning (not individual files)

#### Typography
- Font: `font-pixel` (custom pixel font)
- Sizes: text-xl (20px), text-2xl (24px), text-3xl (30px), text-4xl (36px)
- Tracking: `tracking-widest` for most pixel text (better readability)

### Development Principles

1. **KISS² (Keep It Stupid Simple)**
   - Prefer simple solutions over clever abstractions
   - Human-readable code > condensed code
   - Comment complex logic (especially progression calculations)

2. **Make it work → Make it right → Make it fast**
   - Ship working features first
   - Refactor for maintainability second
   - Optimize performance only if needed

3. **Pre-Release Development**
   - No versioning yet
   - Breaking changes allowed
   - No backwards compatibility concerns
   - localStorage data can be restructured freely

4. **Client-Side Only**
   - No server-side rendering features (except static generation)
   - No API routes
   - No database connections
   - All state in localStorage or component state

5. **Responsive Craftsmanship**
  - Design starts mobile-first but every breakpoint is tuned for aesthetics
  - Actively monitor xs, sm (640px), md (768px), lg (1024px), and xl (1280px) viewports while iterating
  - Choose the smallest breakpoint that preserves layout integrity; keep scaling smooth between steps
  - Verify navigation, overlays, and hero grids at each size (especially mobile vs sm) and adjust Tailwind utilities accordingly

### Common Patterns

#### Reading/Writing Progress Data
```typescript
// Always use useProgressData hook
const { 
  currentDifficulty, 
  updateLevelCompletion,
  getHeroProgress 
} = useProgressData();

// Check completion
const isComplete = getHeroProgress(heroId)
  ?.levelCompletions.find(lc => 
    lc.levelId === levelId && 
    lc.difficulty === currentDifficulty
  )?.fastTier >= currentTier;

// Update completion
updateLevelCompletion(heroId, levelId, {
  difficulty: currentDifficulty,
  fastTier: newTier as FastTierCompletion
});
```

#### Asset Path Handling
```typescript
import { getImagePath } from '@/utils/basePath';

// Always wrap asset paths (handles GitHub Pages basePath)
<Image src={getImagePath('/images/heroes/heroes-portrait.png')} />

// For border-image CSS
borderImageSource: `url(${getImagePath('/images/ui/btn3.png')})`
```

#### SSR Hydration Safety
```typescript
// Prevent hydration mismatches
const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
}, []);

// Conditional rendering
{isClient ? actualValue : defaultValue}
{isClient && <ClientOnlyComponent />}
```

#### Modal Patterns
```typescript
// Prevent event bubbling
<div onClick={onClose}>
  <div onClick={e => e.stopPropagation()}>
    {/* Modal content */}
  </div>
</div>

// Parchment background style
style={{
  borderImageSource: `url(${getImagePath('/images/backgrounds/parchment.png')})`,
  borderImageSlice: '100 100 100 100 fill',
  borderImageRepeat: 'repeat',
  borderImageWidth: '400px',
  imageRendering: 'pixelated'
}}
```

### Known Gotchas

1. **localStorage Timing**: Check `typeof window !== 'undefined'` before localStorage access
2. **Hero Grid Layout**: sortedHeroes array sliced specially for 2×8 grid (not sequential)
3. **Fast Tier 0**: Zero means "not completed" but tier system uses 1-11 for display
4. **Event Synchronization**: Multiple components using useProgressData must handle event updates
5. **Base Path**: All asset imports must use getImagePath() or fail in production
6. **Image Optimization**: Disabled for GitHub Pages (unoptimized: true)
7. **Drag Race Condition**: HeroList needs isUpdating flag to prevent reload clobbering
8. **Tier Zero Default**: Brand-new slots start with `lastTier = 0`; bump the fast tier to Normal (value 1) before logging completions or the first toggle will store `fastTier = 0`, which only reads as complete while viewing tier 0

### Future Considerations

#### Planned Features
- Hero View page (alternative progression view)
- Ball Fusion tool (interactive recipe explorer)
- Encyclopedia pages (characters, passives, enemies, buildings, harvesting)
- Export/import save data (JSON download/upload)
- Progress statistics (completion percentages, time tracking)

#### Technical Debt
- Consider migrating to Zustand/Jotai for cleaner state management (if complexity grows)
- Investigate service worker for offline support
- Add localStorage quota checking (5-10MB limit)
- Implement save data compression (if size becomes issue)
- Consider IndexedDB for larger datasets (encyclopedia content)

#### Performance Notes
- Current localStorage saves are synchronous (acceptable for current data size)
- Hero sprite rendering could be virtualized if hero count grows significantly
- Level page images could benefit from lazy loading (future optimization)