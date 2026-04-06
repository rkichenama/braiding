import { useReducer, Reducer } from 'react';
import { BraidingState, defaultValue, SavedPattern } from './context';
import { asValue, newArr } from './util/funcs';
import { serialize } from './hashify';

export type MenuAction = {
  type: string,
  payload?: any
}

const hashifyState = (state: BraidingState) => {
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
  saveToHistory: 'saveToHistory',
  deleteFromHistory: 'deleteFromHistory',
};

export function patternToMatrix(rows: number, left: number, right: number, lBase: string, rBase: string): boolean[][][] {
  const [leftBase, rightBase] = [asValue(lBase, left), asValue(rBase, right)];
  return newArr(rows, false).map(() => ([
    newArr(left, true).map((_, i) => leftBase[i % leftBase.length]),
    newArr(right, true).map((_, i) => rightBase[i % rightBase.length])
  ])) as boolean[][][];
}

const Mutations: Record<string, (state: BraidingState, action: MenuAction) => BraidingState> = {
  [Actions.replaceState]: (state, { payload }) => ({ ...state, ...payload }),
  [Actions.changeInputs]: (state, { payload }) => {
    const newState = {
      ...state,
      ...payload,
      weavingRow: defaultValue.weavingRow,
      weavingStrand: defaultValue.weavingStrand,
    };
    const { left, right, rows, rightBase, leftBase } = newState;
    const pattern = patternToMatrix(rows, left, right, leftBase, rightBase);
    return { ...newState, pattern };
  },
  [Actions.initialzePattern]: (state, { payload }) => {
    if (!payload) return state;
    const newState = {
      ...state,
      ...payload,
      weavingRow: defaultValue.weavingRow,
      weavingStrand: defaultValue.weavingStrand,
    };
    const { left, right, rows, rightBase, leftBase, pattern: p } = newState;
    if (p.length !== rows) {
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
    const isLeft = hand.toLowerCase() === 'left';
    const currentColors = isLeft ? [...state.leftColors] : [...state.rightColors];

    if (Array.isArray(strands) || /^(all|even|odd)$/i.test(strands)) {
      if (!Array.isArray(strands)) {
        const s = strands as string;
        strands = /^all$/i.test(s)
          ? newArr(32, 0).map((_, i) => (i + 1))
          : newArr(16, 0).map((_, i) => (
            /^even$/.test(s) ? ((i * 2) + 2) : ((i * 2) + 1)
          ))
      }
      
      (strands as number[]).forEach((strand) => {
        if (strand >= 1 && strand <= 32) {
          currentColors[strand - 1] = color;
        }
      });

      return {
        ...state,
        [isLeft ? 'leftColors' : 'rightColors']: currentColors,
      };
    }
    return state;
  },
  [Actions.doWeave]: ({ weavingRow, weavingStrand, rows, ...state }, { payload: { move } }) => {
    const newStrand = (weavingStrand === 'left') ? 'right' : 'left';
    let newRow = weavingRow;
    if (newStrand === 'left') {
      newRow = (rows + weavingRow + move) % rows;
    }
    return { ...state, weavingRow: newRow, weavingStrand: newStrand, rows };
  },
  [Actions.saveToHistory]: (state, { payload: { name } }) => {
    const newPattern: SavedPattern = {
      id: Date.now().toString(),
      name: name || `Pattern ${state.history.length + 1}`,
      pattern: serialize(state),
      timestamp: Date.now(),
    };
    return {
      ...state,
      history: [newPattern, ...state.history]
    };
  },
  [Actions.deleteFromHistory]: (state, { payload: { id } }) => {
    return {
      ...state,
      history: state.history.filter(p => p.id !== id)
    };
  }
};

const reducer: Reducer<BraidingState, MenuAction> = (state, action) => {
  const mutation = Mutations[action.type];
  if (mutation) {
    const newState = mutation(state, action);
    return hashifyState(newState);
  }
  return state;
};

export const useBraidingReducer = (init: BraidingState) => useReducer(reducer, init);
