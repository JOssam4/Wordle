import React from 'react';
import LetterBox from './LetterBox';
import {Correctness} from '../Main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import '../styles/Keyboard.css';

interface Props {
  correctLetters: Set<string>;
  wrongSpotLetters: Set<string>;
  incorrectLetters: Set<string>;
}

export default function Keyboard(props: Props) {
  function handleClick(letter: string) {
    if (letter === 'BACKSPACE') {
      window.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'backspace',
      }));
    } else if (letter === 'ENTER') {
      window.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
      }));
    }
    else {
      console.log(`letter: ${letter}`);
      window.dispatchEvent(new KeyboardEvent('keydown', {
        key: letter,
      }));
    }
  }

  function getTopRow() {
    const ret = [];
    const topRow = 'qwertyuiop'.split('');
    for (const letter of topRow) {
      let correctness;
      if (props.correctLetters.has(letter)) {
        correctness = Correctness.CORRECT;
      } else if (props.wrongSpotLetters.has(letter)) {
        correctness = Correctness.WRONG_SPOT;
      } else if (props.incorrectLetters.has(letter)){
        correctness = Correctness.INCORRECT;
      } else {
        correctness = Correctness.NOT_SUBMITTED;
      }
      ret.push(
        <LetterBox
          correctness={correctness}
          key={letter}
          onClick={() => handleClick(letter)}
          keyboard
        >
          {letter.toUpperCase()}
        </LetterBox>,
      );
    }
    return ret;
  }

  function getMiddleRow() {
    const ret = [];
    const middleRow = 'asdfghjkl'.split('');
    for (const letter of middleRow) {
      let correctness;
      if (props.correctLetters.has(letter)) {
        correctness = Correctness.CORRECT;
      } else if (props.wrongSpotLetters.has(letter)) {
        correctness = Correctness.WRONG_SPOT;
      } else if (props.incorrectLetters.has(letter)){
        correctness = Correctness.INCORRECT;
      } else {
        correctness = Correctness.NOT_SUBMITTED;
      }
      ret.push(
        <LetterBox
          correctness={correctness}
          key={letter}
          onClick={() => handleClick(letter)}
          keyboard={true}
        >
          {letter.toUpperCase()}
        </LetterBox>,
      );
    }
    return ret;
  }

  function getBottomRow() {
    const ret = [];
    const bottomRow = ['ENTER'].concat('zxcvbnm'.split('')); // add enter to lower row.
    for (const letter of bottomRow) {
      let correctness;
      if (props.correctLetters.has(letter)) {
        correctness = Correctness.CORRECT;
      } else if (props.wrongSpotLetters.has(letter)) {
        correctness = Correctness.WRONG_SPOT;
      } else if (props.incorrectLetters.has(letter)){
        correctness = Correctness.INCORRECT;
      } else {
        correctness = Correctness.NOT_SUBMITTED;
      }
      ret.push(
        <LetterBox
          correctness={correctness}
          key={letter}
          onClick={() => handleClick(letter)}
          keyboard={true}
        >
          {letter.toUpperCase()}
        </LetterBox>,
      );
    }
    ret.push(
      <LetterBox
        correctness={Correctness.NOT_SUBMITTED}
        key="back"
        onClick={() => handleClick('BACKSPACE')}
        keyboard={true}
      >
        <FontAwesomeIcon icon={faDeleteLeft} />
      </LetterBox>
    )
    return ret;
  }

  return (
    <div id="keyboard">
      <div className="keyboard-row">
        {getTopRow()}
      </div>
      <div className="keyboard-row">
        {getMiddleRow()}
      </div>
      <div className="keyboard-row">
        {getBottomRow()}
      </div>
    </div>
  );
}
