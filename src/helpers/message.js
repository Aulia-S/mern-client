import React from 'react';

const showErrMsg = msg => {
  return (
    <div class="alert alert-danger" role="alert">
      {msg}
    </div>
  )
}

const showSuccessMsg = msg => {
  return (
    <div class="alert alert-success" role="alert">
      {msg}
    </div>
  )
}

export { showErrMsg, showSuccessMsg };