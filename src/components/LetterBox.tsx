import React  from 'react';
import {Correctness} from '../Main';
import '../styles/LetterBox.css';

interface Props {
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
    return (
      <div className="letter-box incorrect" onClick={props.onClick}>
        {props.children}
      </div>
    )
  } else {
    return (
      <div className="letter-box not-submitted" onClick={props.onClick}>
        {props.children}
      </div>
    );
  }
}
