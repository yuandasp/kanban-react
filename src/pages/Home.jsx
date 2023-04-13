import React from "react";
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
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { Input, Textarea, Divider, Select } from "@chakra-ui/react";

function Home() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    priority: "",
    status: "",
  });

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const onChangeInput = (event) => {
    // console.log(event.target.name);
    // console.log(event.target.value);

    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onSave = () => {
    console.log("form :", form);
  };

  return (
    <>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(3,1fr)"
        className="py-11 px-32"
      >
        <Card>
          <CardHeader className="bg-slate-200">
            <Heading size="md">Todo</Heading>
          </CardHeader>
          <CardBody className="flex flex-col gap-8 bg-slate-200">
            <Card>
              <CardBody>
                <Text>
                  View a summary of all your customers over the last month.
                </Text>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Text>
                  View a summary of all your customers over the last month.
                </Text>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Text>
                  View a summary of all your customers over the last month.
                </Text>
              </CardBody>
            </Card>
          </CardBody>
          <CardFooter className="bg-slate-200">
            <button
              className="font-bold "
              onClick={() => {
                setForm({
                  ...form,
                  status: "Todo",
                });
                setIsOpenModal(true);
              }}
            >
              + Add a card
            </button>
          </CardFooter>
        </Card>
        {/* <Card>
          <CardHeader className="bg-blue-200">
            <Heading size="md">In Progress</Heading>
          </CardHeader>
          <CardBody className="flex flex-col gap-6 bg-blue-200">
            <Card>
              <CardBody>
                <Text>
                  View a summary of all your customers over the last month.
                </Text>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Text>
                  View a summary of all your customers over the last month.
                </Text>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Text>
                  View a summary of all your customers over the last month.
                </Text>
              </CardBody>
            </Card>
          </CardBody>
          <CardFooter className="bg-blue-200">
            <button className="font-bold " onClick={() => setIsOpenModal(true)}>
              + Add a card
            </button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="bg-red-200">
            <Heading size="md">Done</Heading>
          </CardHeader>
          <CardBody className="flex flex-col gap-6 bg-red-200">
            <Card>
              <CardBody>
                <Text>
                  View a summary of all your customers over the last month.
                </Text>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Text>
                  View a summary of all your customers over the last month.
                </Text>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Text>
                  View a summary of all your customers over the last month.
                </Text>
              </CardBody>
            </Card>
          </CardBody>
          <CardFooter className="bg-red-200">
            <button className="font-bold " onClick={() => setIsOpenModal(true)}>
              + Add a card
            </button>
          </CardFooter>
        </Card> */}
      </SimpleGrid>

      <Modal isOpen={isOpenModal} onClose={onCloseModal}>
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
            <p className="mb-2 font-bold">Due Date</p>
            <Input
              placeholder="Select Due Date"
              size="md"
              type="datetime-local"
              className="mb-4"
              name="due-date"
              onChange={onChangeInput}
            />
            <p className="mb-2 font-bold">Priority</p>
            <Select
              placeholder="-- select option --"
              className="mb-2"
              name="priority"
              onChange={onChangeInput}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Home;
