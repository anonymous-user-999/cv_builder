import React, {useContext} from 'react';
import styles from './styles.module.css';

import Input from '../../../src/components/shared/Input';
import {FaRegEye} from 'react-icons/fa';
import {BsArrowLeftShort} from 'react-icons/bs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import {ErrorMessage, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {getFieldProps} from '../../../src/utils';
import {isEmpty} from 'lodash';
import {useRouter} from 'next/router';
import UserContext from '../../../src/contexts/UserContext';
import LoadingScreen from '../../../src/components/router/LoadingScreen';

const initialValues = {
  name: '',
  email: '',
  gender: 'Male',
  phone: '',
  dateOfBirth: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
  const {signUpWithEmail, loading} = useContext(UserContext);

  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email().required('Email is required'),
    gender: Yup.string().required('Gender is required'),
    phone: Yup.string()
      .required('Please enter phone number')
      .matches(
        /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm,
        'Please enter valid phone number',
      ),
    dateOfBirth: Yup.date()
      .required('Date of birth is required')
      .max(new Date()),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password is too short - should be 8 chars minimum'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match',
    ),
  });
  const onSubmit = async (newData, errors) => {
    if (isEmpty(errors)) {
      const data = {};
      data.fullname = newData.name;
      data.email = newData.email;
      data.phone = newData.phone;
      data.password = newData.password;
      data.dob = newData.dateOfBirth;
      data.gender = newData.gender?.toUpperCase();
      data.deviceId = '2342-4333-44444543-2333';
      data.deviceName = 'MacBook Pro 2015';
      data.socialProvider = 'APPLE';
      await signUpWithEmail(data);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className={styles.container}>
      <Link href="/home">
        <FontAwesomeIcon icon={faXmark} className={styles.cross} />
      </Link>
      <div className={styles.main}>
        <h3 className={styles.heading}>Get started with your account</h3>
        <h4 className={styles.subHeading}>Enter Your Details.</h4>
        <Formik
          validateOnBlur
          initialValues={initialValues}
          validationSchema={schema}>
          {(formik) => (
            <>
              <div className={styles.inputsWrapper}>
                <Input
                  label="Name"
                  placeholder="Type Here"
                  className={styles.inputContainer}
                  {...getFieldProps(formik, schema, 'name')}
                  error={formik.errors.name}
                />
                <Input
                  label="E-Mail Address"
                  type="email"
                  placeholder="Type Here"
                  className={styles.inputContainer}
                  {...getFieldProps(formik, schema, 'email')}
                  error={formik.errors.email}
                />
                <Input
                  label="Gender"
                  type="dropdown"
                  options={['Male', 'Female']}
                  {...getFieldProps(formik, schema, 'gender')}
                  className={`${styles.inputContainer} ${styles.select}`}
                  error={formik.errors.gender}
                />
                <Input
                  label="Phone"
                  type="phone"
                  placeholder="Type Here"
                  {...getFieldProps(formik, schema, 'phone')}
                  className={`${styles.inputContainer} ${styles.phone}`}
                  error={formik.errors.phone}
                />

                <Input
                  label="Date of Birth"
                  type="date"
                  {...getFieldProps(formik, schema, 'dateOfBirth')}
                  className={styles.inputContainer}
                  error={formik.errors.dateOfBirth}
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Type Here"
                  icon={FaRegEye}
                  className={styles.inputContainer}
                  {...getFieldProps(formik, schema, 'password')}
                  error={formik.errors.password}
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Type Here"
                  {...getFieldProps(formik, schema, 'confirmPassword')}
                  icon={FaRegEye}
                  className={styles.inputContainer}
                  error={formik.errors.confirmPassword}
                />
              </div>
              <div className={styles.btnsContainer}>
                <Link href="/auth/sign-in">
                  <button type="button" className={styles.btnBack}>
                    <BsArrowLeftShort
                      style={{color: 'var(--text-color)'}}
                      className="mr-3"
                    />
                    Back
                  </button>
                </Link>
                <button
                  className={styles.btnSignIn}
                  type="submit "
                  onClick={async () => {
                    const isValid = await formik.validateForm(formik.values);
                    onSubmit(formik.values, isValid);
                  }}>
                  Sign Up
                </button>
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
