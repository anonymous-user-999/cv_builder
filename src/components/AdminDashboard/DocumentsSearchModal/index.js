import {
  faCalendarDay,
  faChartPie,
  faMagnifyingGlass,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Modal, useMediaQuery} from '@mui/material';
import React from 'react';
import styles from './styles.module.css';

const DocumentsSearchModal = ({open, setOpen}) => {
  const isSmallerThan768 = useMediaQuery('(max-width: 767px)');

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <div className={styles.searchPopup}>
        <div className={styles.mainContainer}>
          <div className={styles.searchPopupBar}>
            <div
              className={`${styles.inputContainer} ${styles.searchPopupInputContainer}`}>
              <input
                type="text"
                className={`${styles.inputSearch} ${styles.searchPopupInput}`}
                placeholder="Search here"
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={styles.searchPopupSearchIcon}
              />
            </div>
            <div className="flex items-center">
              <div
                onClick={() => setOpen(false)}
                className={styles.searchPopupCrossContainer}>
                <FontAwesomeIcon
                  icon={faXmark}
                  className={styles.searchPopupCross}
                />
              </div>
              <button className={styles.searchPopupBtn}>
                {isSmallerThan768 ? (
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                ) : (
                  'Find it now'
                )}
              </button>
            </div>
          </div>
          <div className={styles.documetMain}>
            <h3 className={styles.documentTitle}>Web Developer</h3>
            <div className={styles.documentDetails}>
              <div className="flex items-center mb-2">
                <FontAwesomeIcon
                  icon={faChartPie}
                  className={styles.documentDetailIcon}
                  color="#00B884"
                />
                <div className={styles.documentDetailText}>
                  85% Resume Strength
                </div>
              </div>
              <div className="flex items-center mb-2">
                <FontAwesomeIcon
                  icon={faCalendarDay}
                  className={styles.documentDetailIcon}
                  color="#FD71AF"
                />
                <div className={styles.documentDetailText}>
                  Updated 10 January, 10:02 Am
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DocumentsSearchModal;
