import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classes from './NoteList.module.scss';
import * as actions from '../../../store/actions/index';
import Aux from '../../../higherOrderComponent/Aux/Aux'
import NoteSearch from '../NoteSearch/NoteSearch';

const NoteList = props => {

  const [subList, setSubList] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);

  useEffect(() => {
    setCurrentTopic(props.currentTopic);
  }, [props.currentTopic]);

  // The state updater returned by useState will not rerender the component's children 
  // if you set a new value that equals the current value
  const triggerTheTopic = topicId => {
    if (subList.includes(topicId)) {
      subList.splice(subList.indexOf(topicId), 1);
      setSubList([...subList]);
    } else {
      if (subList.length !== 0) subList.shift();
      subList.push(topicId);
      setSubList([...subList]);
    }
  }

  const loadNote = (noteId, noteName, subcategoriesId) => {
    setActiveNote(noteId);
    if (props.loadedNotes[noteId]) {
      props.replaceCurrentNote(noteId, noteName, subcategoriesId);
    } else {
      props.loadCurrentNote(noteId, noteName, subcategoriesId)
    }
  }

  const filter = (enteredFilter) =>{
    if(enteredFilter === ""){
      setCurrentTopic(props.currentTopic);
    }else{
      const searchInput = enteredFilter.toLowerCase();
      const newCurrentTopic = [];
      props.currentTopic.map(subcategories => {
        const newSubcategories = {...subcategories};
        const newNotes = subcategories.notes.filter(note => note.name.toLowerCase().includes(searchInput));
        if(newNotes.length === 0){
          if(subcategories.name.toLowerCase().includes(searchInput)){
            newCurrentTopic.push(subcategories);
          }
        }else{
          newSubcategories.notes = newNotes;
          newCurrentTopic.push(newSubcategories);
        }
        return null;
      });
      setCurrentTopic(newCurrentTopic);
    }
  }

  let topicList = null;
  if (currentTopic && currentTopic.length > 0) {
    topicList = currentTopic.map(subcategories => {
      return (
        <Aux key={subcategories._id}>
          <div className={classes.topicList_topic} onClick={() => triggerTheTopic(subcategories._id)}>
            <div className={classes.topicList_topic_name}>{subcategories.name}</div>
            {subList.includes(subcategories._id) ?
              <div className={classes.topicList_topic_close}>&times;</div> :
              <div className={classes.topicList_topic_open}>&#43;</div>}
          </div>
          {subList.includes(subcategories._id) ?
            subcategories.notes.map(note => {
              return (
                <div key={note._id} className={classes.topicList_topic_note}
                  onClick={() => loadNote(note._id, note.name, subcategories._id)}>
                  <div className={classes.topicList_topic_note_text}>
                    <p className={activeNote === note._id ? classes.topicList_topic_note_text_active : null}>{note.name}</p>
                  </div>
                </div>
              );
            }): null
          }
        </Aux>
      );
    });
  }else{
    topicList = <div className={classes.topicList_message}> Empty result.</div>
  }

  return (
    <Aux>
      <NoteSearch filter={(enteredFilter) => filter(enteredFilter)}/>
      <div className={classes.topicList}>{topicList}</div>
    </Aux>
  )
}

const mapStateToProps = state => {
  return {
    currentTopic: state.note.currentTopic ? state.note.currentTopic : null,
    loadedNotes: state.note.loadedNotes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCurrentNote: (noteId, noteName, subcategoriesId) => dispatch(actions.loadCurrentNote(noteId, noteName, subcategoriesId)),
    replaceCurrentNote: (noteId, noteName, subcategoriesId) => dispatch(actions.replaceCurrentNote(noteId, noteName, subcategoriesId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);