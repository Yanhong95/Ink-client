import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  subcategories: {},
  currentTopic: null,
  currentNote: null,
  loadingTopics: false,
  loadingSubCategory: false,
  loadingCurrentNote: false,
  error: null
};

const loadTopicStart = (state, action) => {
  return updateObject(state, { error: null, loadingTopics: true });
};

const loadTopicSuccess = (state, action) => {
  return updateObject(state, {
    currentTopic: action.topics,
    error: null,
    loadingTopics: false,
    [action.topicTpye]: action.topics
  });
};

const loadCurrentNoteStart = (state, action) => {
  return updateObject(state, { error: null, loadingCurrentNote: true });
};

const loadCurrentNoteSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loadingCurrentNote: false,
  });
};

const loadFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingTopics: false,
    loadingSubCategory: false,
    loadingCurrentNote: false,
  });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_TOPIC_START: return loadTopicStart(state, action);
    case actionTypes.LOAD_TOPIC_SUCCESS: return loadTopicSuccess(state, action);
    case actionTypes.LOAD_TOPIC_FAIL: return loadFail(state, action);

    case actionTypes.LOAD_CURRENT_NOTE_START: return loadCurrentNoteStart(state, action);
    case actionTypes.LOAD_CURRENT_NOTE_SUCCESS: return loadCurrentNoteSuccess(state, action);
    case actionTypes.LOAD_CURRENT_NOTE_FAIL: return loadFail(state, action);
    default:
      return state;
  }
};

export default reducer;