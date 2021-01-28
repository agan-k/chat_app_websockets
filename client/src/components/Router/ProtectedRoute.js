// Creating a wrapper around reacts Route
import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ component: Component, ...props }) => {

  // tap into the store and check if logged in 
  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn)

  return (
    // spread the props from route and then check if the user is logged in and then direct accordingly
    <Route {...props}
      render={(props) => (
        isLoggedIn
          ? <Component {...props} />
          : <Redirect to='/login' />
      )}
    />
  )
}

export default ProtectedRoute