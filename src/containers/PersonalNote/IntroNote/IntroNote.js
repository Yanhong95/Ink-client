import React from 'react';
import Aux from "../../../higherOrderComponent/Aux/Aux";
import classes from './IntroNote.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, } from '@fortawesome/free-solid-svg-icons';
import { faReact, faNodeJs, faJsSquare, } from '@fortawesome/free-brands-svg-icons'


const IntroNode = (props) => {
  console.log(props.currentPath);
  const path = props.currentPath;
  return (
    <Aux>
      <div className={classes.introduction}>
        <div className={classes.introduction_title}> Introduction:</div>
        <div className={classes.introduction_summary}>The purpose of developing the website is to enjoy the fun of dynamic design, to polish and improve my React and Nodejs Skills as well. 
        In addition, for me to have a place to post my daily notes about the algorithm problems I solved, some technical notes, and experiences.</div>
        <ul>
          <li className={path === 'algorithm' ? classes.active : null}><FontAwesomeIcon icon={faRocket} color="white" size="2x" /><p>Algorithm related, including questions, data structure, and basic functions. </p></li>
          <li className={path === 'javascript' ? classes.active : null}><FontAwesomeIcon icon={faJsSquare} color="white" size="2x" /><p>JavaScript related, including basic DOM manipulation, Event loop, Closures, build-in functions, etc.</p></li>
          <li className={path === 'nodejs' ? classes.active : null}><FontAwesomeIcon icon={faNodeJs} color="white" size="2x" /><p>Nodejs related, including Express, REST API, GraphQl, database, validation, etc.</p></li>
          <li className={path === 'react' ? classes.active : null}><FontAwesomeIcon icon={faReact} color="white" size="2x" /><p>React related, including classical React, React Hook, Redux, Routing, etc.</p></li>
        </ul>
      </div>
    </Aux>
  )
}

export default IntroNode;
