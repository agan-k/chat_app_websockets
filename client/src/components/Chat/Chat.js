import React from "react";
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar/Navbar'

const Chat = () => {

  const user = useSelector(state => state.authReducer.user)
  console.log(user)
  return (
    <div>
      <Navbar/>
    </div>
  )
  
};

export default Chat;
