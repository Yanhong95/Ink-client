import React from 'react';
import { connect } from 'react-redux';
import classes from './AuthNav.module.scss';
import Aux from '../../higherOrderComponent/Aux/Aux'
import image from '../../assets/images/ME.jpg'
import Icon from '../../shared/Icon/Icon'
import NavigationItem from '../../components/Navigation/NavigationItems/NavigationItem'

const AuthNav = props => {


  let currDisplay = (
    <div className={classes.authNav}>
      <NavigationItem link="/signUp">
        <Icon name="people-outline"></Icon>
      </NavigationItem>
      <NavigationItem link="/login">
        <Icon name="log-in-outline"></Icon>
      </NavigationItem>
    </div>
  );

  if (props.isAuthenticated) {
    currDisplay = (
      <div className={classes.authNav}>
        <img src={image} alt="userImage" />
        <NavigationItem link="/logout">
          <Icon name="log-out-outline"></Icon>
        </NavigationItem>
      </div>
    );
  }

  return (
    <Aux>
      {currDisplay}
    </Aux>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(AuthNav);

