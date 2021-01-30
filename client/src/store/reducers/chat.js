
import {
  FETCH_CHATS,
  SET_CURRENT_CHAT,
  FRIENDS_ONLINE,
  FRIEND_ONLINE,
  FRIEND_OFFLINE,
  SET_SOCKET,
  RECEIVED_MESSAGE,
  SENDER_TYPING,
  PAGINATE_MESSAGES,
  INCREMENT_SCROLL,
  CREATE_CHAT,
  ADD_USER_TO_GROUP,
  LEAVE_CURRENT_CHAT,
  DELETE_CURRENT_CHAT
} from '../actions/chat'

const initialState = {
  chats: [],
  currentChat: {},
  socket: {},
  newMessage: { chatId: null, seen: null },
  scrollBottom: 0,
  senderTyping: {typing: false}
}

const chatReducer = (state = initialState, action) => {

  const { type, payload } = action
  
  switch (type) {
    case FETCH_CHATS:
      return {
        ...state,
        chats: payload
      }
    
    case SET_CURRENT_CHAT:
      return {
        ...state,
        currentChat: payload
      }
    
    case SET_CURRENT_CHAT:
      return {
        ...state,
        currentChat: payload,
        scrollBottom: state.scrollBottom + 1,
        newMessage: { chatId: null, seen: null}
      }
    
    case FRIENDS_ONLINE: {
      // we have to do this because we can't mutate the state 
      // this is how we modify a nested property
      const chatsCopy = state.chats.map(chat => {
        return {
            ...chat,
            Users: chat.Users.map(user => {
                if (payload.includes(user.id)) {
                    return {
                        ...user,
                        status: 'online'
                    }
                }
                return user
            })
        }
    })

    return {
        ...state,
        chats: chatsCopy
    }
    }
      
    case FRIEND_ONLINE: {
      let currentChatCopy = { ...state.currentChat }
      
      const chatsCopy = state.chats.map(chat => {
        const Users = chat.Users.map(user => {
          if (user.id === parseInt(payload.id)) {
            return {
              ...user,
              status: 'online'
            }
          }
          return user
        })
        if (chat.id === currentChatCopy.id) {
          currentChatCopy = {
            ...currentChatCopy,
            Users
          }
        }

        return {
          ...chat,
          Users
        }
      })

      return {
        // Now that we have a copy of chats we can return our state
        ...state,
        chats: chatsCopy,
        currentChat: currentChatCopy
      }
      }
    case FRIEND_OFFLINE: {
      let currentChatCopy = { ...state.currentChat }
      
      const chatsCopy = state.chats.map(chat => {
        const Users = chat.Users.map(user => {
          if (user.id === parseInt(payload.id)) {
            return {
              ...user,
              status: 'offline'
            }
          }
          return user
        })
        if (chat.id === currentChatCopy.id) {
          currentChatCopy = {
            ...currentChatCopy,
            Users
          }
        }

        return {
          ...chat,
          Users
        }
      })

      return {
        // Now that we have a copy of chats we can return our state
        ...state,
        chats: chatsCopy,
        currentChat: currentChatCopy
      }
      }
    
    default: {
      return state
    }
  }
}

export default chatReducer