import React from 'react';
import { connect } from 'react-redux';
import classes from './AuthNav.module.scss';
import Aux from '../../../higherOrderComponent/Aux/Aux'
import image from '../../../assets/images/ME.jpg'
// import Icon from '../../../shared/Icon/Icon'
import NavigationItem from '../../../components/Navigation/NavigationItems/NavigationItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSignOutAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';

const AuthNav = props => {


  let currDisplay = (
    <div className={classes.authNav}>
      <NavigationItem link="/signup">
        <FontAwesomeIcon icon={faUserFriends} size="1x" />
        {/* <Icon name="people-outline"></Icon> */}
      </NavigationItem>
      <NavigationItem link="/login">
        <FontAwesomeIcon icon={faSignInAlt} size="1x" />
        {/* <Icon name="log-in-outline"></Icon> */}
      </NavigationItem>
    </div>
  );

  if (props.isAuthenticated) {
    currDisplay = (
      <div className={classes.authNav}>
        <NavigationItem link="/userInfo">
          <img src={image} alt="userImage" />
        </NavigationItem>
        <NavigationItem link="/logout">
          <FontAwesomeIcon icon={faSignOutAlt} size="1x" />
          {/* <Icon name="log-out-outline"></Icon> */}
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

