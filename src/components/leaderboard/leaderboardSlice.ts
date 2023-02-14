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

const initialState: LeaderboardState = {
  [DifficultyLevels.beginner]: [{ name: 'lalala', time: 10}],
  [DifficultyLevels.intermediate]: [],
  [DifficultyLevels.expert]: [],
  isNewRecord: false,
};

const slice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    checkTime: (state, { payload: { difficulty, time }}: PayloadAction<{ difficulty: DifficultyLevels, time: number }>) => {
      console.log('check time ', difficulty);
      if (difficulty === DifficultyLevels.custom) return;
      if (state[difficulty].length < 10) {
        state.isNewRecord = true;
      } else if (state[difficulty][9].time > time) {
        state.isNewRecord = true;
      }
    },
    addNewRecord: (state, { payload: { difficulty, time, name }}: PayloadAction<{ difficulty: DifficultyLevels, time: number, name: string }>) => {
      console.log('dispatch 1');
      if (difficulty === DifficultyLevels.custom) return;
      const newArr = [...state[difficulty], { name, time }];
      newArr.sort((a, b) => a.time - b.time).pop();
      state[difficulty] = newArr;
      console.log('dispatch 1 end');
    },
    closeModal: (state) => {
      console.log('dispatch 2');
      state.isNewRecord = false;
      console.log('dispatch 2 end');
    }
  },
});

export const { checkTime, addNewRecord, closeModal } = slice.actions;
export default slice.reducer;
export const beginnerLeaders = (state: RootState) => state.leaderboard.beginner;
export const intermediateLeaders = (state: RootState) => state.leaderboard.intermediate;
export const expertLeaders = (state: RootState) => state.leaderboard.expert;
export const isModalOpened = (state: RootState) => state.leaderboard.isNewRecord;