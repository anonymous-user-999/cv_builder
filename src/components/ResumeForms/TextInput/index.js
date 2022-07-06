import {faCalendar} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {forwardRef} from 'react';
import styles from './styles.module.css';

const TextInput = forwardRef(
  ({id, label, error, type = 'text', required, icon, ...rest}, ref) => {
    return (
      <div className={styles.inputContainer}>
        {label && (
          <label
            htmlFor={id ? `${id}` : null}
            id={id ? `${id}-label` : null}
            className={styles.label}
            >
            {label}
          </label>
        )}
        <div className={styles.inputWrapper}>
          <input
            style={required ? {backgroundColor: '#CCF1E6'} : {}}
            className={styles.input}
            ref={ref}
            id={id}
            error={error}
            {...rest}
            style={error?.message ? {border: '1px solid #d12c2c'} : {}}
            type={type}
          />
          {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
        </div>
        {error?.message && <div className={styles.error}>{error?.message}</div>}
      </div>
    );
  },
);

export default TextInput;
