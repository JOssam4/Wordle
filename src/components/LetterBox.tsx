import React, { forwardRef } from 'react';
import {Correctness} from '../Main';
import '../styles/LetterBox.css';

interface Props {
  correctness: Correctness;
  children?: React.ReactNode;
}


export default function LetterBox(props: Props) {
  if (props.correctness === Correctness.CORRECT) {
    return (
      <div className="letter-box correct">
        {props.children}
      </div>
    );
  } else if (props.correctness === Correctness.WRONG_SPOT) {
    return (
      <div className="letter-box wrong-spot">
        {props.children}
      </div>
    );
  } else if (props.correctness === Correctness.INCORRECT) {
    return (
      <div className="letter-box incorrect">
        {props.children}
      </div>
    )
  } else {
    return (
      <div className="letter-box not-submitted">
        {props.children}
      </div>
    );
  }
}
