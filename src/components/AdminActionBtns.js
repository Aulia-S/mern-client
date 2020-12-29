import React from 'react';

const AdminActionBtns = () => (
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

  export default AdminActionBtns;