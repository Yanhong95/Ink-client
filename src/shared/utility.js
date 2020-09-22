import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVICE_DOMAN
});

export const updateObject = (oldObject, updatedProperties) => {
  return {
      ...oldObject,
      ...updatedProperties
  };
};

