import React, { useState, useEffect, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import classes from './PersonalInfo.scss';
import Aux from '../../higherOrderComponent/Aux/Aux';

const PersonalInfo = props => {
  console.log(classes);
  return (
    <Aux>
      <p className= {classes.newColor}> main content </p>
    </Aux>
  )
}

export default PersonalInfo;