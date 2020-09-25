import React from 'react';
import NoteTest from './NoteTest';
import { connect } from 'react-redux';
import classes from './CurrentNote.module.scss';
// import * as actions from '../../../store/actions/index';
// import Aux from '../../../higherOrderComponent/Aux/Aux'

const CurrentNote = props => {

  return (
    <div className={classes.note}>
        <NoteTest currentNoteContent={props.currentNote} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentNote: state.note.currentNote ? state.note.currentNote : null,
    currentNoteId: state.note.currentNoteId ? state.note.currentNoteId : null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // loadCurrentNote: (noteId) => dispatch(actions.loadCurrentNote(noteId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentNote);