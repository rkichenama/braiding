import { BraidingState } from '../context';

export const newArr = <T>(n: number, v: T): T[] => (new Array(n)).fill(v);
export const asWord = (isOver: boolean | any) => (isOver && 'o') || 'u';

/**
 * Converts a pattern word (e.g., 'u4 o4') into an array of booleans.
 */
export const asValue = (word: string, len?: number): boolean[] => {
  let value: boolean[] = [];
  word = word.trim();
  if (word.includes(' ')) {
    value = ([] as boolean[]).concat(...word.split(' ').map((w) => asValue(w)));
  } else {
    let n = 1;
    let isOver = true;
    try {
      const matchedNum = (word.match(/\d+/) || []);
      n = Number(matchedNum[0] || 1);
      isOver = /^o/i.test(word);
    } catch (error) { /* */ }
    value = newArr(n, isOver);
  }
  if (len) {
    const originalValue = [...value];
    while (value.length < len) {
      value.push(...originalValue);
    }
    value = value.slice(0, len);
  }
  return value;
};

/**
 * Converts a boolean array back into a pattern string (e.g., 'u4 o4').
 */
export const asString = (bin: boolean[]) => {
  if (bin.length === 0) return '';
  const overUnders = bin.map(asWord);
  const result: string[] = [];
  
  let current = overUnders[0];
  let count = 1;
  
  for (let i = 1; i < overUnders.length; i++) {
    if (overUnders[i] === current) {
      count++;
    } else {
      result.push(`${current}${count > 1 ? count : ''}`);
      current = overUnders[i];
      count = 1;
    }
  }
  result.push(`${current}${count > 1 ? count : ''}`);
  
  return result.join(' ');
}

const nBase = 36;

export const basify = (c: boolean[]) => {
  if (c.length === 0) return '0';
  return parseInt(c.map(v => v ? '1' : '0').join(''), 2).toString(nBase);
};

export const deBasify = (side: string, len: number) => {
  return parseInt(side, nBase)
    .toString(2)
    .padStart(len, '0')
    .split('')
    .map(nub => nub !== '0');
};

export const encBase = (base: string, len: number) => basify(asValue(base, len));
export const decBase = (base: string, len: number) => asString(deBasify(base, len));

/**
 * Encodes the entire BraidingState into a single string for URL persistence or export.
 * Format: rows,left,right,leftBaseEncoded,rightBaseEncoded,leftColorsJoin,rightColorsJoin,patternEncoded
 */
export function encPattern(state: BraidingState) {
  const { 
    rows, left, right, leftBase, rightBase, pattern, 
    leftColors, rightColors 
  } = state;

  return [
    rows,
    left,
    right,
    encBase(leftBase, left),
    encBase(rightBase, right),
    leftColors.slice(0, left).join(';'),
    rightColors.slice(0, right).join(';'),
    (pattern as boolean[][][]).map(
      r => r.map(
        side => basify(side)
      ).join('|')
    ).join(';')
  ].join(',');
}

/**
 * Decodes a pattern string back into a partial BraidingState.
 * Supports the new array-based color format.
 */
export function decPattern(str: string): Partial<BraidingState> {
  if (!str) return {};
  
  try {
    const parts = str.split(',');
    if (parts.length < 8) return {};

    const [ 
      rows, left, right, leftBase, rightBase, 
      leftClrs, rightClrs, patternStr 
    ] = parts;

    const nRows = Number(rows);
    const nLeft = Number(left);
    const nRight = Number(right);

    const decodedLeftColors = leftClrs.split(';');
    const decodedRightColors = rightClrs.split(';');

    // Fill up to 32 colors with defaults if needed
    const leftColors = [...new Array(32)].map((_, i) => decodedLeftColors[i] || '#272823');
    const rightColors = [...new Array(32)].map((_, i) => decodedRightColors[i] || '#51208f');

    return {
      rows: nRows,
      left: nLeft,
      right: nRight,
      leftBase: decBase(leftBase, nLeft),
      rightBase: decBase(rightBase, nRight),
      leftColors,
      rightColors,
      pattern: patternStr
        .split(';')
        .map(row => row
          .split('|')
          .map((side, i) => deBasify(side, i === 0 ? nLeft : nRight))
        ) as boolean[][][]
    };
  } catch (error) {
    console.error('Failed to decode pattern', error);
    return {};
  }
}
