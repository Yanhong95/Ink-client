import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './SignUp.module.scss';
import { signUpFormData } from '../AuthFormData'
import { updateObject } from '../../../shared/utility';
import { checkValidity } from '../../../shared/validation/inputValidation'
import * as actions from '../../../store/actions/index';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import signUpImage from '../../../assets/images/programming1.png'
import Aux from '../../../higherOrderComponent/Aux/Aux';

const AuthSignUp = props => {

  const [signUpForm, setSignUpForm] = useState(signUpFormData);
  const [switchToLogin, setSwitchToLogin] = useState(false);
  const [message, setMessage] = useState(null);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(signUpForm, {
      [controlName]: updateObject(signUpForm[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, signUpForm[controlName].validation).isValid,
        errorMessage: checkValidity(event.target.value, signUpForm[controlName].validation).errorMessage,
        touched: true
      })
    });
    setSignUpForm(updatedControls);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (signUpForm.password.value !== signUpForm.confirmPassword.value) {
      setMessage('Your password and confirmation password do not match. Please try again');
      return;
    }else{
      setMessage(null);
    }
    props.authSignUp(signUpForm.email.value, signUpForm.password.value, signUpForm.firstName.value, signUpForm.lastName.value);
  }

  const SwitchAuthModeHandler = () => {
    setSwitchToLogin(true);
  }

  const formElementsArray = [];
  for (let key in signUpForm) {
    formElementsArray.push({
      id: key,
      config: signUpForm[key]
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
  Object.values(signUpForm).some(input => {
    errorMessages = input.errorMessage ? <h6>{input.errorMessage}</h6> : null;
    disabled = input.valid && disabled;
    return input.errorMessage;
  });

  if (message) {
    errorMessages = <h6>{message}</h6>;
  }

  if (props.error) {
    // const backEndError = props.error.replace(/_/g, ' ').toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
    errorMessages = <h6>{props.error}</h6>;
  }

  let redirect = null;
  if (switchToLogin) {
    redirect = <Redirect to="/login" />
  }

  if (props.isAuthenticated) {
    redirect = <Redirect to={props.authRedirectPath} />
  }

  // remove,  for test only.
  disabled = true;


  let mainContent = (
    <Aux>
      {form}
      <Button btnType="Success" disabled={!disabled}>SUBMIT</ Button>
    </Aux>
  )
  if (props.loading) {
    mainContent = <Spinner />
  }

  if (props.activateEmail) {
    mainContent = (
      <Aux>
        <span>We have sent an email with a confirmation link to your email address. In order to complete the sign-up process, please click the confirmation link.
        If you do not receive a confirmation email, please check your spam folder. Also, please verify that you entered a valid email address in our sign-up form.
        If you need assistance, please contact me at <a href={`mailto: Yanhongmain@gmail.com`} >Yanhongmain@gmail.com</a>.</span>
        <h4 onClick={props.returnSignup}>Return to sign-up</h4>
      </Aux>
    )
  }


  return (
    <div className={classes.signUp}>
      <div className={classes.signUp_content}>
        { props.activateEmail ? <h2>Activate your email</h2> : <h2>Create account</h2>}
        {redirect}
        {errorMessages}
        <form onSubmit={submitHandler}>
          {mainContent}
        </form>
        <span>Already have account ? <p onClick={SwitchAuthModeHandler}>Switch to login.</p></span>
      </div>
      <div className={classes.signUp_image}>
        <img src={signUpImage} alt="signUpImage" />
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
    activateEmail: state.auth.activateEmail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authSignUp: (email, password, firstName, lastName) => dispatch(actions.authSignUp(email, password, firstName, lastName)),
    returnSignup : () => dispatch(actions.returnSignup()),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthSignUp);
