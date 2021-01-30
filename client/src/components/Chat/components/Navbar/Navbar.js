import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from "../../../../store/actions/auth";
import Modal from "../../../Modal/Modal";
import {updateProfile} from '../../../../store/actions/auth'
import "./Navbar.scss";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const submitForm = (e) => {
    e.preventDefault();

    const form = { firstName, lastName, email, gender, avatar }

    // To safeguard when no password is sent to be updated to it uses the initialized state from the hook
    if (password.length > 0) form.password = password
    
    // The formData API helps us with the upload of the image
    const formData = new FormData()

    // looping over the form object
    for (const key in form) {
      // FormData allows us to create these key value pairs
      formData.append(key, form[key])
    }
    // Calling then to close the modal after successful submit
    dispatch(updateProfile(formData)).then(() => setShowProfileModal(false))
  };

  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <div className="navbar shadow-light">
      <h2 className="hover">Chatty</h2>
      <div
        onClick={() => setShowProfileOptions(!showProfileOptions)}
        className="profile-menu"
      >
        <div className="profile-menu__image hover">
          <img src={user.avatar} alt="Avatar" />
          </div>
        <p className="hover">
          {user.firstName} {user.lastName}
        </p>
        <FontAwesomeIcon icon="caret-down" className={showProfileOptions ? "fa-icon fa-icon--open" : "fa-icon hover" }/>

        {showProfileOptions && (
          <div className="profile-options">
            <p onClick={() => setShowProfileModal(true)}>Profile</p>
            <p onClick={() => dispatch(logout())}>Logout</p>
          </div>
        )}
        {showProfileModal && (
          <Modal click={() => setShowProfileModal(false)}>
            <Fragment key="header">
              <h3 className="m-0">Update Profile</h3>
            </Fragment>
            <Fragment key="body">
              <form action="">
                <div className="input-field mb-2">
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required="required"
                    placeholder="FIRST NAME"
                    type="text"
                  />
                </div>
                <div className="input-field mb-2">
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required="required"
                    type="text"
                    placeholder="LAST NAME"
                  />
                </div>
                <div className="input-field mb-1">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required="required"
                    type="text"
                    placeholder="EMAIL"
                  />
                </div>
                <div className="input-field mb-2">
                  <select
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                    required="required"
                  >
                    <option value="male">MALE</option>
                    <option value="female">FEMALE</option>
                    <option value="other">OTHER</option>
                  </select>
                </div>
                <div className="input-field mb-2">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required="required"
                    type="text"
                    placeholder="PASSWORD"
                  />
                </div>
                <div className="input-field mb-2">
                  <input
                    onChange={(e) => setAvatar(e.target.files[0])}
                    type="file"
                  />
                </div>
              </form>
            </Fragment>
            <Fragment key="footer">
              <button onClick={submitForm} className="btn-success hover">Update</button>
            </Fragment>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Navbar;
