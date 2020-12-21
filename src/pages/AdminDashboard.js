import React, {Fragment, useState, useEffect} from 'react';
import { createCategory, getCategories } from '../api/category';
import isEmpty from 'validator/lib/isEmpty';
import { showErrMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';


const AdminDashboard = () => {
  // STATE
  const [categories, setCategories] = useState(null);
  const [category, setCatogry] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // LIFECYCLE METHODS
  useEffect(() => {
    loadCategories();
  } ,[]);

  const loadCategories = async () => {
    await getCategories()
  }

  //EVENT HANDLER
  const handleMessages = e => {
    setErrorMsg('');
    setSuccessMsg('');
  }

  const handleCategoryChange = e => {
    setErrorMsg('');
    setSuccessMsg('');
    setCatogry(e.target.value)
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
          setCatogry('');
        })
        .catch(err => {
          setLoading(false);
          setErrorMsg(err.response.data.errorMessage);
        })
    }
  }

  //VIEWS
  const showHeader = () => (
    <div className=" bg-secondary text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1><i className='fas fa-home'> Dashboard</i></h1>
          </div>
        </div>
      </div> 
    </div>
  )

  const showActionBtns = () => (
    <div>
      <div className="container">
        <div className="row  py-2">
          <div className="col mb-2">
            <button className='btn btn-outline-info btn-block' data-toggle='modal' data-target='#addCategoryModal'>
              <i className='fas fa-plus'> Add Category</i>
            </button>
          </div>
          <div className="col-md mb-2">
            <button className='btn btn-outline-info btn-block' data-toggle='modal' data-target='#addFoodModal'>
              <i className='fas fa-plus'> Add Food</i>
            </button>
          </div>
          <div className="col mb-2">
            <button className='btn btn-outline-info btn-block'>
              <i className="fas fa-money-check-alt"> View Orders</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const showCategoryModal = () => (
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
                      <label for="category" className='text-secondary'>Category</label>
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

  const showFoodModal = () => (
    <div id="addFoodModal" className='modal' onClick={handleMessages}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <form onSubmit={handleCategorySubmit}>
            <div className="modal-header bg-info text-white">
              <h5 className='modal-title'>Add Food</h5>
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
                      <div className='mb-3' >
                        <label class="text-secondary">Photo</label>
                        <input class="form-control border-0" type="file" id="formFile" />
                      </div>

                      <div class="form-group">
                        <label className='text-secondary'>Name</label>
                        <input type="text" className='form-control' />
                      </div>

                      <div class="form-group">
                        <label className="text-secondary">Example textarea</label>
                        <textarea class="form-control" rows="3"></textarea>
                      </div>

                      <div class="form-group">
                        <label className='text-secondary'>Price</label>
                        <input type="text" className='form-control' />
                      </div>

                      <div className='form-row'>
                        <div className='form-group col-md'>
                          <label className='text-secondary'>Category</label>
                          <select className='custom-select'>
                            <option>Choose one..</option>
                            <option>Pasta</option>
                            <option>Desserts</option>
                            <option>Drinks</option>
                          </select>
                        </div>

                        <div className='form-group col-md'>
                          <label className='text-secondary'>Quantity</label>
                          <input type="number" className='form-control' min='0' max='1000' />
                        </div>
                      </div>
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

  //RENDERER
  return(
    <section>
      {showHeader()}
      {showActionBtns()}
      {showCategoryModal()}
      {showFoodModal()}
    </section>
  )
}

export default AdminDashboard;