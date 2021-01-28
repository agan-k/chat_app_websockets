// Reducers are responsible for how state is updated
// Reducer is a pure function which means we can't operate directly on the state - so first we make a copy of the state in the return before changing it
import { LOGIN, REGISTER, LOGOUT, UPDATE_PROFILE } from '../types/index'

const initialState = {
  user: {},
  token: '',
  isLoggedIn: false
}

const authReducer = (state = initialState, action) => {

  const { type, payload } = action
  
  switch (type) {
    case LOGIN:
      return {
        ...state,
        user: payload,
        token: payload.token,
        isLoggedIn: true
      }
    case REGISTER:
      return {
        ...state,
        user: payload,
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
    
    default: {
      return state
    }
  }
}

export default authReducer