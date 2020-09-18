// import React, { useState, useEffect, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import classes from './Upload.module.scss';


import Aux from '../../higherOrderComponent/Aux/Aux';

const Upload = props => {

  return (
    <Aux>
      <div className={classes.upload}>
        <p> Upload </p>
      </div>
    </Aux>
  )
}

export default Upload;