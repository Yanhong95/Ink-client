import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './Login.module.scss';
import { loginFormData } from '../AuthFormData'
import { updateObject } from '../../../shared/utility';
import { checkValidity } from '../../../shared/validation/inputValidation'
import * as actions from '../../../store/actions/index';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import loginImage from '../../../assets/images/programming2.png'
import Aux from '../../../higherOrderComponent/Aux/Aux';

const Login = props => {

  // http://localhost:3000/verityEmail/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlhbmhvbmdtYWluQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVmNjAyZmE3ODM5OGU3ZGU3MDUzMDYwMSIsImlhdCI6MTYwMDEzOTE3NX0.4SYZMGP-t2n_HMwK-pHs4odbsxK0x9g4B298M217I0E
  // console.log(props.location); 
  // console.log(props.match.params.id);
  console.log(props.emailVerificationStatus);
  console.log(props.verifiedEmail);
  const path = props.location.pathname.split("/")[1];
  if(!props.verifiedEmail && path === "verityEmail" && props.emailVerificationStatus === null){
    console.log('verityEmail login component');
    const emailVerificationCode = props.match.params.id;
    props.verifyVerificationCode(emailVerificationCode);
  }

  const [loginForm, setLoginForm] = useState(loginFormData);
  const [switchToSignup, setSwitchToSignup] = useState(false);
  const [message, setMessage] = useState(null);



  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(loginForm, {
      [controlName]: updateObject(loginForm[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, loginForm[controlName].validation).isValid,
        errorMessage: checkValidity(event.target.value, loginForm[controlName].validation).errorMessage,
        touched: true
      })
    });
    setLoginForm(updatedControls);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.authLogin(loginForm.email.value, loginForm.password.value);
  }

  const SwitchAuthModeHandler = () => {
    setSwitchToSignup(true);
  }

  const formElementsArray = [];
  for (let key in loginForm) {
    formElementsArray.push({
      id: key,
      config: loginForm[key]
    });
  }

  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      lable={formElement.config.elementConfig.placeholder}
      changed={(event) => inputChangedHandler(event, formElement.id)} />
  ));

  let errorMessages = null;
  let disabled = true;

  // use Array.prototype.some to test if there exists at least one element that have errorMessage. 
  // It will stop looping when some element that matches your function is found:
  Object.values(loginForm).some(input => { 
    errorMessages = input.errorMessage ? <h6>{input.errorMessage}</h6> : null;
    disabled = input.valid && disabled;
    return input.errorMessage;
  });

  if (message) {
    errorMessages = <h6>{message}</h6>;
  }
  
  if (props.error) {
    const backEndError = props.error.replace(/_/g, ' ').toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
    errorMessages = <h6>{backEndError}</h6>;
  }

  let redirect = null;
  if (switchToSignup) {
    redirect = <Redirect to="/signup" />
  }

  if (props.isAuthenticated) {
    redirect = <Redirect to={props.authRedirectPath} />
  }

  let mainContent = (
    <Aux>
      {form}
      <Button btnType="Success" disabled={!disabled}>SUBMIT</ Button>
    </Aux>
  )

  if (props.loading) {
    mainContent = <Spinner />
  }

  if(props.verifiedEmail){
    if(props.emailVerificationStatus){
      mainContent = (
        <Aux>
          <span style={{color:'#2a7c99'}}>Thanks! Your email has been successfully verified. Please
          <h4 onClick={props.returnLogin}>Return to login</h4></span>
        </Aux>
      )
    }else{
      mainContent = (
        <Aux>
          <span style={{color:'#ef3f61'}}>Opps. Your email verification seems failed, Please
          <h4 onClick={props.returnLogin}>Return to login </h4>
          and we will send you another verification email, Sorry for the inconvenience.</span>
        </Aux>
      )
    }
  }

  if(!props.verifiedEmail){
    redirect = <Redirect to="/login" />
  }


  return (
    <div className={classes.login}>
      <div className={classes.login_content}>
        {props.emailVerificationStatus?  <h2>Verify Email</h2> : <h2>Login</h2>}
        {redirect}
        {errorMessages}
        <form onSubmit={submitHandler}>
          {mainContent}
        </form>
        <span>New here? <p onClick={SwitchAuthModeHandler}>Create your account.</p></span>
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
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    verifiedEmail: state.auth.verifiedEmail,
    emailVerificationStatus: state.auth.emailVerificationStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    returnLogin: () => dispatch(actions.returnLogin()),
    verifyVerificationCode: (emailVerificationCode) => dispatch(actions.verifyVerificationCode(emailVerificationCode)),
    authLogin: (email, password) => dispatch(actions.authLogin(email, password)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
