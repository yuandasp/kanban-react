import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import AddTodoModal from "components/AddTodoModal";
import { getAllTodos, setTodoDetail } from "features/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import DetailTodo from "pages/DetailTodo";

function TodoCard() {
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const [isAddTodoOpenModal, setIsAddTodoOpenModal] = useState(false);
  const [isEditTodoOpenModal, setIsEditTodoOpenModal] = useState(false);
  const todos = useSelector((state) => state.todo.todos);
  const statusTodo = todos.filter((todo) => todo.status === "todo");
  const statusOnGoing = todos.filter((todo) => todo.status === "on going");
  const statusDone = todos.filter((todo) => todo.status === "done");

  const handleDetailTodo = (todo) => {
    setSearchParams({ id: todo.idtodo });
    setIsEditTodoOpenModal(true);
    dispatch(setTodoDetail(todo));
  };

  useEffect(() => {
    dispatch(getAllTodos());
  }, []);

  return (
    <div>
      <SimpleGrid
        spacing={8}
        templateColumns="repeat(3,1fr)"
        className="py-11 px-11 sm:px-24 overflow-scroll todo-card-list"
      >
        <Card className="bg-color-card dark:overflow-hidden" minW="xs">
          <CardHeader className="dark:bg-slate-700">
            <Heading size="md" className="text-slate-900 dark:text-white">
              Todo
            </Heading>
          </CardHeader>
          <CardBody className="flex flex-col gap-8 dark:bg-slate-700">
            {statusTodo.map((todo) => (
              <Card
                key={todo.idtodo}
                onClick={() => {
                  handleDetailTodo(todo);
                }}
                className="hover:bg-blue-400 dark:hover:bg-slate-500 dark:hover:text-white hover:text-white  dark:bg-slate-300 dark:text-slate-900"
              >
                <CardBody>
                  <Text>{todo.description}</Text>
                </CardBody>
              </Card>
            ))}
          </CardBody>
          <CardFooter className="dark:bg-slate-700">
            <Button
              colorScheme="blue"
              // className="button-add-todo "
              onClick={() => setIsAddTodoOpenModal(true)}
            >
              + Add a card
            </Button>
          </CardFooter>
        </Card>
        <Card className="bg-color-card dark:overflow-hidden" minW="xs">
          <CardHeader className="dark:bg-slate-700">
            <Heading size="md" className="text-slate-900 dark:text-white">
              On going
            </Heading>
          </CardHeader>
          <CardBody className="flex flex-col gap-8 dark:bg-slate-700">
            {statusOnGoing.map((todo) => (
              <Card
                key={todo.idtodo}
                onClick={() => {
                  handleDetailTodo(todo);
                }}
                className="hover:bg-blue-400 dark:hover:bg-slate-500 dark:hover:text-white hover:text-white  dark:bg-slate-300 dark:text-slate-900"
              >
                <CardBody>
                  <Text>{todo.description}</Text>
                </CardBody>
              </Card>
            ))}
          </CardBody>
          <CardFooter className="dark:bg-slate-700">
            <Button
              colorScheme="blue"
              onClick={() => setIsAddTodoOpenModal(true)}
            >
              + Add a card
            </Button>
          </CardFooter>
        </Card>
        <Card className="bg-color-card dark:overflow-hidden" minW="xs">
          <CardHeader className="dark:bg-slate-700">
            <Heading size="md" className="text-slate-900 dark:text-white">
              Done
            </Heading>
          </CardHeader>
          <CardBody className="flex flex-col gap-8 dark:bg-slate-700">
            {statusDone.map((todo) => (
              <Card
                key={todo.idtodo}
                onClick={() => {
                  handleDetailTodo(todo);
                }}
                className="hover:bg-blue-400 dark:hover:bg-slate-500 dark:hover:text-white hover:text-white  dark:bg-slate-300 dark:text-slate-900"
              >
                <CardBody>
                  <Text>{todo.description}</Text>
                </CardBody>
              </Card>
            ))}
          </CardBody>
          <CardFooter className="dark:bg-slate-700">
            <Button
              colorScheme="blue"
              className="button-primary"
              onClick={() => setIsAddTodoOpenModal(true)}
            >
              + Add a card
            </Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
      <AddTodoModal
        isOpen={isAddTodoOpenModal}
        onClose={() => setIsAddTodoOpenModal(false)}
        className="mx-4 sm:mx-0"
      />
      <DetailTodo
        isOpen={isEditTodoOpenModal}
        onClose={() => {
          setIsEditTodoOpenModal(false);
          setSearchParams(undefined);
        }}
        className="mx-4 sm:mx-0"
      />
    </div>
  );
}

export default TodoCard;
