import React, { useEffect, useState } from 'react';
import LetterBox from './LetterBox';
import {Correctness} from '../Main';
import '../styles/BoxRow.css';

interface Props {
  correctWord: string;
  active: boolean;
  numLetters: number;
  enterHandler: Function;
}

interface State {
  guess: string;
  readonly: boolean;
}

export default function BoxRow(props: Props) {
  const [state, setState] = useState<State>({
    guess: '',
    readonly: false,
  });

  function keyHandler(e: KeyboardEvent) {
    if (/[a-zA-Z]/.test(e.key) && e.key.length === 1 && state.guess.length < props.numLetters) {
      const newGuess = state.guess + e.key;
      setState({ ...state, guess: newGuess });
    } else if (e.code === 'Enter') {
      if (state.guess.length === props.numLetters) {
        setState({...state, readonly: true});
        props.enterHandler();
      } else {
        alert('Not enough letters');
      }
    } else if (e.code === 'Backspace') {
      const newGuess = state.guess.substring(0, state.guess.length - 1);
      setState({ ...state, guess: newGuess });
    } else {
      console.log(`e.key: ${e.key}`);
      console.log(`/a-zA-Z/.test(e.key): ${/[a-zA-Z]/.test(e.key)} e.key.length: ${e.key.length}`);

    }
  }

  useEffect(() => {
    if (props.active) {
      window.addEventListener('keydown', keyHandler);
    }
    return () => window.removeEventListener('keydown', keyHandler);
  }, [props.active, state.guess]);

  function getBoxes() {
    const ret: JSX.Element[] = [];
    for (let i = 0; i < props.numLetters; ++i) {
      const letter = state.guess[i] ?? '';
      ret.push(
        <LetterBox correctness={Correctness.NOT_SUBMITTED} key={i}>{letter}</LetterBox>
      );
    }
    return ret;
  }

  return (
    <div className="game-row">
      {getBoxes()}
    </div>
  );
}
