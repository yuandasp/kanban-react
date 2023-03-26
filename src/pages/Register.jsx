import React from "react";
import Input from "components/Input";
import Button from "components/Button";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/3 border-solid border-slate-200 border-2 rounded-md flex box-shadow-register">
        <div className="py-12 mx-auto px-6">
          <div className="text-center">
            <p className="font-bold text-3xl mb-6">Kanban</p>
            <p className="font-bold mb-3">Sign up to continue</p>
            <div>
              <Input type="text" name="email" placeholder="Enter Your Email" />
              <Input
                type="password"
                name="password"
                placeholder="Enter Your Password"
              />
            </div>
            <Button text="Register" />
          </div>
          <Link to={"/login"}>
            <p className="text-blue-700 text-center text-sm my-2">
              Already have an account? Log in
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
