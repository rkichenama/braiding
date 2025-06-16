import React, { useMemo } from 'react';
import { MenuAction, useBraidingReducer, Actions } from './reducer';
import { asString } from './util/funcs';

export type BraidingState = {
  leftClr1: string,
  leftClr2: string,
  leftClr3: string,
  leftClr4: string,
  leftClr5: string,
  leftClr6: string,
  leftClr7: string,
  leftClr8: string,
  leftClr9: string,
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
  rightClr1: string,
  rightClr2: string,
  rightClr3: string,
  rightClr4: string,
  rightClr5: string,
  rightClr6: string,
  rightClr7: string,
  rightClr8: string,
  rightClr9: string,
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
  leftClr1: '#333333',
  leftClr2: '#333333',
  leftClr3: '#333333',
  leftClr4: '#333333',
  leftClr5: '#333333',
  leftClr6: '#333333',
  leftClr7: '#333333',
  leftClr8: '#333333',
  leftClr9: '#333333',
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
  rightClr1: '#6900d1',
  rightClr2: '#6900d1',
  rightClr3: '#6900d1',
  rightClr4: '#6900d1',
  rightClr5: '#6900d1',
  rightClr6: '#6900d1',
  rightClr7: '#6900d1',
  rightClr8: '#6900d1',
  rightClr9: '#6900d1',
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
      leftClr1, leftClr2, leftClr3, leftClr4, leftClr5, leftClr6, leftClr7, leftClr8, leftClr9, leftClr10, leftClr11, leftClr12, leftClr13, leftClr14, leftClr15, leftClr16, leftClr17, leftClr18, leftClr19, leftClr20, leftClr21, leftClr22, leftClr23, leftClr24, leftClr25, leftClr26, leftClr27, leftClr28, leftClr29, leftClr30, leftClr31, leftClr32,
      rightClr1, rightClr2, rightClr3, rightClr4, rightClr5, rightClr6, rightClr7, rightClr8, rightClr9, rightClr10, rightClr11, rightClr12, rightClr13, rightClr14, rightClr15, rightClr16, rightClr17, rightClr18, rightClr19, rightClr20, rightClr21, rightClr22, rightClr23, rightClr24, rightClr25, rightClr26, rightClr27, rightClr28, rightClr29, rightClr30, rightClr31, rightClr32,
    } = value;
    const lefts = [
      leftClr1, leftClr2, leftClr3, leftClr4, leftClr5, leftClr6, leftClr7, leftClr8, leftClr9, leftClr10, leftClr11, leftClr12, leftClr13, leftClr14, leftClr15, leftClr16, leftClr17, leftClr18, leftClr19, leftClr20, leftClr21, leftClr22, leftClr23, leftClr24, leftClr25, leftClr26, leftClr27, leftClr28, leftClr29, leftClr30, leftClr31, leftClr32
    ];
    const rights = [
      rightClr1, rightClr2, rightClr3, rightClr4, rightClr5, rightClr6, rightClr7, rightClr8, rightClr9, rightClr10, rightClr11, rightClr12, rightClr13, rightClr14, rightClr15, rightClr16, rightClr17, rightClr18, rightClr19, rightClr20, rightClr21, rightClr22, rightClr23, rightClr24, rightClr25, rightClr26, rightClr27, rightClr28, rightClr29, rightClr30, rightClr31, rightClr32
    ];
    const defs = {};
    for (let i = 0; i < 32; i++) {
      defs[`--clr-left-${(i + 1).toString()}`] = lefts[i % left];
      defs[`--clr-right-${(i + 1).toString()}`] = rights[i % right];
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
