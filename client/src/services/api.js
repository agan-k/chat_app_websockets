import axios from 'axios'

const API = axios.create({
  baseURL: 'http://127.0.0.1:3001',
  headers: {
    'Accept': 'application/json',
  }
})

export default API;
