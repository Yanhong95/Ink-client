import React, { useEffect } from 'react';
import NoteList from './NoteList/NoteList'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import CurrentNote from './CurrentNote/CurrentNote'
import SpinnerCircle from '../../components/UI/Spinner/SpinnerCircle'
import classes from './PersonalNote.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, } from '@fortawesome/free-solid-svg-icons';
import { faReact, faNodeJs, faJsSquare, } from '@fortawesome/free-brands-svg-icons'

//import Aux from '../../higherOrderComponent/Aux/Aux';
//import { useDispatch, useSelector } from 'react-redux';


const PersonalNote = props => {

  useEffect(() => {
    const pathname = props.location.pathname;
    const currentTopic = pathname.split('/')[1];
    if (!props[currentTopic] || props.updatedtopics.includes(currentTopic)) {
      props.loadTopic(currentTopic);
      props.finishedPageUpdate(currentTopic);
    } else {
      console.log('here');
      props.changeToCurrentTopic(currentTopic);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.pathname]);


  let leftNav;
  if (props.loadingTopics) {
    leftNav = <div className={classes.note_left_spinner}><SpinnerCircle /></div>
  } else {
    leftNav = <NoteList />

  }

  let rightNav;
  if (props.loadingCurrentNote) {
    rightNav = <SpinnerCircle />
  } else if (!props.currentNoteId || props.error) {
    rightNav = (
      <div className={classes.note_right_introduction}>
        <div className={classes.note_right_introduction_title}> Introduction:</div>
        <div className={classes.note_right_introduction_summary}>The purpose of developing the website is to enjoy the fun of dynamic design, to polish and improve my React and Nodejs Skills as well.
        In addition, for me to have a place to post my daily notes about the algorithm problems I solved, some technical notes, and experience.</div>
        <ul>
          <li><FontAwesomeIcon icon={faRocket} color="white" size="2x" /><p>Algorithm related, including questions, data structure, and basic functions. </p></li>
          <li><FontAwesomeIcon icon={faJsSquare} color="white" size="2x" /><p>JavaScript related, including basic DOM manipulation, Event loop, Closures, build-in functions, etc.</p></li>
          <li><FontAwesomeIcon icon={faNodeJs} color="white" size="2x" /><p>Nodejs related, including Express, REST API, GraphQl, database, validation, etc.</p></li>
          <li><FontAwesomeIcon icon={faReact} color="white" size="2x" /><p>React related, including classical React, React Hook, Redux, Routing, etc.</p></li>
        </ul>
      </div>
    )
  } else {
    rightNav = <CurrentNote />
  }

  return (
    <div className={classes.note}>
      <div className={classes.note_left}>{leftNav}</div>
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