import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, logout } from '../helpers/auth';

const Header = ({ history }) => {
  // event handler
  const handleLogout = e => {
    logout(() => {
      history.push('/signin');
    });
  }

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
                <Link className="nav-link" to="/"><i class="fas fa-home"></i> Home</Link>
                <Link className="nav-link" to="/signup"><i class="fas fa-edit"></i> Sign up</Link>
                <Link className="nav-link btn btn-outline-primary" to="/signin"><i class="fas fa-sign-in-alt"></i> Sign in</Link>
              </Fragment>
            )}
            {isAuthenticated() && isAuthenticated().role === 0 && (
              <Fragment>
                <Link className="nav-link" to="/user/dashboard"><i class="fas fa-home"></i> Dashboard</Link>
              </Fragment>
            )}
            {isAuthenticated() && isAuthenticated().role === 1 && (
              <Fragment>
                <Link className="nav-link" to="/admin/dashboard"><i class="fas fa-home"></i> Dashboard</Link>
              </Fragment>
            )}
            {isAuthenticated() && (
              <Fragment>
                <button className="btn btn-outline-primary" to="/admin/dashboard" onClick={handleLogout}><i class="fas fa-sign-in-alt"></i> Logout</button>
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