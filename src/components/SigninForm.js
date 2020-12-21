import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const SigninForm = props => {

  // destructuring state from signup component
  const { email, password} = props.data;

  return (
    <form className="signinform" onSubmit={props.onSubmit} noValidate>

      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text"><i className="fas fa-envelope"></i></span>
        </div>
        <input type="email" className="form-control" placeholder="Email address" name='email' value={email} onChange={props.onChange} />
      </div>

      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text"><i className="fas fa-key"></i></span>
        </div>
        <input type="password" className="form-control" placeholder="Password" name='password' value={password} onChange={props.onChange} />
      </div>

      <button type='submit' className='btn btn-primary btn-block'>Sign in</button>
      <small className='text-center d-block p-2'>Don't have an account? <Link to='/signup' style={{backgroundColor: '#ffffff44'}}>Register here</Link></small>

    </form>
  );
}

export default SigninForm;