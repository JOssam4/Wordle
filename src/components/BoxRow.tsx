import React, {useEffect, useState} from 'react';
import LetterBox from './LetterBox';
import {Correctness} from '../Main';
import '../styles/BoxRow.css';
import {possible} from '../Words';

interface Props {
  correctWord: string;
  active: boolean;
  numLetters: number;
  enterHandler: Function;
}

interface State {
  guess: string;
  readonly: boolean;
  correctness: Correctness[];
}

export default function BoxRow(props: Props) {
  const [state, setState] = useState<State>({
    guess: '',
    readonly: false,
    correctness: Array(props.numLetters).fill(Correctness.NOT_SUBMITTED),
  });

  function checkCorrectness(guess: string, answer: string): Correctness[] {
    const guessArr = guess.split('');
    const answerLetterCount = new Map<string, number>();
    for (const letter of answer) {
      const val = answerLetterCount.get(letter) ?? 0;
      answerLetterCount.set(letter, val + 1);
    }
    /*
    return guessArr.map((letter: string, index: number) => {
      if (letter === answer[index]) {
        return Correctness.CORRECT;
      } else {
        const count = answerLetterCount.get(letter) ?? 0;
        if (count > 0) {
          answerLetterCount.set(letter, count - 1);
          return Correctness.WRONG_SPOT;
        } else {
          return Correctness.INCORRECT;
        }
      }
    })
    */
    const greens = guessArr.map((letter: string, index: number) => {
      if (letter === answer[index]) {
        const count = answerLetterCount.get(letter) ?? 0;
        answerLetterCount.set(letter, count - 1); // TODO: figure out if we can assume that count > 0.
        return Correctness.CORRECT;
      } else {
        return Correctness.NOT_SUBMITTED;
      }
    });
    const yellowsAndBlacks = guessArr.map((letter: string, index: number) => {
      if (greens[index] === Correctness.CORRECT) {
        return Correctness.CORRECT;
      } else {
        const count = answerLetterCount.get(letter) ?? 0;
        if (count > 0) {
          answerLetterCount.set(letter, count - 1);
          return Correctness.WRONG_SPOT;
        } else {
          return Correctness.INCORRECT;
        }
      }
    });
    return yellowsAndBlacks;
  }

  function keyHandler(e: KeyboardEvent) {
    if (/[a-zA-Z]/.test(e.key) && e.key.length === 1 && state.guess.length < props.numLetters) {
      const newGuess = state.guess + e.key;
      setState({ ...state, guess: newGuess });
    } else if (e.code === 'Enter') {
      if (state.guess.length === props.numLetters && possible.has(state.guess)) {
        const correctness = checkCorrectness(state.guess, props.correctWord);
        setState({...state, readonly: true, correctness });
        props.enterHandler();
      } else if (!possible.has(state.guess)) {
        alert('not in word list');
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
        <LetterBox correctness={state.correctness[i]} key={i}>{letter}</LetterBox>
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
