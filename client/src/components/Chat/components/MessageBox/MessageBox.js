import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "../Message/Message";
import "./MessageBox.scss";

const MessageBox = ({ chat }) => {

  const user = useSelector((state) => state.authReducer.user);
  const scrollBottom = useSelector(state => state.chatReducer.scrollBottom)
  const msgBox = useRef()

  useEffect(() => {
    setTimeout(() => {
      scrollManual(msgBox.current.scrollHeight)
    }, 100)
  }, [scrollBottom])

  const scrollManual = (value) => {
    msgBox.current.scrollTop = value
  }

  return (
    // registering our useRef hook
    <div className="msg-box" ref={msgBox}>
      {chat.Messages.map((message, idx) => {
        return (
          <Message
            user={user}
            chat={chat}
            message={message}
            index={idx}
            key={message.id}
          />
        );
      })}
    </div>
  );
};

export default MessageBox;
