import React from "react";
import Input from "components/Input";
import Button from "components/Button";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/3 border-solid border-slate-200 border-2 rounded-md flex box-shadow-register">
        <div className="py-12 mx-auto px-6">
          <div className="text-center">
            <p className="font-bold text-3xl mb-6">Kanban</p>
            <p className="font-bold mb-3">Log in to continue</p>
            <div>
              <Input type="text" name="email" placeholder="Enter Your Email" />
              <Input
                type="password"
                name="password"
                placeholder="Enter Your Password"
              />
            </div>
            <Button text="Login" />
          </div>

          <Link to={"/forget-password"}>
            <p className="text-blue-700 text-center text-base my-4">
              Forget password
            </p>
          </Link>
          <Link to={"/register"}>
            <p className="text-blue-700 text-center text-base my-2">
              Don't have an account? Sign up
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
