import React, { ChangeEvent, CSSProperties, InputHTMLAttributes, useEffect, useRef, useState } from 'react';

import './Colors.scss';

const ParacordColors = {
  Reds: {
    burgundy: '#523334',
    deepRed: '#9a1722',
    imperialRed: '#cc2a3a',
    scarlett: '#d93d3d',
    fuchsia: '#e25677',
    hotPink: '#f6579f',
    rosePink: '#e2bbc3',
  },
  Oranges: {
    burntOrange: '#cf6f40',
    solarOrange: '#dd8b47',
    safetyOrange: '#ee5806',
    neonOrange: '#fe9b50',
  },
  Yellows: {
    goldenrod: '#e2b007',
    mustardYellow: '#ddc833',
    canaryYellow: '#e2d340',
  },
  Greens: {
    darkOliveDrab: '#5a583a',
    oliveDrab: '#727644',
    emeraldGreen: '#465b48',
    hunterGreen: '#46864a',
    kellyGreen: '#6fb26e',
    neonGreen: '#a4de54',
  },
  Blues: {
    turquoise: '#9ccfcc',
    teal: '#5b8683',
    navyBlue: '#222f5a',
    electricBlue: '#0c2aca',
    slateBlue: '#566373',
    royalBlue: '#3860ba',
    seaBlue: '#4f88cb',
    colonialBlue: '#568dcf',
    babyBlue: '#9dc2cc',
  },
  Purples: {
    acidPurple: '#51208f',
    purple: '#8462af',
    lilac: '#cabbd2',
    lavender: '#9da0ce',
  },
  Grays: {
    black: '#272823',
    charcoalGrey: '#666a60',
    silverGray: '#a9a999',
    white: '#e6e4da',
  },
  Earths: {
    goldenNugget: '#bcb46d',
    desertSand: '#c7ba96',
    desertTan: '#c4af7b',
    khaki: '#b2a475',
    coytoeBrown: '#857645',
    chocolateBrown: '#7b6b43',
    rust: '#9e6035',
    walnutBrown: '#7d522c',
  },
};

const Colors = ({
  type, name, onChange, value = '',
  hideName = false,
}: InputHTMLAttributes<HTMLInputElement> & {
  hideName?: boolean
}) => {
  const ref = useRef<HTMLDivElement>();
  const [popover, setPop] = useState<any>();
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    if (ref.current) {
      const anchorName = `--color-${(new Date()).getTime().toString(36)}-${Math.floor(
        Math.random() * 4000
      )}`;
      const span = ref.current.querySelector('span');
      span.setAttribute('style', `anchor-name: ${anchorName}`);
      const p = ref.current.querySelector('dialog');
      // const p = document.createElement('dialog');
      p.setAttribute('popover', 'true');
      p.setAttribute('style', `position-anchor: ${anchorName}`);
      // p.innerText = 'I am a popover';
      ref.current.appendChild(p);
      setPop(p);
    }
  }, []);

  useEffect(() => { setSelected(value); }, [value]);

  return (
    <section {...{ref, type, name}} className='color-select' style={{ '--selectedColor': selected } as CSSProperties}>
      <span onClick={() => { popover?.togglePopover(); }}/>
      {!hideName && <div>{selected || '<none>'}</div>}
      <dialog>
        <select value={selected} onChange={(evt) => {
          const s = evt.target.value;
          onChange?.({ target: { value: s } } as unknown as ChangeEvent<HTMLInputElement>);
          setSelected(s);
        }}>
          <option value="" />
          {Object.entries(ParacordColors)
            .map(([group, options]) => (
              <optgroup key={group} label={group}>
                {Object.entries(options).map(([name, color]) => (
                  <option key={name} value={color}>{name}</option>
                ))}
              </optgroup>
            ))}
        </select>
        <div>
          <input type='color' value={selected} onChange={(evt) => {
            const s = evt.target.value;
            onChange?.({ target: { value: s } } as unknown as ChangeEvent<HTMLInputElement>);
            setSelected(s);
          }} />
          {selected}
        </div>
      </dialog>
    </section>
  );
};

export default Colors;
