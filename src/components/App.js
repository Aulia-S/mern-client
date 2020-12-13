import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './Header';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import NotFound from '../pages/Notfound';
import AdminDashboard from '../pages/AdminDashboard';
import UserDashboard from '../pages/UserDashboard';

const App = () => {
  return (
    <Router>
        <Header />

        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/signin'>
            <Signin />
          </Route>
          <Route exact path='/signup'>
            <Signup />
          </Route>
          <Route exact path='/admin/dashboard'>
            <AdminDashboard />
          </Route>
          <Route exact path='/user/dashboard'>
            <UserDashboard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
    </Router>
  )
}

export default App;
