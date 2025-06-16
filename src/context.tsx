import React, { useMemo } from 'react';
import { MenuAction, useBraidingReducer, Actions } from './reducer';
import { asString } from './util/funcs';

export type BraidingState = {
  leftClr01: string,
  leftClr02: string,
  leftClr03: string,
  leftClr04: string,
  leftClr05: string,
  leftClr06: string,
  leftClr07: string,
  leftClr08: string,
  leftClr09: string,
  leftClr10: string,
  leftClr11: string,
  leftClr12: string,
  leftClr13: string,
  leftClr14: string,
  leftClr15: string,
  leftClr16: string,
  leftClr17: string,
  leftClr18: string,
  leftClr19: string,
  leftClr20: string,
  leftClr21: string,
  leftClr22: string,
  leftClr23: string,
  leftClr24: string,
  leftClr25: string,
  leftClr26: string,
  leftClr27: string,
  leftClr28: string,
  leftClr29: string,
  leftClr30: string,
  leftClr31: string,
  leftClr32: string,
  rightClr01: string,
  rightClr02: string,
  rightClr03: string,
  rightClr04: string,
  rightClr05: string,
  rightClr06: string,
  rightClr07: string,
  rightClr08: string,
  rightClr09: string,
  rightClr10: string,
  rightClr11: string,
  rightClr12: string,
  rightClr13: string,
  rightClr14: string,
  rightClr15: string,
  rightClr16: string,
  rightClr17: string,
  rightClr18: string,
  rightClr19: string,
  rightClr20: string,
  rightClr21: string,
  rightClr22: string,
  rightClr23: string,
  rightClr24: string,
  rightClr25: string,
  rightClr26: string,
  rightClr27: string,
  rightClr28: string,
  rightClr29: string,
  rightClr30: string,
  rightClr31: string,
  rows: number,
  left: number,
  right: number,
  leftBase: string,
  rightBase: string,
  rightClr32: string,
  pattern: [ string[], string[] ]
}
interface BraidingType extends BraidingState {
  dispatch?: React.Dispatch<MenuAction>,
  styleVariables?: React.CSSProperties,
}
export const defaultValue = {
  rows: 32,
  left: 8,
  right: 8,
  leftClr01: '#333333',
  leftClr02: '#333333',
  leftClr03: '#333333',
  leftClr04: '#333333',
  leftClr05: '#333333',
  leftClr06: '#333333',
  leftClr07: '#333333',
  leftClr08: '#333333',
  leftClr09: '#333333',
  leftClr10: '#333333',
  leftClr11: '#333333',
  leftClr12: '#333333',
  leftClr13: '#333333',
  leftClr14: '#333333',
  leftClr15: '#333333',
  leftClr16: '#333333',
  leftClr17: '#333333',
  leftClr18: '#333333',
  leftClr19: '#333333',
  leftClr20: '#333333',
  leftClr21: '#333333',
  leftClr22: '#333333',
  leftClr23: '#333333',
  leftClr24: '#333333',
  leftClr25: '#333333',
  leftClr26: '#333333',
  leftClr27: '#333333',
  leftClr28: '#333333',
  leftClr29: '#333333',
  leftClr30: '#333333',
  leftClr31: '#333333',
  leftClr32: '#333333',
  rightClr01: '#6900d1',
  rightClr02: '#6900d1',
  rightClr03: '#6900d1',
  rightClr04: '#6900d1',
  rightClr05: '#6900d1',
  rightClr06: '#6900d1',
  rightClr07: '#6900d1',
  rightClr08: '#6900d1',
  rightClr09: '#6900d1',
  rightClr10: '#6900d1',
  rightClr11: '#6900d1',
  rightClr12: '#6900d1',
  rightClr13: '#6900d1',
  rightClr14: '#6900d1',
  rightClr15: '#6900d1',
  rightClr16: '#6900d1',
  rightClr17: '#6900d1',
  rightClr18: '#6900d1',
  rightClr19: '#6900d1',
  rightClr20: '#6900d1',
  rightClr21: '#6900d1',
  rightClr22: '#6900d1',
  rightClr23: '#6900d1',
  rightClr24: '#6900d1',
  rightClr25: '#6900d1',
  rightClr26: '#6900d1',
  rightClr27: '#6900d1',
  rightClr28: '#6900d1',
  rightClr29: '#6900d1',
  rightClr30: '#6900d1',
  rightClr31: '#6900d1',
  rightClr32: '#6900d1',
  leftBase: 'u8',
  rightBase: 'u8',
  pattern: [[], []]
} as BraidingType;
const BraidingContext = React.createContext(defaultValue);

export default BraidingContext;

const dehashifyState = (dispatch: Function) => {
  let fromHash = {};
  try {
    // if (location.hash.length > 1) {
    //   const [
    //     rows, left, right, leftClr, rightClr, leftBaseBin, rightBaseBin
    //   ] = location.hash.slice(1).split('/');
    //   fromHash = {
    //     rows: Number(rows),
    //     left: Number(left),
    //     right: Number(right),
    //     leftClr: `#${leftClr}`,
    //     rightClr: `#${rightClr}`,
    //     leftBase: asString(leftBaseBin),
    //     rightBase: asString(rightBaseBin),
    //     pattern: [[], []]
    //   };
    // }
  } catch (err) {
    // todo
  } finally {
    dispatch({ type: Actions.initialzePattern, payload: {
      ...defaultValue, ...fromHash
    }});
  }
};

export const BraidingProvider: React.FC<{ children: any }> = ({ children }) => {
  const [ value, dispatch ] = useBraidingReducer(defaultValue);

  const styleVariables = useMemo(() => {
    const {
      left, right,
      leftClr01, leftClr02, leftClr03, leftClr04, leftClr05, leftClr06, leftClr07, leftClr08, leftClr09, leftClr10, leftClr11, leftClr12, leftClr13, leftClr14, leftClr15, leftClr16, leftClr17, leftClr18, leftClr19, leftClr20, leftClr21, leftClr22, leftClr23, leftClr24, leftClr25, leftClr26, leftClr27, leftClr28, leftClr29, leftClr30, leftClr31, leftClr32,
      rightClr01, rightClr02, rightClr03, rightClr04, rightClr05, rightClr06, rightClr07, rightClr08, rightClr09, rightClr10, rightClr11, rightClr12, rightClr13, rightClr14, rightClr15, rightClr16, rightClr17, rightClr18, rightClr19, rightClr20, rightClr21, rightClr22, rightClr23, rightClr24, rightClr25, rightClr26, rightClr27, rightClr28, rightClr29, rightClr30, rightClr31, rightClr32,
    } = value;
    const lefts = [
      leftClr01, leftClr02, leftClr03, leftClr04, leftClr05, leftClr06, leftClr07, leftClr08, leftClr09, leftClr10, leftClr11, leftClr12, leftClr13, leftClr14, leftClr15, leftClr16, leftClr17, leftClr18, leftClr19, leftClr20, leftClr21, leftClr22, leftClr23, leftClr24, leftClr25, leftClr26, leftClr27, leftClr28, leftClr29, leftClr30, leftClr31, leftClr32
    ];
    const rights = [
      rightClr01, rightClr02, rightClr03, rightClr04, rightClr05, rightClr06, rightClr07, rightClr08, rightClr09, rightClr10, rightClr11, rightClr12, rightClr13, rightClr14, rightClr15, rightClr16, rightClr17, rightClr18, rightClr19, rightClr20, rightClr21, rightClr22, rightClr23, rightClr24, rightClr25, rightClr26, rightClr27, rightClr28, rightClr29, rightClr30, rightClr31, rightClr32
    ];
    const defs = {};
    for (let i = 0; i < 32; i++) {
      defs[`--clr-left-${(i + 1).toString().padStart(2, '0')}`] = lefts[i % left];
      defs[`--clr-right-${(i + 1).toString().padStart(2, '0')}`] = rights[i % right];
    }
    return defs as React.CSSProperties;
  }, [value]);

  React.useEffect(() => {
    // dehashifyState(dispatch);
    dispatch({ type: Actions.initialzePattern });
  }, []);

  return (
    <BraidingContext.Provider value={{ ...value, styleVariables, dispatch }} >
      { children }
    </BraidingContext.Provider>
  );
};
