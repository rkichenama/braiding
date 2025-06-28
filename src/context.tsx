import React, { useMemo } from 'react';
import { MenuAction, useBraidingReducer, Actions } from './reducer';
import { decBase } from './util/funcs';
import { deserialize } from './hashify';


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
  pattern: [ string[], string[] ],
  weavingStrand: 'left' | 'right',
  weavingRow: number,
}
interface BraidingType extends BraidingState {
  dispatch?: React.Dispatch<MenuAction>,
  styleVariables?: React.CSSProperties,
}
export const defaultValue = {
  rows: 32,
  left: 8,
  right: 8,
  leftClr1: '#272823',
  leftClr2: '#272823',
  leftClr3: '#272823',
  leftClr4: '#272823',
  leftClr5: '#272823',
  leftClr6: '#272823',
  leftClr7: '#272823',
  leftClr8: '#272823',
  leftClr9: '#272823',
  leftClr10: '#272823',
  leftClr11: '#272823',
  leftClr12: '#272823',
  leftClr13: '#272823',
  leftClr14: '#272823',
  leftClr15: '#272823',
  leftClr16: '#272823',
  leftClr17: '#272823',
  leftClr18: '#272823',
  leftClr19: '#272823',
  leftClr20: '#272823',
  leftClr21: '#272823',
  leftClr22: '#272823',
  leftClr23: '#272823',
  leftClr24: '#272823',
  leftClr25: '#272823',
  leftClr26: '#272823',
  leftClr27: '#272823',
  leftClr28: '#272823',
  leftClr29: '#272823',
  leftClr30: '#272823',
  leftClr31: '#272823',
  leftClr32: '#272823',
  rightClr1: '#51208f',
  rightClr2: '#51208f',
  rightClr3: '#51208f',
  rightClr4: '#51208f',
  rightClr5: '#51208f',
  rightClr6: '#51208f',
  rightClr7: '#51208f',
  rightClr8: '#51208f',
  rightClr9: '#51208f',
  rightClr10: '#51208f',
  rightClr11: '#51208f',
  rightClr12: '#51208f',
  rightClr13: '#51208f',
  rightClr14: '#51208f',
  rightClr15: '#51208f',
  rightClr16: '#51208f',
  rightClr17: '#51208f',
  rightClr18: '#51208f',
  rightClr19: '#51208f',
  rightClr20: '#51208f',
  rightClr21: '#51208f',
  rightClr22: '#51208f',
  rightClr23: '#51208f',
  rightClr24: '#51208f',
  rightClr25: '#51208f',
  rightClr26: '#51208f',
  rightClr27: '#51208f',
  rightClr28: '#51208f',
  rightClr29: '#51208f',
  rightClr30: '#51208f',
  rightClr31: '#51208f',
  rightClr32: '#51208f',
  leftBase: 'u4 o4',
  rightBase: 'u4 o4',
  pattern: [[], []],
  weavingStrand: 'left',
  weavingRow: 0,
} as BraidingType;
const BraidingContext = React.createContext(defaultValue);

export default BraidingContext;

const dehashifyState = (dispatch: Function) => {
  // let fromHash = {};
  // try {
  //   if (location.hash.length > 1) {
  //     const [
  //       rows, l, r, leftBaseBin, rightBaseBin
  //     ] = location.hash.slice(1).split('/');
  //     const left = Number(l);
  //     const right = Number(r);
  //     fromHash = {
  //       rows: Number(rows),
  //       left,
  //       right,
  //       leftBase: decBase(leftBaseBin, left),
  //       rightBase: decBase(rightBaseBin, right),
  //       pattern: [[], []]
  //     };
  //   }
  // } catch (err) {
  //   // todo
  // } finally {
  //   dispatch({ type: Actions.initialzePattern, payload: {
  //     ...defaultValue, ...fromHash
  //   }});
  // }
  dispatch({ type: Actions.initialzePattern, payload: {
    ...defaultValue,
    ...deserialize(location.hash)
  }});
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
    dehashifyState(dispatch);
    dispatch({ type: Actions.initialzePattern });
  }, []);

  return (
    <BraidingContext.Provider value={{ ...value, styleVariables, dispatch }} >
      { children }
    </BraidingContext.Provider>
  );
};
