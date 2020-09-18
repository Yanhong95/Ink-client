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
    // console.log(props);
    switch (props.location.pathname) {
      case '/algorithm': {
        if (!props.algorithmTopics) {
          props.loadTopics('algorithmTopics');
        }
        break;
      }
      case '/javascript': {
        if (!props.javascripTopics) {
          props.loadTopics('javascripTopics');
        }
        break;
      }
      default: break;
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
    algorithmTopics: state.note.algorithmTopics ? state.note.algorithmTopics : null,
    javascripTopics: state.note.javascripTopics ? state.note.javascripTopics : null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadTopics: (type) => dispatch(actions.loadTopics(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalNote);