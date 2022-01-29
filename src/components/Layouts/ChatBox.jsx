import React from "react";

const ChatBox = (props) => {
  // console.log(props.user)
  return (
    <div className="flex justify-between p-5  hover:bg-sky-200 	transition ease-in-out duration-200 cursor-pointer">
      <div className="flex justify-center">
        <img
          src="https://randomuser.me/api/portraits/men/42.jpg"
          alt=""
          className="rounded-full w-16 border-4 border-indigo-500"
        />
        <div className="pt-2">
          <span className="ml-2 font-bold">{props.user.name}</span>
          <br />
          <span className="ml-2 text-neutral-500">Thank yoo so much!</span>
        </div>
      </div>
      <div className="pt-2">
        <span className="ml-2 text-xs text-neutral-500">12/05/2021</span>
      </div>
    </div>
  );
};

export default ChatBox;
