import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import containerReducer from 'components/game/container/containerSlice';
import minesweeperReducer from 'components/game/minesweeper/minesweeperSlice';
import leaderboardReducer from 'components/leaderboard/leaderboardSlice';

export const store = configureStore({
  reducer: {
    container: containerReducer,
    minesweeper: minesweeperReducer,
    leaderboard: leaderboardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
