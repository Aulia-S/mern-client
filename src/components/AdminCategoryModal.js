import React, { useState, Fragment } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import { showErrMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { clearMessages } from '../redux/actions/messageActions';
import { createCategory } from '../redux/actions/categoryActions';

const AdminCategoryModal = () => {
  /*****************
   * REDUX STATE
   * ***************/   
  const { successMsg, errorMsg } = useSelector(state => state.messages);
  const { loading } = useSelector(state =>  state.loading);

  const dispatch = useDispatch();
  /*****************
   * STATE
   * ***************/ 
  const [category, setCategory] = useState('');
  const [clientSideErrorMsg, setClientSideErrorMsg] = useState();

  /*****************
   * EVENT HANDLER
   * ***************/ 
  const handleMessages = e => {
    dispatch(clearMessages());
  }

  const handleCategoryChange = e => {
    dispatch(clearMessages());
    setCategory(e.target.value)
  }

  const handleCategorySubmit = e => {
    e.preventDefault();

    if(isEmpty(category)){
      setClientSideErrorMsg('Please enter a category')
    }else{
      const data = { category }
      dispatch(createCategory(data));
      setCategory('');        
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
                {clientSideErrorMsg && showErrMsg(clientSideErrorMsg)}
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