import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './AuthLogin.module.scss';
import { loginFormData } from './AuthFormData'
import { updateObject } from '../../shared/utility';
import { checkValidity } from '../../shared/validation/inputValidation'
import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import loginImage from '../../assets/images/programming2.png'
// import Aux from '../../higherOrderComponent/Aux/Aux';

const AuthLogin = props => {

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
    if (loginForm.password.value !== loginForm.confirmPassword.value) {
      setMessage('Your password and confirmation password do not match. Please try again');
      return;
    }
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
  
  if (props.error) {
    setMessage(props.error.message.replace(/_/g, ' ').toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase()));
    errorMessages = <h6>{message}</h6>;
  }

  if (message) {
    errorMessages = <h6>{message}</h6>;
  }


  let redirect = null;
  if (switchToSignup) {
    redirect = <Redirect to="/signup" />
  }

  if (props.isAuthenticated) {
    redirect = <Redirect to={props.authRedirectPath} />
  }


  if (props.loading) {
    form = <Spinner />
  }


  return (
    <div className={classes.login}>
      <div className={classes.login_content}>
        <h2>Login</h2>
        {redirect}
        {errorMessages}
        <form onSubmit={submitHandler}>
          {form}
          <Button btnType="Success" disabled={!disabled}>SUBMIT</Button>
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
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authLogin: (email, password) => dispatch(actions.authLogin(email, password)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLogin);
