import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from '../Login/Login.module.scss';
import * as actions from '../../../store/actions/index';
import SpinnerCircle from '../../../components/UI/Spinner/SpinnerCircle';
import loginImage from '../../../assets/images/programming2.png'
import Aux from '../../../higherOrderComponent/Aux/Aux';

const VerifyEmail = props => {

  // http://localhost:3000/verityEmail/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlhbmhvbmdtYWluQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVmNjAyZmE3ODM5OGU3ZGU3MDUzMDYwMSIsImlhdCI6MTYwMDEzOTE3NX0.4SYZMGP-t2n_HMwK-pHs4odbsxK0x9g4B298M217I0E

  useEffect(() => {
    console.log('verityEmail login component');
    const emailVerificationCode = props.match.params.id;
    props.verifyVerificationCode(emailVerificationCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.id]);

  const [switchToSignup, setSwitchToSignup] = useState(false);
  const [switchToLogin, setSwitchToLogin] = useState(false);
  
  const switchSignup = () => {
    setSwitchToSignup(true);
  }

  const switchLogin = () => {
    setSwitchToLogin(true);
  }

  let errorMessages = null;

  if (props.error) {
    const backEndError = props.error.replace(/_/g, ' ').toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
    errorMessages = <h6>{backEndError}</h6>;
  }

  // redirect
  let redirect = null;
  if(switchToLogin){
    redirect = <Redirect to="/login" />
  }

  if(switchToSignup){
    redirect = <Redirect to="/signup" />
  }

  let mainContent = null

  if (props.loading) {
    mainContent = <SpinnerCircle />
  }

  if (props.verifiedEmail) {
    if (props.emailVerificationStatus) {
      mainContent = (
        <Aux>
          <span style={{ color: '#2a7c99' }}>Thanks! Your email has been successfully verified. Please
          <h4 onClick={switchLogin}>Return to login</h4></span>
        </Aux>
      )
    } else {
      mainContent = (
        <Aux>
          <span style={{ color: '#ef3f61' }}>Opps. Your email verification seems failed, Please
          <h4 onClick={switchLogin}>Return to login </h4>
          and we will send you another verification email, Sorry for the inconvenience.</span>
        </Aux>
      )
    }
  }

  return (
    <div className={classes.login}>
      <div className={classes.login_content}>
        <h2>Verify Email</h2>
        {redirect}
        {errorMessages}
        <form >
          {mainContent}
        </form>
        <span>New here? <p onClick={switchSignup}>Create your account.</p></span>
      </div>
      <div className={classes.login_image}>
        <img src={loginImage} alt="loginImage" />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    authRedirectPath: state.auth.authRedirectPath,
    verifiedEmail: state.auth.verifiedEmail,
    emailVerificationStatus: state.auth.emailVerificationStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    verifyVerificationCode: (emailVerificationCode) => dispatch(actions.verifyVerificationCode(emailVerificationCode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
