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
    gold: '#89703c',
    goldenrod: '#e37f2a',
    amberGold: '#cf9f64',
    mustardYellow: '#a6401b',
    marigold: '#e7a34c',
    airForce: '#f3b735',
    canaryYellow: '#b9a447',
    neonYellow: '#eff123',
  },
  Greens: {
    darkOliveDrab: '#5a583a',
    oliveDrab: '#727644',
    emeraldGreen: '#465b48',
    hunterGreen: '#46864a',
    kellyGreen: '#6fb26e',
    neonGreen: '#a4de54',
    teal: '#0a2e2d',
  },
  Blues: {
    turquoise: '#349bae',
    navyBlue: '#222f5a',
    electricBlue: '#1525b2',
    slateBlue: '#566373',
    royalBlue: '#1f4b9a',
    seaBlue: '#4f88cb',
    colonialBlue: '#0e69b5',
    lightBlue: '#4c87cb',
    neonTurquoise: '#0a88ab',
    seafoam: '#0b9e9d',
    caribean: '#0d7d99',
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
      p.setAttribute('popover', 'auto');
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
