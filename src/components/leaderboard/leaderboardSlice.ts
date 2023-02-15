import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { DifficultyLevels } from "components/game/settings/constants";

export interface Record {
  name: string,
  time: number
}

interface LeaderboardState {
  [DifficultyLevels.beginner]: Array<Record>,
  [DifficultyLevels.intermediate]: Array<Record>,
  [DifficultyLevels.expert]: Array<Record>,
  isNewRecord: boolean,
};


const leaderboardFromStorage = localStorage.getItem('leaderboard');

const initialState: LeaderboardState = leaderboardFromStorage
  ? JSON.parse(leaderboardFromStorage)
  : {
    [DifficultyLevels.beginner]: [],
    [DifficultyLevels.intermediate]: [],
    [DifficultyLevels.expert]: [],
    isNewRecord: false,
  };

const slice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    checkTime: (state, { payload: { difficulty, time }}: PayloadAction<{ difficulty: DifficultyLevels, time: number }>) => {
      if (difficulty === DifficultyLevels.custom) return;
      if (state[difficulty].length < 10) {
        state.isNewRecord = true;
      } else if (state[difficulty][9].time > time) {
        state.isNewRecord = true;
      }
    },
    addNewRecord: (state, { payload: { difficulty, time, name }}: PayloadAction<{ difficulty: DifficultyLevels, time: number, name: string }>) => {
      if (difficulty === DifficultyLevels.custom) return;
      const newArr = [...state[difficulty], { name, time }];
      newArr.sort((a, b) => a.time - b.time);
      if (newArr.length > 10) {
        newArr.pop();
      }
      state[difficulty] = newArr;
      state.isNewRecord = false;
      localStorage.setItem('leaderboard', JSON.stringify(state))
    },
    closeModal: (state) => {
      state.isNewRecord = false;
    }
  },
});

export const { checkTime, addNewRecord } = slice.actions;
export default slice.reducer;
export const beginnerLeaders = (state: RootState) => state.leaderboard.beginner;
export const intermediateLeaders = (state: RootState) => state.leaderboard.intermediate;
export const expertLeaders = (state: RootState) => state.leaderboard.expert;
export const isModalOpened = (state: RootState) => state.leaderboard.isNewRecord;