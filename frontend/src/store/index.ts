import { configureStore } from '@reduxjs/toolkit';
import teamsReducer from './teams-slice';

export const store = configureStore({
  reducer: {
    teams: teamsReducer,
    // Add other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
