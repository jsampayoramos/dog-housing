import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LandingPage from './Pages/LandingPage/LandingPage';
import Results from './Pages/Results/Results';
import Layout from './components/Layout/Layout';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Listings from './Pages/Listings/Listings';
import NewProperty from './Pages/NewProperty/NewProperty';
import ErrorModal from './components/ErrorModal/ErrorModal';
import Spinner from './components/UI/Spinner/Spinner';
import Dashboard from './Pages/Dashboard/Dashboard';
import { iconLibrary } from './utilities/iconSetup';
import * as authActions from './store/actions/authActions';

iconLibrary();

const App = props => {
  const error = useSelector(state => state.error);
  const loading = useSelector(state => state.loading);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.autoLogin());
  }, [dispatch]);

  let authComponents = (
    <React.Fragment>
      <Route exact path='/listings/newproperty' component={NewProperty} />
      <Route exact path='/listings/newproperty/:id' component={NewProperty} />
      <Route path='/dashboard' component={Dashboard} />
      <Route exact path='/listings' component={Listings} />
    </React.Fragment>
  );

  if(!token) {
    authComponents = null;
  };

  return (
    <Layout>
      <Switch>
        <Route path='/results' component={Results} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        {authComponents}
        <Route path='/' component={LandingPage} />
      </Switch>
      {error.status ? <ErrorModal message={error.message}/> : null}
      {loading ? <Spinner /> : null}
    </Layout>
  );
}

export default App;
