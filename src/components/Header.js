import React from 'react';
import { Link } from 'react-router-dom';

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
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/signin">Sign in</Link>
            <Link className="nav-link" to="/signup">Sign up</Link>
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

export default Header;