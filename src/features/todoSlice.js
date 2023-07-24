import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTH_TOKEN } from "../helpers/constant";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    todoDetail: {
      title: "",
      description: "",
      idPriority: "",
      idStatus: "",
      startDate: "",
      endDate: "",
    },
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setTodoDetail: (state, action) => {
      state.todoDetail = action.payload;
    },
  },
});

export const { setTodos, setTodoDetail } = todoSlice.actions;

export default todoSlice.reducer;

export function getAllTodos() {
  const token = localStorage.getItem(AUTH_TOKEN);
  return async (dispatch) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BE}/todo/all`,
      { headers: { authorization: `Bearer ${token}` } }
    );
    console.log({ response });
    dispatch(setTodos(response.data.data));
    return response.data?.data;
  };
}
