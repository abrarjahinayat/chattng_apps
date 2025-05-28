import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "abrar",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoginInfo: (state) => {

      console.log(state);
    },

  },
})

// Action creators are generated for each case reducer function
export const { userLoginInfo } = userSlice.actions

export default userSlice.reducer