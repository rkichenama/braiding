import React, { useMemo } from 'react';
import { MenuAction, useBraidingReducer, Actions } from './reducer';
import { deserialize } from './hashify';

export type SavedPattern = {
  id: string;
  name: string;
  pattern: string; // encoded pattern string
  timestamp: number;
};

export type BraidingState = {
  leftColors: string[];
  rightColors: string[];
  rows: number;
  left: number;
  right: number;
  leftBase: string;
  rightBase: string;
  pattern: boolean[][][];
  weavingStrand: 'left' | 'right';
  weavingRow: number;
  history: SavedPattern[];
}

export interface BraidingType extends BraidingState {
  dispatch: React.Dispatch<MenuAction>;
  styleVariables: React.CSSProperties;
}

const defaultColorsLeft = new Array(32).fill('#272823');
const defaultColorsRight = new Array(32).fill('#51208f');

export const defaultValue: BraidingState = {
  rows: 32,
  left: 8,
  right: 8,
  leftColors: defaultColorsLeft,
  rightColors: defaultColorsRight,
  leftBase: 'u4 o4',
  rightBase: 'u4 o4',
  pattern: [],
  weavingStrand: 'left',
  weavingRow: 0,
  history: [],
};

const BraidingContext = React.createContext<BraidingType>({
  ...defaultValue,
  dispatch: () => {},
  styleVariables: {},
});

export default BraidingContext;

const dehashifyState = (dispatch: React.Dispatch<MenuAction>) => {
  const hashData = deserialize(location.hash);
  if (Object.keys(hashData).length > 0) {
    dispatch({ 
      type: Actions.replaceState, 
      payload: {
        ...defaultValue,
        ...hashData
      }
    });
  } else {
    dispatch({ type: Actions.initialzePattern, payload: defaultValue });
  }
};

export const BraidingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [value, dispatch] = useBraidingReducer(defaultValue);

  const styleVariables = useMemo(() => {
    const { left, right, leftColors, rightColors } = value;
    const defs: Record<string, string> = {};
    
    for (let i = 0; i < 32; i++) {
      defs[`--clr-left-${i + 1}`] = leftColors[i % left];
      defs[`--clr-right-${i + 1}`] = rightColors[i % right];
    }
    return defs as React.CSSProperties;
  }, [value.left, value.right, value.leftColors, value.rightColors]);

  React.useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('braiding-history');
    if (savedHistory) {
      try {
        const history = JSON.parse(savedHistory);
        dispatch({ type: Actions.replaceState, payload: { ...value, history } });
      } catch (e) {
        console.error('Failed to load history', e);
      }
    }
    
    dehashifyState(dispatch);
  }, []);

  // Save history to localStorage when it changes
  React.useEffect(() => {
    if (value.history.length > 0) {
      localStorage.setItem('braiding-history', JSON.stringify(value.history));
    }
  }, [value.history]);

  const contextValue = useMemo(() => ({
    ...value,
    styleVariables,
    dispatch
  }), [value, styleVariables, dispatch]);

  return (
    <BraidingContext.Provider value={contextValue}>
      {children}
    </BraidingContext.Provider>
  );
};
