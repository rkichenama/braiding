import React from 'react';
import { MenuAction, useBraidingReducer, Actions } from './reducer';
import { asString } from './util/funcs';

export type BraidingState = {
  rows: number,
  left: number,
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
  rightClr32: string,
  leftBase: string,
  right: number,
  rightBase: string,
  pattern: [ string[], string[] ]
}
interface BraidingType extends BraidingState {
  dispatch?: React.Dispatch<MenuAction>
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
  rightClr01: '#088',
  rightClr02: '#088',
  rightClr03: '#088',
  rightClr04: '#088',
  rightClr05: '#088',
  rightClr06: '#088',
  rightClr07: '#088',
  rightClr08: '#088',
  rightClr09: '#088',
  rightClr10: '#088',
  rightClr11: '#088',
  rightClr12: '#088',
  rightClr13: '#088',
  rightClr14: '#088',
  rightClr15: '#088',
  rightClr16: '#088',
  rightClr17: '#088',
  rightClr18: '#088',
  rightClr19: '#088',
  rightClr20: '#088',
  rightClr21: '#088',
  rightClr22: '#088',
  rightClr23: '#088',
  rightClr24: '#088',
  rightClr25: '#088',
  rightClr26: '#088',
  rightClr27: '#088',
  rightClr28: '#088',
  rightClr29: '#088',
  rightClr30: '#088',
  rightClr31: '#088',
  rightClr32: '#088',
  leftBase: 'u o',
  rightBase: 'u o',
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

  React.useEffect(() => {
    dehashifyState(dispatch);
    // dispatch({ type: Actions.initialzePattern });
  }, []);

  return (
    <BraidingContext.Provider value={{ ...value, dispatch }} >
      { children }
    </BraidingContext.Provider>
  );
};
