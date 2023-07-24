import React, { useState } from "react";
import Input from "components/Input";
import Button from "components/Button";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import axios from "axios";
import { AUTH_TOKEN, USER } from "../helpers/constant";
import { useDispatch } from "react-redux";
import { setUser } from "features/userSlice";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .required("This field is required")
      .email("Wrong email format"),
    password: Yup.string()
      .required("This field is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const loginUser = async (value, actions) => {
    try {
      setIsLoading(true);
      let response = await axios.post(
        `${process.env.REACT_APP_API_BE}/auth/login`,
        value
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data.message,
        footer: "",
      });

      setIsLoading(false);
      if (response.data?.token) {
        localStorage.setItem(AUTH_TOKEN, response.data?.token);
        localStorage.setItem(USER, JSON.stringify(response.data?.user));
        dispatch(setUser(response.data?.data));
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data?.message || "Something went wrong!!",
      });
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={(value, actions) => {
          loginUser(value, actions);
        }}
      >
        {(props) => {
          return (
            <>
              <div className="flex min-h-screen h-full">
                <div className="w-full lg:w-1/3 mx-auto flex justify-center flex-col p-14">
                  <div>
                    <p className="text-3xl font-bold mb-2">Hi again!</p>
                    <p className="text-xl text-slate-500">
                      Login to your account
                    </p>
                  </div>
                  <div>
                    <Form className="mt-8 space-y-6" action="#" method="POST">
                      <input
                        type="hidden"
                        name="remember"
                        defaultValue="true"
                      />
                      <div className="rounded-md">
                        <div className="my-6">
                          <label
                            htmlFor="email-address"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <Field
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              className="shadow-sm pl-4 relative block w-full rounded-md border-0 py-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                              placeholder="Email"
                              component={Input}
                            />
                          </div>
                          <ErrorMessage
                            component="div"
                            name="email"
                            style={{ color: "red", fontSize: "12px" }}
                          />
                        </div>

                        <div className="my-6">
                          <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Password
                          </label>
                          <div className="mt-2">
                            <Field
                              id="password"
                              name="password"
                              type="password"
                              required
                              className="shadow-sm pl-4 relative block w-full rounded-md border-0 py-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                              placeholder="Password"
                              autoComplete="new-password"
                              component={Input}
                            />
                          </div>
                          <ErrorMessage
                            component="div"
                            name="password"
                            style={{ color: "red", fontSize: "12px" }}
                          />
                        </div>
                      </div>
                      <div>
                        <Button
                          isLoading={isLoading}
                          type="submit"
                          className="w-full rounded-md py-6 text-white button-primary"
                          text="Log in"
                        ></Button>

                        <div className="flex flex-wrap gap-2 items-end justify-end my-4">
                          <p className="text-color-green text-end text-base lg:text-md">
                            Don't have an account?
                          </p>
                          <Link to={"/register"}>
                            <p className="text-color-green text-end font-bold text-md lg:text-lg hover:text-cyan-900">
                              Register
                            </p>
                          </Link>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </>
          );
        }}
      </Formik>
    </div>
  );
}

export default Login;
