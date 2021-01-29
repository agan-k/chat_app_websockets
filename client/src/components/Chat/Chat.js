import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import {fetchChats} from '../../store/actions/chat'
import Navbar from './components/Navbar/Navbar'

const Chat = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.authReducer.user)

  useEffect(() => {
    dispatch(fetchChats()).then(res => console.log(res).catch(err => console.log(err)))
  }, [dispatch])

  console.log(user)
  return (
    <div>
      <Navbar/>
    </div>
  )
  
};

export default Chat;
