import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../helpers/auth';

const User = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
          isAuthenticated() && isAuthenticated().role === 0 
          ? <Component {...props} /> 
          : <Redirect to='/signin' />
    )} />
  );
};

export default User;