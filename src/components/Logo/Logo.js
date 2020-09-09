import React from 'react';

import inkLogo from '../../asset/assets/images/ink.png';
import classes from './Logo.scss';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={inkLogo} alt="Ink" />
    </div>
);

export default logo;