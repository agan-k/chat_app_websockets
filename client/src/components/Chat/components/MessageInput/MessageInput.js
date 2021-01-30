import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import ChatService from '../../../../services/chatService'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './MessageInput.scss'

const MessageInput = ({chat}) => {

  const user = useSelector(state => state.authReducer.user)
  const socket = useSelector(state => state.chatReducer.socket)

  const fileUpload = useRef()

const [message, setMessage] = useState('')
  const [image, setImage] = useState('')
  
  const handleMessage = e => {
    const value = e.target.value;
    // Show that you are typing something 
    setMessage(value)


    const receiver = {
      chatId: chat.id,
      fromUser: user,
      toUserId: chat.Users.map(user => user.id)
    }

    // Just evaluate when the user starts typing and keep it as 1 or 0 depending on if the user is typing because we don't want to evaluate every key stroke
    if (value.length === 1) {
      receiver.typing = true
      socket.emit('typing', receiver)
    }
    if (value.length === 0) {
      receiver.typing = false // so we can stop the bubble
      socket.emit('typing', receiver)
    }

    // Notify other users that this user is typing

  }

  const handleKeyDown = (e, imageUpload) => {
    if (e.key === 'enter') setMessage(imageUpload)
  }

  const sendMessage = (imageUpload) => {
    if (message.length < 1 && !imageUpload) return;

    const msg = {
      type: imageUpload ? 'image' : 'text',
      fromUserId: user,
      toUserId: chat.Users.map(user => user.id),
      chatId: chat.id,
      message: imageUpload ? imageUpload : message
    }

    setMessage('')
    setImage('')

    // send message with socket
    socket.emit('message', msg)
  }

  const handleImageUpload = () => {
    const formData = new FormData()
    formData.append('id', chat.id)
    formData.append('image', image)

    ChatService.uploadImage(formData)
      .then(image => {
        sendMessage(image)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="input-container">
      <div className="image-upload-container">
        <div>

        </div>
        <div className='image-upload'>
          {
            image.name ? 
              <div className="image-details">
                <p className="m-0">{image.name}</p>
                <FontAwesomeIcon 
                  onClick={handleImageUpload}
                  icon='uplaod'
                  className="fa-icon"
                  />
                <FontAwesomeIcon 
                  onClick={() => setImage('')}
                  icon='times'
                  className="fa-icon"
                  />
              </div>
              : null
            }
          <FontAwesomeIcon 
            onClick={() => fileUpload.current.click}
            icon={['far', 'image']}
              className="fa-icon"
              />
          
        </div>
      </div>
      <div className="message-input">
        <input
          value={message}
          onChange={e => handleMessage(e)}
          onKeyDown={e => handleKeyDown(e, false)}
          placeholder="Message... "
          type="text"
        />
        
        <FontAwesomeIcon
          icon={['far', 'smile']}
          className="fa-icon"
        />
      </div>
      <input ref={fileUpload} className="chat-image" type="file" onChange={e => setImage(e.target.files[0])}/>
    </div>
  )
}

export default MessageInput
