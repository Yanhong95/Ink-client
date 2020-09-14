import React from 'react';

import inkLogo from '../../assets/images/ink.png';
import classes from './Logo.module.scss';
import NavigationItem from '../Navigation/NavigationItems/NavigationItem'

const logo = (props) => (
    <NavigationItem link="/">
        <div className={classes.Logo}>
            <img src={inkLogo} alt="Ink" />
        </div>
    </NavigationItem>

);

export default logo;