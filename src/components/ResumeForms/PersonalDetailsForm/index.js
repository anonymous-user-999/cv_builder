import React, {useRef, useState} from 'react';
import styles from './styles.module.css';
import TextInput from '../TextInput';
import {useForm} from 'react-hook-form';
import {required} from '../../../utils';
import ReactDatePicker from 'react-datepicker';
import DatePicker from '../DatePicker';
import {
  faChevronDown,
  faChevronUp,
  faLocationDot,
  faMapMarkedAlt,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const PersonalDetailsForm = () => {
  const inputFile = useRef(null);

  const [imageFilePath, setImageFilePath] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [additionalInputs, setAdditionalInputs] = useState(false);

  const {
    register,
    formState: {errors},
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    defaultValues: {},
  });

  const dateOfBirth = watch('dateOfBirth');

  const onImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImageFile(event.target.files[0]);
      setImageFilePath(URL.createObjectURL(img));
    }
  };

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.headerPara}>
        Hello Dear Mus'ab, Double your chances for an interview! Resumes with
        filled-in contact details, job role, email, and other info usually
        receive much more views.
      </div>
      <form className="">
        <div className={styles.imageContainer}>
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            id="file"
            onChange={onImageUpload}
            ref={inputFile}
            style={{display: 'none'}}
          />
          <img
            src={imageFilePath ? imageFilePath : '/images/dummyProfile.svg'}
            alt="profile"
            className={styles.image}
          />
          <div className={styles.uplaodImg} onClick={onButtonClick}>
            Upload Picture
          </div>
        </div>
        <div className={styles.inputsWrapper}>
          <TextInput
            label="First Name"
            required
            error={errors.firstName}
            {...register('firstName', {
              required: required('First Name'),
            })}
            placeholder="Type Here"
            id="firstName"
          />
          <TextInput
            label="Last Name"
            required
            error={errors.lastName}
            {...register('lastName', {
              required: required('Last Name'),
            })}
            placeholder="Type Here"
            id="lastName"
          />
          <TextInput
            label="Email"
            required
            type="email"
            error={errors.email}
            {...register('email', {
              required: required('Email'),
            })}
            placeholder="Type Here"
            id="email"
          />
          <TextInput
            label="Phone Number"
            type="number"
            error={errors.phoneNumber}
            {...register('phoneNumber')}
            placeholder="Type Here"
            id="phoneNumber"
          />
          <DatePicker
            label="Date Of Birth"
            error={errors.dateOfBirth}
            {...register('dateOfBirth')}
            placeholderText="DD/MM/YYYY"
            selected={dateOfBirth}
            onChange={(date) => setValue('dateOfBirth', date)}
          />
          <TextInput
            label="Location"
            error={errors.location}
            {...register('location')}
            placeholder="Type Here"
            id="location"
            icon={faLocationDot}
          />
          {additionalInputs && (
            <>
              <TextInput
                label="Nationality"
                error={errors.nationality}
                {...register('nationality')}
                placeholder="Type Here"
                id="nationality"
              />
              <TextInput
                label="Website"
                error={errors.website}
                {...register('website')}
                placeholder="Type Here"
                id="website"
              />
              <TextInput
                label="Linkedin"
                error={errors.linkedIn}
                {...register('linkedIn')}
                placeholder="Type Here"
                id="linkedIn"
              />
              <TextInput
                label="Portfolio"
                error={errors.portfolio}
                {...register('portfolio')}
                placeholder="Type Here"
                id="portfolio"
              />
            </>
          )}
        </div>
        <div
          className={styles.additionalInputs}
          onClick={() => setAdditionalInputs(!additionalInputs)}>
          {!additionalInputs ? 'Show' : 'Hide'} Additional Details{' '}
          <FontAwesomeIcon
            icon={!additionalInputs ? faChevronDown : faChevronUp}
            style={{fontSize: '1.25rem'}}
          />
        </div>
        <div className="flex justify-end">
          <button className={styles.btn} type="submit">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetailsForm;
