import Aux from '../Aux/Aux';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
// import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {

    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    }

    return (
        <div className={classes.body}>
            <div className={classes.headerWrapper}>
            <div className={classes.header}>
                <Toolbar
                    // isAuth={props.isAuthenticated}
                    drawerToggleClicked={sideDrawerToggleHandler} />
                {/* <SideDrawer
                    isAuth={props.isAuthenticated}
                    open={sideDrawerIsVisible}
                    closed={sideDrawerClosedHandler} /> */}
            </div>
            </div>


            <div className={classes.main}>
                {props.children}
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        // isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);