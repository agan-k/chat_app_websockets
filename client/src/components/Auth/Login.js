import React from "react";
import {Link} from 'react-router-dom'
import "./Auth.scss";
import LoginImage from "../../assets/images/undraw_barbecue_3x93.svg";

const Login = () => {
  return (
    <div id="auth-container">
      <div id="auth-card">
        <div>
          <div id="image-section">
            <img src={LoginImage} alt="Login image" />
          </div>
          <div id="form-section">
            <h2>Welcome back</h2>

            <form action="">
              <div className="input-field mb-1">
                <input type="text" placeholder="EMAIL" />
              </div>
              <div className="input-field mb-2">
                <input type="text" placeholder="PASSWORD" />
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
