// Building data utilities using extracted game data

export interface BuildingCost {
  gold?: number;
  wood?: number;
  stone?: number;
}

export interface BuildingData {
  Type: string;
  Name: string;
  Slug: string;
  Description: string;
  Category: string;
  Cost: BuildingCost;
  Stats: { [key: string]: number | string };
  Requirements: string[];
  Tags: string[];
}

export interface Building {
  id: string; // Same as slug for consistency
  type: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  cost: BuildingCost;
  stats: { [key: string]: number | string };
  requirements: string[];
  tags: string[];
}

import buildingsDataJson from '../../data/latest/buildings_data.json';

const buildingsData = buildingsDataJson as unknown as BuildingData[];

/**
 * Converts raw building data from game database to normalized Building type
 */
function normalizeBuilding(data: BuildingData): Building {
  return {
    id: data.Slug,
    type: data.Type,
    name: data.Name,
    slug: data.Slug,
    description: data.Description,
    category: data.Category,
    cost: data.Cost,
    stats: data.Stats,
    requirements: data.Requirements,
    tags: data.Tags,
  };
}

/**
 * Get all buildings (excludes ??? buildings)
 */
export function getAllBuildings(): Building[] {
  return buildingsData
    .filter(building => building.Name !== '???')
    .map(normalizeBuilding)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get a specific building by slug
 */
export function getBuildingBySlug(slug: string): Building | undefined {
  const buildingData = buildingsData.find(
    b => b.Slug === slug && b.Name !== '???'
  );
  return buildingData ? normalizeBuilding(buildingData) : undefined;
}

/**
 * Get a specific building by ID (alias for getBuildingBySlug)
 */
export function getBuildingById(id: string): Building | undefined {
  return getBuildingBySlug(id);
}

/**
 * Get buildings by category
 */
export function getBuildingsByCategory(category: string): Building[] {
  return buildingsData
    .filter(b => b.Category === category && b.Name !== '???')
    .map(normalizeBuilding)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get buildings by tag
 */
export function getBuildingsByTag(tag: string): Building[] {
  return buildingsData
    .filter(b => b.Tags.includes(tag) && b.Name !== '???')
    .map(normalizeBuilding)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Format building cost for display
 */
export function formatBuildingCost(cost: BuildingCost): string {
  const parts: string[] = [];
  if (cost.gold) parts.push(`${cost.gold} Gold`);
  if (cost.wood) parts.push(`${cost.wood} Wood`);
  if (cost.stone) parts.push(`${cost.stone} Stone`);
  return parts.join(', ');
}
