import React from 'react';

import classes from './Spinner.module.scss';
import Aux from '../../../higherOrderComponent/Aux/Aux'

const Spinner = () => (
    <div className="spinner">
        <div className={classes.sk_folding_cube}>
            <div className={`${classes.sk_cube_1} ${classes.sk_cube}`}></div>
            <div className={`${classes.sk_cube_2} ${classes.sk_cube}`}></div>
            <div className={`${classes.sk_cube_4} ${classes.sk_cube}`}></div>
            <div className={`${classes.sk_cube_3} ${classes.sk_cube}`}></div>
        </div>
    </div>
);

export default Spinner;