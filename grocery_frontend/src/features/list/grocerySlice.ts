import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroceryItem } from "../../interfaces/groceryitems";

export interface GroceryState {
  items: GroceryItem[];
}

const initGroceryState: GroceryState = {
  items: [],
};

export const grocerySlice = createSlice({
  name: "grocery",
  initialState: initGroceryState,
  reducers: {
    setItems(state, action: PayloadAction<GroceryItem[]>) {
      state.items = action.payload;
    },
  },
});

export const { setItems } = grocerySlice.actions;

export default grocerySlice.reducer;
