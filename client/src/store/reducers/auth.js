// Reducers are responsible for how state is updated
// Reducer is a pure function which means we can't operate directly on the state - so first we make a copy of the state in the return before changing it
import { LOGIN, REGISTER, LOGOUT, UPDATE_PROFILE } from '../types/index'

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || {},
  token: localStorage.getItem('token') || '',
  // double ang will convert this object to true or false depending on if there is a user in local storage or not
  isLoggedIn: !!JSON.parse(localStorage.getItem('user')),
}

const authReducer = (state = initialState, action) => {

  const { type, payload } = action
  
  switch (type) {
    case LOGIN:
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        isLoggedIn: true
      }
    case REGISTER:
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        isLoggedIn: true
      }
    case LOGOUT:
      return {
        ...state,
        user: {},
        token: '',
        isLoggedIn: false
      }
    
    case UPDATE_PROFILE:
      return {
        ...state,
        user: payload
      }
    
    default: {
      return state
    }
  }
}

export default authReducer