import React, { ChangeEvent } from 'react';
import BraidingContext, { defaultValue } from '../context';
import { Actions } from '../reducer';
import { compressPattern, decompressPattern, decPattern, encPattern } from '../util/funcs';

import './Controls.scss';

const Controls: React.FC<any> = () => {
  const {dispatch, ...state} = React.useContext(BraidingContext);
  const {
    rows, left, right, leftBase, rightBase, pattern,
    leftClr01, leftClr02, leftClr03, leftClr04, leftClr05, leftClr06, leftClr07, leftClr08, leftClr09, leftClr10, leftClr11, leftClr12, leftClr13, leftClr14, leftClr15, leftClr16, leftClr17, leftClr18, leftClr19, leftClr20, leftClr21, leftClr22, leftClr23, leftClr24, leftClr25, leftClr26, leftClr27, leftClr28, leftClr29, leftClr30, leftClr31, leftClr32,
    rightClr01, rightClr02, rightClr03, rightClr04, rightClr05, rightClr06, rightClr07, rightClr08, rightClr09, rightClr10, rightClr11, rightClr12, rightClr13, rightClr14, rightClr15, rightClr16, rightClr17, rightClr18, rightClr19, rightClr20, rightClr21, rightClr22, rightClr23, rightClr24, rightClr25, rightClr26, rightClr27, rightClr28, rightClr29, rightClr30, rightClr31, rightClr32,
  } = state;
  const importEl = React.useRef(undefined as HTMLTextAreaElement);
  const clrsLeft = [leftClr01, leftClr02, leftClr03, leftClr04, leftClr05, leftClr06, leftClr07, leftClr08, leftClr09, leftClr10, leftClr11, leftClr12, leftClr13, leftClr14, leftClr15, leftClr16, leftClr17, leftClr18, leftClr19, leftClr20, leftClr21, leftClr22, leftClr23, leftClr24, leftClr25, leftClr26, leftClr27, leftClr28, leftClr29, leftClr30, leftClr31, leftClr32];
  const clrsRight = [rightClr01, rightClr02, rightClr03, rightClr04, rightClr05, rightClr06, rightClr07, rightClr08, rightClr09, rightClr10, rightClr11, rightClr12, rightClr13, rightClr14, rightClr15, rightClr16, rightClr17, rightClr18, rightClr19, rightClr20, rightClr21, rightClr22, rightClr23, rightClr24, rightClr25, rightClr26, rightClr27, rightClr28, rightClr29, rightClr30, rightClr31, rightClr32];

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
          console.log({decoded})
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
      <div className='row'>
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
          {clrsLeft.slice(0, left)
            .map((_, l) => {
              const name = `leftClr${(l + 1).toString().padStart(2, '0')}`;
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
      </div>
      <hr className='w12' />
      <div className='row'>
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
              const name = `rightClr${(l + 1).toString().padStart(2, '0')}`;
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
      </div>
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
