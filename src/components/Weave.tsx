import React from 'react';
import BraidingContext from '../context';
import { Actions } from '../reducer';
import { asValue, asWord, newArr } from '../util/funcs';

import './Weave.scss';

const calcPass = (track, reverse?: boolean) => {
  let [ currentlyOver, ...rest ] = track;
  let direc = [{ dir: asWord(currentlyOver), count: 1 }];
  rest.forEach(nub => {
    if (currentlyOver === nub) {
      direc[direc.length - 1].count++;
    } else {
      currentlyOver = nub;
      direc.push({ dir: asWord(currentlyOver), count: 1 });
    }
  });
  if (reverse) { direc = direc.reverse() }
  return direc.map(({ dir, count }) => `${dir}${count}`).join(' ').replace(/1/g, '');
};
const initializeRow = pattern => {
  return [].concat(...pattern.split(' ').map(asValue));
};
const withContext = (WrappedComponent: any): any => (
  (props: any) => {
    const context = React.useContext(BraidingContext);
    return (
      <WrappedComponent {...props} {...context} />
    );
  }
);

const Nub: React.FC<any> = ({ onClick = () => {}, isOver, x }) => {
  return (
    <div
      className={`nub right- left- strand-${(x + 1).toString().padStart(2, '0')} ${isOver ? 'over' : 'under'}`}
      {...{onClick}}
    />
  );
};

const NubRow: React.FC<any> = ({ className, track = [], loc, setOver }) => (
  <div {...{ className }} data-dir={calcPass(track)}>
  {
    track.map((isOver, x) => (
      <Nub
        key={x}
        {...{ isOver, x }}
        onClick={() => setOver(...loc, x, !isOver)}
      />
    ))
  }
</div>
);

const NubRows: React.FC<any> = withContext(({ dispatch, pattern = [] }) => pattern.map(([ left, right ], i) => (
  <React.Fragment key={i}>
    <NubRow className='left-hand' loc={[ i, 0 ]} track={left} setOver={
      (row, side, nub, over) => { dispatch({ type: Actions.toggleOver, payload: { row, side, nub, over } }) }
    } />
    <NubRow className='right-hand' loc={[ i, 1 ]} track={right} setOver={
      (row, side, nub, over) => { dispatch({ type: Actions.toggleOver, payload: { row, side, nub, over } }) }
    } />
  </React.Fragment>
)));

const Weave: React.FC<any> = withContext(({
  left, right,
  leftClr01, leftClr02, leftClr03, leftClr04, leftClr05, leftClr06, leftClr07, leftClr08, leftClr09, leftClr10, leftClr11, leftClr12, leftClr13, leftClr14, leftClr15, leftClr16, leftClr17, leftClr18, leftClr19, leftClr20, leftClr21, leftClr22, leftClr23, leftClr24, leftClr25, leftClr26, leftClr27, leftClr28, leftClr29, leftClr30, leftClr31, leftClr32,
  rightClr01, rightClr02, rightClr03, rightClr04, rightClr05, rightClr06, rightClr07, rightClr08, rightClr09, rightClr10, rightClr11, rightClr12, rightClr13, rightClr14, rightClr15, rightClr16, rightClr17, rightClr18, rightClr19, rightClr20, rightClr21, rightClr22, rightClr23, rightClr24, rightClr25, rightClr26, rightClr27, rightClr28, rightClr29, rightClr30, rightClr31, rightClr32,
}) => (
  <div id='weave' style={{
    '--clr-left-01': leftClr01,
    '--clr-left-02': leftClr02,
    '--clr-left-03': leftClr03,
    '--clr-left-04': leftClr04,
    '--clr-left-05': leftClr05,
    '--clr-left-06': leftClr06,
    '--clr-left-07': leftClr07,
    '--clr-left-08': leftClr08,
    '--clr-left-09': leftClr09,
    '--clr-left-10': leftClr10,
    '--clr-left-11': leftClr11,
    '--clr-left-12': leftClr12,
    '--clr-left-13': leftClr13,
    '--clr-left-14': leftClr14,
    '--clr-left-15': leftClr15,
    '--clr-left-16': leftClr16,
    '--clr-left-17': leftClr17,
    '--clr-left-18': leftClr18,
    '--clr-left-19': leftClr19,
    '--clr-left-20': leftClr20,
    '--clr-left-21': leftClr21,
    '--clr-left-22': leftClr22,
    '--clr-left-23': leftClr23,
    '--clr-left-24': leftClr24,
    '--clr-left-25': leftClr25,
    '--clr-left-26': leftClr26,
    '--clr-left-27': leftClr27,
    '--clr-left-28': leftClr28,
    '--clr-left-29': leftClr29,
    '--clr-left-30': leftClr30,
    '--clr-left-31': leftClr31,
    '--clr-left-32': leftClr32,
    '--clr-right-01': rightClr01,
    '--clr-right-02': rightClr02,
    '--clr-right-03': rightClr03,
    '--clr-right-04': rightClr04,
    '--clr-right-05': rightClr05,
    '--clr-right-06': rightClr06,
    '--clr-right-07': rightClr07,
    '--clr-right-08': rightClr08,
    '--clr-right-09': rightClr09,
    '--clr-right-10': rightClr10,
    '--clr-right-11': rightClr11,
    '--clr-right-12': rightClr12,
    '--clr-right-13': rightClr13,
    '--clr-right-14': rightClr14,
    '--clr-right-15': rightClr15,
    '--clr-right-16': rightClr16,
    '--clr-right-17': rightClr17,
    '--clr-right-18': rightClr18,
    '--clr-right-19': rightClr19,
    '--clr-right-20': rightClr20,
    '--clr-right-21': rightClr21,
    '--clr-right-22': rightClr22,
    '--clr-right-23': rightClr23,
    '--clr-right-24': rightClr24,
    '--clr-right-25': rightClr25,
    '--clr-right-26': rightClr26,
    '--clr-right-27': rightClr27,
    '--clr-right-28': rightClr28,
    '--clr-right-29': rightClr29,
    '--clr-right-30': rightClr30,
    '--clr-right-31': rightClr31,
    '--clr-right-32': rightClr32,
    gridTemplateColumns: `calc((24px * ${left}) + (2px * ${left - 1})) calc((24px * ${right}) + (2px * ${right - 1}))`,
    transform: `translateY(calc(12px + (28px * 0.7071 * ${Math.max(right, left)})))`
  } as React.CSSProperties}>
    <NubRows />
  </div>
));

const Sheet: React.FC<any> = () => (
  <div id='sheet' className='x4 y1 w9 h12' style={{ overflowY: 'auto' }}>
    <Weave />
  </div>
);

export default Sheet;
