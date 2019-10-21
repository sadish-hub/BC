import React from 'react';
import { connect } from 'react-redux';

const Home = props => (
  <div>
    <h1>Hello Bright Choice!</h1>
    <p>Welcome to your new vechicle management tool</p>
  </div>
);

export default connect()(Home);
