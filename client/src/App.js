import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from './Pages/LandingPage/LandingPage';
import Results from './Pages/Results/Results';
import Layout from './components/Layout/Layout';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Listings from './Pages/Listings/Listings';
import { iconLibrary } from './utilities/iconSetup'; 

iconLibrary();

const app = props => {  
  return (
    <Layout>
      <Switch>
        <Route path='/results' component={Results} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/listings' component={Listings} />
        <Route path='/' component={LandingPage} />
      </Switch>
    </Layout>
  );
}

export default app;
