import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './higherOrderComponent/Layout/Layout';
import useScript from './shared/hook/useScript';
import * as actions from './store/actions/index';
import Logout from './containers/Auth/AuthLogout';
import SpinnerCircle from './components/UI/Spinner/SpinnerCircle'
import classes from './App.module.scss'
const Login = React.lazy(() => import('./containers/Auth/Login/Login'));
const SignUp = React.lazy(() => import('./containers/Auth/SignUp/SignUp'));
const Upload = React.lazy(() => import('./containers/Upload/Upload'));
const PersonalInfo = React.lazy(() => import('./containers/PersonalInfo/PersonalInfo'));
const PersonalNote = React.lazy(() => import('./containers/PersonalNote/PersonalNote'));
const VerifyEmail = React.lazy(() => import('./containers/Auth/VerifyEmail/VerifyEmail'));
const UserInfo = React.lazy(() => import('./containers/Auth/UserInfo/UserInfo'));
const App = props => {

  useScript('https://unpkg.com/ionicons@5.1.2/dist/ionicons/ionicons.esm.js', 'module');

  const { onTryAutoSignup } = props;

  useEffect(() => {
    // console.log(process.env.NODE_ENV + " " + process.env.REACT_APP_DEV_SERVICE_URL + " " + process.env.REACT_APP_PRO_SERVICE_URL);
    onTryAutoSignup();
  }, [onTryAutoSignup])



  let routes = (
    <Switch>
      <Route path="/" exact render={(props) => <PersonalInfo {...props} />} />
      <Route path="/algorithm"  key="algorithm" render={(props) => <PersonalNote {...props} />} />
      <Route path="/javascript"  key="javascript" render={(props) => <PersonalNote {...props} />} />
      <Route path="/nodejs"  key="nodejs" render={(props) => <PersonalNote {...props} />} />
      <Route path="/react"  key="react" render={(props) => <PersonalNote {...props} />} />
      <Route path="/login" render={(props) => <Login {...props} />} />
      <Route path="/signup" render={(props) => <SignUp {...props} />} />
      <Route path="/verityEmail/:id" render={(props) => <VerifyEmail {...props} />} />
      {/* toberemoved */}
      <Route path="/upload" render={(props) => <Upload {...props} />} /> 
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact render={(props) => <PersonalInfo {...props} />} />
        <Route path="/algorithm" key="algorithm" render={(props) => <PersonalNote {...props} />} />
        <Route path="/javascript" key="javascript" render={(props) => <PersonalNote {...props} />} />
        <Route path="/nodejs"  key="nodejs" render={(props) => <PersonalNote {...props} />} />
        <Route path="/react"  key="react" render={(props) => <PersonalNote {...props} />} />
        <Route path="/userInfo"  key="userInfo" render={(props) => <UserInfo {...props} />} />
        <Route path="/logout" component={Logout} />
        
        {props.isAdmin ? <Route path="/upload" render={(props) => <Upload {...props} />} /> : null}
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <Layout>
      <Suspense fallback={<div className={classes.main}><SpinnerCircle/></div>}>
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
