import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import {register} from '../../store/actions/auth'

import "./Auth.scss";
import LoginImage from "../../assets/images/undraw_barbecue_3x93.svg";

const Register = ({history}) => {

  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('female')
  const [password, setPassword] = useState('')

  const submitForm = e => {
    e.preventDefault()
    dispatch(register({firstName, lastName, email, gender, password}, history))
  }
  

  return (
    <div id="auth-container">
    <div id="auth-card">
      <div>
        <div id="image-section">
          <img src={LoginImage} alt="Login image" />
        </div>
        <div id="form-section">
          <h2>Create an account</h2>

          <form onSubmit={submitForm}>
            <div className="input-field mb-2">
                <input
                  onChange={e => setFirstName(e.target.value)}
                  value={firstName}
                  required='required'
                  placeholder="FIRST NAME"
                  type="text"
                  />
            </div>
            <div className="input-field mb-2">
                <input
                  onChange={e => setLastName(e.target.value)}
                  value={lastName}
                  required='required'
                  type="text"
                  placeholder="LAST NAME" 
                  />
            </div>
            <div className="input-field mb-1">
                <input
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  required='required'
                  type="text"
                  placeholder="EMAIL" />
            </div>
            <div className="input-field mb-2">
                <select
                onChange={e => setGender(e.target.value)}
                value={gender}
                required='required'
                >
                  <option value="male">MALE</option>
                  <option value="female">FEMALE</option>
                  <option value="other">OTHER</option>
            </select>
            </div>
            <div className="input-field mb-2">
                <input
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  required='required'
                  type="text"
                  placeholder="PASSWORD" />
            </div>
            <button>Register</button>
          </form>

          <p>Already have an account? <Link to="/login"> Login</Link></p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Register
