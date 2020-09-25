import React from 'react';
import ReadNote from './ReadNote';
import { connect } from 'react-redux';
import classes from './CurrentNote.module.scss';
// import * as actions from '../../../store/actions/index';
// import Aux from '../../../higherOrderComponent/Aux/Aux'

const CurrentNote = props => {

  return (
    <div className={classes.note}>
        <div className={classes.note_title}>{props.currentNoteName}</div>
        <ReadNote currentNoteContent={props.currentNote} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentNote: state.note.currentNote ? state.note.currentNote : null,
    currentNoteId: state.note.currentNoteId ? state.note.currentNoteId : null,
    currentNoteName: state.note.currentNoteName ? state.note.currentNoteName : null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // loadCurrentNote: (noteId) => dispatch(actions.loadCurrentNote(noteId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentNote);