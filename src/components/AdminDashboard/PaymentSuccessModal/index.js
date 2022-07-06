import React from 'react';
import styles from './styles.module.css';
import Modal from '@mui/material/Modal';


const PaymentSuccessModal = ({open, setOpen, onButtonClick}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <div className={styles.modalMain}>
        <div className={styles.checkContainer}>
          <img
            src="/images/checkSign.svg"
            alt="check"
            className={styles.check}
          />
        </div>
        <h3 className={styles.heading}>Payment success</h3>
        <p className={styles.para}>Your Account Upgrade Successfully.</p>
        <button onClick={onButtonClick} className={styles.btn}>
          Discover New Features
        </button>
      </div>
    </Modal>
  );
};

export default PaymentSuccessModal;
