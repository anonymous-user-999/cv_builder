import {faArrowDown, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import Template from '../../src/components/Template';
import styles from './styles.module.css';

const ResumeLink = () => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.btns}>
          <button className={styles.downloadBtn}>
            <FontAwesomeIcon icon={faArrowDown} className="mr-3" />
            Download Resume
          </button>
          <button className={styles.shareBtn}>
            <img
              src="/images/share-arrow.svg"
              height="14"
              className="mr-3"
              alt="share"
            />
            Share Resume
          </button>
        </div>
        <Link href="/resume-profile">
          <div className={styles.templateCross}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </Link>
      </div>

      <div className={styles.templateContainer}>
        <Template />
      </div>
    </div>
  );
};

export default ResumeLink;
