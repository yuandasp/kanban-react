import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTH_TOKEN } from "helpers/constant";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
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

export function fetchUser() {
  const token = localStorage.getItem(AUTH_TOKEN);
  return async (dispatch) => {
    let response = await axios.get(`${process.env.REACT_APP_API_BE}/user/`, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log("response", response.data);
    dispatch(setUser(response.data));
  };
}

export default userSlice.reducer;
