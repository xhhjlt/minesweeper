import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";

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
          line.push({ x: i, y: j, value: 0, opened: false, flag: '' })
        }
        field.push(line);
      }
      state.field = field;
      state.mines = mines;
    },
    openCell: (state, { payload: { x, y }}: PayloadAction<{ x: number, y: number }>) => {
      state.field[x][y].opened = true;
      state.field[x][y].flag = '';
    },
    openAround: (state, { payload: { x, y }}: PayloadAction<{ x: number, y: number }>) => {
      state.field[x][y].opened = true;
      state.field[x][y].flag = '';
    },
    changeFlag: (state, { payload: { x, y }}: PayloadAction<{ x: number, y: number }>) => {
      const flag = state.field[x][y].flag;
      if (flag === '') {
        state.field[x][y].flag = '🚩';
        state.flags = state.flags + 1;
      } else if (flag === '🚩') {
        state.field[x][y].flag = '?';
        state.flags = state.flags - 1;
      } else if (flag === '?') {
        state.field[x][y].flag = '';
      }
    },
  },
});

export const { generateField, openCell, changeFlag, openAround } = slice.actions;
export default slice.reducer;
export const gameField = (state: RootState) => state.minesweeper.field;
export const minesNumber = (state: RootState) => state.minesweeper.mines;
export const flagsNumber = (state: RootState) => state.minesweeper.flags;