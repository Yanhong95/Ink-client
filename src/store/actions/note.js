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
        dispatch(loadTopicSuccess(type, response.data.subcategories));
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

export const loadCurrentNoteSuccess = (content, nodeId, noteName, subcategoriesId) => {
  return {
    type: actionTypes.LOAD_CURRENT_NOTE_SUCCESS,
    content: content,
    nodeId: nodeId,
    noteName: noteName,
    subcategoriesId: subcategoriesId
  };
}

export const loadCurrentNoteFail = (error) => {
  return {
    type: actionTypes.LOAD_CURRENT_NOTE_FAIL,
    error: error
  };
};

// NoteUrl 
export const loadCurrentNote = (noteId, noteName, subcategoriesId) => {
  return dispatch => {
    dispatch(loadCurrentNoteStart());
    const url = '/s3/getS3Note';
    axiosInstance.post(url, { noteId })
      .then(response => {
        dispatch(loadCurrentNoteSuccess(response.data, noteId, noteName, subcategoriesId));
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

export const replaceCurrentNote = (noteId, noteName, subcategoriesId) => {
  return {
    type: actionTypes.REPLACE_CURRENT_NOTE,
    noteId: noteId,
    noteName: noteName,
    subcategoriesId: subcategoriesId
  }
}

export const deleteNoteSuccess = (categoryId, noteId) => {
  return {
    type: actionTypes.DELETE_NOTE_SUCCESS,
    noteId: noteId,
    subcategoriesId: categoryId
  }
}

export const deleteNote = (categoryId, noteId, token) => {
  return dispatch => {
    dispatch(loadCurrentNoteStart());
    // console.log(categoryId, noteId);
    axiosInstance.delete('/s3/delete', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      params: {
        categoryId, noteId
      }
    }).then(response => {
        dispatch(deleteNoteSuccess(categoryId, noteId));
      })
      .catch(err => {
        console.log(err.message);
        dispatch(loadCurrentNoteFail(err.message));
      });
  };
}
