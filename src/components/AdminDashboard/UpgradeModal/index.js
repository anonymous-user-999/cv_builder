import React from 'react';
import styles from './styles.module.css';
import Modal from '@mui/material/Modal';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const UpgradeModal = ({open, setOpen}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <div className={styles.modalMain}>
        <img
          className={styles.modalImg}
          src="/images/upgradeImage.svg"
          alt="upgrade"
        />
        <div className={styles.contentContainer}>
          <h3 className={styles.heading}>You are over the resume limit</h3>
          <p className={styles.para}>
            Only One Resume Is Available On The Free Plan. Upgrade Your Plan To
            Create An Unlimited Number Of Resumes.
          </p>
          <h4 className={styles.subHeading}>Also Unlock:</h4>
          <div className={styles.checkContainer}>
            <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />
            <span className={styles.checkText}>All Templates</span>
          </div>
          <div className={styles.checkContainer}>
            <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />
            <span className={styles.checkText}>Unlimited Cover Letters</span>
          </div>
          <button className={styles.button}>
            <Link href="/upgrade">Upgrade Now 25$ Yearly</Link>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UpgradeModal;
