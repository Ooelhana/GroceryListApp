import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import groceryReducer from "../features/list/grocerySlice";

export const store = configureStore({
  reducer: {
    grocery: groceryReducer,
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
