import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism';


class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
  };

  static defaultProps = {
    language: null
  };

  render() {
    const language = this.props.language !== "react" ? this.props.language: "javascript";
    return (
      <SyntaxHighlighter language={language} style={xonokai}>
        {this.props.value}
      </SyntaxHighlighter>
    );
  }
}

export default CodeBlock;