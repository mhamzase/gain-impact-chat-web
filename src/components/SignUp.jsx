import React, { useEffect, useState } from "react";
import Header from "./Layouts/Header";
import { FaPaperPlane, FaWindowMinimize } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppConst } from "../Utils/AppConst";

const SignUp = () => {
  const navigate = useNavigate();
  const BASE_URL = "http://127.0.0.1:8000/api";

  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [status, setStatus] = useState({
    nameError: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
    passwordConfirmationError: "",
    validate: false,
  });

  const { name, username, email, password, password_confirmation } = data;
  const {
    nameError,
    usernameError,
    emailError,
    passwordError,
    passwordConfirmationError,
    validate,
  } = status;

  useEffect(() => {
    document.title = "Sign Up";

    if (
      localStorage.getItem("access_token") !== null &&
      localStorage.getItem("access_token") !== "" &&
      localStorage.getItem("access_token") !== undefined
    ) {
      navigate("/home");
    }
  }, []);

  const handleChangeName = (e) => {
    let MIN_LENGTH = 3;
    var regex = /^[aA-zZ\s]+$/;
    setData({ ...data, name: e.target.value });

    e.target.value.length < MIN_LENGTH || !regex.test(e.target.value)
      ? setStatus({
          ...status,
          nameError: `Name must be at least ${MIN_LENGTH} characters long & contains only letters and spaces`,
          validate: false,
        })
      : setStatus({ ...status, nameError: "", validate: true });
  };

  const handleChangeUsername = (e) => {
    let MIN_LENGTH = 5;
    var regex = /^[a-zA-Z0-9]*$/;
    setData({ ...data, username: e.target.value });

    e.target.value.length < MIN_LENGTH || !regex.test(e.target.value)
      ? setStatus({
          ...status,
          usernameError: `Username must be at least ${MIN_LENGTH} characters long & contains only letters and numbers not spaces`,
          validate: false,
        })
      : setStatus({ ...status, usernameError: "", validate: true });
  };

  const handleChangeEmail = (e) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    setData({ ...data, email: e.target.value });

    !regex.test(e.target.value)
      ? setStatus({
          ...status,
          emailError: "Invalid Email Address!",
          validate: false,
        })
      : setStatus({ ...status, emailError: "", validate: true });
  };

  const handleChangePassword = (e) => {
    let MIN_LENGTH = 8;
    setData({ ...data, password: e.target.value });

    e.target.value.length < MIN_LENGTH
      ? setStatus({
          ...status,
          passwordError: `Password must be at least ${MIN_LENGTH} characters`,
          validate: false,
        })
      : setStatus({ ...status, passwordError: "", validate: true });
  };

  const handlePasswordConfirmation = (e) => {
    setData({ ...data, password_confirmation: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      validate === true &&
      name !== "" && nameError === "" &&
      username !== "" && usernameError === "" &&
      email !== "" && emailError === "" &&
      password !== "" && passwordError === "" &&
      password_confirmation !== ""
    ) {
      if (password === password_confirmation) {
        setStatus({
          ...status,
          passwordConfirmationError: "",
        });

        axios.post(`${BASE_URL}/signup`, data)
          .then((response) => {
            if (response.data.status_code === AppConst.CREATED) {
              setAlert({
                ...alert,
                message: "Successfully Registered!",
                type: "success",
              });

              setData({
                ...data,
                name: "",
                username: "",
                email: "",
                password: "",
                password_confirmation: "",
              });

              setStatus({
                ...status,
                nameError: "",
                usernameError: "",
                emailError: "",
                passwordError: "",
                passwordConfirmationError: "",
                formComplete: true,
              });
            } else if(response.data.status_code === AppConst.USERNAME_ALREADY_EXISTS) {
              setAlert({
                ...alert,
                message: "Username already taken!",
                type: "danger",
              });
            } else if(response.data.status_code === AppConst.EMAIL_ALREADY_EXISTS) {
              setAlert({
                ...alert,
                message: "Email already taken!",
                type: "danger",
              });
            } else {
              setAlert({
                ...alert,
                message: "Something went wrong!",
                type: "danger",
              });
            }
          })
          .catch((err) => {
            setAlert({
              ...alert,
              message: "An error occurred while registering. Please Try Again!",
              type: "danger",
            });
          });
      } else {
        setStatus({
          ...status,
          passwordConfirmationError:
            "Password and Confirm Password must be same",
        });
      }
    } else {
      setAlert({
        ...alert,
        message: "Please fill out all the fields correctly",
        type: "danger",
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center">
        <div className="w-2/5 mt-5 ">
          <h3 className="font-bold text-2xl text-neutral-600 text-center mb-3">
            Sign Up
          </h3>

          {alert.message && alert.type === "success" ? (
            <small className="text-green-500 font-bold">{alert.message}</small>
          ) : (
            <small className="text-red-500 font-bold">{alert.message}</small>
          )}

          <form onSubmit={handleSubmit} className="mt-2">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name*"
              className="w-full mt-5 rounded-2xl focus:outline-0 p-2 border-2 border-gray-300 focus:border-indigo-500  transition ease-in-out duration-300"
              onChange={handleChangeName}
              value={name}
              autoComplete="off"
            />
            <small className="text-red-500">{nameError ?? ""}</small>

            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username*"
              className="w-full mt-5 rounded-2xl focus:outline-0 p-2 border-2 border-gray-300 focus:border-indigo-500  transition ease-in-out duration-300"
              onChange={handleChangeUsername}
              value={username}
              autoComplete="off"
            />
            <small className="text-red-500">{usernameError ?? ""}</small>

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email*"
              className="w-full mt-5 rounded-2xl focus:outline-0 p-2 border-2 border-gray-300 focus:border-indigo-500  transition ease-in-out duration-300"
              onChange={handleChangeEmail}
              value={email}
              autoComplete="off"
            />
            <small className="text-red-500">{emailError ?? ""}</small>

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password*"
              className="w-full mt-5 rounded-2xl focus:outline-0 p-2 border-2 border-gray-300 focus:border-indigo-500  transition ease-in-out duration-300"
              onChange={handleChangePassword}
              value={password}
            />
            <small className="text-red-500">{passwordError ?? ""}</small>

            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              placeholder="Confirm Password*"
              className="w-full mt-5 rounded-2xl focus:outline-0 p-2 border-2 border-gray-300 focus:border-indigo-500  transition ease-in-out duration-300"
              onChange={handlePasswordConfirmation}
              value={password_confirmation}
            />
            <small className="text-red-500">
              {passwordConfirmationError ?? ""}
            </small>

            <button
              type="submit"
              name="signup"
              id="signup"
              className="w-full mt-5 rounded-2xl focus:outline-0 p-2 cursor-pointer bg-indigo-500 text-white flex justify-center items-center hover:shadow-lg hover:bg-indigo-800  transition ease-in-out duration-300"
            >
              Submit <FaPaperPlane className="ml-3" />
            </button>
          </form>
          <div className="flex justify-center items-center mt-5 mb-5">
            {" "}
            <FaWindowMinimize />{" "}
          </div>

          <span className="flex justify-center items-center text-sm">
            Already have an account? Please{" "}
            <Link to="/login" className="text-indigo-500 ml-1 font-bold">
              {" "}
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
