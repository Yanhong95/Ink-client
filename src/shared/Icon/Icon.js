import React from 'react';
import classes from './Icon.module.scss'

const Icon = props => {

  const changeIcon = e => {
    const newIconName = e.target.name.replace('-outline', '');
    e.target.name = newIconName;
  }
  const resetIcon = e => {
    const prevIconName = e.target.name + '-outline';
    e.target.name = prevIconName;
  }

  return (
    <ion-icon className={classes.icon} onMouseOver={changeIcon} onMouseLeave={resetIcon} name={props.name} ></ion-icon>
  );


}

export default Icon;