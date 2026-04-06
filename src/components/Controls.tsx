import React, { ChangeEvent, useState, useCallback, useRef } from 'react';
import {
  Save,
  ChevronRight,
  ChevronLeft,
  Upload,
  Download,
  History as HistoryIcon,
  Trash2,
  Copy,
  Plus
} from 'lucide-react';
import BraidingContext from '../context';
import { Actions } from '../reducer';
import { decPattern, encPattern, newArr, asString } from '../util/funcs';
import Colors from './Colors';

import styles from './Controls.module.scss';

function band(n: number) {
  return newArr(16, 0).map((_, i) => {
    const x = i + 1;
    return x + n * Math.floor((x - 1) / n);
  }).join(',');
}

interface HandConfigProps {
  hand: 'left' | 'right';
  strands: number;
  colors: string[];
  base: string;
  onStrandsChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  onPatternChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  onColorChange: (hand: string, color: string, strands: string | number[]) => void;
}

const HandConfig: React.FC<HandConfigProps> = ({
  hand, strands, colors, base,
  onStrandsChange, onPatternChange, onColorChange,
}) => {
  const [toChange, setStrands] = useState('all');
  const handLbl = hand.charAt(0).toUpperCase() + hand.slice(1);

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3>{handLbl} Hand</h3>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>
          <label htmlFor={`strands-${hand}`}>Strands</label>
          <span className={styles.badge}>{strands}</span>
        </div>
        <input
          id={`strands-${hand}`}
          type='range'
          max={32}
          min={2}
          value={strands}
          onChange={onStrandsChange}
          className={styles.range}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor={`base-${hand}`}>Base Pattern</label>
        <input
          id={`base-${hand}`}
          type='text'
          value={base}
          onChange={onPatternChange}
          className={styles.textInput}
          placeholder="e.g. u4 o4"
        />
      </div>

      <div className={styles.colorConfig}>
        <div className={styles.colorActions}>
          <div className={styles.selectGroup}>
            <label>Batch Set</label>
            <select value={toChange} onChange={(evt) => setStrands(evt.target.value)} className={styles.select}>
              <option value="all">All</option>
              <option value="even">Even</option>
              <option value="odd">Odd</option>
              <option value={band(2)}>2-band</option>
              <option value={band(3)}>3-band</option>
              <option value={band(4)}>4-band</option>
            </select>
          </div>
          <Colors
            value={colors[0]}
            hideName
            onChange={(evt) => {
              onColorChange(
                hand,
                evt.target.value,
                /,/.test(toChange)
                  ? toChange.replace(/ /g, '').split(',').map(Number)
                  : toChange
              );
            }}
          />
        </div>

        <div className={styles.colorGrid}>
          {colors.slice(0, strands).map((color, i) => (
            <Colors
              key={i}
              value={color}
              hideName
              onChange={(evt) => onColorChange(hand, evt.target.value, [i + 1])}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Controls: React.FC = () => {
  const { dispatch, ...state } = React.useContext(BraidingContext);
  const {
    rows, left, right, leftBase, rightBase,
    leftColors, rightColors,
    weavingRow, weavingStrand, history, pattern,
  } = state;

  const [patternName, setPatternName] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const importEl = useRef<HTMLTextAreaElement>(null);

  const changeRows = useCallback(
    (field: string, xform: (v: string) => any = (v => v)) => (evt: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: Actions.changeInputs,
        payload: { [field]: xform(evt.target.value) }
      });
    },
    [dispatch]
  );

  const handleSave = () => {
    dispatch({ type: Actions.saveToHistory, payload: { name: patternName } });
    setPatternName('');
  };

  const handleImport = () => {
    const str = importEl.current?.value.trim();
    if (str) {
      const decoded = decPattern(str);
      if (Object.keys(decoded).length > 0) {
        dispatch({ type: Actions.replaceState, payload: decoded });
      }
    }
  };

  const copyToClipboard = () => {
    const encoded = encPattern(state as any);
    navigator.clipboard.writeText(encoded);
  };

  return (
    <div className={styles.controls}>
      <div className={styles.mainActions}>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>
            <label htmlFor="rows-input">Rows</label>
            <span className={styles.badge}>{rows}</span>
          </div>
          <input
            id="rows-input"
            type='range'
            max={64}
            min={4}
            value={rows}
            step={4}
            onChange={changeRows('rows', n => Number(n))}
            className={styles.range}
          />
        </div>
      </div>

      <HandConfig
        hand="left"
        base={leftBase}
        colors={leftColors}
        strands={left}
        onStrandsChange={changeRows('left', n => Number(n))}
        onPatternChange={evt => {
          evt.target.value.length >= 1 && dispatch({
            type: Actions.changeInputs,
            payload: { leftBase: evt.target.value }
          });
        }}
        onColorChange={(hand, color, strands) => {
          dispatch({ type: Actions.changeColors, payload: { hand, color, strands } });
        }}
      />

      <HandConfig
        hand="right"
        base={rightBase}
        colors={rightColors}
        strands={right}
        onStrandsChange={changeRows('right', n => Number(n))}
        onPatternChange={evt => {
          evt.target.value.length >= 1 && dispatch({
            type: Actions.changeInputs,
            payload: { rightBase: evt.target.value }
          });
        }}
        onColorChange={(hand, color, strands) => {
          dispatch({ type: Actions.changeColors, payload: { hand, color, strands } });
        }}
      />

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Weaving Progress</h3>
        </div>
        <div className={styles.progressRow}>
          <button
            className={styles.iconButton}
            onClick={() => dispatch({ type: Actions.doWeave, payload: { move: -1 } })}
            title="Previous Step"
          >
            <ChevronLeft size={20} />
          </button>
          <div className={styles.progressStats}>
            <div><span>Hand:</span> <strong>{weavingStrand}</strong></div>
            <div><span>Row:</span> <strong>{weavingRow + 1}</strong></div>
            <div><span>Run:</span> <strong>{asString(pattern[weavingRow] ? pattern[weavingRow][weavingStrand === 'left' ? 1 : 0] : [])}</strong></div>
          </div>
          <button
            className={styles.iconButton}
            onClick={() => dispatch({ type: Actions.doWeave, payload: { move: 1 } })}
            title="Next Step"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Save & Export</h3>
        </div>
        <div className={styles.saveGroup}>
          <input
            type="text"
            placeholder="Pattern Name"
            value={patternName}
            onChange={(e) => setPatternName(e.target.value)}
            className={styles.textInput}
          />
          <button className={styles.button} onClick={handleSave} disabled={!patternName}>
            <Save size={16} /> Save
          </button>
        </div>

        <div className={styles.actionGrid}>
          <button className={styles.secondaryButton} onClick={copyToClipboard} title="Copy pattern string">
            <Copy size={16} /> Copy
          </button>
          <button className={styles.secondaryButton} onClick={() => setShowHistory(!showHistory)}>
            <HistoryIcon size={16} /> History ({history.length})
          </button>
        </div>
      </div>

      {showHistory && (
        <div className={styles.historyOverlay}>
          <div className={styles.historyContent}>
            <div className={styles.historyHeader}>
              <h3>Pattern History</h3>
              <button className={styles.closeButton} onClick={() => setShowHistory(false)}>&times;</button>
            </div>
            {history.length === 0 ? (
              <p className={styles.emptyMsg}>No saved patterns yet.</p>
            ) : (
              <ul className={styles.historyList}>
                {history.map(item => (
                  <li key={item.id} className={styles.historyItem}>
                    <div className={styles.historyInfo}>
                      <span className={styles.historyName}>{item.name}</span>
                      <span className={styles.historyDate}>{new Date(item.timestamp).toLocaleDateString()}</span>
                    </div>
                    <div className={styles.historyActions}>
                      <button
                        onClick={() => {
                          const decoded = decPattern(item.pattern);
                          dispatch({ type: Actions.replaceState, payload: decoded });
                          setShowHistory(false);
                        }}
                        className={styles.iconButton}
                        title="Load Pattern"
                      >
                        <Upload size={16} />
                      </button>
                      <button
                        onClick={() => dispatch({ type: Actions.deleteFromHistory, payload: { id: item.id } })}
                        className={styles.deleteButton}
                        title="Delete Pattern"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Import</h3>
        </div>
        <textarea
          rows={3}
          ref={importEl}
          className={styles.textarea}
          placeholder="Paste pattern string here..."
        />
        <button className={styles.button} onClick={handleImport}>
          <Download size={16} /> Import
        </button>
      </div>
    </div>
  );
};

export default Controls;
