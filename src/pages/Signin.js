import React, { useState, useEffect } from 'react';
import SigninForm from '../components/SigninForm';
import { showErrMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { signin } from '../api/auth';
import { setAuthentication, isAuthenticated } from '../helpers/auth';
import { useHistory } from 'react-router-dom';


const Signin = () => {
  let history = useHistory();

  useEffect(() => {
    if(isAuthenticated() && isAuthenticated().role === 1 ) {
      history.push('/admin/dashboard');
    }else if(isAuthenticated() && isAuthenticated().role === 0 ) {
      history.push('/user/dashboard');
    }
  }, [history])


  /*******************
   * STATE
   * *****************/
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    errorMsg: false,
    loading: false
  });
  
  const { email, password, errorMsg, loading } = formData;

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
        .then(res => {
          setAuthentication(res.data.token, res.data.user)

          if(isAuthenticated() && isAuthenticated().role === 1 ) {
            console.log('Redirecting to admin dashboard');
            history.push('/admin/dashboard');
          }else {
            console.log('Redirecting to user dashboard')
            history.push('/user/dashboard');
          }
        })
        .catch(err => {
          console.log('signin api function error: ', err)
          setFormData({ 
            ...formData, 
            loading: false,
            errorMsg: err.response.data.errorMessage
          });
        })


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