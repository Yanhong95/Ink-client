// import { axiosInstance } from '../../shared/utility';

import * as actionTypes from './actionTypes';


export const loadTopicStart = () => {
  return {
    type: actionTypes.LOAD_TOPIC_START
  };
};

export const loadTopicSuccess = (type, topics) => {
  return {
    type: actionTypes.LOAD_TOPIC_SUCCESS,
    topicTpye: type,
    topics: topics
  };
};

export const loadTopicFail = (error) => {
  return {
    type: actionTypes.LOAD_TOPIC_FAIL,
    error: error
  };
};

// type: algorithmTopics, javascripTopics, 
export const loadTopics = (type) => {
  return dispatch => {
    console.log('loadTopics');
    dispatch(loadTopicStart());
    // const url = '/note/topics';
    // axiosInstance.post(url, {type})
    //   .then(response => {
    //     dispatch(loadTopicSuccess(response.data.lists));
    //   })
    //   .catch(err => {
    //     dispatch(loadTopicFail(err.response.data.message));
    //   });
    const algorithmTopics = [
      {
        name: 'Syntax',
        subcategoryId: 'topicId1',
        notes: [
          {
            noteId: 'asdasf',
            noteName: '1. twoSum',
            noteUrl: ''
          },
          {
            noteId: 'asdasfrewt',
            noteName: '2. threeSum',
            noteUrl: ''
          }]
      },
      {
        name: 'Array',
        subcategoryId: 'topicId2',
        notes: [
          {
            noteId: 'asdasf432',
            noteName: '1. twoSum',
            noteUrl: ''
          },
          {
            noteId: 'asdasfrewt21',
            noteName: '2. threeSum',
            noteUrl: ''
          }]
      },
      {
        name: 'BFS',
        subcategoryId: 'topicId3',
        notes: [
          {
            noteId: 'asdasf43',
            noteName: '1. twoSum',
            noteUrl: ''
          },
          {
            noteId: 'asdasfrewt314',
            noteName: '2. threeSum',
            noteUrl: ''
          }]
      },
      {
        name: 'DFS',
        subcategoryId: 'topicId4',
        notes: [
          {
            noteId: 'asdasf',
            noteName: '1. twoSum',
            noteUrl: ''
          },
          {
            noteId: 'asdasfrewt',
            noteName: '2. threeSum',
            noteUrl: ''
          }]
      },
      {
        name: 'BP',
        subcategoryId: 'topicId5',
        notes: [
          {
            noteId: 'asdasf131',
            noteName: '1. twoSum',
            noteUrl: ''
          },
          {
            noteId: 'asdasf132',
            noteName: '1. twoSum441',
            noteUrl: ''
          },
          {
            noteId: 'asdasf133',
            noteName: '1. twoSum314ASASFSDFSDGSHHDDAFAFAAGSG',
            noteUrl: ''
          },
          {
            noteId: 'asdasfrewt31',
            noteName: '2. threeSum',
            noteUrl: ''
          }]
      },
      {
        name: 'Iteration',
        subcategoryId: 'topicId6',
        notes: [
          {
            noteId: 'asdasf',
            noteName: '1. twoSum',
            noteUrl: ''
          },
          {
            noteId: 'asdasfrewt',
            noteName: '2. threeSum',
            noteUrl: ''
          }]
      },
      {
        name: 'Backtrack',
        subcategoryId: 'topicId7',
        notes: [
          {
            noteId: 'asdasfw43',
            noteName: '1. twoSum',
            noteUrl: ''
          },
          {
            noteId: 'asdasfrewt',
            noteName: '2. threeSum',
            noteUrl: ''
          }]
      }

    ]
    dispatch(loadTopicSuccess(type, algorithmTopics));
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
    // const url = '/note/note';
    // axiosInstance.post(url, {category})
    //   .then(response => {
    //     dispatch(loadCurrentNoteSuccess(response.data.notes));
    //   })
    //   .catch(err => {
    //     dispatch(loadCurrentNoteFail(err.response.data.message));
    //   });

    dispatch(loadCurrentNoteSuccess(noteUrl, ));
  };
} 