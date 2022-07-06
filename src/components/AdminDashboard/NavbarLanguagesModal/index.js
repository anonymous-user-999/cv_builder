import React from 'react';
import styles from './styles.module.css';
import Modal from '@mui/material/Modal';

const NavbarLanguagesModal = ({
  open,
  setOpen,
  languages,
  language,
  setLanguage,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <div className={styles.modalWrapper}>
        <div className={styles.main}>
          <h3 className={styles.heading}>Your Language</h3>
          {languages?.map((lang) => (
            <div className={styles.language} onClick={() => setLanguage(lang)}>
              <img
                className={styles.flag}
                src={`/images/${lang}.png`}
                alt="flag"
              />
              <div
                className={styles.languageName}
                style={lang === language ? {color: '#00B884'} : {}}>
                {lang}
              </div>
            </div>
          ))}
        </div>
        <button className={styles.btn} onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default NavbarLanguagesModal;
