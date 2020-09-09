import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './higherOrderComponent/Layout/Layout';
import PersonalInfo from './containers/PersonalInfo/PersonalInfo';
import './App.scss';

const App = props => {
  let routes = (
    <Switch>
      <Route path="/" exact component={PersonalInfo} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
