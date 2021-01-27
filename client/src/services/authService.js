
import API from './api'

const authService = {
  login: (data) => {
    return API.post(`/login`, data)
      .then(({data}) => {
        API.defaults.herders['Authorization'] = `Bearer ${data.token}`
        return data
      })
      .catch(err => {
        console.log('Auth service err', err)
        throw err
      })
  },

  register: (data) => {

  },

  logout: () => {

  }
}

export default authService