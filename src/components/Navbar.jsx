import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, setResetUser } from "features/userSlice";
import Swal from "sweetalert2";
import logo from "assets/logo-kanban-darkmode.png";
import logoLight from "assets/logo-kanban-lightmode.png";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [theme, setTheme] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    if (window.matchMedia(`(prefers-color-scheme: dark)`).matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="sticky top-0 z-40 h-24 bg-[#4880C8] dark:bg-slate-900 flex justify-between px-6 sm:px-24 items-center text-color-green shadow-navbar border-b-gray-100 border-b-2">
      {theme === "light" ? (
        <Link to="/">
          <Image
            src={logoLight}
            alt=""
            className="h-16 sm:h-20"
            fallbackSrc={isLoading}
          />
        </Link>
      ) : (
        <Link to="/">
          <Image
            src={logo}
            alt=""
            className="h-16 sm:h-20"
            fallbackSrc={isLoading}
          />
        </Link>
      )}
      <div className="flex gap-4 sm:gap-11">
        {theme === "light" ? (
          <Tooltip label="light mode">
            <div
              className="w-10 cursor-pointer hover:bg-slate-200/50 hover:rounded-md p-2"
              onClick={handleThemeSwitch}
            >
              <svg
                fill="none"
                stroke="white"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                ></path>
              </svg>
            </div>
          </Tooltip>
        ) : (
          <Tooltip label="dark mode">
            <div
              className="w-10 cursor-pointer hover:bg-slate-200/50 hover:rounded-md p-2"
              onClick={handleThemeSwitch}
            >
              <svg
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                ></path>
              </svg>
            </div>
          </Tooltip>
        )}
        <Menu>
          <MenuButton>
            <div className="flex flex-row items-center gap-4">
              <p className="font-bold text-white hidden sm:block">
                {user?.username || "Hello!"}
              </p>
              <div className="w-3">
                <svg
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  ></path>
                </svg>
              </div>
            </div>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleLogout}>
              <div className="w-6 mr-4">
                <svg
                  fill="none"
                  stroke="gray"
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
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

export default Navbar;
