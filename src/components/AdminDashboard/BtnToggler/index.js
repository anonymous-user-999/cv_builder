import React from 'react';
import styles from './styles.module.css';

const BtnToggler = ({checked, onChange}) => {
  return (
    <div className={styles.switch}>
      <span className={styles.span}>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onChange(!checked)}
          className={styles.input}
        />
        <button
          className={styles.slider}
          type="button"
          onClick={() => onChange(!checked)}></button>
      </span>
    </div>
  );
};

export default BtnToggler;
