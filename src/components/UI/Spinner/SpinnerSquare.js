import React from 'react';

import classes from './SpinnerSquare.module.scss';

const SpinnerSquare = (  ) => (
    <div className="spinner">
        <div className={classes.sk_folding_cube}>
            <div className={`${classes.sk_cube_1} ${classes.sk_cube}`}></div>
            <div className={`${classes.sk_cube_2} ${classes.sk_cube}`}></div>
            <div className={`${classes.sk_cube_4} ${classes.sk_cube}`}></div>
            <div className={`${classes.sk_cube_3} ${classes.sk_cube}`}></div>
        </div>
    </div>
);

export default SpinnerSquare;

