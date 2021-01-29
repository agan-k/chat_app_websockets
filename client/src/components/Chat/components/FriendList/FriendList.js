import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Friend from '../Friend/Friend'
import {setCurrentChat} from '../../../../store/actions/chat'
import './FriendList.scss'

const FriendList = () => {

  const dispatch = useDispatch()
  const chats = useSelector(state => state.chatReducer.chats)

  const openChats = (chat) => {
    dispatch(setCurrentChat(chat))
  }

  return (
    <div className="friends shadow-light">
      <div className="title">
        <h3 className="m-0">Friends</h3>  
        <button className="hover">ADD</button>
      </div>
      <hr />
      
      <div className="friend-box">
        {
          chats.length > 0
            ? chats.map(chat => {
              <Friend onClick={() => openChats(chat)} chat={chat} key={chat.id} />
            })
            : <p className="no-chat">No friends here</p>
        }
      </div>
    </div>
  )
}

export default FriendList
