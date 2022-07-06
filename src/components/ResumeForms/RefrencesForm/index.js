import React, {useState} from 'react';
import {
  faChevronUp,
  faEllipsisVertical,
  faTrash,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useForm} from 'react-hook-form';
import {required} from '../../../utils';
import TextInput from '../TextInput';
import styles from './styles.module.css';

const ReferencesForm = (props) => {
  const {references, setReferences} = props;
  const [errorInForm, setErrorInForm] = useState(false);
  const [boxOpen, setBoxOpen] = useState(false);
  const [boxOpenIndex, setBoxOpenIndex] = useState(-1);
  const [formOpen, setFormOpen] = useState(false);

  const onAddEducation = () => {
    setBoxOpen(false);
    setFormOpen(true);
  };

  const {
    register,
    formState: {errors, isSubmitSuccessful},
    handleSubmit,
    reset,
    watch,
  } = useForm({
    defaultValues: {},
  });

  const onSubmitForm = (data) => {
    const tempReferences = [...references];
    tempReferences?.push(data);
    setReferences(tempReferences);
    setFormOpen(false);
    reset({});
  };

  const setInputValue = (index, type, value) => {
    const tempReferences = [...references];
    tempReferences[index] = {...tempReferences[index], [type]: value};
    setReferences(tempReferences);
    const edu = tempReferences?.[index];
    if (
      !edu?.referentFullName ||
      !edu?.jobTitle ||
      !edu?.institution ||
      !edu?.phoneNumber ||
      !edu?.email
    ) {
      setErrorInForm(true);
    } else {
      setErrorInForm(false);
    }
  };

  const onBoxOpen = (index) => {
    if (!errorInForm) {
      setBoxOpenIndex(index);
      setBoxOpen(!boxOpen);
      setFormOpen(false);
    }
  };

  const onDelete = (index) => {
    const tempReferences = [...references];
    tempReferences.splice(index, 1);
    setReferences(tempReferences);
  };

  console.log('references', references);

  return (
    <div className={styles.main}>
      <div className={styles.headerPara}>
        Hello Dear Mus'ab, Add here some other sections to interest the reader!
        Bibliography - your best hobbies, best projects, achievements, and
        awards.
      </div>

      {references?.map((edu, index) => (
        <div className={styles.boxContainer}>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className={styles.boxDots}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className={styles.deleteIcon}
            onClick={() => onDelete(index)}
          />

          <div className={styles.box}>
            <div className={styles.boxHeader}>
              <div>
                <div className={styles.boxName}>
                  {edu?.referentFullName} At {edu?.institution}
                </div>
                <div
                  className={styles.boxDuration}
                  style={
                    boxOpenIndex === index && boxOpen
                      ? {visibility: 'hidden'}
                      : {}
                  }>
                  {edu?.phoneNumber}
                </div>
              </div>
              <FontAwesomeIcon
                icon={boxOpen ? faChevronUp : faChevronDown}
                onClick={() => onBoxOpen(index)}
                className={styles.boxArrow}
              />
            </div>
            {boxOpenIndex === index && boxOpen && (
              <>
                <div className={styles.boxForm}>
                  <TextInput
                    label="Referent's Full Name"
                    value={edu?.referentFullName}
                    onChange={(e) =>
                      setInputValue(index, 'referentFullName', e.target.value)
                    }
                    error={
                      !edu?.referentFullName && required("Referent's Full Name")
                    }
                    placeholder="Type Here"
                  />
                  <TextInput
                    label="Job Title"
                    value={edu?.jobTitle}
                    placeholder="Type Here"
                    onChange={(e) =>
                      setInputValue(index, 'jobTitle', e.target.value)
                    }
                    error={!edu?.jobTitle && required('Job Title')}
                  />
                  <TextInput
                    label="Institution"
                    placeholder="Type Here"
                    value={edu?.institution}
                    onChange={(e) =>
                      setInputValue(index, 'institution', e.target.value)
                    }
                    error={!edu?.institution && required('Institution')}
                  />
                  <TextInput
                    label="Phone Number"
                    placeholder="Type Here"
                    value={edu?.phoneNumber}
                    type="number"
                    onChange={(e) =>
                      setInputValue(index, 'phoneNumber', e.target.value)
                    }
                    error={!edu?.phoneNumber && required('Phone Number')}
                  />
                  <TextInput
                    label="Email"
                    placeholder="Type Here"
                    value={edu?.email}
                    type="email"
                    onChange={(e) =>
                      setInputValue(index, 'email', e.target.value)
                    }
                    error={!edu?.email && required('Email')}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      ))}

      {!formOpen && (
        <>
          <div className={styles.addBtn} onClick={onAddEducation}>
            + Add Reference
          </div>
          <div className="flex justify-end" style={{marginTop: '20vh'}}>
            <button className={`${styles.btn} ${styles.nextBtn}`}>Next</button>
          </div>
        </>
      )}
      {formOpen && (
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className={styles.boxForm}>
            <TextInput
              label="Referent's Full Name"
              placeholder="Type Here"
              error={errors.referentFullName}
              {...register('referentFullName', {
                required: required("Referent's Full Name"),
              })}
            />
            <TextInput
              label="Job Title"
              placeholder="Type Here"
              error={errors.jobTitle}
              {...register('jobTitle', {
                required: required('Job Title'),
              })}
            />
            <TextInput
              label="Institution"
              placeholder="Type Here"
              error={errors.institution}
              {...register('institution', {
                required: required('Institution'),
              })}
            />
            <TextInput
              label="Phone Number"
              placeholder="Type Here"
              error={errors.phoneNumber}
              type="number"
              {...register('phoneNumber', {
                required: required('Phone Number'),
              })}
            />
            <TextInput
              label="Email"
              placeholder="Type Here"
              error={errors.email}
              type="email"
              {...register('email', {
                required: required('Email'),
              })}
            />
          </div>
          <div className="flex justify-end mt-10">
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className={`${styles.btn} ${styles.cancelBtn} mr-8`}>
              cancel
            </button>
            <button type="submit" className={`${styles.btn} ${styles.nextBtn}`}>
              add
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReferencesForm;
