import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Customer from './components/containers/CustomerContainer';
import Vechicle from './components/containers/VechicleContainer';
import Enquiry from './components/containers/EnquiryContainer';
import CustomerDashboardContainer from './components/containers/CustomerDashboardContainer';
import EnquiryDashboardContainer from './components/containers/EnquiryDashboardContainer';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    {/* <Route path='/counter' component={Counter} />
    <Route path='/fetch-data/:startDateIndex?' component={FetchData} /> */}
    <Route path='/customer/:id?' component={Customer} />
    <Route path='/vechicle' component={Vechicle} />
    <Route path='/customerdashboard' component={CustomerDashboardContainer} />
    <Route path='/enquiry/:id?' component={Enquiry} />
    <Route path='/enquirydashboard' component={EnquiryDashboardContainer} />
  </Layout>
);
