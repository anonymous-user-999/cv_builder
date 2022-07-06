import {faCalendar, faSortDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {forwardRef} from 'react';
import styles from './styles.module.css';

const Select = forwardRef(
  ({id, label, error, required, options, icon, ...rest}, ref) => {
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
          <select
            style={required ? {backgroundColor: '#CCF1E6'} : {}}
            className={styles.input}
            ref={ref}
            id={id}
            style={error?.message ? {border: '1px solid #d12c2c'} : {}}
            {...rest}>
            <option value="">Select</option>
            {options.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
          <FontAwesomeIcon icon={faSortDown} className={styles.icon} />
        </div>
        {error?.message && <div className={styles.error}>{error?.message}</div>}
      </div>
    );
  },
);

export default Select;
