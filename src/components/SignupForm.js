import React from 'react';
import { Link } from 'react-router-dom';
import './SignupForm.css';

const SignupForm = props => {

  // destructuring state from signup component
  const { username, email, password, password2} = props.data;

  return (
    <form className="signupform" onSubmit={props.onSubmit} noValidate>

      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text"><i className="fas fa-user"></i></span>
        </div>
        <input type="text" className="form-control" placeholder="Username" name='username' value={username} onChange={props.onChange} />
      </div>

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
        <input type="password" className="form-control" placeholder="Create password" name='password' value={password} onChange={props.onChange} />
      </div>

      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text"><i className="fas fa-key"></i></span>
        </div>
        <input type="password" className="form-control" placeholder="Confirm password" name='password2' value={password2} onChange={props.onChange} />
      </div>

      <button type='submit' className='btn btn-primary btn-block'>Sign up</button>
      <small className='text-center d-block p-2 text-white'>Have an account? <Link to='/signin' style={{backgroundColor: '#ffffff44'}}>Sign in</Link></small>

    </form>
  );
}

export default SignupForm;