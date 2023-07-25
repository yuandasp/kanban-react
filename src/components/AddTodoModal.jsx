import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AUTH_TOKEN } from "../helpers/constant";

function AddTodoModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const token = localStorage.getItem(AUTH_TOKEN);
  const [isLoading, setIsLoading] = useState(false);
  const [formAddTodo, setFormAddTodo] = useState({
    title: "",
    description: "",
    idPriority: "",
    idStatus: "",
    startDate: "",
    endDate: "",
  });
  const [resetFormAddTodo, setResetFormAddTodo] = useState({
    title: "",
    description: "",
    idPriority: "",
    idStatus: "",
    startDate: "",
    endDate: "",
  });

  const onChangeInput = (event) => {
    setFormAddTodo({ ...formAddTodo, [event.target.name]: event.target.value });
  };

  const handleConfirmationAddTodo = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to add todo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Add",
    });
    if (result.isConfirmed) {
      onSubmitAddTodo();
    }
  };

  const onSubmitAddTodo = async () => {
    try {
      setIsLoading(true);
      let response = await axios.post(
        `${process.env.REACT_APP_API_BE}/todo`,
        formAddTodo,
        { headers: { authorization: `Bearer ${token}` } }
      );

      setIsLoading(false);
      onClose();
      window.location.reload();
      setFormAddTodo(resetFormAddTodo);
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
      navigate("/");
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Todo</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <p className="my-2 font-bold">Title</p>
            <Input
              placeholder="Title"
              className="mb-4"
              name="title"
              onChange={onChangeInput}
            />
            <p className="mb-2 font-bold">Description</p>
            <Textarea
              placeholder="Add description"
              className="mb-4"
              name="description"
              onChange={onChangeInput}
            />
            <p className="mb-2 font-bold">Start Date</p>
            <Input
              placeholder="Select Start Date"
              size="md"
              type="datetime-local"
              className="mb-4"
              name="startDate"
              onChange={onChangeInput}
            />
            <p className="mb-2 font-bold">End Date</p>
            <Input
              placeholder="Select Start Date"
              size="md"
              type="datetime-local"
              className="mb-4"
              name="endDate"
              onChange={onChangeInput}
            />
            <p className="mb-2 font-bold">Status</p>
            <Select
              placeholder="-- select option --"
              className="mb-2"
              name="idStatus"
              onChange={onChangeInput}
            >
              <option value="1">On Going</option>
              <option value="2">Done</option>
              <option value="3">Backlog</option>
            </Select>
            <p className="mb-2 font-bold">Priority</p>
            <Select
              placeholder="-- select option --"
              className="mb-2"
              name="idPriority"
              onChange={onChangeInput}
            >
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={onSubmitAddTodo}
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

export default AddTodoModal;
