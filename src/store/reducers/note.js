import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  subcategories: {},
  currentTopic: null,
  currentNote: null,
  currentNoteId: null,
  currentNoteName: null,
  currentTopicName: null,
  loadingTopics: false,
  loadingSubcategory: false,
  loadingCurrentNote: false,
  uploadNewNote: false,
  error: null,
  loadedNotes: {},
  currentCategoryId: null,
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
    currentTopicName: action.topicTpye,
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
    loadedNotes: newLoadedNotes,
    currentCategoryId : action.subcategoriesId
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
  const currentTopic = action.topic;
  return updateObject(state, {
    currentTopic : newCurrentTopic,
    currentNote: null,
    currentNoteId: null,
    currentNoteName: null,
    currentCategoryId: null,
    currentTopicName: currentTopic
  })
};

const replaceCurrentNote = (state, action) => {
  const loadedNote = state.loadedNotes[action.noteId];
  return updateObject(state, {
    error: null,
    loadingCurrentNote: false,
    currentNote: loadedNote,
    currentNoteId: action.noteId,
    currentNoteName: action.noteName,
    currentCategoryId : action.subcategoriesId
  });
}

const deleteCurrentNote = (state, action) => {
  const categoryId = action.subcategoriesId;
  const noteId = action.noteId;
  const currentCategoryIndex = state.currentTopic.findIndex(category => category._id === categoryId);
  const currentCategory = {...state.currentTopic[currentCategoryIndex]};
  const newNotes = currentCategory.notes.filter(note => note._id !==noteId);
  currentCategory.notes = newNotes;
  const newCurrentTopic = [...state.currentTopic];
  newCurrentTopic[currentCategoryIndex] = currentCategory;
  delete state.loadedNotes[noteId];
  const currentTopicName = state.currentTopicName;
  return updateObject(state, 
    { error: null, 
      loadingCurrentNote: false,
      currentNote: null,
      currentNoteId: null,
      currentNoteName: null,
      currentCategoryId: null,
      loadedNotes: state.loadedNotes,
      currentTopic: newCurrentTopic,
      [currentTopicName]: newCurrentTopic
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

    case actionTypes.DELETE_NOTE_SUCCESS: return deleteCurrentNote(state, action);
    default:
      return state;
  }
};

export default reducer;