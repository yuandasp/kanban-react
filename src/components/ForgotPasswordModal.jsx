import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";

function ForgotPasswordModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formForgotPassword, setFormForgotPassword] = useState({ email: "" });
  const [modalForgotPassword, setModalForgotPassword] = useState(false);

  const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required("This field is required")
      .email("Wrong email format"),
  });

  const handleForgotPasswordForm = async (event) => {
    const key = event.target.name;
    setFormForgotPassword({ ...formForgotPassword, [key]: event.target.value });
  };

  const sendLinkToEmail = async (event) => {
    try {
      setIsLoading(true);
      event.preventDefault();

      let response = await axios.post(
        `${process.env.REACT_APP_API_BE}/auth/forgot-password`,
        formForgotPassword
      );

      setIsLoading(false);
      setFormForgotPassword({ email: "" });
      onClose();
      navigate("/login");

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
        text: error.response?.data?.message || "Something went wrong!!",
      });
      setIsLoading(false);
      setModalForgotPassword(false);
      navigate("/login");
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form
            onSubmit={sendLinkToEmail}
            validationschema={emailValidationSchema}
          >
            <ModalHeader>Forgot your password?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="">
                <label htmlFor="email" className="sr-only" />
                <p className="text-slate-400">
                  Please input your registered email! We will send you a link to
                  your email
                </p>
                <div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email"
                    className="shadow-sm mt-4"
                    value={formForgotPassword.email}
                    onChange={handleForgotPasswordForm}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="button-primary"
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={isLoading}
              >
                Send
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ForgotPasswordModal;
