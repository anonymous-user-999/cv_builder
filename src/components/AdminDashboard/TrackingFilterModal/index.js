import React from 'react';
import styles from './styles.module.css';
import Modal from '@mui/material/Modal';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useMediaQuery} from '@mui/material';

const FilterValues = [
  {
    value: '',
    text: 'All',
  },
  {
    value: 'EmailList',
    text: 'Email List',
  },
  {
    value: 'APPLIED',
    text: 'Applied',
  },
  {
    value: 'INTERVIEW',
    text: 'Interview',
  },
  {
    value: 'OFFER',
    text: 'Offer',
  },
];

const TrackingFilterModal = React.forwardRef(
  ({open, setOpen, filterValue, setFilterValue}, ref) => {
    const isSmallerThan768 = useMediaQuery('(max-width: 767px)');

    const onReset = () => {
      setFilterValue('');
      setOpen(false);
    };

    return (
      open && (
        <div className={styles.modal} ref={ref}>
          <div className={styles.filterContent}>
            <div className={styles.header}>
              <h3 className={styles.heading}>Filter</h3>
              {!isSmallerThan768 && (
                <div
                  className={styles.crossContainer}
                  onClick={() => setOpen(false)}>
                  <FontAwesomeIcon icon={faXmark} className={styles.cross} />
                </div>
              )}
            </div>
            <div className={styles.filterFields}>
              {FilterValues?.map((filterVal) => (
                <div
                  className={styles.main}
                  onClick={() => setFilterValue(filterVal?.value)}>
                  <div
                    className={
                      filterVal?.value === filterValue
                        ? `${styles.check} ${styles.checked}`
                        : styles.check
                    }
                  />
                  <div className={styles.text}>{filterVal?.text}</div>
                </div>
              ))}
            </div>
            {!isSmallerThan768 && (
              <div className="flex justify-end items-center">
                <button className={styles.btnOutline} onClick={onReset}>
                  Reset
                </button>
                <button className={styles.btnFill}>Filter</button>
              </div>
            )}
          </div>
          {isSmallerThan768 && (
            <div className={styles.filterfooter}>
              <button className={styles.btnOutline} onClick={onReset}>
                Reset
              </button>
              <button className={styles.btnFill}>Filter</button>
            </div>
          )}
        </div>
      )
    );
  },
);

export default TrackingFilterModal;
