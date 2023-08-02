import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  Divider,
  Select,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AUTH_TOKEN } from "../helpers/constant";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailTodo, getAllTodos } from "features/todoSlice";
import moment from "moment";

function DetailTodo({ isOpen, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem(AUTH_TOKEN);
  const [formEditTodo, setFormEditTodo] = useState({
    idtodo: "",
    title: "",
    description: "",
    idPriority: "",
    idStatus: "",
    startDate: "",
    endDate: "",
  });
  const todo = useSelector((state) => state.todo.todoDetail);

  // console.log("todo", todo);

  const onChangeInput = (event) => {
    console.log({ event });

    setFormEditTodo({
      ...formEditTodo,
      [event.target.name]: event.target.value,
    });
  };

  // const handleConfirmationEditTodo = async () => {
  //   const result = await Swal.fire({
  //     title: "Are you sure?",
  //     text: "You want to edit todo?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Edit",
  //   });
  //   if (result.isConfirmed) {
  //     onSubmitEditTodo();
  //   }
  // };

  const onSubmitEditTodo = async () => {
    const idTodo = todo.idtodo;
    try {
      setIsLoading(true);
      let response = await axios.put(
        `${process.env.REACT_APP_API_BE}/todo/${idTodo}`,
        formEditTodo,
        { headers: { authorization: `Bearer ${token}` } }
      );

      setIsLoading(false);
      onClose();
      window.location.reload();

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data?.message,
      });
    } catch (error) {
      onClose();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response?.data?.message?.message || "Something went wrong!!",
      });
      setIsLoading(false);
    }
  };

  const confirmationDeleteTodo = async () => {
    onClose();
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this todo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    });
    if (result.isConfirmed) {
      deleteTodoHandler();
    }
  };

  const deleteTodoHandler = async () => {
    const idTodo = todo.idtodo;
    try {
      setIsLoading(true);
      let response = await axios.delete(
        `${process.env.REACT_APP_API_BE}/todo/${idTodo}`,
        { headers: { authorization: `Bearer ${token}` } }
      );

      setIsLoading(false);
      onClose();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Already delete",
      });
      // window.location.reload();
      dispatch(getAllTodos());
    } catch (error) {
      onClose();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong!!",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && todo) {
      // console.log(moment(todo.start_date).format("YYYY-MM-DDTHH:mm"));
      setFormEditTodo({
        title: todo?.title,
        description: todo?.description,
        idPriority: todo?.label,
        idStatus: todo?.status,
        startDate: moment(todo.start_date).format("YYYY-MM-DDTHH:mm"),
        endDate: moment(todo.end).format("YYYY-MM-DDTHH:mm"),
      });
    }
  }, [isOpen, todo]);

  return (
    <div className="w-screen h-full flex justify-between bg-slate-50">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent className="dark:bg-slate-700 dark:text-slate-300">
          <ModalHeader>Edit Your Todo</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <p className="my-2 font-bold">Title</p>
            <Input
              placeholder="Title"
              className="mb-4 dark:bg-slate-200 dark:text-slate-900"
              name="title"
              value={formEditTodo.title}
              onChange={onChangeInput}
            />
            <p className="mb-2 font-bold">Description</p>
            <Textarea
              placeholder="Add description"
              className="mb-4 dark:bg-slate-200 dark:text-slate-900"
              name="description"
              value={formEditTodo.description}
              onChange={onChangeInput}
            />
            <p className="mb-2 font-bold">Start Date</p>
            <Input
              // placeholder="Select Start Date"
              size="md"
              type="datetime-local"
              className="mb-4 dark:bg-slate-200 dark:text-slate-900"
              name="startDate"
              value={formEditTodo.startDate}
              onChange={onChangeInput}
            />
            <p className="mb-2 font-bold">End Date</p>
            <Input
              // placeholder="Select Start Date"
              size="md"
              type="datetime-local"
              className="mb-4 dark:bg-slate-200 dark:text-slate-900"
              name="endDate"
              value={formEditTodo.endDate}
              onChange={onChangeInput}
            />
            <p className="mb-2 font-bold">Status</p>
            <Select
              // placeholder={
              //   formEditTodo.idStatus
              //     ? formEditTodo.idStatus
              //     : "-- select option --"
              // }
              className="mb-2 dark:bg-slate-200 dark:text-slate-900"
              name="idStatus"
              value={formEditTodo.idStatus}
              onChange={onChangeInput}
            >
              <option value="1">Todo</option>
              <option value="2">On Going</option>
              <option value="3">Done</option>
            </Select>
            <p className="mb-2 font-bold">Priority</p>
            <Select
              // placeholder="-- select option --"
              className="mb-2 dark:bg-slate-200 dark:text-slate-900"
              name="idPriority"
              value={
                formEditTodo.idPriority ? formEditTodo.idPriority : undefined
              }
              onChange={onChangeInput}
            >
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={confirmationDeleteTodo}
              isLoading={isLoading}
              mr={3}
            >
              Delete
            </Button>
            <Button
              colorScheme="blue"
              onClick={onSubmitEditTodo}
              isLoading={isLoading}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default DetailTodo;
