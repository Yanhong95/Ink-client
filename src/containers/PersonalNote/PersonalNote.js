import React, { useEffect } from 'react';
import NoteList from './NoteList/NoteList'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import CurrentNote from './CurrentNote/CurrentNote'
import SpinnerCircle from '../../components/UI/Spinner/SpinnerCircle'
import classes from './PersonalNote.module.scss';
//import Aux from '../../higherOrderComponent/Aux/Aux';
//import { useDispatch, useSelector } from 'react-redux';


const PersonalNote = props => {

  useEffect(() => {
    const pathname = props.location.pathname;
    const currentTopic = pathname.split('/')[1];
    console.log(currentTopic);
    if (!props[currentTopic] || props.updatedtopics.includes(currentTopic)) {
      props.loadTopic(currentTopic);
      props.finishedPageUpdate(currentTopic);
    }else{
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
    rightNav = <SpinnerCircle/>
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
    updatedtopics: state.update.updatedtopics 
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