// import React, { useEffect, useState, useRef } from 'react';
import React from 'react';
import { connect } from 'react-redux';
import classes from './UserInfo.module.scss';
// import * as actions from '../../../store/actions/index';
import { axiosInstance, consoleHelper } from '../../../shared/utility';

const UserInfo = props => {

  consoleHelper(props.token);
  return(
    <div className={classes.userInfo_outer}>
       <div className={classes.userInfo}>
          Coming soon...
       </div>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    token: state.auth.token,
    message: state.auth.message,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo, axiosInstance);;