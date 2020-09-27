import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const Layout = props => {

    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);


    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    }

    return (
        <div className={classes.body}>
            <div className={classes.headerWrapper}>
                <div className={classes.header}>
                    <Toolbar
                        isAdmin={props.isAdmin}
                        drawerToggleClicked={sideDrawerToggleHandler} />
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
        isAdmin: state.auth.isAdmin
    };
};

export default connect(mapStateToProps)(Layout);