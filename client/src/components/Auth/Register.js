import React from 'react'
import {Link} from 'react-router-dom'
import "./Auth.scss";
import LoginImage from "../../assets/images/undraw_barbecue_3x93.svg";

const Register = () => {
  return (
    <div id="auth-container">
    <div id="auth-card">
      <div>
        <div id="image-section">
          <img src={LoginImage} alt="Login image" />
        </div>
        <div id="form-section">
          <h2>Create an account</h2>

          <form>
            <div className="input-field mb-2">
              <input type="text" placeholder="FIRST NAME" />
            </div>
            <div className="input-field mb-2">
              <input type="text" placeholder="LAST NAME" />
            </div>
            <div className="input-field mb-1">
              <input type="text" placeholder="EMAIL" />
            </div>
            <div className="input-field mb-2">
                <select>
                  <option value="male">MALE</option>
                  <option value="female">FEMALE</option>
                  <option value="other">OTHER</option>
            </select>
            </div>
            <div className="input-field mb-2">
              <input type="text" placeholder="PASSWORD" />
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
