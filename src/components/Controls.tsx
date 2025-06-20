import React, { ChangeEvent, useState } from 'react';
import BraidingContext, { defaultValue } from '../context';
import { Actions } from '../reducer';
import { compressPattern, decompressPattern, decPattern, encPattern, newArr } from '../util/funcs';
import Colors from './Colors';

import './Controls.scss';

function band(n: number) {
  return newArr(16, 0).map((_, i) => {
    const x = i + 1;
    return x + n * Math.floor((x - 1) / n);
  }).join(',');
}
const HandConfig = ({
  hand, strands, colors, base,
  onStrandsChange, onPatternChange, onColorChange,
}) => {
  const [toChange, setStrands] = useState('all');
  const handLbl = `${hand[0].toUpperCase()}${hand.slice(1)}`;

  return (
    <div className='row'>
      <label>Strands on {handLbl}</label>
      <input type='range' max={32} min={4} value={strands} onChange={onStrandsChange} />
      <span>{strands}</span>
      <details open>
        <summary>{handLbl} Color(s)</summary>
        <nav>
          Set
          <select value={toChange} onChange={(evt) => {
            setStrands(evt.target.value);
          }}>
            <option>all</option>
            <option>even</option>
            <option>odd</option>
            <option value={band(2)}>2 band</option>
            <option value={band(3)}>3 band</option>
            <option value={band(4)}>4 band</option>
            <option value={band(5)}>5 band</option>
            <option value={band(6)}>6 band</option>
          </select>
          to
          {/* <input type='color' onInput={(evt) => {
            onColorChange(
              hand,
              (evt.target as HTMLInputElement).value,
              /,/.test(toChange)
                ? toChange.replace(/ /g, '').split(',')
                : toChange
            );
          }} /> */}
          <Colors type='color' onChange={(evt) => {
            onColorChange(
              hand,
              (evt.target as HTMLInputElement).value,
              /,/.test(toChange)
                ? toChange.replace(/ /g, '').split(',')
                : toChange
            );
          }} />
        </nav>
        {colors.slice(0, strands)
          .map((_, l) => {
            const name = `${hand}Clr${(l + 1).toString()}`;
            return (
              <Colors key={l} type='color' {...{ name, value: colors[l]}}
                hideName
                onChange={(evt) => onColorChange(hand, (evt.target as HTMLInputElement).value, [l + 1])}
              />
            );
          })}
      </details>
      <label>Base Pattern</label>
      <input type='text' value={base} onChange={onPatternChange} />
    </div>
  );
};

const Controls: React.FC<any> = () => {
  const {dispatch, ...state} = React.useContext(BraidingContext);
  const {
    rows, left, right, leftBase, rightBase, pattern,
    leftClr1, leftClr2, leftClr3, leftClr4, leftClr5, leftClr6, leftClr7, leftClr8, leftClr9, leftClr10, leftClr11, leftClr12, leftClr13, leftClr14, leftClr15, leftClr16, leftClr17, leftClr18, leftClr19, leftClr20, leftClr21, leftClr22, leftClr23, leftClr24, leftClr25, leftClr26, leftClr27, leftClr28, leftClr29, leftClr30, leftClr31, leftClr32,
    rightClr1, rightClr2, rightClr3, rightClr4, rightClr5, rightClr6, rightClr7, rightClr8, rightClr9, rightClr10, rightClr11, rightClr12, rightClr13, rightClr14, rightClr15, rightClr16, rightClr17, rightClr18, rightClr19, rightClr20, rightClr21, rightClr22, rightClr23, rightClr24, rightClr25, rightClr26, rightClr27, rightClr28, rightClr29, rightClr30, rightClr31, rightClr32,
  } = state;
  const importEl = React.useRef(undefined as HTMLTextAreaElement);
  const clrsLeft = [leftClr1, leftClr2, leftClr3, leftClr4, leftClr5, leftClr6, leftClr7, leftClr8, leftClr9, leftClr10, leftClr11, leftClr12, leftClr13, leftClr14, leftClr15, leftClr16, leftClr17, leftClr18, leftClr19, leftClr20, leftClr21, leftClr22, leftClr23, leftClr24, leftClr25, leftClr26, leftClr27, leftClr28, leftClr29, leftClr30, leftClr31, leftClr32];
  const clrsRight = [rightClr1, rightClr2, rightClr3, rightClr4, rightClr5, rightClr6, rightClr7, rightClr8, rightClr9, rightClr10, rightClr11, rightClr12, rightClr13, rightClr14, rightClr15, rightClr16, rightClr17, rightClr18, rightClr19, rightClr20, rightClr21, rightClr22, rightClr23, rightClr24, rightClr25, rightClr26, rightClr27, rightClr28, rightClr29, rightClr30, rightClr31, rightClr32];

  const changeRows = React.useCallback(
    (field: string, xform: Function = (v => v) ) => (evt: ChangeEvent) => {
      dispatch({
        type: Actions.changeInputs,
        payload: { [field]: xform((evt.target as HTMLInputElement).value) } })
    },
    [ dispatch ]
  );

  const performImport = React.useCallback(
    () => {
      const { current: textarea } = importEl;
      const str = textarea.value.trim();
      if (str.length) {
        try {
          const decoded = decPattern(str);
          dispatch({ type: Actions.replaceState, payload: {
            ...defaultValue,
            ...decoded
          }});
        } catch (error) {
          console.log(error);
        }
      }
    }, [ importEl.current ]
  )

  return (
    <div id='controls' className='x1 y1 w3 h12 as-table'>
      <div className='row'>
        <label>Weave Rows</label>
        <input
          type='range'
          max={60}
          min={4}
          value={rows}
          step={4}
          onChange={changeRows('rows', n => Number(n))}
        />
        <span>{rows}</span>
      </div>
      <hr className='w12' />
      <HandConfig {...{
        base: leftBase,
        colors: clrsLeft,
        hand: 'left',
        strands: left,
        onStrandsChange: changeRows('left', n => Number(n)),
        onPatternChange: evt => {
          (evt.target.value.length >= 1) && changeRows('leftBase')(evt)
        },
        onColorChange: (hand, color, strands) => {
          dispatch({
            type: Actions.changeColors,
            payload: { hand, color, strands } })
        }
      }} />
      {/* <div className='row'>
        <label>Strands on Left</label>
        <input
          type='range'
          max={32}
          min={4}
          value={left}
          onChange={changeRows('left', n => Number(n))}
        />
        <span>{left}</span>
        <details open>
          <summary>Left Color(s)</summary>
          Set all to
          <input type='color' onInput={(evt) => {
            dispatch({
              type: Actions.changeColors,
              payload: { hand: 'left', color: (evt.target as HTMLInputElement).value, strands: 'all' } })
          }}/>
          <br />
          {clrsLeft.slice(0, left)
            .map((_, l) => {
              const name = `leftClr${(l + 1).toString()}`;
              return (
                <input key={l} type='color' {...{ name, value: clrsLeft[l]}}
                  onInput={changeRows(name) as any}
                  onChange={changeRows(name)}
                />
              );
            })}
        </details>
        <label>Base Pattern</label>
        <input type='text' value={leftBase} onChange={evt => {
          (evt.target.value.length >= 1) && changeRows('leftBase')(evt)
        }} />
      </div> */}
      <hr className='w12' />
      <HandConfig {...{
        base: rightBase,
        colors: clrsRight,
        hand: 'right',
        strands: right,
        onStrandsChange: changeRows('right', n => Number(n)),
        onPatternChange: evt => {
          (evt.target.value.length >= 1) && changeRows('rightBase')(evt)
        },
        onColorChange: (hand, color, strands) => {
          dispatch({
            type: Actions.changeColors,
            payload: { hand, color, strands } })
        }
      }} />
      {/* <div className='row'>
        <label>Strands on Right</label>
        <input
          type='range'
          max={32}
          min={4}
          value={right}
          onChange={changeRows('right', n => Number(n))}
        />
        <span>{right}</span>
        <details open>
          <summary>Right Color(s)</summary>
          {clrsRight.slice(0, right)
            .map((_, l) => {
              const name = `rightClr${(l + 1).toString()}`;
              return (
                <input key={l} type='color' {...{ name, value: clrsRight[l]}}
                  onInput={changeRows(name) as any}
                  onChange={changeRows(name)}
                />
              );
            })}
        </details>
        <label>Base Pattern</label>
        <input type='text' value={rightBase} onChange={evt => {
            (evt.target.value.length >= 1) && changeRows('rightBase')(evt)
          }} />
      </div> */}
      <hr className='w12' />
      <div className='row'>
        <label className='full'>Current Pattern</label>
        <textarea rows={5} readOnly value={
          encPattern(state)
        } onChange={() => {}}/>
      </div>
      <hr className='w12' />
      <div className='row'>
        <textarea rows={5} ref={importEl} />
        <button className='full'
          onClick={performImport}
        >Import Pattern</button>
      </div>
    </div>
  );
}
export default Controls;
