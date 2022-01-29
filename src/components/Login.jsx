import React, { useState, useEffect } from "react";
import Header from "./Layouts/Header";
import { FaPaperPlane, FaWindowMinimize } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppConst } from "../Utils/AppConst";

const Login = () => {
  const navigate = useNavigate();
  const BASE_URL = "http://127.0.0.1:8000/api";

  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const [data, setData] = useState({
    username: "",
    password: "",
    inValid: false,
  });

  const { username, password } = data;

  useEffect(() => {
    document.title = "Login";

    if(localStorage.getItem("access_token") !== null && localStorage.getItem("access_token") !== "" && localStorage.getItem("access_token") !== undefined){
      navigate("/home");
    }
  }, []);


  const handleChangeUsername = (e) => {
    setData({ ...data, username: e.target.value });
  };

  const handleChangePassword = (e) => {
    setData({ ...data, password: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      axios.post(`${BASE_URL}/login`, data)
        .then((response) => {
          if (response.data.status_code === AppConst.SUCCESS) {
            localStorage.setItem("access_token", response.data.access_token);
            navigate("/home");
          }
          else if(response.data.status_code === AppConst.INVALID_CREDENTIALS){
            setAlert({
              ...alert,
              message: "Invalid username or password",
              type: "danger",
            });
          } else {
            setAlert({
              ...alert,
              message: "Something went wrong",
              type: "danger",
            });
          }
        })
        .catch((err) => {
          setAlert({
            ...alert,
            message: "An error occurred while logging. Please Try Again!",
            type: "danger",
          });
        });
    } else {
      setAlert({
        ...alert,
        message: "Please fill all the fields",
        type: "danger",
      });
    }
  };
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center">
        <div className="w-2/5 mt-5 ">
          <h3 className="font-bold text-xl text-neutral-600 text-center mb-3">
            Sign In
          </h3>

          {alert.message && alert.type === "danger" ? (
            <small className="text-red-500 font-bold">{alert.message}</small>
          ) : (
            ""
          )}

          <form onSubmit={handleSubmit} className="mt-2">
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

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password*"
              className="w-full mt-5 rounded-2xl focus:outline-0 p-2 border-2 border-gray-300 focus:border-indigo-500  transition ease-in-out duration-300"
              onChange={handleChangePassword}
              value={password}
            />

            <button
              type="submit"
              name="signup"
              id="signup"
              className="w-full mt-5 rounded-2xl focus:outline-0 p-2 cursor-pointer bg-indigo-500 text-white flex justify-center items-center hover:shadow-lg hover:bg-indigo-800 transition ease-in-out duration-300"
            >
              Submit <FaPaperPlane className="ml-3" />
            </button>
          </form>

          <div className="flex justify-center items-center mt-5 mb-5">
            {" "}
            <FaWindowMinimize />{" "}
          </div>

          <span className="flex justify-center items-center text-sm">
            Don't have an account ? Please create first{" "}
            <Link to="/signup" className="text-indigo-500 ml-1 font-bold">
              {" "}
              Sign Up{" "}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
