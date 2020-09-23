import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  currentCatalog: null,
  error: false,
  message: null,
  loading: false,
}

const loadCatalogSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    message: null,
    currentCatalog: action.catalog
  });
};

const loadCatalogFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    message: null,
  });
}


const uploadFileStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null
  });
}

const uploadFileSuccess = (state, action) => {
  console.log(action.message);
  return updateObject(state, {
    loading: false,
    message: action.message,
    error: null,
  });
}
const uploadFileFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_CATALOG_SUCCESS: return loadCatalogSuccess(state, action);
    case actionTypes.LOAD_CATALOG_FAIL: return loadCatalogFail(state, action);
    case actionTypes.UPLOAD_FILE_START: return uploadFileStart(state,action);
    case actionTypes.UPLOAD_FILE_SUCCESS: return uploadFileSuccess(state, action);
    case actionTypes.UPLOAD_FILE_FAIL: return uploadFileFail(state, action);
    default:
      return state;
  }
};

export default reducer;