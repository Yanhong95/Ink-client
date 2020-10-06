import React, { useState, useEffect, useRef } from 'react';
import classes from './NoteSearch.module.scss';


const NoteSearch = props => {

  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        props.filter(enteredFilter);
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredFilter, inputRef])

  return (<div className={classes.noteSearch}>
    <input className={classes.noteSearch_input} ref={inputRef} 
      placeholder='Search...' 
      onChange={event => setEnteredFilter(event.target.value)}/>
  </div>)

}

export default NoteSearch;