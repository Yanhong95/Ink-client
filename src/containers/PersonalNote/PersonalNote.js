import React, { useEffect, useState } from 'react';
import NoteList from './NoteList/NoteList'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import CurrentNote from './CurrentNote/CurrentNote'
import SpinnerCircle from '../../components/UI/Spinner/SpinnerCircle'
import classes from './PersonalNote.module.scss';
import IntroNote from './IntroNote/IntroNote'
import useWindowSize from '../../shared/hook/useWindowSize'
import Aux from "../../higherOrderComponent/Aux/Aux";
import Backdrop from "../../components/UI/Backdrop/Backdrop"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

const PersonalNote = props => {

  const [showNoteList, setShowNoteList] = useState(true);
  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    const pathname = props.location.pathname;
    const currentTopic = pathname.split('/')[1];
    if (!props[currentTopic] || props.updatedtopics.includes(currentTopic)) {
      props.loadTopic(currentTopic);
      props.finishedPageUpdate(currentTopic);
    } else {
      props.changeToCurrentTopic(currentTopic);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.pathname]);


  const size = useWindowSize();
  useEffect(() => {
    if (size.width < 600) {
      setShowNoteList(false);
      setSmallScreen(true)
    }else{
      setShowNoteList(true);
      setSmallScreen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.width]);


  const closeleftNav = () => {
    setShowNoteList(false)
  }

  const openNoteList = () => {
    setShowNoteList(true);
  }

  let leftNav;
  if (smallScreen) {
    leftNav =
      <Aux>
        <NoteList currentPath={props.location.pathname.split('/')[1]}/>
        <Backdrop show={showNoteList} position={{left: 0, top: 0}} clicked={closeleftNav} />
      </Aux>
  } else {
    if (props.loadingTopics) {
      leftNav = <div className={classes.note_left_spinner}><SpinnerCircle /></div>
    } else {
      leftNav = <NoteList currentPath={props.location.pathname.split('/')[1]} />
    }
  }

  let rightNav;
  if (props.loadingCurrentNote) {
    rightNav = <SpinnerCircle />
  } else if (!props.currentNoteId || props.error) {
    rightNav = <IntroNote currentPath={props.location.pathname.split('/')[1]} />
  } else {
    rightNav = <CurrentNote />
  }

  return (
    <div className={classes.note}>
      { !smallScreen ? <div className={classes.note_left}>{leftNav}</div> 
      : showNoteList ? <div className={classes.note_left}>{leftNav}</div> : null }
      { smallScreen ?
        <button className={classes.note_triggerBtn} onClick={() => openNoteList()}>
          <FontAwesomeIcon icon={faAngleDoubleRight} color="white" size="2x" />
        </button>
        : null}
      <div className={classes.note_right}>{rightNav}</div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loadingTopics: state.note.loadingTopics,
    loadingCurrentNote: state.note.loadingCurrentNote,
    error: state.note.error,
    algorithm: state.note.algorithm ? state.note.algorithm : null,
    javascript: state.note.javascript ? state.note.javascript : null,
    react: state.note.react ? state.note.react : null,
    nodejs: state.note.nodejs ? state.note.nodejs : null,
    updatedtopics: state.update.updatedtopics,
    currentNoteId: state.note.currentNoteId ? state.note.currentNoteId : null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadTopic: (topic) => dispatch(actions.loadTopic(topic)),
    changeToCurrentTopic: (topic) => dispatch(actions.changeToCurrentTopic(topic)),
    finishedPageUpdate: (topic) => dispatch(actions.finishedPageUpdate(topic)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalNote);