import React from 'react';

import classes from './Backdrop.module.scss';

const backdrop = (props) => (
    props.show ? <div className={classes.Backdrop} style={props.position} onClick={props.clicked}></div> : null
);

export default backdrop;