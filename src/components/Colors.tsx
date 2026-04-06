import React from 'react';
import styles from './Colors.module.scss';

interface ColorsProps {
  name?: string;
  value: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  hideName?: boolean;
  type?: string;
}

const Colors: React.FC<ColorsProps> = ({ 
  type = 'color', 
  name, 
  value, 
  onChange, 
  hideName 
}) => {
  return (
    <div className={styles.colorWrapper}>
      {!hideName && name && <label className={styles.label}>{name}</label>}
      <div className={styles.inputWrapper}>
        <input 
          type={type} 
          name={name} 
          value={value} 
          onChange={onChange} 
          className={styles.colorInput}
        />
        <span className={styles.colorHex} title={value}>{value}</span>
      </div>
    </div>
  );
};

export default Colors;
