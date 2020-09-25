import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  subcategories: {},
  currentTopic: null,
  currentNote: null,
  currentNoteId: null,
  currentNoteName: null,
  loadingTopics: false,
  loadingSubcategory: false,
  loadingCurrentNote: false,
  uploadNewNote: false,
  error: null,
  loadedNotes: {}
};

const loadTopicStart = (state, action) => {
  return updateObject(state, { error: null, loadingTopics: true });
};

const loadTopicSuccess = (state, action) => {
  // console.log(action.topicTpye);
  return updateObject(state, {
    currentTopic: action.topics,
    error: null,
    loadingTopics: false,
    [action.topicTpye]: action.topics,
    currentNote: null,
    currentNoteId: null,
    currentNoteName: null,
  });
};

const loadCurrentNoteStart = (state, action) => {
  return updateObject(state, { error: null, loadingCurrentNote: true });
};

const loadCurrentNoteSuccess = (state, action) => {
  const newLoadedNotes = updateObject(state.loadedNotes, { [action.nodeId]: action.content});
  return updateObject(state, {
    error: null,
    loadingCurrentNote: false,
    currentNote: action.content,
    currentNoteId: action.nodeId,
    currentNoteName: action.noteName,
    loadedNotes: newLoadedNotes
  });
};

const loadFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingTopics: false,
    loadingSubcategory: false,
    loadingCurrentNote: false,
  });
};

const changeToCurrentTopic = (state, action) => {
  const newCurrentTopic = [...state[action.topic]];
  return updateObject(state, {
    currentTopic : newCurrentTopic,
    currentNote: null,
    currentNoteId: null,
    currentNoteName: null,
  })
};

const replaceCurrentNote = (state, action) => {
  const loadedNote = state.loadedNotes[action.noteId];
  return updateObject(state, {
    error: null,
    loadingCurrentNote: false,
    currentNote: loadedNote,
    currentNoteId: action.noteId,
    currentNoteName: action.noteName
  });
}



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_TOPIC_START: return loadTopicStart(state, action);
    case actionTypes.LOAD_TOPIC_SUCCESS: return loadTopicSuccess(state, action);
    case actionTypes.LOAD_TOPIC_FAIL: return loadFail(state, action);

    case actionTypes.LOAD_CURRENT_NOTE_START: return loadCurrentNoteStart(state, action);
    case actionTypes.LOAD_CURRENT_NOTE_SUCCESS: return loadCurrentNoteSuccess(state, action);
    case actionTypes.LOAD_CURRENT_NOTE_FAIL: return loadFail(state, action);

    case actionTypes.CHANGE_TO_CURRENT_TOPIC: return changeToCurrentTopic(state, action);
    case actionTypes.REPLACE_CURRENT_NOTE: return replaceCurrentNote(state, action);
    default:
      return state;
  }
};

export default reducer;