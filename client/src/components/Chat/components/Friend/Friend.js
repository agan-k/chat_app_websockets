import React from "react";
import { useSelector } from "react-redux";

// extracted useStatus into a helper file so we can re use it in other files
import { userStatus } from "../../../../utils/helpers";
import "./Friend.scss";

const Friend = ({ chat, click }) => {
  const currentChat = useSelector((state) => state.chatReducer.currentChat);

  const isChatOpened = () => {
    // change the class depending on if the id's match
    return currentChat.id === chat.id ? "opened" : "";
  };

  const lastMessage = () => {
    if (chat.Messages.length === 0) return "";

    // get the last message by accessing the last index with -1
    const message = chat.Message[chat.Messages.length - 1];
    return message.type === "image" ? "image uploaded" : message.message;
  };
  return (
    // Nice way to conditionally render with the return statement from a function
    <div onClick={click} className={`friend-list ${isChatOpened()}`}>
      <div>
        <img src={chat.Users[0].avatar} alt="User avatar" />
        <div className='friend-info'>
          <h4 className="m-0">
            {chat.Users[0].firstName} {chat.Users[0].firstName}
          </h4>
          <h5 className="m-0">{lastMessage()}</h5>
        </div>
      </div>
      <div className="friend-status">
        <span className={`online-status ${userStatus(chat.Users[0])}`}></span>
      </div>
    </div>
  );
};

export default Friend;
