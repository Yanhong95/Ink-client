import React, { Component } from 'react';
import AppMarkdown from '../../../assets/md/169. Majority Element.md';
import ReactMarkdown from 'react-markdown';

class NoteTest extends Component {

  constructor() {
    super();
    this.state = { markdown: '' };
  }

  componentDidMount() {
    // Get the contents from the Markdown file and put them in the React state, so we can reference it in render() below.
    fetch(AppMarkdown).then(res => res.text()).then(text => {
      // console.log(text);
      this.setState({ markdown: text })
    });
  }

  render() {
    const { markdown } = this.state;
    return <ReactMarkdown source={markdown} />;
  }
}

export default NoteTest;