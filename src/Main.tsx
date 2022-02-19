import React, { useState, useEffect } from 'react';
import BoxRow from './components/BoxRow';
import Keyboard from './components/Keyboard';
import { answers } from './Words';
import './styles/Main.css';

interface Props {
  numLetters: number;
  numGuesses: number;
}

interface State {
  word: string;
  rowToWriteTo: number;
  gameWon: boolean;
  correctLetters: Set<string>; // values in this set will not be removed.
  wrongSpotLetters: Set<string>; // note that values can be removed from this set and placed into correctLetters
  incorrectLetters: Set<string>; // values in this set will not be removed.
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
    gameWon: false,
    correctLetters: new Set<string>(),
    wrongSpotLetters: new Set<string>(),
    incorrectLetters: new Set<string>(),
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
    setState((s: State) => {
      return { ...s, word };
    });
  }, []);

  useEffect(() => {
    if (state.gameWon) {
      alert('You win!');
    }
  }, [state.gameWon])

  /**
   *
   * @param guess
   * @param correctness
   *
   * TODO: Figure out what to do if word has multiple of same letter and one is correct and others aren't
   */
  function updateCorrectness(guess: string, correctness: Correctness[]): void {
    const { correctLetters, wrongSpotLetters, incorrectLetters } = state;
    for (let i = 0; i < props.numLetters; ++i) {
      if (correctness[i] === Correctness.CORRECT) {
        correctLetters.add(guess[i]);
        wrongSpotLetters.delete(guess[i]);
      } else if (correctness[i] === Correctness.WRONG_SPOT) {
        if (!correctLetters.has(guess[i])) {
          wrongSpotLetters.add(guess[i]); // if we already got it correct,
        }
      } else {
        incorrectLetters.add(guess[i]);
      }
    }
    setState({
      ...state,
      correctLetters,
      wrongSpotLetters,
      incorrectLetters,
    });
  }

  function enterHandler(guess: string, correctness: Correctness[]) {
    console.log('correctness:');
    console.dir(correctness);
    updateCorrectness(guess, correctness);
    if (guess === state.word) {
      // Player won.
      // alert('You win!');
      setState({ ...state, gameWon: true, rowToWriteTo: props.numGuesses - 1 });
    } else if (state.rowToWriteTo < props.numGuesses - 1) {
      setState({
        ...state,
        rowToWriteTo: state.rowToWriteTo + 1,
      });
    } else {
      alert(state.word);
    }
  }

  return (
    <div id="game">
      <div id="game-content-wrapper">
        {getGrid()}
      </div>
      <br />
      <Keyboard correctLetters={state.correctLetters} wrongSpotLetters={state.wrongSpotLetters} incorrectLetters={state.incorrectLetters} />
    </div>
  );

}
