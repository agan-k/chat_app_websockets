import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Friend from '../Friend/Friend'
import './FriendList.scss'

const FriendList = () => {

  const chats = useSelector(state => state.chatReducer.chats)

  return (
    <div className="friends">
      <div className="title">
        <h3 className="m-0">Friends</h3>  
        <button>ADD</button>
      </div>
      <hr />
      
      <div className="friend-box">
        {
          chats.length > 0
            ? chats.map(chat => {
              <Friend chat={chat} key={chat.id} />
            })
            : <p className="no-chat">No friends here</p>
        }
      </div>
    </div>
  )
}

export default FriendList
