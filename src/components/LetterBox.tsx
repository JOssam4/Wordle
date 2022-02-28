import React  from 'react';
import {Correctness} from '../Main';
import '../styles/LetterBox.css';

interface Props {
  keyboard: boolean;
  correctness: Correctness;
  onClick?: (event: any) => void;
  children?: React.ReactNode;
}


export default function LetterBox(props: Props) {
  if (props.correctness === Correctness.CORRECT) {
    return (
      <div className="letter-box correct" onClick={props.onClick}>
        {props.children}
      </div>
    );
  } else if (props.correctness === Correctness.WRONG_SPOT) {
    return (
      <div className="letter-box wrong-spot" onClick={props.onClick}>
        {props.children}
      </div>
    );
  } else if (props.correctness === Correctness.INCORRECT) {
    // toggle class name switch based on whether or not this component is representing the keyboard or not.
    const classname = (props.keyboard) ? 'letter-box keyboard-box-incorrect' : 'letter-box incorrect';
    return (
      <div className={classname} onClick={props.onClick}>
        {props.children}
      </div>
    )
  } else {
    // toggle class name switch based on whether or not this component is representing the keyboard or not.
    const classname = (props.keyboard) ? 'letter-box keyboard-box-unused' : 'letter-box not-submitted';
    return (
      <div className={classname} onClick={props.onClick}>
        {props.children}
      </div>
    );
  }
}
