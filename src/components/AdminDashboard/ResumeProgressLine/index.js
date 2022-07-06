import {faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import {faCircleXmark} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useRef, useState} from 'react';
import styles from './styles.module.css';
import useClickOutside from '../../../utils/useClickOutside';

const Sections = [
  'Personal Details',
  'Summary',
  'References',
  'Education',
  'Certificates',
  'Groups',
  'Experience',
  'Internship',
  'Achievements And Awards',
  'Skills',
  'Volunteering',
  'Projects',
];

const ResumeProgressLine = ({percentage}) => {
  const popupRef = useRef(null);
  const [popupShow, setPopupShow] = useState(false);


  return (
    <div className={styles.progressLineContainer}>
      <div className="flex justify-between items-center">
        <div className={styles.progressLineText}>
          <span style={{color: '#FF5C07'}}> {percentage}% </span>Profile
          Completeness
        </div>
        <FontAwesomeIcon
          onClick={() => setPopupShow(!popupShow)}
          icon={popupShow ? faCircleXmark : faCircleInfo}
          className={styles.infoIcon}
          color={popupShow ? '#676D7D' : '#00B884'}
        />
      </div>
      <div className={styles.progressLine}>
        <div
          style={{width: `${percentage}%`}}
          className={styles.progressLineComplete}
        />
      </div>
      {popupShow && (
        <div className={styles.percentagePopup} ref={popupRef}>
          {Sections?.map((section) => (
            <div className={styles.percnetageSection}>
              <sapn style={{color: '#FF5C07'}}>{percentage}% </sapn> {section}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeProgressLine;
