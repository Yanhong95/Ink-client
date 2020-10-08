import { axiosInstance } from '../../shared/utility';
import * as actionTypes from './actionTypes';
import {S3Object, getSignedURL, uploadFileToS3} from '../../shared/S3/S3'

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
    const url = '/note/loadCatalog';
    axiosInstance.get(url)
      .then(response => {
        dispatch(loadCatalogSuccess(response.data.catalog));
      })
      .catch(err => {
        dispatch(loadCatalogFail(err.response.data.message));
      });
  };
};

export const uploadFileStart = () => {
  return {
    type: actionTypes.UPLOAD_FILE_START,
  };
};

export const uploadFileSuccess = (message, topic) => {
  return {
    type: actionTypes.UPLOAD_FILE_SUCCESS,
    message: message,
    topic: topic
  };
};

export const uploadFileFail = (error) => {
  return {
    type: actionTypes.UPLOAD_FILE_FAIL,
    error: error
  };
};

// todo handle error
export const uploadFile = (uploadFile, token) => {
  return async dispatch => {
    // console.log(uploadFile);
    // console.log(token);
    dispatch(uploadFileStart());
    try {
      const uploadFolder = `${S3Object.noteFolder}/${uploadFile.topic}/${uploadFile.subcategory}`
      const resObject = await getSignedURL(uploadFolder, uploadFile.file.name, uploadFile.file.type, token);
      const fileURL = await uploadFileToS3(uploadFolder, uploadFile.file, resObject);
      const res = await axiosInstance.post('/note/addNote', 
      {
        topic: uploadFile.topic,
        subcategory: uploadFile.subcategory,
        fileURL: fileURL,
        noteName: uploadFile.file.name
      },
      { headers: {
          Authorization: 'Bearer ' + token,
        }
      });
      dispatch(uploadFileSuccess(res.data.message, uploadFile.topic));
    } catch (err) {
      dispatch(uploadFileFail(err.response ? err.response.data.message : err.message));
    }
  }
}

export const finishedPageUpdate = (topic) => {
  return {
    type: actionTypes.FINISHED_PAGE_UPDATE,
    topic: topic
  };
}