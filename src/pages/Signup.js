import React, {useState} from 'react';
import SignupForm from '../components/SignupForm';
import '../components/App.css';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';
import { showErrMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import { signup } from '../api/auth';

const Signup = () => {
  /*******************
   * STATE
   * *****************/
  
  const [formData, setFormData] = useState({
    username: 'abc',
    email: 'abc@gmail.com',
    password: '123456',
    password2: '123456',
    successMsg: false,
    errorMsg: false,
    loading: false
  });

  const { username, email, password, password2, successMsg, errorMsg, loading} = formData;


  /*******************
   * EVENT HANDLER
   * *****************/

  const handleFormChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      errorMsg: false
    })
  }

  const handleSubmitForm = e => {
    e.preventDefault()

    // client side validation
    if(isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(password)){
      setFormData({
        ...formData, errorMsg: 'All fields are required'
      })
    }else if(!isEmail(email)){
      setFormData({
        ...formData, errorMsg: 'Invalid email'
      })
    }else if(!equals(password, password2)){
      setFormData({
        ...formData, errorMsg: 'Password do not match'
      })
    }else{
      // // SUCCESS
      // setFormData({
      //   ...formData, successMsg: 'Validation Success'
      // })

      const { username, email, password } = formData
      const data = { username, email, password };

      setFormData({ ...formData, loading: true });

      signup(data)
        .then(res => {
          console.log('Axios signup success', res);
          setFormData({ 
            ...formData,
            username: '',
            email: '',
            password: '',
            password2: '',
            loading: '',
            successMsg: res.data.successMessage
          });
        })
        .catch(err => {
          console.log('Axios signup error', err);
          setFormData({ ...formData, loading: false, errorMsg: err.response.data.errorMessage });
        })

    }

  }

  /*******************
   * RENDER
   * *****************/  
  return (
    <div className="container-fluid" id='signup'>
      <div className="row vh-100">
        <div className="col-md-6 mx-auto align-self-center">
          {successMsg && showSuccessMsg(successMsg)}
          {errorMsg && showErrMsg(errorMsg)}
          {loading && showLoading()}
          <SignupForm onSubmit={handleSubmitForm} data={formData} onChange={handleFormChange} />
          {/* <p className='text-white' style={{overflow : 'auto'}}>{JSON.stringify(formData)}</p> */}
        </div>
      </div>
    </div>
  );
}

export default Signup;