
import API from './api'

const authService = {
  login: (data) => {
    return API.post(`/login`, data)
      .then(({data}) => {
        setHeadersAndStorage(data)
        return data
      })
      .catch(err => {
        console.log('Auth service err', err)
        throw err
      })
  },

  register: (data) => {
    return API.post('/register', data)
      .then(({ data }) => {
        setHeadersAndStorage(data)
        return data
      })
      .catch(err => {
        console.log("Auth service err", err)
        throw err
    })
  },

  logout: () => {
    API.defaults.headers['Authorization'] = ''
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  },

  updateProfile: (data) => {
    // We need to change the headers since we're using form data now and not just the json body
    const headers = {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }
    return API.post('/users/update', data, headers)
      .then(({ data }) => {
        localStorage.setItem('user', JSON.stringify(data))
        return data
      })
      .catch(err => {
        console.log("Auth service err", err)
        throw err
    })
  },
}

// setting local storage for persistent login
const setHeadersAndStorage = ({ user, token }) => {
  API.defaults.headers['Authorization'] = `Bearer ${token}`
  // You cannot set plane objects in local storage so we need to stringify the user
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)
}

export default authService