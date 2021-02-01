import React, {useState} from "react";
import { Link } from 'react-router-dom'
// import authService from '../../services/authService'
import "./Auth.scss";
import LoginImage from "../../assets/images/undraw_barbecue_3x93.svg";

import {login} from '../../store/actions/auth'
import { useDispatch } from 'react-redux'


const Login = ({history}) => {

  const dispatch = useDispatch()

  const [email, setEmail] = useState('sarah@gmail.com')
  const [password, setPassword] = useState('secret2')

const submitForm = e => {
  e.preventDefault()
  dispatch(login({email, password}, history))
}

  return (
    <div id="auth-container">
      <div id="auth-card">
        <div>
          <div id="image-section">
            <img src={LoginImage} alt="Login image" />
          </div>
          <div id="form-section">
            <h2>Welcome back</h2>

            <form onSubmit={submitForm}>
              <div className="input-field mb-1">
                <input
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  required='required'
                  type="text"
                  placeholder="EMAIL" />
              </div>
              <div className="input-field mb-2">
                <input
                  onChange={e => setPassword(e.target.value)}
                  type="text"
                  placeholder="PASSWORD"
                  value={password}
                  required='required'
                />
              </div>
              <button>Login</button>
            </form>

            <p>don't have an account ? <Link to="/register"> Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
