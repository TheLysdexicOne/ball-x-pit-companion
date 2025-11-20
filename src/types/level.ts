// Level data types from game database extraction

export interface LevelData {
  Type: string;
  Id: number;
  Name: string;
  Slug: string;
  Description: string;
  DefaultTurnLength: number;
  BossTurns: number[];
  FuserTurns: number[];
  XPMultiplier: number;
  BossInfo: string;
  PreviewEnemies: string[];
  EnemyList: string[];
  UIColor: string;
  UIColorDark: string;
  DarkColor: string;
  LightColor: string;
}

export interface Level {
  id: string; // slug
  levelId: number; // Numeric ID for sorting
  type: string;
  name: string;
  slug: string;
  description: string;
  defaultTurnLength: number;
  bossTurns: number[];
  fuserTurns: number[];
  xpMultiplier: number;
  bossSlug: string;
  previewEnemySlugs: string[];
  enemySlugs: string[]; // Template slugs that appear in this level
}
