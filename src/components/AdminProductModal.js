import React, { Fragment, useState, useEffect } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import { createProduct } from '../api/product';
import { getCategories } from '../api/category';
import { showErrMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';

const AdminProductModal = () => {
  /*****************
   * STATE
   * ***************/
  const [categories, setCategories] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    productImage: null,
    productName: '',
    productDesc: '',
    productPrice: '',
    productCategory: '',
    productQty: ''
  });

  const { productImage, productName, productDesc, productPrice, productCategory, productQty  } = productData;

  /*********************
   * LIFECYCLE METHODS
   * *******************/
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

  /*****************
   * EVENT HANDLER
   * ***************/
  const handleMessages = e => {
    setErrorMsg('');
    setSuccessMsg('');
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

  const handleProductSubmit = e => {
    e.preventDefault()

    //validation product data
    if (productImage === null) {
      setErrorMsg('Please select an image');
    }else if(isEmpty(productName) || isEmpty(productDesc) || isEmpty(productPrice)){
      setErrorMsg('All fields are required');
    }else if(isEmpty(productCategory)){
      setErrorMsg('Please select a category');
    }else if(isEmpty(productQty)){
      setErrorMsg('Please input a quantity')
    }else {
      // success
      let formData = new FormData();

      formData.append('productImage', productImage);
      formData.append('productName', productName);
      formData.append('productDesc', productDesc);
      formData.append('productPrice', productPrice);
      formData.append('productCategory', productCategory);
      formData.append('productQty', productQty);

      setLoading(true);
      createProduct(formData)
        .then(res => {
          setLoading(false);
          setProductData({
            productImage: null,
            productName: '',
            productDesc: '',
            productPrice: '',
            productCategory: '',
            productQty: ''
          });

          setSuccessMsg(res.data.successMessage);
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
          setErrorMsg(err.response.data.errorMessage);
        })
    }
  }

  /*****************
   * RENDER
   * ***************/
  return (
    <div id="addFoodModal" className='modal' onClick={handleMessages}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <form onSubmit={handleProductSubmit}>
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
                        <input type="number" className='form-control' name='productPrice' value={productPrice} onChange={handleProductChange} />
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
}

export default AdminProductModal;