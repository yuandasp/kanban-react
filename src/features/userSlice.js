import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setResetUser: (state, action) => {
      state.resetUser = action.payload;
    },
  },
});

export const { setUser, setResetUser } = userSlice.actions;

export default userSlice.reducer;
