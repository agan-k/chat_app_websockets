import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { fetchChats } from '../../store/actions/chat'
import FriendList from './components/FriendList/FriendList'
import Messenger from './components/Messenger/Messenger'
import Navbar from './components/Navbar/Navbar'

import './Chat.scss'

const Chat = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.authReducer.user)

  useEffect(() => {
    dispatch(fetchChats()).then(res => console.log(res).catch(err => console.log(err)))
  }, [dispatch])

  console.log(user)
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
