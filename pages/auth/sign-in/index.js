import React, {useContext, useState} from 'react';
import styles from './styles.module.css';
import Input from '../../../src/components/shared/Input';
import {FaRegEye, AiFillCaretLeft} from 'react-icons/fa';
import {BsArrowLeftShort} from 'react-icons/bs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import ForgetPasswordModal from '../../../src/components/AdminDashboard/ForgetPasswordModal';
import {Formik} from 'formik';
import {getFieldProps} from '../../../src/utils';
import API from '../../../src/services';
import * as Yup from 'yup';
import {isEmpty} from 'lodash';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';
import {useLocalStorage} from '../../../src/hooks';
import LoadingScreen from '../../../src/components/router/LoadingScreen';
import UserContext from '../../../src/contexts/UserContext';

const initialValues = {
  email: '',
  password: '',
};

const SignIn = () => {
  const {loginWithEmail, loading} = useContext(UserContext);

  const [forgetPasswordModal, setForgetPasswordModal] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });


  const onSubmit = async (newData, errors) => {
    if (isEmpty(errors)) {
      const data = {};
      data.email = newData.email;
      data.password = newData.password;
      data.deviceId = '2342-4333-44444543-2333';
      await loginWithEmail(data);
    }
  };
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ForgetPasswordModal
        open={forgetPasswordModal}
        setOpen={setForgetPasswordModal}
      />
      <div className={styles.container}>
        <Link href="/home">
          <FontAwesomeIcon icon={faXmark} className={styles.cross} />
        </Link>
        <div className={styles.main}>
          <h3 className={styles.heading}>Get started with your account</h3>
          <h4 className={styles.subHeading}>Enter Your Email And Passwords.</h4>
          <Formik
            validateOnBlur
            initialValues={initialValues}
            validationSchema={schema}>
            {(formik) => (
              <>
                <div className={styles.inputsWrapper}>
                  <Input
                    label="E-Mail Address"
                    type="email"
                    placeholder="Type Here"
                    className={styles.inputContainer}
                    {...getFieldProps(formik, schema, 'email')}
                    error={formik.errors.email}
                  />
                  <Input
                    label="Passwords"
                    type="password"
                    placeholder="Type Here"
                    icon={FaRegEye}
                    className={styles.inputContainer}
                    {...getFieldProps(formik, schema, 'password')}
                    error={formik.errors.password}
                  />
                  <div
                    className={styles.forgetPassword}
                    onClick={() => setForgetPasswordModal(true)}>
                    Forgot Your Passwords?
                  </div>
                  <Link href="/auth/sign-up">
                    <div className={`${styles.forgetPassword} mt-2`}>
                      Don't have any account then{' '}
                      <span style={{color: 'var(--app-color)'}}>Sign Up</span>{' '}
                    </div>
                  </Link>
                </div>
                <div className={styles.btnsContainer}>
                  <button type="button" className={styles.btnBack}>
                    <BsArrowLeftShort
                      style={{color: 'var(--text-color)'}}
                      className="mr-3"
                    />
                    Back
                  </button>
                  <button
                    onClick={async () => {
                      const isValid = await formik.validateForm(formik.values);
                      onSubmit(formik.values, isValid);
                    }}
                    className={styles.btnSignIn}>
                    Sign In
                  </button>
                </div>
              </>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default SignIn;
