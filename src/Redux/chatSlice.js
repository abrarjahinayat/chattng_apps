import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase.config";
const initialState = {
  value: null,
};

export const chatSlice = createSlice({
  name: "chatlist",
  initialState,
  reducers: {
    chatListInfo: (state, action) => {
      state.value = action.payload;
      // console.log(action);
    },
  },
});

// Action creators are generated for each case reducer function
export const { chatListInfo } = chatSlice.actions;

export default chatSlice.reducer;
