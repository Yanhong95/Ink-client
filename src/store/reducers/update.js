import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  currentCatalog: null,
  error: false,
  loading: false,
}

const loadCatalogSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    currentCatalog: action.catalog
  });
};

const loadCatalogFail = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
}
const uploadFileStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_CATALOG_SUCCESS: return loadCatalogSuccess(state, action);
    case actionTypes.LOAD_CATALOG_FAIL: return loadCatalogFail(state, action);
    case actionTypes.UPLOAD_FILE_START: return uploadFileStart(state,action);

    default:
      return state;
  }
};

export default reducer;