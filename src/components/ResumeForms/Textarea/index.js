import {faCalendar} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {forwardRef, useState, useRef} from 'react';
import SmartTailorModal from '../SmartTailorModal';
import styles from './styles.module.css';
import useClickOutside from '../../../utils/useClickOutside';

const Textarea = forwardRef(
  (
    {id, label, error, optionalText, smartTailor, small, required, ...rest},
    ref,
  ) => {
    const smartTailorRef = useRef(null);

    const [smartTailorModal, setSmartTailorModal] = useState(false);

    useClickOutside(smartTailorRef, () => {
      setSmartTailorModal(false);
    });

    return (
      <div className={styles.inputContainer}>
        <div className="flex justify-between items-center">
          {label && (
            <div className={styles.label}>
              {label} &nbsp;{' '}
              <span className={styles.optional}> {optionalText}</span>
            </div>
          )}
          {smartTailor && (
            <div
              className={styles.smartTextContainer}
              onClick={() => setSmartTailorModal(true)}>
              <SmartTailorModal
                top="322"
                ref={smartTailorRef}
                isOpen={smartTailorModal}
              />
              <div className={styles.smartText}>Smart Tailor</div>
              <img
                className={styles.smartIcon}
                src="/images/energyIcon.svg"
                alt="smart"
              />
            </div>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <textarea
            style={required ? {backgroundColor: '#CCF1E6'} : {}}
            className={
              small
                ? `${styles.input} ${styles.smallTextArea}`
                : `${styles.input}`
            }
            ref={ref}
            id={id}
            {...rest}
            rows="10"
          />
        </div>
      </div>
    );
  },
);

export default Textarea;
