import React, { useState } from 'react';
import { connect } from 'react-redux';
import classes from './NoteList.module.scss';
import * as actions from '../../../store/actions/index';
import Aux from '../../../higherOrderComponent/Aux/Aux'

const NoteList = props => {

  const [subList, setSubList] = useState([]);

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
            subcategories.notes.map(note=> {
              // onClick={() => props.loadCurrentNote(note._id)}
              return (
                <div key={note._id} className={classes.topicList_topic_note} >
                  <div className={classes.topicList_topic_note_text}>
                    {note.name}
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