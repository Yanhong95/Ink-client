import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL:'http://localhost:8080'
});

export const updateObject = (oldObject, updatedProperties) => {
  return {
      ...oldObject,
      ...updatedProperties
  };
};

