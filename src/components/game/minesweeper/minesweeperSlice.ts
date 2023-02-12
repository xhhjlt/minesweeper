import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { shuffle } from "./utils";

export interface Cell {
  x: number,
  y: number,
  value: number,
  opened: boolean,
  flag: string,
}

interface MinesweeperState {
  field: Array<Array<Cell>>,
  mines: number,
  flags: number,
  win: boolean,
};

const initialState: MinesweeperState = {
  field: [],
  mines: 0,
  flags: 0,
  win: false
};

const slice = createSlice({
  name: 'minesweeper',
  initialState,
  reducers: {
    generateField: (state, { payload: { width, height, mines }}: PayloadAction<{ width: number, height: number, mines: number }>) => {
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
    },
    fillField: (state, { payload: { x, y }}: PayloadAction<{ x: number, y: number }>) => {
      const minesArr = shuffle([
        ...Array(state.mines).fill(true),
        ...Array(state.field.length * state.field[0].length - 1 - state.mines).fill(false)
      ]);
      let counter = 0;
      const filled = state.field.map((row) => row.map((cell) => {
        if (cell.x === x && cell.y === y) {
          cell.value = 0;
        } else if (minesArr[counter]) {
          cell.value = 9;
        }
        counter++;
        return cell;
      }));
      filled.forEach((row) => row.forEach((cell) => {
        if (cell.value === 9) {
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const x = cell.x + i;
              const y = cell.y + j;
              if (x >=0 && x < filled[0].length 
                && y >=0 && y < filled.length) {
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
        state.field[baseY][baseX].flag = '';
        if (state.field[baseY][baseX].value !== 0) return;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const x = baseX + i;
            const y = baseY + j;
            if (x >=0 && x < state.field[0].length 
              && y >=0 && y < state.field.length) {
                open(x, y);
            }
          }
        }
      };
      open(x,y);
    },
    openAround: (state, { payload: { x, y }}: PayloadAction<{ x: number, y: number }>) => {
      state.field[y][x].opened = true;
      state.field[y][x].flag = '';
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
  },
});

export const { generateField, openCell, changeFlag, openAround, fillField } = slice.actions;
export default slice.reducer;
export const gameField = (state: RootState) => state.minesweeper.field;
export const minesNumber = (state: RootState) => state.minesweeper.mines;
export const flagsNumber = (state: RootState) => state.minesweeper.flags;