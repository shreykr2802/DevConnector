import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing'
import Register from './components/auth/Register';
import Login from './components/auth/Login'
import Dashboard from './components/dasboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';
import Alert from './components/layout/Alert';

// Redux 
import { Provider } from 'react-redux';
import store from './store/store';

import setAuthToken from './utils/setAuthToken';
import { loadUser } from './store/actions/auth';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}

const App = () => {

  useEffect(()=> store.dispatch(loadUser()), []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route path="/" exact component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
