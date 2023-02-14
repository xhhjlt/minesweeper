import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { shuffle } from "./utils";
import { DifficultyLevels } from "../settings/constants";

export interface Cell {
  x: number,
  y: number,
  value: number,
  opened: boolean,
  flag: string,
}

interface MinesweeperState {
  field: Array<Array<Cell>>,
  width: number,
  height: number,
  mines: number,
  difficulty: DifficultyLevels,
  flags: number,
  win: boolean,
  lose: boolean,
  cellsOpened: number,
};

const initialState: MinesweeperState = {
  field: [],
  width: 0,
  height: 0,
  mines: 0,
  difficulty: DifficultyLevels.beginner,
  flags: 0,
  win: false,
  lose: false,
  cellsOpened: 0,
};

const slice = createSlice({
  name: 'minesweeper',
  initialState,
  reducers: {
    generateField: (state, { payload: { width, height, mines, difficulty }}: PayloadAction<{ width: number, height: number, mines: number, difficulty: DifficultyLevels }>) => {
      const field: Array<Array<Cell>> = [];
      for (let i = 0; i < height; i++) {
        const line = [];
        for (let j = 0; j < width; j++) {
          line.push({ x: j, y: i, value: 0, opened: false, flag: '' })
        }
        field.push(line);
      }
      state.field = field;
      state.mines = mines;
      state.height = height;
      state.width = width;
    },
    fillField: (state, { payload: { x, y }}: PayloadAction<{ x: number, y: number }>) => {
      const minesArr = shuffle([
        ...Array(state.mines).fill(true),
        ...Array(state.height * state.width - 1 - state.mines).fill(false)
      ]);
      let counter = 0;
      const filled = state.field.map((row) => row.map((cell) => {
        if (cell.x === x && cell.y === y) {
          cell.value = 0;
        } else {
          cell.value = minesArr[counter] ? 9 : 0;
          counter++;
        }
        return cell;
      }));
      filled.forEach((row) => row.forEach((cell) => {
        if (cell.value === 9) {
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const x = cell.x + i;
              const y = cell.y + j;
              if (x >=0 && x < state.width 
                && y >=0 && y < state.height) {
                  if (filled[y][x].value !== 9) filled[y][x].value = filled[y][x].value + 1;
              }
            }
          }
        }
      }));
      state.field = filled;
    },
    openCell: (state, { payload: { x, y }}: PayloadAction<{ x: number, y: number }>) => {
      const open = (baseX: number, baseY: number) => {
        if (state.field[baseY][baseX].opened) return;
        state.field[baseY][baseX].opened = true;
        state.cellsOpened = state.cellsOpened + 1;
        state.field[baseY][baseX].flag = '';
        if (state.height * state.width - state.mines === state.cellsOpened) state.win = true;
        if (state.field[baseY][baseX].value === 9) state.lose = true;
        if (state.field[baseY][baseX].value !== 0) return;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const x = baseX + i;
            const y = baseY + j;
            if (x >=0 && x < state.width 
              && y >=0 && y < state.height) {
                open(x, y);
            }
          }
        }
      };
      open(x,y);
    },
    openAround: (state, { payload: { x, y }}: PayloadAction<{ x: number, y: number }>) => {
      if (!state.field[y][x].opened) return;
      let flags = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const xi = x + i;
          const yi = y + j;
          if (xi >=0 && xi < state.width 
            && yi >=0 && yi < state.height) {
              if (state.field[yi][xi].flag === '🚩') flags++;
          }
        }
      }
      const open = (baseX: number, baseY: number) => {
        if (state.field[baseY][baseX].opened || state.field[baseY][baseX].flag === '🚩') return;
        state.field[baseY][baseX].opened = true;
        state.cellsOpened = state.cellsOpened + 1;
        state.field[baseY][baseX].flag = '';
        if (state.height * state.width - state.mines === state.cellsOpened) state.win = true;
        if (state.field[baseY][baseX].value === 9) state.lose = true;
        if (state.field[baseY][baseX].value !== 0) return;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const x = baseX + i;
            const y = baseY + j;
            if (x >=0 && x < state.width 
              && y >=0 && y < state.height) {
                open(x, y);
            }
          }
        }
      };
      
      if (state.field[y][x].value === flags) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const xi = x + i;
            const yi = y + j;
            if (xi >=0 && xi < state.width 
              && yi >=0 && yi < state.height) {
                open(xi, yi);
            }
          }
        }
      }
    },
    changeFlag: (state, { payload: { x, y }}: PayloadAction<{ x: number, y: number }>) => {
      const flag = state.field[y][x].flag;
      if (flag === '') {
        state.field[y][x].flag = '🚩';
        state.flags = state.flags + 1;
      } else if (flag === '🚩') {
        state.field[y][x].flag = '?';
        state.flags = state.flags - 1;
      } else if (flag === '?') {
        state.field[y][x].flag = '';
      }
    },
    clearGameStats: (state) => {
      state.cellsOpened = 0;
      state.flags = 0;
      state.lose = false;
      state.win = false;
    },
  },
});

export const { generateField, openCell, changeFlag, openAround, fillField, clearGameStats } = slice.actions;
export default slice.reducer;
export const gameField = (state: RootState) => state.minesweeper.field;
export const flagsNumber = (state: RootState) => state.minesweeper.flags;
export const isLose = (state: RootState) => state.minesweeper.lose;
export const isWin = (state: RootState) => state.minesweeper.win;
export const difficulty = (state: RootState) => {
  const { height, width, mines, difficulty } = state.minesweeper;
  return { height, width, mines, difficulty };
};