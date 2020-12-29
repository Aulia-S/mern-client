import React, { useState, Fragment } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import { createCategory } from '../api/category';
import { showErrMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';

const AdminCategoryModal = () => {
  /*****************
   * STATE
   * ***************/ 
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);


  /*****************
   * EVENT HANDLER
   * ***************/ 
  const handleMessages = e => {
    setErrorMsg('');
    setSuccessMsg('');
  }

  const handleCategoryChange = e => {
    setErrorMsg('');
    setSuccessMsg('');
    setCategory(e.target.value)
  }

  const handleCategorySubmit = e => {
    e.preventDefault();

    if(isEmpty(category)){
      setErrorMsg('Please enter a category')
    }else{
      const data = { category }

      setLoading(true)
      createCategory(data)
        .then(res => {
          setLoading(false);
          setSuccessMsg(res.data.successMessage);
          setCategory('');
        })
        .catch(err => {
          setLoading(false);
          setErrorMsg(err.response.data.errorMessage);
        })
    }
  }

  /*****************
   * RENDER
   * ***************/
  return (
    <div id="addCategoryModal" className='modal' onClick={handleMessages}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <form onSubmit={handleCategorySubmit}>
            <div className="modal-header bg-info text-white">
              <h5 className='modal-title'>Add Category</h5>
              <button className='close' data-dismiss='modal'>
                <span><i className='fas fa-times'></i></span>
              </button>
            </div>
            <div className="modal-body my-2">
                {errorMsg && showErrMsg(errorMsg)}
                {successMsg && showSuccessMsg(successMsg)}
                {
                  loading ? (
                    showLoading()
                  ) : (
                    <Fragment>
                      <label htmlFor="category" className='text-secondary'>Category</label>
                      <input type="text" className='form-control' id='category' onChange={handleCategoryChange} name='category' value={category} />
                    </Fragment>
                  )
                }
            </div>
            <div className="modal-footer">
              <button className='btn btn-secondary' data-dismiss='modal'>Close</button>
              <button type='submit' className='btn btn-info'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


  export default AdminCategoryModal;