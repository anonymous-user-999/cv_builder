import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';
import {Modal} from '@mui/material';
import Input from '../../shared/Input';
import {BsArrowLeftShort} from 'react-icons/bs';
import {FaRegEye} from 'react-icons/fa';

const ForgetPasswordModal = ({open, setOpen}) => {
  const [resetPassword, setResetPassword] = useState(false);

  useEffect(() => {
    setResetPassword(false);
  }, [open]);

  const onBack = () => {
    if (resetPassword) {
      setResetPassword(false);
      return;
    }
    setOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (resetPassword) {
      setOpen(false);
      return;
    }
    setResetPassword(true);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <div className={styles.modalContainer}>
        <form className={styles.modalMain} onSubmit={onSubmit}>
          <h3 className={styles.heading}>
            {resetPassword ? 'Reset Password.' : 'Forgot Your Passwords?'}{' '}
          </h3>
          {!resetPassword ? (
            <Input
              label="E-Mail Address"
              type="email"
              placeholder="Type Here"
              className={styles.inputContainer}
            />
          ) : (
            <Input
              label="Password"
              type="password"
              placeholder="Type Password"
              icon={FaRegEye}
              className={styles.inputContainer}
            />
          )}

          <div className="flex justify-between">
            <button type="button" onClick={onBack} className={styles.btnBack}>
              <BsArrowLeftShort
                style={{color: 'var(--text-color)'}}
                className="mr-3"
              />
              Back
            </button>
            <button type="submit" className={styles.btnSignIn}>
              {resetPassword ? 'Submit' : 'Reset Password'}{' '}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ForgetPasswordModal;
