import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Customer from './components/containers/CustomerContainer';
import Vechicle from './components/containers/VechicleContainer';
import Variant from './components/containers/VariantContainer';
import Enquiry from './components/containers/EnquiryContainer';
import DailyReport from './components/containers/DailyReportContainer';
import CustomerDashboardContainer from './components/containers/CustomerDashboardContainer';
import EnquiryDashboardContainer from './components/containers/EnquiryDashboardContainer';
import VechicleDashboardContainer from './components/containers/VechicleDashboardContainer';
import VariantDashboardContainer from './components/containers/VariantDashboardContainer';
import DailyReportDashboardContainer from './components/containers/DailyReportDashboardContainer';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    {/* <Route path='/counter' component={Counter} />
    <Route path='/fetch-data/:startDateIndex?' component={FetchData} /> */}
    <Route path='/customer/:id?' component={Customer} />
    <Route path='/vechicle/:id?' component={Vechicle} />
    <Route path='/variant/:id?' component={Variant} />
    <Route path='/dailyreport/:id?' component={DailyReport} />
    <Route path='/enquiry/:id?' component={Enquiry} />
    <Route path='/customerdashboard' component={CustomerDashboardContainer} />
    <Route path='/vechicledashboard' component={VechicleDashboardContainer} />
    <Route path='/variantdashboard' component={VariantDashboardContainer} />
    <Route path='/dailyreportdashboard' component={DailyReportDashboardContainer} />
    <Route path='/enquirydashboard' component={EnquiryDashboardContainer} />
  </Layout>
);
