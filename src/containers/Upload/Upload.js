import React, { useState, useEffect, useCallback } from 'react';
import classes from './Upload.module.scss';
// import { useDispatch, useSelector } from 'react-redux';

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