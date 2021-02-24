import axios from 'axios'
import store from '../store'
import { logout } from '../store/actions/auth'


const API = axios.create({
  baseURL: 'http://127.0.0.1:3001',
  headers: {
    'Accept': 'application/json',
    // If we have our token we'll just pass it here or just an empty string
    "Authorization": `Bearer ${localStorage.getItem('token') || ''}`
  }
})

// The api response interceptor listens for token expired errors  
API.interceptors.response.use(
res => {
  return res
  },
  err => {
    // because expired tokens will error as 401
    if (err.response !== 401) {
      throw err
    }
    if (typeof err.response.data.error.name !== 'undefined') {
      // provided by our jwt package
      if (err.response.data.error.name === 'TokenExpiredErr') {
        store.dispatch(logout())
        throw err

      }
    }

  }
)

export default API;
