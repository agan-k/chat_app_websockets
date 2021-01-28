import React from "react";
import {useSelector} from 'react-redux'

const Chat = () => {

  const user = useSelector(state => state.authReducer.user)
  console.log(user)
  return (
    <div>
      <h1>Welcome</h1>
      <p>{user.user.firstName}</p>
    </div>
  )
  
};

export default Chat;
