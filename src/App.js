import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './higherOrderComponent/Layout/Layout';
import PersonalInfo from './containers/PersonalInfo/PersonalInfo';
import classes from './App.scss';
import useScript from './shared/hook/useScript';

const App = props => {
  useScript('https://unpkg.com/ionicons@5.1.2/dist/ionicons/ionicons.esm.js', 'module');

  let routes = (
    <Switch>
      <Route path="/" exact component={PersonalInfo} />
      <Redirect to="/" />
    </Switch>
  );
  return (
    <Layout>
      <Suspense fallback={<p>Loading</p>}>
        {routes}
      </Suspense>
    </Layout>
  );
}

export default App;
