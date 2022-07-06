import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {forwardRef, useState} from 'react';
import styles from './styles.module.css';
import {faSortDown} from '@fortawesome/free-solid-svg-icons';

const CountrySelect = forwardRef(
  ({id, label, value, error, required, options, ...rest}, ref) => {
    const [country, setCountry] = useState('arabic');
    return (
      <div className={styles.inputContainer}>
        {label && (
          <label
            htmlFor={id ? `${id}` : null}
            id={id ? `${id}-label` : null}
            className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.inputWrapper}>
          <img
            src={`/images/${value || country}.png`}
            alt="country"
            className={styles.flag}
          />
          <select
            style={required ? {backgroundColor: '#CCF1E6'} : {}}
            className={styles.input}
            ref={ref}
            id={id}
            onChange={(e) => setCountry(e.target.value)}
            {...rest}>
            <option value="arabic">Saudi Arabia</option>
            <option value="english">England</option>
            <option value="hindi">India</option>
          </select>
          <FontAwesomeIcon icon={faSortDown} className={styles.icon} />
        </div>
      </div>
    );
  },
);

export default CountrySelect;
