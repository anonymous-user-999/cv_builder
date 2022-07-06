import {
  faCheck,
  faMagnifyingGlass,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {forwardRef, useRef, useState} from 'react';
import useClickOutside from '../../../utils/useClickOutside';
import styles from './styles.module.css';

const Paras = [
  'Hardworking College Student Seeking Employment. Bringing Forth A Motivated Attitude And A Variety Of Powerful Skills. Adept In Various Social Media Platforms And Office Technology Programs. Committed To Utilizing My Skills To Further The Mission Of A Company.',
  'Hardworking College Student Seeking Employment. Bringing Forth A Motivated Attitude And A Variety Of Powerful Skills. Adept In Various Social Media Platforms And Office Technology Programs. Committed To Utilizing My Skills To Further The Mission Of A Company.',
  'Hardworking College Student Seeking Employment. Bringing Forth A Motivated Attitude And A Variety Of Powerful Skills. Adept In Various Social Media Platforms And Office Technology Programs. Committed To Utilizing My Skills To Further The Mission Of A Company.',
  'Hardworking College Student Seeking Employment. Bringing Forth A Motivated Attitude And A Variety Of Powerful Skills. Adept In Various Social Media Platforms And Office Technology Programs. Committed To Utilizing My Skills To Further The Mission Of A Company.',
  'Hardworking College Student Seeking Employment. Bringing Forth A Motivated Attitude And A Variety Of Powerful Skills. Adept In Various Social Media Platforms And Office Technology Programs. Committed To Utilizing My Skills To Further The Mission Of A Company.',
  'Hardworking College Student Seeking Employment. Bringing Forth A Motivated Attitude And A Variety Of Powerful Skills. Adept In Various Social Media Platforms And Office Technology Programs. Committed To Utilizing My Skills To Further The Mission Of A Company.',
];

const SmartTailorModal = forwardRef(({top, isOpen}, ref) => {
  const [checkParaIndex, setCheckParaIndex] = useState(-1);

  return (
    isOpen && (
      <div
        className={styles.smartTailorContainer}
        style={{top: `${top}px`}}
        ref={ref}>
        <div className="p-8 pb-0">
          <div className={styles.inputContainer}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={styles.searchIcon}
            />
            <input
              placeholder="Filter Phrases By Keyword And Job Title"
              type="text"
              className={styles.searchInput}
            />
          </div>
          <h4 className={styles.heading}>MOST POPULAR</h4>
        </div>
        <div className={styles.contentContainer}>
          {Paras?.map((para, index) => (
            <div
              className={styles.paraContainer}
              onClick={() => setCheckParaIndex(index)}>
              <div
                className={styles.checkContainer}
                style={
                  checkParaIndex === index
                    ? {backgroundColor: '#00B884', color: '#fff'}
                    : {}
                }>
                <FontAwesomeIcon
                  icon={checkParaIndex === index ? faCheck : faPlus}
                />
              </div>
              <div className={styles.Para}>{para}</div>
            </div>
          ))}
        </div>
      </div>
    )
  );
});

export default SmartTailorModal;
