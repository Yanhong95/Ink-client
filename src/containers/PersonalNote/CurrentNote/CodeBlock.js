import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism';

const jsList = [ 'react', 'js']

class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
  };

  static defaultProps = {
    language: null
  };

  render() {
    console.log(this.props.language);
    const language = jsList.includes(this.props.language.toLowerCase()) ?  "javascript" : this.props.language ;
    return (
      <SyntaxHighlighter language={language} style={xonokai}>
        {this.props.value}
      </SyntaxHighlighter>
    );
  }
}

export default CodeBlock;