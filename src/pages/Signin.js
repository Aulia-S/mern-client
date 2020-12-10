import React, { useState } from 'react';
import SigninForm from '../components/SigninForm';
import { showErrMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { signin } from '../api/auth';

const Signin = () => {
  /*******************
   * STATE
   * *****************/
  
  const [formData, setFormData] = useState({
    email: 'abc@gmail.com',
    password: '123456',
    errorMsg: false,
    loading: false,
    redirectToDashboard: false
  });
  
  const { email, password, errorMsg, loading, redirectToDashboard } = formData;

  /*******************
   * EVENT HANDLER
   * *****************/  
  const handleFormChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      successMsg: false,
      errorMsg: false
    })
  }

  const handleSubmitForm = e => {
    e.preventDefault()

    // client side validation
    if(isEmpty(email) || isEmpty(password)){
      setFormData({
        ...formData, errorMsg: 'All fields are required'
      })
    }else if(!isEmail(email)){
      setFormData({
        ...formData, errorMsg: 'Invalid email'
      })
    }else{

      const { email, password } = formData
      const data = { email, password };

      setFormData({ ...formData, loading: true });

      signin(data)

    }    
  }

  
  /*******************
   * RENDER
   * *****************/
  return (
    <div className="container-fluid" id='signin'>
      <div className="row vh-100">
        <div className="col-md-6 mx-auto align-self-center">
          {errorMsg && showErrMsg(errorMsg)}
          {loading && showLoading()}
          <SigninForm onSubmit={handleSubmitForm} data={formData} onChange={handleFormChange} />
          {/* <p className='text-white' style={{overflow : 'auto'}}>{JSON.stringify(formData)}</p> */}
        </div>
      </div>
    </div>
  );
}

export default Signin;