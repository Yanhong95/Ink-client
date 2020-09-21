import React, { useEffect } from 'react';
import NoteList from './NoteList/NoteList'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import CurrentNote from './CurrentNote/CurrentNote'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './PersonalNote.module.scss';
//import Aux from '../../higherOrderComponent/Aux/Aux';
//import { useDispatch, useSelector } from 'react-redux';


const PersonalNote = props => {

  useEffect(() => {
    const pathname = props.location.pathname;
    const currentTopic = pathname.split('/')[1];
    if (!props[currentTopic]) {
      props.loadTopic(currentTopic);
    }else{
      props.changeToCurrentTopic(currentTopic);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.pathname]);


  let leftNav;
  if (props.loadingTopics) {
    leftNav = <Spinner />
  } else {
    leftNav = <NoteList />
  }

  let rightNav;
  if (props.loadingCurrentNote) {
    rightNav = <div className={classes.note_right_spinner} ><Spinner /></div>
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadTopic: (type) => dispatch(actions.loadTopic(type)),
    changeToCurrentTopic: (type) => dispatch(actions.changeToCurrentTopic(type))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalNote);