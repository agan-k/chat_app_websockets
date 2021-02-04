import { useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import { fetchChats, onlineFriends, onlineFriend, offlineFriend, setSocket, receivedMessage, senderTyping, createChat, addUserToGroup, leaveCurrentChat, deleteCurrentChat } from '../../../store/actions/chat'

// this function must start with 'use'
function useSocket(user, dispatch) {

  // This is wrapped in useEffect because we need to ensure all the chats are there before connecting to our socket server
  useEffect(() => {
    dispatch(fetchChats())
    .then(res => {

        const socket = socketIOClient.connect('http://127.0.0.1:3000')

        dispatch(setSocket(socket))

        socket.emit('join', user)

        // the 'typing' matches what you call it on the backend
        socket.on('typing', (sender) => {
          dispatch(senderTyping(sender))
        })

        socket.on('friends', (friends) => {
          console.log('Friends', friends)
          dispatch(onlineFriends(friends))
        })
        
        socket.on('online', (user) => {
          dispatch(onlineFriend(user))
          console.log('Online', user)
        })

        socket.on('offline', (user) => {
          dispatch(offlineFriend(user))
          console.log("Offline", user)
        })

        socket.on('received', (message) => {
          dispatch(receivedMessage(message, user.id))
        })

      

        socket.on('new-chat', (chat) => {
          dispatch(createChat(chat))
        })

        socket.on('added-user-to-group', (group) => {
          dispatch(addUserToGroup(group))
        })

        socket.on('remove-user-from-chat', (data) => {
          data.currentUserId = user.id
          dispatch(leaveCurrentChat(data))
        })

        socket.on('delete-chat', (chatId) => {
          dispatch(deleteCurrentChat(chatId))
        })

      })
    .catch(err => console.log(err))
  }, [dispatch, user])

}

export default useSocket;
