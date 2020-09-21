import { axiosInstance } from '../../shared/utility';
import * as actionTypes from './actionTypes';


export const loadCatalogSuccess = (catalog) => {
  return {
    type: actionTypes.LOAD_CATALOG_SUCCESS,
    catalog: catalog
  };
};

export const loadCatalogFail = (error) => {
  return {
    type: actionTypes.LOAD_CATALOG_FAIL,
    error: error
  };
};

export const loadCatalog = () => {
  return dispatch => {
    const url = '/update/loadCatalog';
    axiosInstance.get(url)
      .then(response => {
        dispatch(loadCatalogSuccess(response.data.catalog));
      })
      .catch(err => {
        dispatch(loadCatalogFail(err.response.data.message));
      });
  };
};



