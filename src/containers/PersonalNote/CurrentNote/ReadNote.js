import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from "./CodeBlock";

const NoteTest = props => {

  const [markdown, SetMarkdown] = useState('');

  useEffect(() => {
    SetMarkdown(props.currentNoteContent);
    // fetch(props.currentNoteContent).then(res => res.text()).then(text =>  setMarkdown(text))};
  }, [props.currentNoteContent])

  return (
     <ReactMarkdown source={markdown}  renderers={{ code: CodeBlock, language: 'java' }} />
  )
}

export default NoteTest;