import React, { useEffect, useState } from 'react';
import AppMarkdown from '../../../assets/md/169. Majority Element.md';
import ReactMarkdown from 'react-markdown';

const NoteTest = props => {

  const [markdown, SetMarkdown] = useState('');

  useEffect(() => {
    SetMarkdown(props.currentNoteContent);
    // fetch(props.currentNoteContent).then(res => res.text()).then(text => {
    //   // console.log(text);
    
    // });
  }, [props.currentNoteContent])

  return (
     <ReactMarkdown source={markdown} />
  )
}

export default NoteTest;