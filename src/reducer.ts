import { useReducer } from 'react';
import { BraidingState, defaultValue } from './context';
import { asValue, encBase, newArr } from './util/funcs';

export type MenuAction = {
  type: string,
  payload?: any
}

type ReducerType = (state: BraidingState, action: MenuAction) => BraidingState;

const hashifyState = (state: BraidingState) => {
  const { rows, leftBase, rightBase, left, right } = state;
  location.hash = `#${rows}/${left}/${right}/${
    encBase(leftBase, left)
  }/${
    encBase(rightBase, right)
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
  const [ leftBase, rightBase ] = [asValue(lBase, left), asValue(rBase, right)];
  const v = newArr(rows, false)
    .map(_ => ([
      newArr(left, true).map((_, i) => leftBase[i % leftBase.length]),
      newArr(right, true).map((_, i) => rightBase[i % rightBase.length])
    ]));
  console.warn({left, right, leftBase, rightBase, v, b:newArr(left, true).map((_, i) => leftBase[i % leftBase.length])})
  return v;
}
const Mutations = {
  [Actions.replaceState]: (_, { payload }) => payload as BraidingState,
  [Actions.changeInputs]: (state, { payload }) => {
    const newState = { ...state, ...payload };
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
