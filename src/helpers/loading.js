import React from 'react'

const showLoading = () => {
  return (
    <div className='mb-3 text-center'>
      <div className="spinner-grow text-primary mx-1" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-secondary mx-1" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-success mx-1" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-danger mx-1" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-warning mx-1" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-info mx-1" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-light mx-1" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-dark mx-1" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export { showLoading }