import React, { useState, useEffect } from 'react';
import BoxRow from './components/BoxRow';
import { answers } from './Words';

interface Props {
  numLetters: number;
  numGuesses: number;
}

interface State {
  word: string;
  rowToWriteTo: number;
}

export enum Correctness {
  NOT_SUBMITTED,
  INCORRECT,
  WRONG_SPOT,
  CORRECT,
}

export default function Main(props: Props) {
  const [state, setState] = useState<State>({
    word: '',
    rowToWriteTo: 0,
  });
  function selectWord() {
    return answers[Math.floor(Math.random()*answers.length)];
  }

  function getGrid() {
    const ret = [];
    for (let i = 0; i < 6; ++i) {
      ret.push(
        <BoxRow
          correctWord={state.word}
          active={state.rowToWriteTo === i}
          numLetters={props.numLetters}
          enterHandler={enterHandler}
          key={i} />
      );
    }
    return ret;
  }

  useEffect(() => {
    const word = selectWord();
    // setState({ ...state, word });
    setState((s: State) => {
      return { ...s, word };
    });
  }, []);

  function enterHandler() {
    if (state.rowToWriteTo < props.numGuesses) {
      setState({ ...state, rowToWriteTo: state.rowToWriteTo + 1 });
    }
  }

  return (
    <div id="game-content-wrapper">
      {getGrid()}
    </div>
  );

}
