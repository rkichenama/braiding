import { BraidingState } from '../context';
import { patternToMatrix } from '../reducer';

export const newArr = (n: number, v: any) => (new Array(n)).fill(v);
export const asWord = (isOver: any) => (isOver && 'o') || 'u';
export const asValue = (word: string) => {
  word = word.trim();
  if (word.includes(' ')) {
    return [].concat(...word.split(' ').map(asValue));
  }
  let n = 1;
  let isOver = true;
  try {
    const [ matchedNum ] = (word.match(/\d+/) || []);
    n = Number(matchedNum || 1);
    isOver = /^o/.test(word);
  } catch (error) { /* */ }
  return newArr(n, isOver);
};
export const asString = (bin: string) => {
  const overUnders = bin.split('').map(Number).map(asWord);
  // @ts-ignore
  overUnders.push('f');
  let p = overUnders.shift();
  let same = 1;
  overUnders.forEach(ou => {
    if (p.slice(-1) === ou) {
      same += 1;
    } else {
      p += `${same > 1 ? same : ''} ${ou}`;
      same = 1;
    }
  });
  return p.replace(/ f/g, '');
}
export const compressPattern = (rows, left, right, leftClr, rightClr, matrix) => [
  rows,
  left,
  right,
  leftClr,
  rightClr,
  matrix.map(
    r => r.map(
      c => parseInt(c.map(v => v && 1 || 0).join(''), 2).toString(36)
    ).join('|')
  ).join(';')
].join(',');
export function encPattern({ rows, left, right, leftBase, rightBase, ...meta }: BraidingState) {
  const {
    leftClr1, leftClr2, leftClr3, leftClr4, leftClr5, leftClr6, leftClr7, leftClr8, leftClr9, leftClr10, leftClr11, leftClr12, leftClr13, leftClr14, leftClr15, leftClr16, leftClr17, leftClr18, leftClr19, leftClr20, leftClr21, leftClr22, leftClr23, leftClr24, leftClr25, leftClr26, leftClr27, leftClr28, leftClr29, leftClr30, leftClr31, leftClr32,
    rightClr1, rightClr2, rightClr3, rightClr4, rightClr5, rightClr6, rightClr7, rightClr8, rightClr9, rightClr10, rightClr11, rightClr12, rightClr13, rightClr14, rightClr15, rightClr16, rightClr17, rightClr18, rightClr19, rightClr20, rightClr21, rightClr22, rightClr23, rightClr24, rightClr25, rightClr26, rightClr27, rightClr28, rightClr29, rightClr30, rightClr31, rightClr32,
  } = meta;
  const clrsLeft = [leftClr1, leftClr2, leftClr3, leftClr4, leftClr5, leftClr6, leftClr7, leftClr8, leftClr9, leftClr10, leftClr11, leftClr12, leftClr13, leftClr14, leftClr15, leftClr16, leftClr17, leftClr18, leftClr19, leftClr20, leftClr21, leftClr22, leftClr23, leftClr24, leftClr25, leftClr26, leftClr27, leftClr28, leftClr29, leftClr30, leftClr31, leftClr32];
  const clrsRight = [rightClr1, rightClr2, rightClr3, rightClr4, rightClr5, rightClr6, rightClr7, rightClr8, rightClr9, rightClr10, rightClr11, rightClr12, rightClr13, rightClr14, rightClr15, rightClr16, rightClr17, rightClr18, rightClr19, rightClr20, rightClr21, rightClr22, rightClr23, rightClr24, rightClr25, rightClr26, rightClr27, rightClr28, rightClr29, rightClr30, rightClr31, rightClr32];
  return [
    rows, left, right,
    clrsLeft.slice(0, left).join(';'),
    clrsRight.slice(0, right).join(';'),
    patternToMatrix(
      rows, left, right, leftBase, rightBase,
    ).map(
      r => r.map(
        c => parseInt(c.map(v => v && 1 || 0).join(''), 2).toString(36)
      ).join('|')
    ).join(';')
  ].join(',');
}
export const decompressPattern = (str: string) => {
  const [ rows, left, right, leftClr, rightClr, patternStr ] = str.split(',');
  const len = [ Number(left), Number(right) ];
  return {
    rows,
    left, right, leftClr, rightClr,
    pattern: patternStr
      .split(';')
      .map(row => row
        .split('|')
        .map((side, i) => parseInt(side, 36)
          .toString(2)
          .padStart(len[i], '0')
          .split('')
          .map(nub => !!parseInt(nub, 2))
        )
      )
  }
};
export function decPattern(str: string) {
  const [ rows, left, right, leftClrs, rightClrs, patternStr ] = str.split(',');
  const len = [ Number(left), Number(right) ];
  const ll = leftClrs.split(';')
    .map((clr, i) => ({
      [`leftClr${(i + 1).toString()}`]: clr,
    })) as any[];
  const rr = rightClrs.split(';')
    .map((clr, i) => ({
      [`rightClr${(i + 1).toString()}`]: clr,
    })) as any[];
  const val = {
    rows,
    left, right,
    ...Object.assign({}, ...ll),
    ...Object.assign({}, ...rr),
    pattern: patternStr
      .split(';')
      .map(row => row
        .split('|')
        .map((side, i) => parseInt(side, 36)
          .toString(2)
          .padStart(len[i], '0')
          .split('')
          .map(nub => !!parseInt(nub, 2))
        )
      )
  };
  return val;
}
