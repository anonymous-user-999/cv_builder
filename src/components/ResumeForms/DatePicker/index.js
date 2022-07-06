import {faCalendar} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {forwardRef} from 'react';
import ReactDatePicker from 'react-datepicker';
import styles from './styles.module.css';

const CustomInput = forwardRef(({id, label, error, required, ...rest}, ref) => {
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
        <input
          style={required ? {backgroundColor: '#CCF1E6'} : {}}
          className={styles.input}
          ref={ref}
          id={id}
          style={error?.message ? {border: '1px solid #d12c2c'} : {}}
          {...rest}
        />
        <FontAwesomeIcon icon={faCalendar} className={styles.icon} />
      </div>
      {error?.message && <div className={styles.error}>{error?.message}</div>}
    </div>
  );
});

const DatePicker = forwardRef(({id, label, error, required, ...rest}, ref) => {
  return (
    <ReactDatePicker
      ref={ref}
      {...rest}
      style={{display: 'block'}}
      customInput={
        <CustomInput id={id} label={label} error={error} required={required} />
      }
    />
  );
});

export default DatePicker;
