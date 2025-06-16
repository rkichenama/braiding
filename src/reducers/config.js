/* manage the config */
export const content = document.querySelector('#content');
export const styles = getComputedStyle(content);
const [
  leftClr1,
  leftClr2,
  leftClr3,
  leftClr4,
  leftClr5,
  leftClr6,
  leftClr7,
  leftClr8,
  leftClr9,
  leftClr10,
  leftClr11,
  leftClr12,
  leftClr13,
  leftClr14,
  leftClr15,
  leftClr16,
  leftClr17,
  leftClr18,
  leftClr19,
  leftClr20,
  leftClr21,
  leftClr22,
  leftClr23,
  leftClr24,
  leftClr25,
  leftClr26,
  leftClr27,
  leftClr28,
  leftClr29,
  leftClr30,
  leftClr31,
  leftClr32,
  rightClr1,
  rightClr2,
  rightClr3,
  rightClr4,
  rightClr5,
  rightClr6,
  rightClr7,
  rightClr8,
  rightClr9,
  rightClr10,
  rightClr11,
  rightClr12,
  rightClr13,
  rightClr14,
  rightClr15,
  rightClr16,
  rightClr17,
  rightClr18,
  rightClr19,
  rightClr20,
  rightClr21,
  rightClr22,
  rightClr23,
  rightClr24,
  rightClr25,
  rightClr26,
  rightClr27,
  rightClr28,
  rightClr29,
  rightClr30,
  rightClr31,
  rightClr32,
] = [
  '--clr-left-01',
  '--clr-left-02',
  '--clr-left-03',
  '--clr-left-04',
  '--clr-left-05',
  '--clr-left-06',
  '--clr-left-07',
  '--clr-left-08',
  '--clr-left-09',
  '--clr-left-10',
  '--clr-left-11',
  '--clr-left-12',
  '--clr-left-13',
  '--clr-left-14',
  '--clr-left-15',
  '--clr-left-16',
  '--clr-left-17',
  '--clr-left-18',
  '--clr-left-19',
  '--clr-left-20',
  '--clr-left-21',
  '--clr-left-22',
  '--clr-left-23',
  '--clr-left-24',
  '--clr-left-25',
  '--clr-left-26',
  '--clr-left-27',
  '--clr-left-28',
  '--clr-left-29',
  '--clr-left-30',
  '--clr-left-31',
  '--clr-left-32',
  '--clr-right-01',
  '--clr-right-02',
  '--clr-right-03',
  '--clr-right-04',
  '--clr-right-05',
  '--clr-right-06',
  '--clr-right-07',
  '--clr-right-08',
  '--clr-right-09',
  '--clr-right-10',
  '--clr-right-11',
  '--clr-right-12',
  '--clr-right-13',
  '--clr-right-14',
  '--clr-right-15',
  '--clr-right-16',
  '--clr-right-17',
  '--clr-right-18',
  '--clr-right-19',
  '--clr-right-20',
  '--clr-right-21',
  '--clr-right-22',
  '--clr-right-23',
  '--clr-right-24',
  '--clr-right-25',
  '--clr-right-26',
  '--clr-right-27',
  '--clr-right-28',
  '--clr-right-29',
  '--clr-right-30',
  '--clr-right-31',
  '--clr-right-32',
].map(v => styles.getPropertyValue(v).trim());
export const defaultState = {
  leftClr1, leftClr2, leftClr3, leftClr4, leftClr5, leftClr6, leftClr7, leftClr8, leftClr9, leftClr10, leftClr11, leftClr12, leftClr13, leftClr14, leftClr15, leftClr16, leftClr17, leftClr18, leftClr19, leftClr20, leftClr21, leftClr22, leftClr23, leftClr24, leftClr25, leftClr26, leftClr27, leftClr28, leftClr29, leftClr30, leftClr31, leftClr32,
  rightClr1, rightClr2, rightClr3, rightClr4, rightClr5, rightClr6, rightClr7, rightClr8, rightClr9, rightClr10, rightClr11, rightClr12, rightClr13, rightClr14, rightClr15, rightClr16, rightClr17, rightClr18, rightClr19, rightClr20, rightClr21, rightClr22, rightClr23, rightClr24, rightClr25, rightClr26, rightClr27, rightClr28, rightClr29, rightClr30, rightClr31, rightClr32,
  left: 8,
  right: 8,
  rows: 40,
  leftBasePattern: 'u2 o2',
  rightBasePattern: 'u2 o2',
};

const CHANGE_ROWS = 'CHANGE_ROWS';
const CHANGE_STRANDS = 'CHANGE_STRANDS';
const CHANGE_PATTERN = 'CHANGE_PATTERN';
const CHANGE_COLORS = 'CHANGE_COLORS';

export const changeRows = rows => async dispatch => {
  dispatch({
    type: CHANGE_ROWS,
    payload: Number(rows)
  });
  dispatch(patternReducer.initializePattern());
};

export const changeStrands = (side, count) => async dispatch => {
  dispatch({
    type: CHANGE_STRANDS,
    payload: {
      side, count: Number(count)
    }
  });
  dispatch(patternReducer.initializePattern());
};

export const changePattern = (side, pattern) => async dispatch => {
  dispatch({
    type: CHANGE_PATTERN,
    payload: {
      side, pattern
    }
  });
  dispatch(patternReducer.initializePattern ());
};

export const changeColors = (side, color) => ({
  type: CHANGE_COLORS,
  payload: {
    side, color
  }
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_ROWS:
      return {
        ...state,
        rows: action.payload
      };
    case CHANGE_STRANDS:
      return {
        ...state,
        [action.payload.side]: action.payload.count
      };
    case CHANGE_PATTERN:
      return {
        ...state,
        [`${action.payload.side}BasePattern`]: action.payload.pattern
      };
    case CHANGE_COLORS:
      content.style.setProperty(`--clr-${action.payload.side}`, action.payload.color);
      return {
        ...state,
        [`${action.payload.side}Clr`]: action.payload.color
      };
    default: return state;
  }
};

export const rowsSelector = state => state.config.rows;
export const strandsLeftSelector = state => state.config.left;
export const strandsRightSelector = state => state.config.right;
export const patternRowsSelector = state => state.config.rows;
export const rightBasePatternSelector = state => state.config.rightBasePattern;
export const leftBasePatternSelector = state => state.config.leftBasePattern;
export const rightColorSelector = state => state.config.rightClr;
export const leftColorSelector = state => state.config.leftClr;
