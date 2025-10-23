import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TLottery } from "../../type/HomePage";

const initialState: TLottery[] = [];

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<TLottery[]>) => {
      // Clear current state and push new data items
      state.splice(0, state.length, ...action.payload);
    },

    resetState: (state) => {
      // Clear array to reset state
      state.length = 0;
    },

    addLottery: (state, action: PayloadAction<TLottery>) => {
      state.push(action.payload);
    },
  },
});

// Action creators
export const { setData, resetState, addLottery } = dashboardSlice.actions;

export default dashboardSlice.reducer;
