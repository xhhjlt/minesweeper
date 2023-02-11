import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";

interface GameConteinerState {
  isGameStarted: boolean,
  isMuted: boolean,
  activeTab: 'settings' | 'game'
};

const initialState: GameConteinerState = {
  isGameStarted: false,
  isMuted: false,
  activeTab: 'settings'
};

const slice = createSlice({
  name: 'gameContainer',
  initialState,
  reducers: {
    startGame: (state) => {
      state.isGameStarted = true;
    },
    finishGame: (state) => {
      state.isGameStarted = false;
    },
    mute: (state) => {
      state.isMuted = true;
    },
    unmute: (state) => {
      state.isMuted = false;
    },
    openSettings: (state) => {
      state.activeTab = 'settings';
    },
    openGame: (state) => {
      state.activeTab = 'game';
    },
  },
});

export const { startGame, finishGame, mute, unmute, openSettings, openGame } = slice.actions;
export default slice.reducer;
export const isGameActive = (state: RootState) => state.container.isGameStarted;
export const isGameOpened = (state: RootState) => state.container.activeTab === 'game';
export const isMuted = (state: RootState) => state.container.isMuted;