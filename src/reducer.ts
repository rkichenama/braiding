import { useReducer } from 'react';
import { BraidingState, defaultValue } from './context';
import { asValue, encBase, newArr } from './util/funcs';
import { serialize } from './hashify';

export type MenuAction = {
  type: string,
  payload?: any
}

type ReducerType = (state: BraidingState, action: MenuAction) => BraidingState;

const hashifyState = (state: BraidingState) => {
  // const { rows, leftBase, rightBase, left, right } = state;
  // location.hash = `#${rows}/${left}/${right}/${
  //   encBase(leftBase, left)
  // }/${
  //   encBase(rightBase, right)
  // }`;
  location.hash = `#${serialize(state)}`;
  return state;
};
export const Actions = {
  changeInputs: 'changeInputs',
  initialzePattern: 'initPattern',
  toggleOver: 'toggleOver',
  replaceState: 'replaceState',
  changeColors: 'changeColors',
  doWeave: 'doWeave',
};
export function patternToMatrix(rows: number, left: number, right: number, lBase: string, rBase: string) {
  const [ leftBase, rightBase ] = [asValue(lBase, left), asValue(rBase, right)];
  const v = newArr(rows, false)
    .map(_ => ([
      newArr(left, true).map((_, i) => leftBase[i % leftBase.length]),
      newArr(right, true).map((_, i) => rightBase[i % rightBase.length])
    ]));
  return v;
}
const Mutations = {
  [Actions.replaceState]: (_, { payload }) => payload as BraidingState,
  [Actions.changeInputs]: (state, { payload }) => {
    // todo: this is lazy
    return Mutations[Actions.initialzePattern](state, { payload });
  },
  [Actions.initialzePattern]: (state, { payload }) => {
    if (!payload) { return state }
    const newState = {
      ...state,
      ...payload,
      weavingRow: defaultValue.weavingRow,
      weavingStrand: defaultValue.weavingStrand,
    };
    const { left, right, rows, rightBase, leftBase, pattern: p } = newState;
    if (p.length != rows) {
      const pattern = patternToMatrix(rows, left, right, leftBase, rightBase);
      return { ...newState, pattern };
    }
    return newState;
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
  },
  [Actions.changeColors]: (state, { payload }) => {
    const { hand, color } = payload;
    let strands: string | number[] = payload.strands;
    if (
      /^(left|right)$/i.test(hand) &&
      (Array.isArray(strands) || /^(all|even|odd)$/i.test(strands))
    ) {
      const newColors = {} as Partial<BraidingState>;
      if (!Array.isArray(strands)) {
        const s = (strands as string);
        strands = /^all$/i.test(s)
          ? newArr(32, 0).map((_, i) => (i + 1))
          : newArr(16, 0).map((_, i) => (
            /^even$/.test(s) ? ((i * 2) + 2) : ((i * 2) + 1)
          ))
      }
      (strands as number[]).forEach((strand) => {
        newColors[`${hand}Clr${strand}`] = color;
      });

      return {
        ...state,
        ...newColors,
      };
    }
    return state;
  },
  [Actions.doWeave]: ({ weavingRow, weavingStrand, ...state }, { payload: { move } }) => {
    const newStrand = (weavingStrand === 'left')
      ? 'right'
      : 'left';
    let newRow = (newStrand === 'left')
      ? (state.rows + weavingRow + move) % state.rows
      : weavingRow;
    const newState = { ...state, weavingRow: newRow, weavingStrand: newStrand };
    return newState;
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
