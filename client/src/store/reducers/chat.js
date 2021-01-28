
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
      console.log(payload)
      return {
        ...state,
        chats: payload
      }
    
    case SET_CURRENT_CHAT:
      return {
        ...state
      }
    
    default: {
      return state
    }
  }
}

export default chatReducer