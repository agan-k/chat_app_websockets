import AuthService from '../../services/authService'
import { LOGIN, REGISTER, LOGOUT, UPDATE_PROFILE } from '../types/index'

// history is being passed as a parameter from login component
// This code is a little repetitive and could be refactored
export const login = (params, history) => dispatch => {
  return AuthService.login(params)
      .then(data => {
          dispatch({ type: LOGIN, payload: data })
          history.push('/')
      })
      .catch(err => {

      })
}

export const register = (params, history) => dispatch => {
  return AuthService.register(params)
      .then(data => {
          dispatch({ type: REGISTER, payload: data })
          history.push('/')
      })
      .catch(err => {

      })
}

