import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Friend from "../Friend/Friend";
import Modal from "../../../Modal/Modal";
import { setCurrentChat } from "../../../../store/actions/chat";
import ChatService from "../../../../services/chatService";
import "./FriendList.scss";

const FriendList = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chatReducer.chats);
  // console.log(chats.length, 'friend list')
  const socket = useSelector((state) => state.chatReducer.socket);

  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // console.log(showFriendsModal)

  const openChat = (chat) => {
    dispatch(setCurrentChat(chat));
  };

  const searchFriends = (e) => {
    ChatService.searchUsers(e.target.value).then((res) => setSuggestions(res));
  };

  const addNewFriend = (id) => {
    ChatService.createChat(id)
      .then((chats) => {
        socket.emit("add-friend", chats);
        setShowFriendsModal(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="friends shadow-light">
      <div className="title">
        <h3 className="m-0">Friends</h3>
        <button onClick={() => setShowFriendsModal(true)} className="hover">
          ADD
        </button>
      </div>
      <hr />

      <div className="friends-box">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <Friend
              click={() => openChat(chat)}
              chat={chat}
              key={chat.id}
            />
          ))
        ) : (
          <p className="no-chat">No friends here</p>
        )}
      </div>
      {showFriendsModal && (
        <Modal click={() => setShowFriendsModal(false)}>
          <Fragment key="header">
            <h3 className="m-0">Create new chat</h3>
          </Fragment>

          <Fragment key="body">
            <p>Find friends by typing their name</p>
            <input
              onInput={(e) => searchFriends(e)}
              type="text"
              placeholder="search..."
            />
            <div className="suggestions">
              {suggestions.map((user) => {
                return (
                  <div key={user.id} className="suggestion">
                    <p className="m-0">
                      {user.firstName} {user.lastName}
                    </p>
                    <button onClick={() => addNewFriend(user.id)}>ADD</button>
                  </div>
                );
              })}
            </div>
          </Fragment>
        </Modal>
      )}
    </div>
  );
};

export default FriendList;
