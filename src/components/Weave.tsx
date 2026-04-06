import React, { useContext, useRef } from 'react';
import { toPng } from 'html-to-image';
import { Download } from 'lucide-react';
import BraidingContext from '../context';
import { Actions } from '../reducer';
import { asWord } from '../util/funcs';

import styles from './Weave.module.scss';

const calcPass = (track: boolean[]) => {
  if (track.length === 0) return '';
  let currentlyOver = track[0];
  let direc = [{ dir: asWord(currentlyOver), count: 1 }];

  for (let i = 1; i < track.length; i++) {
    const nub = track[i];
    if (currentlyOver === nub) {
      direc[direc.length - 1].count++;
    } else {
      currentlyOver = nub;
      direc.push({ dir: asWord(currentlyOver), count: 1 });
    }
  }
  return direc.map(({ dir, count }) => `${dir}${count > 1 ? count : ''}`).join(' ');
};

const Nub: React.FC<{
  onClick: () => void;
  isOver: boolean;
  x: number;
}> = ({ onClick, isOver, x }) => {
  return (
    <div
      className={`${styles.nub} ${styles[`strand${x + 1}`]} ${isOver ? styles.over : styles.under}`}
      onClick={onClick}
    />
  );
};

const NubRow: React.FC<{
  className: string;
  track: boolean[];
  loc: [number, number];
  setOver: (row: number, side: number, nub: number, over: boolean) => void;
}> = ({ className, track = [], loc, setOver }) => (
  <div className={className} data-dir={calcPass(track)}>
    {track.map((isOver, x) => (
      <Nub
        key={x}
        isOver={isOver}
        x={x}
        onClick={() => setOver(...loc, x, !isOver)}
      />
    ))}
  </div>
);

const Weave: React.FC = () => {
  const {
    dispatch, weavingRow, weavingStrand, pattern = [],
    left, right, styleVariables = {}
  } = useContext(BraidingContext);

  const weaveRef = useRef<HTMLDivElement>(null);

  const exportImage = () => {
    if (weaveRef.current) {
      toPng(weaveRef.current, {
        backgroundColor: '#fff',
        width: weaveRef.current.scrollWidth,
        height: weaveRef.current.scrollHeight + (
          //  max strands * 2/3rds the length of the hypotenuse of an isocolies right triangle
          Math.max(left, right) * ((24 / 3 * 2) * 1.4142)
        ),
      })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `braiding-pattern-${Date.now()}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error('oops, something went wrong!', err);
        });
    }
  };

  const handleSetOver = (row: number, side: number, nub: number, over: boolean) => {
    dispatch({ type: Actions.toggleOver, payload: { row, side, nub, over } });
  };

  const maxStrands = Math.max(left, right);
  const weaveStyle = {
    ...styleVariables,
    gridTemplateColumns: `calc((24px * ${left}) + (2px * ${left - 1})) calc((24px * ${right}) + (2px * ${right - 1}))`,
    transform: `translateY(calc(12px + (28px * 0.7071 * ${maxStrands})))`
  } as React.CSSProperties;

  return (
    <div className={styles.weaveContainer}>
      <div className={styles.weaveActions}>
        <button className={styles.exportButton} onClick={exportImage} title="Export as PNG">
          <Download size={16} /> Export Image
        </button>
      </div>

      <div id="weave" ref={weaveRef} className={styles.weave} style={weaveStyle}>
        {pattern.map(([leftTrack, rightTrack], i) => (
          <React.Fragment key={i}>
            <NubRow
              className={`${styles.nubRow} ${styles.leftHand} ${styles[`row-${i + 1}`]} ${
                weavingStrand === 'right' && i === weavingRow ? styles.current : ''
              }`}
              loc={[i, 0]}
              track={leftTrack}
              setOver={handleSetOver}
            />
            <NubRow
              className={`${styles.nubRow} ${styles.rightHand} ${styles[`row-${i + 1}`]} ${
                weavingStrand === 'left' && i === weavingRow ? styles.current : ''
              }`}
              loc={[i, 1]}
              track={rightTrack}
              setOver={handleSetOver}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Weave;
