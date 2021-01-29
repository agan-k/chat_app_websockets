import axios from 'axios'

const API = axios.create({
  baseURL: 'http://127.0.0.1:3001',
  headers: {
    'Accept': 'application/json',
    // If we have our token we'll just pass it here or just an empty string
    "Authorization": `Bearer ${localStorage.getItem('token') || ''}`
  }
})

export default API;
