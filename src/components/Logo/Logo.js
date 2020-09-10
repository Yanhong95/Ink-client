import React from 'react';

import inkLogo from '../../asset/assets/images/ink.png';
import classes from './Logo.module.scss';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={inkLogo} alt="Ink" />
    </div>
);

export default logo;