import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { paginateMessages } from "../../../../store/actions/chat";
import Message from "../Message/Message";
import "./MessageBox.scss";

const MessageBox = ({ chat }) => {

  const dispatch = useDispatch()

  const user = useSelector((state) => state.authReducer.user);
  const scrollBottom = useSelector((state) => state.chatReducer.scrollBottom);
  const senderTyping = useSelector((state) => state.chatReducer.senderTyping);

  const [loading, setLoading] = useState(false)
  const [scrollUp, setScrollUp] = useState(0)

  const msgBox = useRef();

  const scrollManual = (value) => {
    msgBox.current.scrollTop = value
  }

  const handleInfiniteScroll = (e) => {
    if (e.target.scrollTop === 0) {

      setLoading(true)
      const pagination = chat.Pagination
      const page = typeof pagination === 'undefined' ? 1 : pagination.page

      dispatch(paginateMessages(chat.id, parseInt(page) + 1))
        .then(res => {
          if (res) {
            setScrollUp(scrollUp + 1)
          }
          setLoading(false)
        }).catch(err => {
          setLoading(false)
        })
    }
  }

  useEffect(() => {
    setTimeout(() => {
      // only scroll 10% from the bottom
      scrollManual(Math.ceil(msgBox.current.scrollHeight * 0.10))
    }, 100)
  }, [scrollUp])

  // listening for whenever sender typing changes
  useEffect(() => {
    if (senderTyping.typing && msgBox.current.scrollTop > msgBox.current.scrollHeight * 0.30) {
      setTimeout(() => {
        scrollManual(msgBox.current.scrollHeight)
      }, 100)
    }
  }, [senderTyping])

  useEffect(() => {
    if (!senderTyping.typing) {
      setTimeout(() => {
        scrollManual(msgBox.current.scrollHeight)
      }, 100)
    }
  }, [scrollBottom])

  return (
    // registering our useRef hook
    <div onScroll={handleInfiniteScroll} className="msg-box" id="msg-box" ref={msgBox}>
      {
        loading
          ? <p className="loader m-0">
            <FontAwesomeIcon icon="spinner" className="fa-spin" />
        </p>
            : null
      }
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
      {senderTyping.typing && senderTyping.chatId === chat.id ? (
        <div className="message mt-5p">
          <div className="other-person">
            <p className="m-0">
              {senderTyping.fromUser.firstName} {senderTyping.fromUser.lastName}
              ...
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MessageBox;
