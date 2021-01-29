import React from 'react'
import {useSelector} from 'react-redux'
import Message from '../Message/Message'
import './MessageBox.scss'

const MessageBox = ({ chat }) => {
  
  const user = useSelector(state => state.authReducer.user)

  return (
    <div className="msg-box">
      {
        chat.Messages.map((message, idx) => {
          return <Message
            user={user}
            chat={chat}
            message={message}
            index={idx}
            key={message.id} 
          />
        })
      }
    </div>
  )
}

export default MessageBox
