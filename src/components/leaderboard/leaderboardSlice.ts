import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export interface Record {
  name: string,
  time: number
}

interface LeaderboardState {
  beginner: Array<Record>,
  intermediate: Array<Record>,
  expert: Array<Record>,
};

const initialState: LeaderboardState = {
  beginner: [{name: 'Трус', time: 100}, {name: 'Балбес', time: 200}, {name: 'Бывалый', time: 300}],
  intermediate: [{name: 'Трус', time: 100}, {name: 'Балбес', time: 200}, {name: 'Бывалый', time: 300}],
  expert: [{name: 'Трус', time: 100}, {name: 'Балбес', time: 200}, {name: 'Бывалый', time: 300}],
};

const slice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
  },
});

export const { } = slice.actions;
export default slice.reducer;
export const beginnerLeaders = (state: RootState) => state.leaderboard.beginner;
export const intermediateLeaders = (state: RootState) => state.leaderboard.intermediate;
export const expertLeaders = (state: RootState) => state.leaderboard.expert;