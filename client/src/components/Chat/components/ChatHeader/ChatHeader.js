import React, { Fragment, useState } from "react";
import { userStatus } from "../../../../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ChatHeader.scss";

const ChatHeader = ({ chat }) => {
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [showAddFriendModal, setAddFriendModal] = useState(false);
  const [showLeaveChatModal, setLeaveChatModal] = useState(false);
  const [showDeleteChatModal, setDeleteChatModal] = useState(false);

  return (
    <Fragment>
      <div className="chatter">
        {chat.Users.map((user) => {
          return (
            <div className="chatter-info">
              <h3>
                {user.firstName} {user.lastName}
              </h3>
              <div className="chatter-status">
                <span className={`chatter-status ${userStatus(user)}`}></span>
              </div>
            </div>
          );
        })}
      </div>
      <FontAwesomeIcon
        onClick={() => setShowChatOptions(!showChatOptions)}
        icon={["fas", "ellipsis-v"]}
        className="fa-icon"
      />

      {showChatOptions ? (
        <div class="settings">
          <div>
            <FontAwesomeIcon icon={["fas", "user-plus"]} className="fa-icon" />
            <p>Add user to chat</p>
          </div>
          {chat.type === "group" ? (
            <div>
              <FontAwesomeIcon
                icon={["fas", "sign-out-alt"]}
                className="fa-icon"
              />
              <p>Leave chat</p>
            </div>
          ) : null}
          <div>
            <FontAwesomeIcon icon={["fas", "trash"]} className="fa-icon" />
            <p>Delete chat</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default ChatHeader;
