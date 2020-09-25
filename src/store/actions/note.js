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
        dispatch(loadTopicFail(err.message));
      });
  };
}

export const loadCurrentNoteStart = () => {
  return {
    type: actionTypes.LOAD_CURRENT_NOTE_START
  };
};

export const loadCurrentNoteSuccess = (content, nodeId, noteName) => {
  return {
    type: actionTypes.LOAD_CURRENT_NOTE_SUCCESS,
    content: content, 
    nodeId: nodeId,
    noteName: noteName
  };
}

export const loadCurrentNoteFail = (error) => {
  return {
    type: actionTypes.LOAD_CURRENT_NOTE_FAIL,
    error: error
  };
};

// NoteUrl 
export const loadCurrentNote = (noteId, noteName) => {
  return dispatch => {
    dispatch(loadCurrentNoteStart());
    const url = '/s3/getS3Note';
    axiosInstance.post(url, {noteId})
      .then(response => {
        dispatch(loadCurrentNoteSuccess(response.data, noteId, noteName));
      })
      .catch(err => {
        console.log(err.message);
        dispatch(loadCurrentNoteFail(err.message));
      });
  };
} 


export const changeToCurrentTopic = (type) => {
  return {
    type: actionTypes.CHANGE_TO_CURRENT_TOPIC,
    topic: type
  };
}

export const replaceCurrentNote = (noteId, noteName) => {
  return {
    type: actionTypes.REPLACE_CURRENT_NOTE,
    noteId: noteId,
    noteName: noteName
  }
}
