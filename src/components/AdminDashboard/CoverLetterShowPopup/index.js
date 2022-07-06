import React from 'react';
import styles from './styles.module.css';
import Modal from '@mui/material/Modal';
import CoverLetter from '../../CoverLetter';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const CoverLetterShowPopup = ({open, setOpen, onCross}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <div className={styles.modalWrapper}>
        <div className={styles.cross} onClick={onCross}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <div className={styles.letterContainer}>
          <CoverLetter />
        </div>
      </div>
    </Modal>
  );
};

export default CoverLetterShowPopup;
