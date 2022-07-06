import React from 'react';
import styles from './styles.module.css';
import Modal from '@mui/material/Modal';
import {faArrowRotateRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const PaymentFailModal = ({open, setOpen, onButtonClick}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <div className={styles.modalMain}>
        <div className={styles.checkContainer}>
          <img
            src="/images/exclamationSign.svg"
            alt="check"
            className={styles.check}
          />
        </div>
        <h3 className={styles.heading}>Payment Fail</h3>
        <p className={styles.para}>
          The Reason For The Failure, Check The Payment Method.
        </p>
        <button onClick={onButtonClick} className={styles.btn}>
          <FontAwesomeIcon icon={faArrowRotateRight} /> Try Again
        </button>
      </div>
    </Modal>
  );
};

export default PaymentFailModal;
