import React from 'react';

import classes from './Loader.module.scss';

const Loader = () => (
  <div className={classes.loader}>
    <div className={classes.loader_container}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Loader;