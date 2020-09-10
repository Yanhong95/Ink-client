import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../higherOrderComponent/Aux/Aux'
import Icon from '../../../shared/Icon/Icon';
const navigationItems = (props) => {


    return (
        <Aux>
            <NavigationItem link="/algorithm">
                <Icon name="file-tray-full-outline"></Icon>
            </NavigationItem>
            <NavigationItem link="/javascript">
                <Icon name="layers-outline"></Icon>
            </NavigationItem>
            {/* {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Authenticate</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>} */}
        </Aux>
    )

};

export default navigationItems;