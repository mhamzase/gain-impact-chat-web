import React, { useEffect, useState } from "react";
import ChatBox from "./Layouts/ChatBox";
import "./styles.css";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const BASE_URL = "http://127.0.0.1:8000/api";

  const [profile, setProfile] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    document.title = "Home";

    if (
      localStorage.getItem("access_token") === "" ||
      localStorage.getItem("access_token") === undefined ||
      localStorage.getItem("access_token") === null
    ) {
      navigate("/login");
    }

    axios
      .get(`${BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setProfile(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <div className="w-full h-full">
      {/* users side */}
      <div className="w-1/4">
        <div className="w-full p-5 flex items-center rounded-br-2xl bg-sky-100">
          <img
            src="https://randomuser.me/api/portraits/men/42.jpg"
            alt="profile photo"
            className="rounded-full w-16 border-4 border-indigo-500"
          />
          <div>
            <span className="ml-2 font-bold">{profile.name}</span>
            <br />
            <span className="ml-2 font-bold text-green-700">Online</span>
          </div>
        </div>
        <div className="mt-4 bg-sky-100 chatBoxAreaHeight overflow-y-scroll">
          {users.map((user) => (
            <ChatBox key={user.id} user={user} />
          ))}
        </div>

        <div className="border-t-2 border-gray-300 bg-sky-100 h-20 flex justify-start items-center pl-3">
          <div className="tooltip">
            <FaSignOutAlt
              onClick={handleLogout}
              className="cursor-pointer hover:text-red-600	transition ease-in-out duration-300 text-3xl"
            />
            <span className="tooltiptext">Logout</span>
          </div>
        </div>
      </div>

      {/* chat side */}
      <div className="w-3/4"></div>
    </div>
  );
};

export default Home;
