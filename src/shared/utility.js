import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? 
    'https://ink-server.us-east-2.elasticbeanstalk.com' : 'http://localhost:8080'
    // process.env.REACT_APP_DEV_SERVICE_URL : process.env.REACT_APP_PRO_SERVICE_URL
});

export const updateObject = (oldObject, updatedProperties) => {
  return {
      ...oldObject,
      ...updatedProperties
  };
};

