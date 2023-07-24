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
import { getAllTodos } from "features/todoSlice";
import { useDispatch, useSelector } from "react-redux";

function TodoCard() {
  const dispatch = useDispatch();
  const [isAddTodoOpenModal, setIsAddTodoOpenModal] = useState(false);
  const todos = useSelector((state) => state.todo.todos);

  useEffect(() => {
    dispatch(getAllTodos());
  }, []);

  return (
    <div>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(3,1fr)"
        className="py-11 px-32"
      >
        <Card>
          <CardHeader className="bg-slate-200">
            <Heading size="md">Todo</Heading>
          </CardHeader>
          {todos.map((todo) => (
            <CardBody className="flex flex-col gap-8 bg-slate-200">
              <Card>
                <CardBody>
                  <Text>{todo.description}</Text>
                </CardBody>
              </Card>
            </CardBody>
          ))}
          <CardFooter className="bg-slate-200">
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
    </div>
  );
}

export default TodoCard;
