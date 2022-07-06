import React from 'react';
import styles from './styles.module.css';

const CoverLetter = (props) => {
  const {data, jobTitle, hiringManager, mainView = false} = props;

  return (
    <page
      className={styles.letter}
      id="jobLetterEditMode"
      style={!mainView ? {maxHeight: '297mm', overflowY: 'auto'} : {}}>
      <div className={styles.heading}>{jobTitle}</div>
      <div className={styles.hiringManager}>Dear {hiringManager}</div>
      <div className={styles.data}>{data}</div>
    </page>
  );
};

export default CoverLetter;
