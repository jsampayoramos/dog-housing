import React from 'react';

import LandingPage from './Pages/LandingPage/LandingPage';
import Layout from './components/Layout/Layout';
import { iconLibrary } from './utilities/iconSetup'; 

iconLibrary();

const app = props => {  
  return (
    <Layout>
      <LandingPage />
    </Layout>
  );
}

export default app;
