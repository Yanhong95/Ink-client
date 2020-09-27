import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from "./CodeBlock";

const NoteTest = props => {

  const [markdown, SetMarkdown] = useState('');

  useEffect(() => {
    SetMarkdown(props.currentNoteContent);
    // fetch(props.currentNoteContent).then(res => res.text()).then(text =>  setMarkdown(text))};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentNoteContent])

  return (
     <ReactMarkdown source={markdown}  renderers={{ code: CodeBlock }} />
  )
}

export default NoteTest;