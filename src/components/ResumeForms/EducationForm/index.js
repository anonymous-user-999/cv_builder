import React, {useState} from 'react';
import {
  faChevronUp,
  faEllipsisVertical,
  faTrash,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import moment from 'moment';
import {useForm} from 'react-hook-form';
import {required} from '../../../utils';
import CountrySelect from '../CountrySelect';
import DatePicker from '../DatePicker';
import Select from '../Select';
import Textarea from '../Textarea';
import TextInput from '../TextInput';
import styles from './styles.module.css';

const EducationForm = (props) => {
  const {education, setEducation} = props;
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
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: {},
  });

  const startDate = watch('startDate');
  const endDate = watch('endDate');
  const degree = watch('degree');
  const country = watch('country');

  const onSubmitForm = (data) => {
    const tempEducation = [...education];
    tempEducation?.push(data);
    setEducation(tempEducation);
    setFormOpen(false);
    reset({});
  };

  const setInputValue = (index, type, value) => {
    const tempEducation = [...education];
    tempEducation[index] = {...tempEducation[index], [type]: value};
    setEducation(tempEducation);
    const edu = tempEducation?.[index];
    if (
      !edu?.universityName ||
      !edu?.degree ||
      !edu?.fieldOfStudy ||
      !edu?.startDate ||
      !edu?.endDate
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
    const tempEducation = [...education];
    tempEducation.splice(index, 1);
    setEducation(tempEducation);
  };

  console.log('education', education);

  return (
    <div className={styles.main}>
      <div className={styles.headerPara}>
        Hello Dear Mus'ab, A varied education on your resume sums up the value
        that your learnings and background will bring to the job.
      </div>

      {education?.map((edu, index) => (
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
                <div className={styles.boxName}>{edu?.universityName}</div>
                <div
                  className={styles.boxDuration}
                  style={
                    boxOpenIndex === index && boxOpen
                      ? {visibility: 'hidden'}
                      : {}
                  }>
                  {moment(edu?.startDate || new Date()).format('MM/YY')} -{' '}
                  {moment(edu?.endDate || new Date()).format('MM/YY')}
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
                    label="University Name"
                    value={edu?.universityName}
                    onChange={(e) =>
                      setInputValue(index, 'universityName', e.target.value)
                    }
                    error={!edu?.universityName && required('University Name')}
                    placeholder="Type Here"
                  />
                  <Select
                    label="Degree"
                    options={['Master', 'BS', 'MPhil', 'PhD']}
                    value={edu?.degree}
                    onChange={(e) =>
                      setInputValue(index, 'degree', e.target.value)
                    }
                    error={!edu?.degree && required('Degree')}
                  />
                  <TextInput
                    value={edu?.fieldOfStudy}
                    label="Field Of Study"
                    placeholder="Type Here"
                    onChange={(e) =>
                      setInputValue(index, 'fieldOfStudy', e.target.value)
                    }
                    error={!edu?.fieldOfStudy && required('Field Of Study')}
                  />
                  <TextInput
                    label="GPA"
                    placeholder="Type Here"
                    value={edu?.gpa}
                    onChange={(e) =>
                      setInputValue(index, 'gpa', e.target.value)
                    }
                  />
                  <div className={styles.durationContainer}>
                    <div>
                      <DatePicker
                        label="Start Date"
                        placeholderText="MM/YYYY"
                        selected={edu?.startDate}
                        onChange={(date) =>
                          setInputValue(index, 'startDate', date)
                        }
                        error={!edu?.startDate && required('Start Date')}
                        id="startDate"
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        showFullMonthYearPicker
                        showTwoColumnMonthYearPicker
                      />
                    </div>
                    <DatePicker
                      selected={edu?.endDate}
                      label="End Date"
                      placeholderText="MM/YYYY"
                      onChange={(date) => setInputValue(index, 'endDate', date)}
                      error={!edu?.endDate && required('End Date')}
                      id="endDate"
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      showFullMonthYearPicker
                      showTwoColumnMonthYearPicker
                    />
                  </div>
                  <CountrySelect
                    label="Country"
                    value={edu?.country}
                    onChange={(e) =>
                      setInputValue(index, 'country', e.target.value)
                    }
                  />
                </div>
                <Textarea
                  value={edu?.description}
                  label="Description"
                  optionalText="(optional)"
                  onChange={(e) =>
                    setInputValue(index, 'description', e.target.value)
                  }
                />
                <div className="flex items-center justify-between mt-4">
                  <div className={styles.textareaBottomText}>
                    Recruiter Tip: Write 80- Characters To Increase Interview
                    Chances.
                  </div>
                  <div className="flex ">
                    <div className={styles.textLength}>0 / 80</div>
                    <img
                      className={styles.textareaEmoji}
                      src="/images/innocent.png"
                      alt="emoji"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ))}

      {!formOpen && (
        <>
          <div className={styles.addBtn} onClick={onAddEducation}>
            + Add Education
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
              label="University Name"
              placeholder="Type Here"
              error={errors.universityName}
              {...register('universityName', {
                required: required('University Name'),
              })}
            />
            <Select
              label="Degree"
              options={['Master', 'BS', 'MPhil', 'PhD']}
              {...register('degree', {
                required: required('Degree'),
              })}
              value={degree}
              error={!degree && errors.degree}
              onChange={(e) => setValue('degree', e.target.value)}
            />
            <TextInput
              label="Field Of Study"
              placeholder="Type Here"
              error={errors.fieldOfStudy}
              {...register('fieldOfStudy', {
                required: required('Field Of Study'),
              })}
            />
            <TextInput
              label="GPA"
              placeholder="Type Here"
              error={errors.gpa}
              {...register('gpa')}
            />
            <div className={styles.durationContainer}>
              <div>
                <DatePicker
                  label="Start Date"
                  placeholderText="MM/YYYY"
                  {...register('startDate', {
                    required: required('Start Date'),
                  })}
                  onChange={(date) => setValue('startDate', date)}
                  selected={startDate}
                  error={!startDate && errors.startDate}
                  id="startDate"
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  showFullMonthYearPicker
                  showTwoColumnMonthYearPicker
                />
              </div>
              <DatePicker
                label="End Date"
                placeholderText="MM/YYYY"
                {...register('endDate', {
                  required: required('End Date'),
                })}
                onChange={(date) => setValue('endDate', date)}
                selected={endDate}
                error={!endDate && errors.endDate}
                id="endDate"
                dateFormat="MM/yyyy"
                showMonthYearPicker
                showFullMonthYearPicker
                showTwoColumnMonthYearPicker
              />
            </div>
            <CountrySelect
              label="Country"
              {...register('country', {
                required: required('Country'),
              })}
              value={country}
              error={!country && errors.country}
              onChange={(e) => setValue('country', e.target.value)}
            />
          </div>
          <Textarea
            label="Description"
            optionalText="(optional)"
            {...register('description')}
            error={errors.description}
          />
          <div className="flex items-center justify-between mt-4">
            <div className={styles.textareaBottomText}>
              Recruiter Tip: Write 80- Characters To Increase Interview Chances.
            </div>
            <div className="flex ">
              <div className={styles.textLength}>0 / 80</div>
              <img
                className={styles.textareaEmoji}
                src="/images/innocent.png"
                alt="emoji"
              />
            </div>
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

export default EducationForm;
