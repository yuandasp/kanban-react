import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTH_TOKEN } from "../helpers/constant";
import Swal from "sweetalert2";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    todoDetail: {
      idtodo: "",
      title: "",
      description: "",
      idPriority: "",
      idStatus: "",
      startDate: "",
      endDate: "",
    },
    statusListToDo: [],
    statusOnGoing: [],
    statusDone: [],
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setTodoDetail: (state, action) => {
      state.todoDetail = action.payload;
    },
    setStatusListToDo: (state, action) => {
      state.statusListToDo = action.payload;
    },
    setStatusOnGoing: (state, action) => {
      state.statusOnGoing = action.payload;
    },
    setStatusDone: (state, action) => {
      state.statusDone = action.payload;
    },
  },
});

export const {
  setTodos,
  setTodoDetail,
  setStatusListToDo,
  setStatusOnGoing,
  setStatusDone,
} = todoSlice.actions;

export default todoSlice.reducer;

export function getAllTodos() {
  const token = localStorage.getItem(AUTH_TOKEN);
  return async (dispatch) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BE}/todo/all`,
      { headers: { authorization: `Bearer ${token}` } }
    );
    // console.log({ response });
    dispatch(setTodos(response.data.data));
    return response.data?.data;
  };
}

// export function fetchDetailTodo(idtodo) {
//   return async (dispatch) => {
//     try {
//       const token = localStorage.getItem(AUTH_TOKEN);
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_BE}/todo/${idtodo}`,
//         { headers: { authorization: `Bearer ${token}` } }
//       );
//       // console.log("AAA", response.data.data[0]);
//       dispatch(setTodoDetail(response.data.data[0]));
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: error.response?.data?.message,
//       });
//     }
//   };
// }
