export interface DifficultyData {
  height: number,
  width: number,
  mines: number
}

export enum DifficultyLevels {
  beginner = 'beginner',
  intermediate = 'intermediate',
  expert = 'expert',
  custom = 'custom'
};

export const levels: Record<DifficultyLevels, DifficultyData> = {
  [DifficultyLevels.beginner]: {
    height: 8,
    width: 8,
    mines: 10,
  },
  [DifficultyLevels.intermediate]: {
    height: 16,
    width: 16,
    mines: 40,
  },
  [DifficultyLevels.expert]: {
    height: 16,
    width: 32,
    mines: 100,
  },
  [DifficultyLevels.custom]: {
    height: 50,
    width: 50,
    mines: 500,
  }
};