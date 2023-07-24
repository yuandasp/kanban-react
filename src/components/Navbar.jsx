import { Button } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setResetUser } from "features/userSlice";
import Swal from "sweetalert2";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(
      setResetUser({
        id_user: 0,
        username: "",
        email: "",
        fullname: "",
        profile_image: "",
      })
    );
    Swal.fire({
      icon: "success",
      title: "Logout",
      text: "You already logout from Pharmacy Web",
    });
    navigate("/login");
  };

  return (
    <div className="w-full h-20 bg-black flex justify-between px-5 lg:px-24 items-center text-color-green shadow-navbar border-b-gray-100 border-b-2">
      <Link to="/">
        <p className="text-white">logo</p>
      </Link>
      <Button onClick={handleLogout}>
        <div className="w-6 mr-4">
          <svg
            fill="none"
            stroke="black"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            ></path>
          </svg>
        </div>
        <p className="text-black">Logout</p>
      </Button>
    </div>
  );
}

export default Navbar;
