import {Modal, useMediaQuery} from '@mui/material';
import React from 'react';
import styles from './styles.module.css';

const DeleteJobModal = React.forwardRef(({open, setOpen, onDelete}, ref) => {
  const isSmallerThan768 = useMediaQuery('(max-width: 767px)');

  const onDeleteClick = () => {
    onDelete();
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <div className={styles.modalContainer}>
        <div className={styles.modalMain} ref={ref}>
          <h3 className={styles.Heading}>Delete Job</h3>
          <div className={styles.para}>
            Are You Sure You Want To Delete This Job?
          </div>
          {!isSmallerThan768 && (
            <div className="flex justify-end items-center">
              <button
                className={styles.btnCancel}
                onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button className={styles.btnDelete} onClick={onDeleteClick}>
                Delete
              </button>
            </div>
          )}
        </div>
        {isSmallerThan768 && (
          <div className={styles.footerBtns}>
            <button className={styles.btnDelete} onClick={onDeleteClick}>
              Delete
            </button>
            <button className={styles.btnCancel} onClick={() => setOpen(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
});

export default DeleteJobModal;
