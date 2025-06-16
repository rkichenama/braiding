import { useReducer } from 'react';
import { BraidingState, defaultValue } from './context';
import { asValue, asWord, newArr } from './util/funcs';

export type MenuAction = {
  type: string,
  payload?: any
}

type ReducerType = (state: BraidingState, action: MenuAction) => BraidingState;

const hashifyState = (state: BraidingState) => {
  const { rows, leftBase, rightBase, left, right } = state;
  location.hash = `#${rows}/${left}/${right}/${
    asValue(leftBase).map(v => Number(v)).join('')
  }/${
    asValue(rightBase).map(v => Number(v)).join('')
  }`;
  return state;
};
export const Actions = {
  changeInputs: 'changeInputs',
  initialzePattern: 'initPattern',
  toggleOver: 'toggleOver',
  replaceState: 'replaceState'
};
export function patternToMatrix(rows: number, left: number, right: number, lBase: string, rBase: string) {
  const [ leftBase, rightBase ] = [lBase, rBase].map(base => asValue(base));
  return newArr(rows, false)
    .map(_ => ([
      newArr(left, true).map((_, i) => leftBase[i % leftBase.length]),
      newArr(right, true).map((_, i) => rightBase[i % rightBase.length])
    ]));
}
const Mutations = {
  [Actions.replaceState]: (_, { payload }) => payload as BraidingState,
  [Actions.changeInputs]: (state, { payload }) => {
    const newState = { ...state, ...payload };
    // window.setTimeout(() => state.dispatch({ type: Actions.initialzePattern }), 200);
    return Mutations[Actions.initialzePattern](newState);
  },
  [Actions.initialzePattern]: (state, { payload } = { payload: {} }) => {
    const newState = { ...state, ...payload };
    const { left, right, rows, rightBase, leftBase } = newState;
    const pattern = patternToMatrix(rows, left, right, leftBase, rightBase);
    return { ...newState, pattern };
  },
  [Actions.toggleOver]: (state, { payload }) => {
    const { row, side, nub, over } = payload;
    return {
      ...state,
      pattern: state.pattern.map(
        (line, r) => line.map(
          (hand, s) => hand.map(
            (cross, n) => (
              r === row && s === side && n === nub
                ? over
                : cross
            )
          )
        )
      )
    };
  }
}

const initializer = () => (defaultValue);

const reducer = (state, action) => {
  const mutation = Mutations[action.type];
  if (mutation) {
    return hashifyState(mutation(state, action))
  }
  return state;
};

export const useBraidingReducer = (init?: BraidingState) => useReducer<ReducerType, BraidingState>(reducer, init, initializer);
