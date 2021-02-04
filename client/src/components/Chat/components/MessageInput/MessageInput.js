import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatService from "../../../../services/chatService";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import "./MessageInput.scss";
import { incrementScroll } from "../../../../store/actions/chat";

const MessageInput = ({ chat }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const socket = useSelector((state) => state.chatReducer.socket);
  // const chatReducer = useSelector(state => state.chatReducer)
  const newMessage = useSelector((state) => state.chatReducer.newMessage);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showNewMessageNotification, setShowNewMessageNotification] = useState(
    false
  );

  // console.log(socket, 'cocket')
  // console.log(chat, 'chat')
  // console.log(message, 'message')

  const fileUpload = useRef();
  const msgInput = useRef();


  const handleMessage = (e) => {
    const value = e.target.value;
    // Show that you are typing something
    setMessage(value);

    const receiver = {
      chatId: chat.id,
      fromUser: user,
      toUserId: chat.Users.map((user) => user.id),
    };

    // Just evaluate when the user starts typing and keep it as 1 or 0 depending on if the user is typing because we don't want to evaluate every key stroke
    if (value.length === 1) {
      receiver.typing = true;
      socket.emit("typing", receiver);
    }
    if (value.length === 0) {
      receiver.typing = false; // so we can stop the bubble
      socket.emit("typing", receiver);
    }

    // Notify other users that this user is typing
  };

  const handleKeyDown = (e, imageUpload) => {
    if (e.key === "Enter") {
      sendMessage(imageUpload);
    } 
  };

  const sendMessage = (imageUpload) => {
    if (message.length < 1 && !imageUpload) return;
    
    const msg = {
      type: imageUpload ? "image" : "text",
      fromUser: user,
      toUserId: chat.Users.map((user) => user.id),
      chatId: chat.id,
      message: imageUpload ? imageUpload : message,
    };

    setMessage("");
    setImage("");
    setShowEmojiPicker(false);

    // send message with socket
    socket.emit("message", msg);
  };

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append("id", chat.id);
    formData.append("image", image);

    ChatService.uploadImage(formData)
      .then((image) => {
        sendMessage(image);
      })
      .catch((err) => console.log(err));
  };

  const selectEmoji = (emoji) => {
    // this function merges the selected emoji along with the rest of the image
    const startPosition = msgInput.current.selectionStart;
    const endPosition = msgInput.current.selectionEnd;
    const emojiLength = emoji.native.length;
    const value = msgInput.current.value;
    // Setting the message in state with each sub string either side of the added emoji
    setMessage(
      value.substring(0, startPosition) +
        emoji.native +
        value.substring(endPosition, value.length)
    );
    msgInput.current.focus();
    // Set a cursor to the end of the input
    msgInput.current.selectionEnd = endPosition + emojiLength;
  };

  useEffect(() => {
    // Since message input is not a parent of msg-box we have to use the only way of selecting this element - because we can't just pass the reference
    const msgBox = document.getElementById("msg-box");
    if (
      !newMessage.seen &&
      newMessage.chatId === chat.id &&
      msgBox.scrollHeight !== msgBox.clientHeight
    ) {
      if (msgBox.scrollTop > msgBox.scrollHeight * 0.3) {
        dispatch(incrementScroll());
      } else {
        setShowNewMessageNotification(true);
      }
    } else {
      setShowNewMessageNotification(false);
    }
  }, [newMessage, dispatch]);

  const showNewMessage = () => {
    dispatch(incrementScroll());
    setShowNewMessageNotification(false);
  };

  return (
    <div className="input-container">
      <div className="image-upload-container">
        <div>
          {showNewMessageNotification ? (
            <div className="message-notification" onClick={showNewMessage}>
              <FontAwesomeIcon icon="bell" className="fa-icon" />
              <div className="m-0">new message</div>
            </div>
          ) : null}
        </div>
        <div className="image-upload">
          {image.name ? (
            <div className="image-details">
              <p className="m-0">{image.name}</p>
              <FontAwesomeIcon
                onClick={handleImageUpload}
                icon="upload"
                className="fa-icon"
              />
              <FontAwesomeIcon
                onClick={() => setImage("")}
                icon="times"
                className="fa-icon"
              />
            </div>
          ) : null}
          <FontAwesomeIcon
            onClick={() => fileUpload.current.click()}
            icon={["far", "image"]}
            className="fa-icon"
          />
        </div>
      </div>
      <div className="message-input">
        <input
          ref={msgInput}
          value={message}
          onChange={(e) => handleMessage(e)}
          onKeyDown={(e) => handleKeyDown(e, false)}
          placeholder="Message... "
          type="text"
        />

        <FontAwesomeIcon
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          icon={["far", "smile"]}
          className="fa-icon"
        />
      </div>
      <input
        ref={fileUpload}
        className="chat-image"
        id='chat-image'
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      {showEmojiPicker ? (
        <Picker
          title="Pick your emoji..."
          emoji="point_up"
          style={{ position: "absolute", bottom: "20px", right: "20px" }}
          onSelect={selectEmoji}
        />
      ) : null}
    </div>
  );
};

export default MessageInput;
