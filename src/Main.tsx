import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import LetterBox from './components/LetterBox';
import BoxRow from './components/BoxRow';
import Words from './Words';

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
    return Words[Math.floor(Math.random()*Words.length)];
  }

  function getLetterBoxRow() {
    const ret = [];
    for (let i = 0; i < props.numLetters; ++i) {
      ret.push(
        <LetterBox correctness={Correctness.NOT_SUBMITTED} />
      );
    }
    return ret;
  }

  function getGrid() {
    const ret = [];
    for (let i = 0; i < 6; ++i) {
      /*
      ret.push(
        <Row>
          {getLetterBoxRow()}
        </Row>
      );
       */
      ret.push(
        <BoxRow correctWord={state.word} active={i === 0} numLetters={props.numLetters} key={i} />
      );
    }
    return ret;
  }

  useEffect(() => {
    const word = selectWord();
    setState({ ...state, word, });
  }, []);

  // handle submit. Check correctness.
  /*
  useEffect(() => {
    if (state.rowToWriteTo > 0) {
      const lastRow =
    }
  }, [state.rowToWriteTo])
   */

  function enterHandler() {
    if (state.rowToWriteTo < props.numGuesses) {
      setState({ ...state, rowToWriteTo: state.rowToWriteTo + 1 });
    }
  }

  return (
    <div id="game-content-wrapper">
      <Container>
        {getGrid()}
      </Container>
    </div>
  );

}
