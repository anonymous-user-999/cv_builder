import React, {useState} from 'react';
import styles from './styles.module.css';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import DatePicker from 'react-datepicker';
import { useMediaQuery } from '@mui/material';

const JobApplicationsFilter = React.forwardRef(({open, setOpen}, ref) => {
  const isSmallerThan768 = useMediaQuery('(max-width: 767px)');  

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    open && (
      <div ref={ref} className={styles.modal}>
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
            <div className={styles.main}>
              <h4 className={styles.subHeading}>Platform</h4>
              <div className={styles.optionsContainer}>
                <div className={`${styles.option} ${styles.optionSelected}`}>
                  All
                </div>
                <div className={styles.option}>
                  <FontAwesomeIcon icon={faLinkedinIn} color="#2867B2" />
                </div>
                <div className={styles.option}>
                  <FontAwesomeIcon icon={faTwitter} color="#1DA1F2" />
                </div>
                <div className={styles.option}>
                  <FontAwesomeIcon icon={faFacebookF} color="#4267B3" />
                </div>
              </div>
            </div>
            <div className={styles.main}>
              <h4 className={styles.subHeading}>Matching Rate</h4>
              <div className={styles.optionsContainer}>
                <div className={`${styles.option} ${styles.optionSelected}`}>
                  All
                </div>
                <div className={styles.option}>100% - 80%</div>
                <div className={styles.option}>80% - 60%</div>
              </div>
            </div>
            <div className={styles.main}>
              <h4 className={styles.subHeading}>Date Post Was Add</h4>
              <div className={styles.datesContainer}>
                <div className={styles.dateContainer}>
                  <label className={styles.label} htmlFor="startDate">
                    From
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    id="startDate"
                    className={styles.datePicker}
                    placeholderText="DD/MM/YYYY"
                  />
                </div>
                <span className={styles.datesDash}> - </span>
                <div className={styles.dateContainer}>
                  <label className={styles.label} htmlFor="endDate">
                    To
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    id="endDate"
                    className={styles.datePicker}
                    placeholderText="DD/MM/YYYY"
                  />
                </div>
              </div>
            </div>
          </div>
          {!isSmallerThan768 && (
            <div className="flex justify-end items-center">
              <button className={styles.btnOutline}>Reset</button>
              <button className={styles.btnFill}>Filter</button>
            </div>
          )}
        </div>
        {isSmallerThan768 && (
          <div className={styles.filterfooter}>
            <button className={styles.btnOutline}>Reset</button>
            <button className={styles.btnFill}>Filter</button>
          </div>
        )}
      </div>
    )
  );
});

export default JobApplicationsFilter;
