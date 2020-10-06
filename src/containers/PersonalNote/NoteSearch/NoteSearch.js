import React, { useState, useEffect, useRef } from 'react';
import classes from './NoteSearch.module.scss';


const NoteSearch = props => {

  const [filter, setFilter] = useState({enteredFilter: '', untouched: true});
  const inputRef = useRef();

  useEffect(() => {
    if(filter.untouched) return;
    const timer = setTimeout(() => {
      if (filter.enteredFilter === inputRef.current.value) {
        props.filter(filter.enteredFilter);
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter.enteredFilter, inputRef])

  return (<div className={classes.noteSearch}>
    <input className={classes.noteSearch_input} ref={inputRef} 
      placeholder='Search...' 
      onChange={event => setFilter({ enteredFilter: event.target.value, untouched: false })}/>
  </div>)

}

export default NoteSearch;