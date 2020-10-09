import React, { useEffect, useRef, useState } from 'react';
import ReadNote from './ReadNote';
import { connect } from 'react-redux';
import classes from './CurrentNote.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import DeleteBtn from '../../../components/UI/DeleteBtn/DeleteBtn'
import * as actions from '../../../store/actions/index'

const scrollToRef = (myRef) => {
  const myElement = document.getElementById("currNote");
  myElement.scrollTo({ left: 0, top: myRef.current.offsetTop - 100, behavior: 'smooth' });
}
const useMountEffect = (fun) => useEffect(fun, [])


const CurrentNote = props => {
  const [showScrollBtn, SetShowScrollBth] = useState(false);
  const myRef = useRef(null);
  useMountEffect(() => scrollToRef(myRef)) // Scroll on mount

  const onScroll = () => {
    SetShowScrollBth(true);
  }

  const removeNote = () => {
    props.deleteNote(props.currentCategoryId, props.currentNoteId, props.token);
  }

  return (
    <div className={classes.note} id="currNote" onScroll={onScroll}>
      <div className={classes.note_header}>
        <div ref={myRef} className={classes.note_header_title}>{props.currentNoteName}</div>
        {props.isAdmin ? <div className={classes.note_header_remove}>
          <DeleteBtn remove={() => removeNote()} />
        </div> : null}
      </div>
      <ReadNote currentNoteContent={props.currentNote} />
      <button className={showScrollBtn ? classes.scroll : [classes.scroll, classes.hidden]} onClick={() => scrollToRef(myRef)}>
        <FontAwesomeIcon icon={faAngleDoubleUp} color="white" size="2x" />
      </button>
      <div className={classes.note_comment}>
        <div className={classes.note_comment_content}>The comment function is under construction...</div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loadingCurrentNote: state.note.loadingCurrentNote,
    currentNote: state.note.currentNote ? state.note.currentNote : null,
    currentNoteId: state.note.currentNoteId ? state.note.currentNoteId : null,
    currentNoteName: state.note.currentNoteName ? state.note.currentNoteName : null,
    currentCategoryId: state.note.currentCategoryId,
    isAdmin: state.auth.isAdmin,
    token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteNote: (categoryId, noteId, token) => dispatch(actions.deleteNote(categoryId, noteId, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentNote);