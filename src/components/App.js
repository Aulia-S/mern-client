import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './Header';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import NotFound from '../pages/Notfound';
import AdminDashboard from '../pages/AdminDashboard';
import UserDashboard from '../pages/UserDashboard';
import Admin from '../routes/Admin';
import User from '../routes/User';

const App = () => {
  return (
    <Router>
        <Header />

        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/signup' component={Signup} />
          <Admin exact path='/admin/dashboard' component={AdminDashboard} />
          <User exact path='/user/dashboard' component={UserDashboard} />
          <Route component={NotFound} />
        </Switch>
    </Router>
  )
}

export default App;
