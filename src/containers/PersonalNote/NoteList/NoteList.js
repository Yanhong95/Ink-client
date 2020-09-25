import React, { useState } from 'react';
import { connect } from 'react-redux';
import classes from './NoteList.module.scss';
import * as actions from '../../../store/actions/index';
import Aux from '../../../higherOrderComponent/Aux/Aux'

const NoteList = props => {

  const [subList, setSubList] = useState([]);
  const [activeNote, setActiveNote] = useState(null);

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

  const loadNote = (noteId) => {
    setActiveNote(noteId);
    props.loadCurrentNote(noteId)
  }

  let topicList = null;
  if (props.currentTopic) {
    topicList = props.currentTopic.map(subcategories => {
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
                  onClick={() => loadNote(note._id)}
                  >
                  <div className={classes.topicList_topic_note_text}>
                  <p className={activeNote === note._id ? classes.topicList_topic_note_text_active : null}>{note.name}</p>
                  </div>
                </div>
              );
            })
            : null
          }
        </Aux>
      );
    });
  }

  return (
    <div className={classes.topicList}>{topicList}</div>
  )
}

const mapStateToProps = state => {
  return {
    currentTopic: state.note.currentTopic ? state.note.currentTopic : null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCurrentNote: (noteId) => dispatch(actions.loadCurrentNote(noteId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);