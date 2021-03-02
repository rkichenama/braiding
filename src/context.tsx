import React from 'react';
import { MenuAction, useBraidingReducer, Actions } from './reducer';
import { asString } from './util/funcs';

export type BraidingState = {
  rows: number,
  left: number,
  leftClr: string,
  leftBase: string,
  right: number,
  rightClr: string,
  rightBase: string,
  pattern: [ string[], string[] ]
}
interface BraidingType extends BraidingState {
  dispatch?: React.Dispatch<MenuAction>
}
export const defaultValue = {
  rows: 40,
  left: 12,
  right: 12,
  leftClr: '#333333',
  leftBase: 'u6 o6',
  rightClr: '#cccccc',
  rightBase: 'u6 o6',
  pattern: [[], []]
} as BraidingType;
const BraidingContext = React.createContext(defaultValue);

export default BraidingContext;

const dehashifyState = (dispatch: Function) => {
  let fromHash = {};
  try {
    if (location.hash.length > 1) {
      const [
        rows, left, right, leftClr, rightClr, leftBaseBin, rightBaseBin
      ] = location.hash.slice(1).split('/');
      fromHash = {
        rows: Number(rows),
        left: Number(left),
        right: Number(right),
        leftClr: `#${leftClr}`,
        rightClr: `#${rightClr}`,
        leftBase: asString(leftBaseBin),
        rightBase: asString(rightBaseBin),
        pattern: [[], []]
      };
    }
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
