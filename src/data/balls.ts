// Ball data structure and utilities

export type BallRarity = 'base' | 'evolved' | 'legendary';

export interface BallRecipe {
  ingredients: string[]; // Ball IDs needed for evolution
}

/**
 * Variable values for a specific ball upgrade level
 * Keys should match the variable names in the description (without the {[ ]} wrapper)
 * Example: {[bleed_amt]} in description -> bleed_amt: 2 in variables
 */
export interface BallVariables {
  [key: string]: number | string;
}

/**
 * Stats for each of the 3 upgrade levels
 */
export interface BallLevelStats {
  level1: BallVariables;
  level2: BallVariables;
  level3: BallVariables;
}

export interface Ball {
  id: string;
  name: string;
  slug: string;
  description: string; // Contains {[variable_name]} placeholders
  rarity: BallRarity;
  recipes?: BallRecipe[]; // Multiple recipes possible for evolved balls
  stats?: BallLevelStats; // Variable values for each level (to be filled in)
}

// Base Balls (18 total)
export const BASE_BALLS: Ball[] = [
  {
    id: 'bleed',
    name: 'Bleed',
    slug: 'hupg_bleed',
    description:
      'Inflicts {[bleed_amt]} stacks of bleed. Bleeding enemies receive 1 damage per stack when hit by a ball (Max {[bleed_max_stacks]} stacks)',
    rarity: 'base',
    // Example of how to fill in stats - you'll need to do this for each ball
    stats: {
      level1: {
        bleed_amt: 2,
        bleed_max_stacks: 10,
      },
      level2: {
        bleed_amt: 3,
        bleed_max_stacks: 15,
      },
      level3: {
        bleed_amt: 4,
        bleed_max_stacks: 20,
      },
    },
  },
  {
    id: 'brood-mother',
    name: 'Brood Mother',
    slug: 'hupg_broodmother',
    description: 'Has a {[birth_chance]} chance of birthing a baby ball each time it hits an enemy',
    rarity: 'base',
  },
  {
    id: 'burn',
    name: 'Burn',
    slug: 'hupg_burn',
    description:
      'Add 1 stack of burn on hit for {[burn_length]} seconds (max {[max_burn_stacks]} stacks). Burnt units are dealt {[min_burn_damage]}-{[max_burn_damage]} damage per stack per second.',
    rarity: 'base',
  },
  {
    id: 'cell',
    name: 'Cell',
    slug: 'hupg_cell',
    description: 'Splits into a clone on hit {[cell_limit]} times.',
    rarity: 'base',
  },
  {
    id: 'charm',
    name: 'Charm',
    slug: 'hupg_charm',
    description:
      'Each hit has a {[charm_chance]} chance of charming the enemy for {[charm_length]} seconds. Charmed units walk up the board and attack enemies.',
    rarity: 'base',
  },
  {
    id: 'dark',
    name: 'Dark',
    slug: 'hupg_dark',
    description:
      'Deals {[damage_multiplier]}x damage but destroys itself after hitting an enemy. Has a {[cooldown_length]} second cooldown before it can be shot again.',
    rarity: 'base',
  },
  {
    id: 'earthquake',
    name: 'Earthquake',
    slug: 'hupg_earthquake',
    description:
      'Deals {[min_earthquake_damage]}-{[max_earthquake_damage]} damage to nearby units in a {[range]}x{[range]} tile square',
    rarity: 'base',
  },
  {
    id: 'egg-sac',
    name: 'Egg Sac',
    slug: 'hupg_eggsac',
    description:
      'Explodes into {[min_babies]}-{[max_babies]} baby balls on hitting an enemy. Has a {[cooldown_length]} second cooldown before it can be shot again.',
    rarity: 'base',
  },
  {
    id: 'freeze',
    name: 'Freeze',
    slug: 'hupg_freeze',
    description:
      'Has a {[freeze_pct]} chance to freeze enemies for {[freeze_length]} seconds. Frozen enemies receive {[freeze_damage_pct]} more damage',
    rarity: 'base',
  },
  {
    id: 'ghost',
    name: 'Ghost',
    slug: 'hupg_ghost',
    description: 'Passes through enemies.',
    rarity: 'base',
  },
  {
    id: 'iron',
    name: 'Iron',
    slug: 'hupg_heavy',
    description: 'Deals double damage but moves {[reduce_speed_pct]} slower',
    rarity: 'base',
  },
  {
    id: 'laser-horizontal',
    name: 'Laser (Horizontal)',
    slug: 'hupg_laserhorz',
    description:
      'Deals {[min_laser_damage]}-{[max_laser_damage]} damage to all enemies in the same row',
    rarity: 'base',
  },
  {
    id: 'laser-vertical',
    name: 'Laser (Vertical)',
    slug: 'hupg_laservert',
    description:
      'Deals {[min_laser_damage]}-{[max_laser_damage]} damage to all enemies in the same column',
    rarity: 'base',
  },
  {
    id: 'light',
    name: 'Light',
    slug: 'hupg_light',
    description:
      'Blinds enemies on hit for {[blind_length]} seconds. Blinded units have a hard time detecting you and have a 50% chance of missing when they attack.',
    rarity: 'base',
  },
  {
    id: 'lightning',
    name: 'Lightning',
    slug: 'hupg_lightning',
    description:
      'Deals {[min_lightning_damage]}-{[max_lightning_damage]} damage to up to {[lightning_limit]} nearby enemies',
    rarity: 'base',
  },
  {
    id: 'poison',
    name: 'Poison',
    slug: 'hupg_poison',
    description:
      'Applies 1 stack of poison on hit (max {[max_poison_stacks]} stacks). Poison lasts for {[poison_length]} seconds and each stack deals {[min_poison_damage]}-{[max_poison_damage]} damage per second',
    rarity: 'base',
  },
  {
    id: 'vampire',
    name: 'Vampire',
    slug: 'hupg_vampire',
    description: 'Each hit has a {[lifesteal_chance]} chance of healing {[lifesteal_heal]} health',
    rarity: 'base',
  },
  {
    id: 'wind',
    name: 'Wind',
    slug: 'hupg_wind',
    description:
      'Passes through enemies and slows them down by {[slow_pct]} for {[slow_len]} seconds, but deals 25% less damage.',
    rarity: 'base',
  },
];

// Evolved Balls
export const EVOLVED_BALLS: Ball[] = [
  {
    id: 'assassin',
    name: 'Assassin',
    slug: 'hupg_assassin',
    description:
      'Passes through the front of enemies, but not the back. Backstabs deal {[damage_pct]} bonus damage.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['iron', 'ghost'] }, { ingredients: ['iron', 'dark'] }],
  },
  {
    id: 'berserker',
    name: 'Berserk',
    slug: 'hupg_berserk',
    description:
      'Each hit has a {[berserk_chance]} chance of causing enemies to go berserk for {[berserk_length]} seconds. Berserk enemies deal {[min_berserk_damage]}-{[max_berserk_damage]} damage to adjacent enemies every second.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['charm', 'burn'] }, { ingredients: ['charm', 'bleed'] }],
  },
  {
    id: 'black-hole',
    name: 'Black Hole',
    slug: 'hupg_blackhole',
    description:
      'Instantly kills the first non-boss enemy that it hits, but destroys itself afterwards. Has a {[cooldown_length]} second cooldown before it can be shot again.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['dark', 'sun'] }],
  },
  {
    id: 'blizzard',
    name: 'Blizzard',
    slug: 'hupg_blizzard',
    description:
      'Freezes all enemies within a {[range]} tile radius for {[freeze_length]} seconds, dealing {[min_lightning_damage]}-{[max_lightning_damage]} damage.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['freeze', 'wind'] }, { ingredients: ['freeze', 'lightning'] }],
  },
  {
    id: 'bomb',
    name: 'Bomb',
    slug: 'hupg_bomb',
    description:
      'Explodes when hitting an enemy, dealing {[min_bomb_damage]}-{[max_bomb_damage]} damage to nearby enemies. Has a {[cooldown_length]} second cooldown before it can be shot again.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['burn', 'iron'] }],
  },
  {
    id: 'flash',
    name: 'Flash',
    slug: 'hupg_flash',
    description:
      'Damage all enemies on screen for {[min_flash_damage]} - {[max_flash_damage]} damage after hitting an enemy and blind them for {[blind_length]} seconds.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['lightning', 'light'] }],
  },
  {
    id: 'flicker',
    name: 'Flicker',
    slug: 'hupg_flicker',
    description:
      'Deals {[min_flicker_damage]}-{[max_flicker_damage]} damage to every enemy on screen every {[flicker_cycle]} seconds.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['light', 'dark'] }],
  },
  {
    id: 'freeze-ray',
    name: 'Freeze Ray',
    slug: 'hupg_freezeray',
    description:
      'Emits a freeze ray when hitting an enemy, dealing  {[min_laser_damage]}-{[max_laser_damage]} to all enemies in its path, with a {[freeze_pct]} chance of freezing them for {[freeze_length]} seconds',
    rarity: 'evolved',
    recipes: [
      { ingredients: ['freeze', 'laser-horizontal'] },
      { ingredients: ['freeze', 'laser-vertical'] },
    ],
  },
  {
    id: 'frozen-flame',
    name: 'Frozen Flame',
    slug: 'hupg_frozenflame',
    description:
      'Add 1 stack of frostburn on hit for {[frostburn_length]} seconds (max {[max_frostburn_stacks]} stacks). Frostburnt units are dealt {[min_frostburn_damage]}-{[max_frostburn_damage]} damage per stack per second and receive {[freeze_damage_pct]} more damage from other sources.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['freeze', 'burn'] }],
  },
  {
    id: 'glacier',
    name: 'Glacier',
    slug: 'hupg_glacier',
    description:
      'Releases glacial spikes over time that deal {[min_glacier_damage]}-{[max_glacier_damage]} to enemies that touch them and freeze them for {[freeze_length]} seconds. This ball and its glacial spikes also deal {[min_earthquake_damage]}-{[max_earthquake_damage]} damage to nearby units.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['freeze', 'earthquake'] }],
  },
  {
    id: 'hemorrhage',
    name: 'Hemorrhage',
    slug: 'hupg_hemorrhage',
    description:
      'Inflicts {[bleed_amt]} stacks of bleed. When hitting an enemy with {[bleed_max_stacks]} stacks of bleed or more, consumes all stacks of bleed to deal {[hemorrhage_pct]} of their current health.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['bleed', 'iron'] }],
  },
  {
    id: 'holy-laser',
    name: 'Holy Laser',
    slug: 'hupg_lasercross',
    description:
      'Deals {[min_laser_damage]}-{[max_laser_damage]} damage to all enemies in the same row and column',
    rarity: 'evolved',
    recipes: [
      { ingredients: ['light', 'laser-horizontal'] },
      { ingredients: ['light', 'laser-vertical'] },
    ],
  },
  {
    id: 'incubus',
    name: 'Incubus',
    slug: 'hupg_incubus',
    description:
      'Each hit has a {[charm_chance]} chance of charming the enemy for {[charm_length]} seconds. Charmed enemies curse nearby enemies. Cursed enemies are dealt {[min_curse_damage]}-{[max_curse_damage]} after being hit {[curse_delay]} times.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['charm', 'dark'] }],
  },
  {
    id: 'inferno',
    name: 'Inferno',
    slug: 'hupg_inferno',
    description:
      'Applies 1 stack of burn every second to all enemies within a {[range]} tile radius. Burn lasts for {[burn_length]} seconds, dealing {[min_burn_damage]}-{[max_burn_damage]} damage per stack per second.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['burn', 'wind'] }],
  },
  {
    id: 'laser-beam',
    name: 'Laser Beam',
    slug: 'hupg_laserbeam',
    description:
      'Emit a laser beam on hit that deals {[min_laser_damage]}-{[max_laser_damage]} damage and blinds enemies for {[blind_length]} seconds.',
    rarity: 'evolved',
    recipes: [
      { ingredients: ['light', 'laser-horizontal'] },
      { ingredients: ['light', 'laser-vertical'] },
    ],
  },
  {
    id: 'leech',
    name: 'Leech',
    slug: 'hupg_leech',
    description:
      'Attaches up to 1 leech onto enemies it hits, which adds {[bleed_amt]} stacks of bleed per second (Max {[bleed_max_stacks]} stacks)',
    rarity: 'evolved',
    recipes: [{ ingredients: ['brood-mother', 'bleed'] }],
  },
  {
    id: 'lightning-rod',
    name: 'Lightning Rod',
    slug: 'hupg_lightningrod',
    description:
      'Plants a lightning rod into enemies it hits. These enemies are struck by lightning every {[lightning_rod_length]} seconds, dealing {[min_lightning_damage]}-{[max_lightning_damage]} damage to up to {[lightning_limit]} nearby enemies',
    rarity: 'evolved',
    recipes: [{ ingredients: ['lightning', 'iron'] }],
  },
  {
    id: 'lovestruck',
    name: 'Lovestruck',
    slug: 'hupg_lovestruck',
    description:
      'Inflicts lovestruck on hit enemies for {[lovestruck_length]} seconds. Lovestruck units have a 50% chance of healing you for {[lovestruck_heal]} health when they attack.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['charm', 'light'] }, { ingredients: ['charm', 'lightning'] }],
  },
  {
    id: 'maggot',
    name: 'Maggot',
    slug: 'hupg_maggot',
    description:
      'Infest enemies on hit with maggots. When they die, they explode into {[min_babies]}-{[max_babies]} baby balls',
    rarity: 'evolved',
    recipes: [{ ingredients: ['brood-mother', 'cell'] }],
  },
  {
    id: 'magma',
    name: 'Magma',
    slug: 'hupg_magma',
    description:
      'Emits lava blobs over time. Enemies who walk into lava blobs are dealt {[min_magma_damage]} - {[max_magma_damage]} damage and gain 1 stack of burn (max {[max_burn_stacks]} stacks). Burn lasts for for {[burn_length]} seconds, dealing  {[min_burn_damage]}-{[max_burn_damage]} damage per stack per second.  This ball and its lava blobs also deal {[min_earthquake_damage]}-{[max_earthquake_damage]} damage to nearby units.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['burn', 'earthquake'] }],
  },
  {
    id: 'mosquito-king',
    name: 'Mosquito King',
    slug: 'hupg_mosquitoking',
    description:
      'Spawns a mosquito each time it hits an enemy. Mosquitos attack a random enemy, dealing {[min_mosquito_damage]} - {[max_mosquito_damage]} damage each. If a mosquito kills an enemy, they steal {[lifesteal_heal]} health.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['brood-mother', 'vampire'] }],
  },
  {
    id: 'mosquito-swarm',
    name: 'Mosquito Swarm',
    slug: 'hupg_mosquito',
    description:
      'Explodes into {[min_mosquitos]}-{[max_mosquitos]} mosquitos. Mosquitos attack random enemies, dealing {[min_mosquito_damage]} - {[max_mosquito_damage]} damage each. If a mosquito kills an enemy, they steal {[lifesteal_heal]} health.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['vampire', 'egg-sac'] }],
  },
  {
    id: 'noxious',
    name: 'Noxious',
    slug: 'hupg_noxious',
    description:
      'Passes through enemies and applies {[max_poison_stacks]} stacks of poison to nearby enemies within a {[range]} tile radius. Poison lasts for {[poison_length]} seconds and each stack deals {[min_poison_damage]}-{[max_poison_damage]} damage per second.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['poison', 'wind'] }, { ingredients: ['dark', 'wind'] }],
  },
  {
    id: 'nuclear-bomb',
    name: 'Nuclear Bomb',
    slug: 'hupg_nuke',
    description:
      'Explodes when hitting an enemy, dealing {[min_bomb_damage]}-{[max_bomb_damage]} damage to nearby enemies and applying 1 stack of radiation to everyone present indefinitely (max {[max_radiation_stacks]} stacks). Each stack of radiation increases damage received by {[radiation_pct]}. Has a {[cooldown_length]} second cooldown.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['bomb', 'poison'] }],
  },
  {
    id: 'overgrowth',
    name: 'Overgrowth',
    slug: 'hupg_overgrowth',
    description:
      'Applies 1 stack of overgrowth. Upon reaching {[max_overgrowth_stacks]}, consume all stacks and deal {[min_overgrowth_damage]}-{[max_overgrowth_damage]} damage to all enemies in a {[range]}x{[range]} tile square.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['earthquake', 'cell'] }],
  },
  {
    id: 'phantom',
    name: 'Phantom',
    slug: 'hupg_phantom',
    description:
      'Curse enemies on hit. Cursed enemies are dealt {[min_curse_damage]}-{[max_curse_damage]} damage after being hit {[curse_delay]} times.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['dark', 'ghost'] }],
  },
  {
    id: 'radiation-beam',
    name: 'Radiation Beam',
    slug: 'hupg_radiationbeam',
    description:
      'Emit a radiation beam on hit that deals {[min_laser_damage]}-{[max_laser_damage]} damage and applies 1 stack of radiation (max {[max_radiation_stacks]} stacks). Radiation lasts for {[radiation_length]} seconds and cause enemies to receive {[radiation_pct]} more damage from all sources per stack.',
    rarity: 'evolved',
    recipes: [
      { ingredients: ['poison', 'laser-horizontal'] },
      { ingredients: ['poison', 'laser-vertical'] },
      { ingredients: ['cell', 'laser-horizontal'] },
      { ingredients: ['cell', 'laser-vertical'] },
    ],
  },
  {
    id: 'sacrifice',
    name: 'Sacrifice',
    slug: 'hupg_sacrifice',
    description:
      'Inflicts {[bleed_amt]} stacks of bleed (Max {[bleed_max_stacks]} stacks) and applies curse to hit enemies. Cursed enemies are dealt {[min_curse_damage]}-{[max_curse_damage]} after being hit {[curse_delay]} times.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['bleed', 'dark'] }],
  },
  {
    id: 'sandstorm',
    name: 'Sandstorm',
    slug: 'hupg_sandstorm',
    description:
      'Goes through enemies and is surrounded by a raging storm dealing {[min_sandstorm_damage]}-{[max_sandstorm_damage]} damage per second and blinding nearby enemies for {[blind_length]} seconds.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['earthquake', 'wind'] }],
  },
  {
    id: 'satan',
    name: 'Satan',
    slug: 'hupg_satan',
    description:
      'While active, add 1 stack of burn to all active enemies per second (max {[max_burn_stacks]} stacks), dealing {[min_burn_damage]}-{[max_burn_damage]} damage per stack per second and make them go berserk, dealing {[min_berserk_damage]}-{[max_berserk_damage]} damage to adjacent enemies every second.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['incubus', 'succubus'] }],
  },
  {
    id: 'shotgun',
    name: 'Shotgun',
    slug: 'hupg_shotgun',
    description:
      'Shoots {[min_babies]}-{[max_babies]} iron baby balls after hitting a wall. Iron baby balls move at {[base_speed]} speed but are destroyed upon hitting anything.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['iron', 'egg-sac'] }],
  },
  {
    id: 'soul-sucker',
    name: 'Soul Sucker',
    slug: 'hupg_soulsucker',
    description:
      'Passes through enemies and saps them, with a {[lifesteal_chance]} chance of stealing {[lifesteal_heal]} health and reducing their attack damage by {[reduce_dmg_pct]}. Lifesteal chance only applies once per enemy.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['vampire', 'ghost'] }],
  },
  {
    id: 'spider-queen',
    name: 'Spider Queen',
    slug: 'hupg_spiderqueen',
    description: 'Has a {[birth_chance]} chance of birthing an Egg Sac each time it hits an enemy',
    rarity: 'evolved',
    recipes: [{ ingredients: ['brood-mother', 'egg-sac'] }],
  },
  {
    id: 'storm',
    name: 'Storm',
    slug: 'hupg_storm',
    description:
      'Emits lightning to strike nearby enemies every second, dealing {[min_lightning_damage]}-{[max_lightning_damage]} damage.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['lightning', 'wind'] }],
  },
  {
    id: 'succubus',
    name: 'Succubus',
    slug: 'hupg_succubus',
    description:
      'Each hit has a {[charm_chance]} chance of charming the enemy for {[charm_length]} seconds. Heals {[lifesteal_heal]} when hitting a charmed enemy.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['charm', 'vampire'] }],
  },
  {
    id: 'sun',
    name: 'Sun',
    slug: 'hupg_sun',
    description:
      'Blind all enemies in view and add 1 stack of burn every second (max {[max_burn_stacks]} stacks). Burn lasts for {[burn_length]} seconds and deals {[min_burn_damage]}-{[max_burn_damage]} damage per stack per second.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['light', 'burn'] }],
  },
  {
    id: 'swamp',
    name: 'Swamp',
    slug: 'hupg_swamp',
    description:
      'Leaves behind tar blobs over time. Enemies who walk into tar blobs are dealt {[min_tar_damage]} - {[max_tar_damage]}, are slowed by {[slow_pct]} for {[slow_len]} seconds and gain 1 stack of poison (max {[max_poison_stacks]} stacks). Each stack of poison deals  {[min_poison_damage]}-{[max_poison_damage]} damage per second.  This ball and its tar blobs also deal {[min_earthquake_damage]}-{[max_earthquake_damage]} damage to nearby units.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['poison', 'earthquake'] }],
  },
  {
    id: 'vampire-lord',
    name: 'Vampire Lord',
    slug: 'hupg_vampirelord',
    description:
      'Each hit inflicts {[bleed_amt]} stacks of bleed. Heals {[lifesteal_heal]} health and consumes all stacks when hitting an enemy with at least {[lifesteal_bleed_stacks]} stacks of bleed.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['vampire', 'dark'] }, { ingredients: ['vampire', 'bleed'] }],
  },
  {
    id: 'virus',
    name: 'Virus',
    slug: 'hupg_virus',
    description:
      "'Applies 1 stack of disease to units it hits (max {[max_disease_stacks]} stacks). Disease lasts for {[disease_length]} seconds. Each stack of disease deals {[min_disease_damage]}-{[max_disease_damage]} damage per second and diseased units have a {[disease_chance]} chance of passing a stack to undiseased nearby enemies each second. '",
    rarity: 'evolved',
    recipes: [{ ingredients: ['poison', 'ghost'] }, { ingredients: ['poison', 'cell'] }],
  },
  {
    id: 'voluptuous-egg-sac',
    name: 'Voluptuous Egg Sac',
    slug: 'hupg_eggsacsac',
    description:
      'Explodes into {[min_egg_sacs]}-{[max_egg_sacs]} egg sacs on hitting an enemy. Has a {[cooldown_length]} second cooldown before it can be shot again.',
    rarity: 'evolved',
    recipes: [{ ingredients: ['egg-sac', 'cell'] }],
  },
  {
    id: 'wraith',
    name: 'Wraith',
    slug: 'hupg_wraith',
    description: 'Freezes any enemy it passes through for {[freeze_length]} seconds',
    rarity: 'evolved',
    recipes: [{ ingredients: ['freeze', 'ghost'] }],
  },
];

// Legendary Balls
export const LEGENDARY_BALLS: Ball[] = [
  {
    id: 'nosferatu',
    name: 'Nosferatu',
    slug: 'hupg_nosferatu',
    description:
      'Spawns a vampire bat each bounce. Vampire bats fly towards a random enemy, dealing {[min_vampire_bat_damage]}-{[max_vampire_bat_damage]} damage on hit, turning into a Vampire Lord.',
    rarity: 'legendary',
    recipes: [{ ingredients: ['vampire-lord', 'spider-queen', 'mosquito-king'] }],
  },
];

// All balls combined
export const BALLS: Ball[] = [...BASE_BALLS, ...EVOLVED_BALLS, ...LEGENDARY_BALLS];

// Helper functions
export function getBallById(id: string): Ball | undefined {
  return BALLS.find(ball => ball.id === id);
}

export function getBallBySlug(slug: string): Ball | undefined {
  return BALLS.find(ball => ball.slug === slug);
}

export function getBallsByRarity(rarity: BallRarity): Ball[] {
  return BALLS.filter(ball => ball.rarity === rarity);
}

export function getEvolutionsFor(ballId: string): Ball[] {
  return BALLS.filter(ball => ball.recipes?.some(recipe => recipe.ingredients.includes(ballId)));
}

/**
 * Renders a ball description with variables replaced for a specific level
 * @param ball - The ball to render description for
 * @param level - The upgrade level (1, 2, or 3)
 * @returns Description with variables replaced, or original if no stats defined
 */
export function renderBallDescription(ball: Ball, level: 1 | 2 | 3): string {
  if (!ball.stats) {
    return ball.description;
  }

  const levelKey = `level${level}` as keyof BallLevelStats;
  const variables = ball.stats[levelKey];

  let description = ball.description;

  // Replace all {[variable_name]} with actual values
  description = description.replace(/\{\[([^\]]+)\]\}/g, (match, varName) => {
    const value = variables[varName];
    return value !== undefined ? String(value) : match;
  });

  return description;
}

/**
 * Extracts all variable names from a ball's description
 * Useful for knowing what stats need to be filled in
 */
export function extractVariableNames(description: string): string[] {
  const matches = description.matchAll(/\{\[([^\]]+)\]\}/g);
  return Array.from(matches, m => m[1]);
}
