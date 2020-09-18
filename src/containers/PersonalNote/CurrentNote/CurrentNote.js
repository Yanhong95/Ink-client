import React from 'react';
import NoteTest from './NoteTest'
import classes from './CurrentNote.module.scss'

const CurrentNote = props => {

  return (
    <div className={classes.note}>
        <NoteTest />
    </div>
  )
}

export default CurrentNote;