import { axiosInstance } from '../../shared/utility';
import * as actionTypes from './actionTypes';

export const loadTopicStart = () => {
  return {
    type: actionTypes.LOAD_TOPIC_START
  };
};

export const loadTopicSuccess = (type, topic) => {
  return {
    type: actionTypes.LOAD_TOPIC_SUCCESS,
    topicTpye: type,
    topics: topic
  };
};

export const loadTopicFail = (error) => {
  return {
    type: actionTypes.LOAD_TOPIC_FAIL,
    error: error
  };
};

// type: algorithmTopics, javascripTopics, 
export const loadTopic = (type) => {
  return dispatch => {
    dispatch(loadTopicStart());
    const url = '/note/loadTopic';
    axiosInstance.post(url, { type })
      .then(response => {
        dispatch(loadTopicSuccess( type, response.data.subcategories));
      })
      .catch(err => {
        dispatch(loadTopicFail(err.response.data.message));
      });
  };
}

export const loadCurrentNoteStart = () => {
  return {
    type: actionTypes.LOAD_CURRENT_NOTE_START
  };
};

export const loadCurrentNoteSuccess = (topic, subcategories) => {
  return {
    type: actionTypes.LOAD_CURRENT_NOTE_SUCCESS,
    subcategorieTpye: topic,
    subcategories: subcategories
  };
}

export const loadCurrentNoteFail = (error) => {
  return {
    type: actionTypes.LOAD_CURRENT_NOTE_FAIL,
    error: error
  };
};

// NoteUrl 
export const loadCurrentNote = (noteUrl) => {
  return dispatch => {
    dispatch(loadCurrentNoteStart());
    // const url = '/note/loadNote';
    // axiosInstance.post(url, {category})
    //   .then(response => {
    //     dispatch(loadCurrentNoteSuccess(response.data.notes));
    //   })
    //   .catch(err => {
    //     dispatch(loadCurrentNoteFail(err.response.data.message));
    //   });
    dispatch(loadCurrentNoteSuccess(noteUrl,));
  };
} 


export const changeToCurrentTopic = (type) => {
  return {
    type: actionTypes.CHANGE_TO_CURRENT_TOPIC,
    topic: type
  };
}