import { useReducer } from 'react';
import { BraidingState } from './context';
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
const Mutations = {
  [Actions.replaceState]: (_, { payload }) => payload as BraidingState,
  [Actions.changeInputs]: (state, { payload }) => {
    const newState = { ...state, ...payload };
    // window.setTimeout(() => state.dispatch({ type: Actions.initialzePattern }), 200);
    return Mutations[Actions.initialzePattern](newState);
  },
  [Actions.initialzePattern]: (state, { payload } = { payload: {} }) => {
    const newState = { ...state, ...payload };
    const { left, right, rows, rightBase: rBase, leftBase: lBase } = newState;
    const [ leftBase, rightBase ] = [lBase, rBase].map(base => asValue(base));
    const pattern = newArr(rows, false)
      .map(_ => ([
        newArr(left, true).map((_, i) => leftBase[i % leftBase.length]),
        newArr(right, true).map((_, i) => rightBase[i % rightBase.length])
      ]));
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

const initializer = ({
  rows = 24,
  left = 12,
  right = 12,
  leftClr01 = '#333333',
  leftClr02 = '#333333',
  leftClr03 = '#333333',
  leftClr04 = '#333333',
  leftClr05 = '#333333',
  leftClr06 = '#333333',
  leftClr07 = '#333333',
  leftClr08 = '#333333',
  leftClr09 = '#333333',
  leftClr10 = '#333333',
  leftClr11 = '#333333',
  leftClr12 = '#333333',
  leftClr13 = '#333333',
  leftClr14 = '#333333',
  leftClr15 = '#333333',
  leftClr16 = '#333333',
  leftClr17 = '#333333',
  leftClr18 = '#333333',
  leftClr19 = '#333333',
  leftClr20 = '#333333',
  leftClr21 = '#333333',
  leftClr22 = '#333333',
  leftClr23 = '#333333',
  leftClr24 = '#333333',
  leftClr25 = '#333333',
  leftClr26 = '#333333',
  leftClr27 = '#333333',
  leftClr28 = '#333333',
  leftClr29 = '#333333',
  leftClr30 = '#333333',
  leftClr31 = '#333333',
  leftClr32 = '#333333',
  rightClr01 = '#088',
  rightClr02 = '#088',
  rightClr03 = '#088',
  rightClr04 = '#088',
  rightClr05 = '#088',
  rightClr06 = '#088',
  rightClr07 = '#088',
  rightClr08 = '#088',
  rightClr09 = '#088',
  rightClr10 = '#088',
  rightClr11 = '#088',
  rightClr12 = '#088',
  rightClr13 = '#088',
  rightClr14 = '#088',
  rightClr15 = '#088',
  rightClr16 = '#088',
  rightClr17 = '#088',
  rightClr18 = '#088',
  rightClr19 = '#088',
  rightClr20 = '#088',
  rightClr21 = '#088',
  rightClr22 = '#088',
  rightClr23 = '#088',
  rightClr24 = '#088',
  rightClr25 = '#088',
  rightClr26 = '#088',
  rightClr27 = '#088',
  rightClr28 = '#088',
  rightClr29 = '#088',
  rightClr30 = '#088',
  rightClr31 = '#088',
  rightClr32 = '#088',
  leftBase = 'u4 o4',
  rightBase = 'u4 o4',
  pattern = [[], []]
}: BraidingState) => ({
  rows, left, right, leftBase, rightBase, pattern,
  leftClr01, leftClr02, leftClr03, leftClr04, leftClr05, leftClr06, leftClr07, leftClr08, leftClr09, leftClr10, leftClr11, leftClr12, leftClr13, leftClr14, leftClr15, leftClr16, leftClr17, leftClr18, leftClr19, leftClr20, leftClr21, leftClr22, leftClr23, leftClr24, leftClr25, leftClr26, leftClr27, leftClr28, leftClr29, leftClr30, leftClr31, leftClr32,
  rightClr01, rightClr02, rightClr03, rightClr04, rightClr05, rightClr06, rightClr07, rightClr08, rightClr09, rightClr10, rightClr11, rightClr12, rightClr13, rightClr14, rightClr15, rightClr16, rightClr17, rightClr18, rightClr19, rightClr20, rightClr21, rightClr22, rightClr23, rightClr24, rightClr25, rightClr26, rightClr27, rightClr28, rightClr29, rightClr30, rightClr31, rightClr32,
} as BraidingState);

const reducer = (state, action) => {
  const mutation = Mutations[action.type];
  if (mutation) {
    return hashifyState(mutation(state, action))
  }
  return state;
};

export const useBraidingReducer = (init?: BraidingState) => useReducer<ReducerType, BraidingState>(reducer, init, initializer);
