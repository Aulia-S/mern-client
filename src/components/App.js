import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './Header';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import NotFound from '../pages/Notfound';

const App = () => {
  return (
    <Router>
        <Header />

        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/signin'>
            <Signin />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
    </Router>
  )
}

export default App;
