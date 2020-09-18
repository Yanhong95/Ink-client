// import React, { useState, useEffect, useRef } from 'react';
import React from 'react';
import classes from './Toolbar.module.scss';
import Aux from '../../../higherOrderComponent/Aux/Aux';
import Logo from '../../Logo/Logo';
import AuthNav from '../../../containers//Auth/Nav/AuthNav';
import NavigationItems from '../NavigationItems/NavigationItems';
// import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = props => {
    // const [height, setHeight] = useState(0);
    // const ref = useRef(null)

    // useEffect(() => {
    //     setHeight(ref.current.clientHeight)
    //   }, [ref]);
    // <header ref={ref}>

    return (
        <Aux>
            {/* <DrawerToggle clicked={props.drawerToggleClicked} /> */}
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAdmin={props.isAdmin} />
            </nav>
            <div className={classes.Login}>
                <AuthNav/>
            </div>
        </Aux>
    );
};

export default Toolbar;