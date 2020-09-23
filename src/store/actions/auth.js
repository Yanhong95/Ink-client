import { axiosInstance } from '../../shared/utility';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId, isAdmin) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    isAdmin: isAdmin
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const signUpSuccess = (userId) => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    userId: userId
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  localStorage.removeItem('isAdmin');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};


export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authSignUp = (email, password, firstName, lastName) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    };
    const url = '/auth/signup';
    axiosInstance.post(url, authData)
      .then(response => {
        dispatch(signUpSuccess(response.data.userId));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.message));
      });
  };
};

export const returnSignup = () => {
  return {
    type: actionTypes.RETURN_SIGNUP
  };
};

export const returnLogin = () => {
  return {
    type: actionTypes.RETURN_LOGIN
  }
}


export const authLogin = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
    };
    const url = '/auth/login';
    axiosInstance.post(url, authData)
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('isAdmin', response.data.isAdmin);
        console.log(response.data.isAdmin);
        dispatch(authSuccess(response.data.idToken, response.data.userId, response.data.isAdmin));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.message));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    // console.log(localStorage.getItem('expirationDate'));
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        const isAdmin = localStorage.getItem('isAdmin');
        // console.log(userId);
        dispatch(authSuccess(token, userId, isAdmin));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  };
};

export const verifyVerificationCode = (emailVerificationCode) => {
  return dispatch => {
    dispatch(authStart());
    const url = '/auth/verityEmail';
    axiosInstance.post(url, {emailVerificationCode})
      .then(response => {
          if(response.status === 200){
            dispatch(emailVerification(true));
          }else{
            dispatch(emailVerification(false));
          }
      })
      .catch(err => {
        console.log(err.response);
        dispatch(emailVerification(false));
        // dispatch(authFail(err.response.data.message));
      });
  };
}

const emailVerification =(status) => {
  return {
    type: actionTypes.EMAIL_VERIFICATION,
    status: status
  }
}