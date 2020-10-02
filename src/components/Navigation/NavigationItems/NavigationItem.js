import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.scss';

const navigationItem = (props) => (
    <div className={classes.NavigationItem}>
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}>
            {props.children}
        </NavLink>
        {props.label ? <div className={classes.navLabel}>{props.label}</div> : null}
    </div>
);

export default navigationItem;