import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import useSocket from './hooks/socketConnect'
// import { fetchChats } from '../../store/actions/chat'
import FriendList from './components/FriendList/FriendList'
import Messenger from './components/Messenger/Messenger'
import Navbar from './components/Navbar/Navbar'

import './Chat.scss'

const Chat = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.authReducer.user)

  useSocket(user, dispatch)


  return (
    <div className="chat-container">
      <Navbar />
      <div className="chat-wrap">
        <FriendList />
        <Messenger/>
      </div>
    </div>
  )
  
};

export default Chat;
