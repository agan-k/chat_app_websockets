import ChatService from '../../services/chatService'

export const FETCH_CHATS = 'FETCH_CHATS'
export const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT'
export const FRIENDS_ONLINE = 'FRIENDS_ONLINE'
export const FRIEND_ONLINE = 'FRIEND_ONLINE'
export const FRIEND_OFFLINE = 'FRIEND_OFFLINE'
export const SET_SOCKET = 'SET_SOCKET'
export const RECEIVED_MESSAGE = 'RECEIVED_MESSAGE'
export const SENDER_TYPING = 'SENDER_TYPING'
export const PAGINATE_MESSAGES = 'PAGINATE_MESSAGES'
export const INCREMENT_SCROLL = 'INCREMENT_SCROLL'
export const CREATE_CHAT = 'CREATE_CHAT'
export const ADD_USER_TO_GROUP = 'ADD_USER_TO_GROUP'
export const LEAVE_CURRENT_CHAT = 'LEAVE_CURRENT_CHAT'
export const DELETE_CURRENT_CHAT = 'DELETE_CURRENT_CHAT'

export const fetchChats = () => dispatch => {
  return ChatService.fetchChats()
    .then(data => {
      data.forEach(chat => {
        chat.Users.forEach(user => {
        user.status = 'offline'
        })
        chat.Message.reverse()
      })
      dispatch({ type: FETCH_CHATS, payload: data })
      return data
    })
    .catch(err => {
    throw err
  })
}

export const setCurrentChat = (chat) => (dispatch) => {
  dispatch({ type: SET_CURRENT_CHAT, payload: chat })
}