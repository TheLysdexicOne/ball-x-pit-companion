# Ball X Pit Companion - Project Context

## Project Overview
This is a **GitHub Pages repository** for a companion website to the game **BALL X PIT**. 
- **NOT** the official game site - created by a fan for the community
- Built with Next.js, React, TypeScript, and Tailwind CSS

## Core Features

### 1. **Progression Tracker** (Primary Goal)
Track player progression through the game
- Save data management
- Progress visualization
- Achievement tracking

### 2. **Game Encyclopedia** (Primary Goal)
Comprehensive game information resource
- Ball types and properties
- Game mechanics documentation
- Tips and strategies

### 3. **Interactive Ball Fusion Tool** (Future Goal)
Interactive tool for experimenting with ball combinations
- Visual fusion simulator
- Recipe database
- Fusion tree/graph visualization

## Technical Requirements

### GitHub Pages Deployment
- Static site generation via Next.js (`next export`)
- Optimized for GitHub Pages hosting
- Client-side only (no server-side features)

### Data Storage
- **Local storage** for progression tracking
- **No database** - client-side persistence only
- JSON-based data structures

### Design Principles
1. **KISS** - Keep it simple, stupid
2. **KISS²** - Keep it stupid simple
3. Make it work → Make it right → Make it fast
4. Human-understandable code
5. Pre-release development (no backwards compatibility concerns yet)

## Development Status
🚧 **Pre-Release Development** - Not yet versioned, no backwards compatibility requirements

## Architecture Notes
- Use React hooks for state management
- Tailwind CSS for styling (no custom CSS unless necessary)
- TypeScript for type safety
- Component-based architecture
- Mobile-responsive design