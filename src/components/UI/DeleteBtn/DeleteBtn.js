import React from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Button from '../Button/Button'
import './DeleteBtn.css'

const DeleteBtn = props => {
  const [state, setState] = React.useState(true);
  return (
      <div className="main">
        <SwitchTransition mode={"out-in"}>
          <CSSTransition
            key={state}
            addEndListener={(node, done) => { node.addEventListener("transitionend", done, false); }}
            classNames="fade">
            <div className="button-container">
              <div className="container">
                {state ? <Button btnType="warning" clicked={() => setState(state => !state)} >Remove</Button> : 
                <><Button btnType="danger" clicked={props.remove}>Execute</Button>&ensp;<Button btnType="safe" clicked={() => setState(state => !state)}>Revoke</Button></> }
              </div>

            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
  );
}

export default DeleteBtn;
