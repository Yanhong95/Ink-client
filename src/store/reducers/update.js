import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  currentCatalog: null,
  error: false,
  message: null,
  loading: false,
  updatedtopics: []
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
  let newUpdatedtopics = [];
  if(!state.updatedtopics.includes(action.topic)){
    newUpdatedtopics = [...state.updatedtopics, action.topic];
  }else{
    newUpdatedtopics = [...state.updatedtopics]
  }
  // console.log(newUpdatedtopics);
  return updateObject(state, {
    loading: false,
    message: action.message,
    error: null,
    uploadNewNote: true,
    updatedtopics: newUpdatedtopics
  });
}
const uploadFileFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
}

const finishedPageUpdate = (state, action) => {
  const newUpdatedtopics = [...state.updatedtopics];
  newUpdatedtopics.splice(state.updatedtopics.indexOf(action.topic), 1)
  // console.log(newUpdatedtopics);
  return updateObject(state, {
    loading: false,
    error: action.error,
    updatedtopics: newUpdatedtopics
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_CATALOG_SUCCESS: return loadCatalogSuccess(state, action);
    case actionTypes.LOAD_CATALOG_FAIL: return loadCatalogFail(state, action);
    case actionTypes.UPLOAD_FILE_START: return uploadFileStart(state,action);
    case actionTypes.UPLOAD_FILE_SUCCESS: return uploadFileSuccess(state, action);
    case actionTypes.UPLOAD_FILE_FAIL: return uploadFileFail(state, action);
    case actionTypes.FINISHED_PAGE_UPDATE : return finishedPageUpdate(state, action);
    default:
      return state;
  }
};

export default reducer;