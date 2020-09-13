import React, { useState, useEffect, useCallback } from 'react';
import DocTest from './DocTest';
import classes from './test.module.scss';
// import { useDispatch, useSelector } from 'react-redux';

import Aux from '../../higherOrderComponent/Aux/Aux';

const PersonalDoc = props => {

  return (
    <Aux>
      {/* <p> main doc </p> */}
      <div className={classes.test}>
        <DocTest/>
      </div>
    </Aux>
  )
}

export default PersonalDoc;