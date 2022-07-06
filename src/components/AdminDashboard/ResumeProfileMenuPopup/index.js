import {faStar} from '@fortawesome/free-regular-svg-icons';
import {faPen, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Modal} from '@mui/material';

import React from 'react';
import styles from './styles.module.css';

const ResumeProfileMenuPopup = ({open, setOpen}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <div className={styles.modalContainer}>
        <div className={styles.modalMain}>
          <div className={styles.modalItem}>
            <FontAwesomeIcon
              icon={faStar}
              className={styles.modalItemIcon}
              color="#FCA84E"
            />
            <div className={styles.modalItemText}>Set Resume As Default</div>
          </div>
          <div className={styles.modalItem}>
            <FontAwesomeIcon
              icon={faPen}
              className={styles.modalItemIcon}
              color="#00B884"
            />
            <div className={styles.modalItemText}>Rename</div>
          </div>
          <div className={styles.modalItem}>
            <FontAwesomeIcon
              icon={faTrash}
              className={styles.modalItemIcon}
              color="#FD71AF"
            />
            <div className={styles.modalItemText}>Delete</div>
          </div>
        </div>
        <button className={styles.btn} onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ResumeProfileMenuPopup;
