import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated } from '../helpers/auth';

const Header = () => {

  //view
  const showNavigation = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">Mern-app</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto">
            {!isAuthenticated() && (
              <Fragment>
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/signin">Sign in</Link>
                <Link className="nav-link" to="/signup">Sign up</Link>
              </Fragment>
            )}
            {isAuthenticated() && isAuthenticated().role === 0 && (
              <Fragment>
                <Link className="nav-link" to="/user/dashboard">Dashboard</Link>
              </Fragment>
            )}
            {isAuthenticated() && isAuthenticated().role === 1 && (
              <Fragment>
                <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
              </Fragment>
            )}
            {isAuthenticated() && (
              <Fragment>
                <Link className="nav-link" to="/admin/dashboard">Logout</Link>
              </Fragment>
            )}
          </div>
        </div>
      </nav>
    )
  }

  //render
  return (
    <header>
      {showNavigation()}
    </header>
  )

}

export default withRouter(Header);