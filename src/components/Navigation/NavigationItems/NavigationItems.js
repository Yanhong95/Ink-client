import React from 'react';

import NavigationItem from './NavigationItem';
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
            {props.isAdmin ? <NavigationItem link="/upload">
                <Icon name="cloud-upload-outline"></Icon>
            </NavigationItem> : null} 
        </Aux>
    )

};

export default navigationItems;