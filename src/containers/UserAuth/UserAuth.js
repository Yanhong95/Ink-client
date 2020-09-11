import React from 'react'
import classes from './UserAuth.module.scss';
import Aux from '../../higherOrderComponent/Aux/Aux'
import image from '../../assets/images/ME.jpg'
import Icon from '../../shared/Icon/Icon'
import NavigationItem from '../../components/Navigation/NavigationItems/NavigationItem/NavigationItem'

const UserAuth = props => {

  let currDisplay = (
    <div className={classes.userAuth}>
      <img src={image} alt="userImage" />
      <NavigationItem link="/logout">
        <Icon name="log-out-outline"></Icon>
      </NavigationItem>
    </div>
  );

  return (
    <Aux>
      {currDisplay}
    </Aux>
  );
}

export default UserAuth;

