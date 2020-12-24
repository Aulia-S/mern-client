import React, {Fragment, useState, useEffect} from 'react';
import { createCategory, getCategories } from '../api/category';
import isEmpty from 'validator/lib/isEmpty';
import { showErrMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';


const AdminDashboard = () => {
  // STATE
  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    productImage: '',
    productName: '',
    productDesc: '',
    productPrice: '',
    productCategory: '',
    productQty: ''
  });

  const { productImage, productName, productDesc, productPrice, productCategory, productQty  } = productData;

  // LIFECYCLE METHODS
  useEffect(() => {
    loadCategories();
  } ,[loading]);

  const loadCategories = async () => {
    await getCategories()
      .then((res) => {
        setCategories(res.data.categories)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //EVENT HANDLER
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

  const handleProductImage = e => {
    console.log(e.target.files[0]);
    setProductData({
      ...productData,
      [e.target.name]: e.target.files[0]
    })
  }

  const handleProductChange = e => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value
    })
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
                        <label className="text-secondary">Photo</label>
                        <input className="form-control border-0" type="file" id="formFile" name='productImage' onChange={handleProductImage} />
                      </div>

                      <div className="form-group">
                        <label className='text-secondary'>Name</label>
                        <input type="text" className='form-control' name='productName' value={productName} onChange={handleProductChange} />
                      </div>

                      <div className="form-group">
                        <label className="text-secondary">Description</label>
                        <textarea className="form-control" rows="3" name='productDesc' value={productDesc} onChange={handleProductChange}></textarea>
                      </div>

                      <div className="form-group">
                        <label className='text-secondary'>Price</label>
                        <input type="text" className='form-control' name='productPrice' value={productPrice} onChange={handleProductChange} />
                      </div>

                      <div className='form-row'>
                        <div className='form-group col-md'>
                          <label className='text-secondary'>Category</label>
                          <select className='custom-select' name='productCategory' onChange={handleProductChange}>
                            <option value=''>Choose one..</option>
                            {categories && categories.map(c => {
                              return(
                                <option key={c._id} value={c._id}>{c.category}</option>
                              )
                            })}
                          </select>
                        </div>

                        <div className='form-group col-md'>
                          <label className='text-secondary'>Quantity</label>
                          <input type="number" className='form-control' min='0' max='1000' name='productQty' value={productQty} onChange={handleProductChange} />
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
      {JSON.stringify(productData )}
      {showHeader()}
      {showActionBtns()}
      {showCategoryModal()}
      {showFoodModal()}
    </section>
  )
}

export default AdminDashboard;