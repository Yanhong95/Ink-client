import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './higherOrderComponent/Layout/Layout';
import useScript from './shared/hook/useScript';
import * as actions from './store/actions/index';
import Logout from './containers/Auth/AuthLogout';
const Login = React.lazy(() => import('./containers/Auth/Login/Login'));
const SignUp = React.lazy(() => import('./containers/Auth/SignUp/SignUp'));
const Upload = React.lazy(() => import('./containers/Upload/Upload'));
const PersonalInfo = React.lazy(() => import('./containers/PersonalInfo/PersonalInfo'));
const PersonalDoc = React.lazy(() => import('./containers/PersonalDoc/PersonalDoc'));

const App = props => {

  useScript('https://unpkg.com/ionicons@5.1.2/dist/ionicons/ionicons.esm.js', 'module');

  const { onTryAutoSignup } = props;

  useEffect(() => onTryAutoSignup(), [onTryAutoSignup])

  let routes = (
    <Switch>
      <Route path="/" exact render={(props) => <PersonalInfo {...props} />} />
      <Route path="/algorithm" render={(props) => <PersonalDoc {...props} />} />
      <Route path="/javascript" render={(props) => <PersonalDoc {...props} />} />
      <Route path="/login" render={(props) => <Login {...props} />} />
      <Route path="/signUp" render={(props) => <SignUp {...props} />} />
      <Route path="/verityEmail/:id" render={(props) => <Login {...props} />} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact render={(props) => <PersonalInfo {...props} />} />
        <Route path="/algorithm" render={(props) => <PersonalDoc {...props} />} />
        <Route path="/javascript" render={(props) => <PersonalDoc {...props} />} />
        <Route path="/logout" component={Logout} />
        {props.isAdmin ? <Route path="/upload" render={(props) => <Upload {...props} />} /> : null}
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <Layout>
      <Suspense fallback={<p>Loading</p>}>
        {routes}
      </Suspense>
    </Layout>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    isAdmin: state.auth.isAdmin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
