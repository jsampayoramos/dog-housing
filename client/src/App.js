import React, { useDebugValue } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LandingPage from './Pages/LandingPage/LandingPage';
import Results from './Pages/Results/Results';
import Layout from './components/Layout/Layout';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Listings from './Pages/Listings/Listings';
import NewProperty from './Pages/NewProperty/NewProperty';
import ErrorModal from './components/ErrorModal/ErrorModal';
import Spinner from './components/UI/Spinner/Spinner';
import { iconLibrary } from './utilities/iconSetup'; 

iconLibrary();

const App = props => {
  const error = useSelector(state => state.error);
  const loading = useSelector(state => state.loading);

  return (
    <Layout>
      <Switch>
        <Route path='/results' component={Results} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/listings/newproperty' component={NewProperty} />
        <Route path='/listings' component={Listings} />
        <Route path='/' component={LandingPage} />
      </Switch>
      {error.status ? <ErrorModal message={error.message}/> : null}
      {loading ? <Spinner /> : null}
    </Layout>
  );
}

export default App;
