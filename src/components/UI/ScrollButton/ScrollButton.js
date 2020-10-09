import React, {Component} from 'react';
import classes from './ScrollButton.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';

class ScrollButton extends Component {
  
  constructor() {
    super();
    this.state = {
      intervalId: 0
    };
  }

  scrollStep() {
    // console.log(this.props.scrollStepInPx);
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    // window.scrollTo({ top: 400, behavior: 'smooth'})
  }

  scrollToTop() {
    // console.log(window.pageYOffset);
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }

  render() {
    return <button className={classes.scroll} onClick={this.props.click }>
      <FontAwesomeIcon icon={faAngleDoubleUp} color="white" size="2x" />
    </button>;
  }
} 

export default ScrollButton;