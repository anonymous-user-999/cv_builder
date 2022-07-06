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

const ExperienceForm = (props) => {
  const {experience, setExperience} = props;
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
  const jobType = watch('jobType');
  const country = watch('country');

  const onSubmitForm = (data) => {
    const tempExperience = [...experience];
    tempExperience?.push(data);
    setExperience(tempExperience);
    setFormOpen(false);
    reset({});
  };

  const setInputValue = (index, type, value) => {
    const tempExperience = [...experience];
    tempExperience[index] = {...tempExperience[index], [type]: value};
    setExperience(tempExperience);
    const edu = tempExperience?.[index];
    if (
      !edu?.jobTitle ||
      !edu?.jobType ||
      !edu?.companyName ||
      !edu?.startDate
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
    const tempExperience = [...experience];
    tempExperience.splice(index, 1);
    setExperience(tempExperience);
  };

  return (
    <div className={styles.main}>
      <div className={styles.headerPara}>
        Hello Dear Mus'ab, This is the core of most resumes – your professional
        story is told in dates, roles & bullet points. Start from your most
        recent job and go back no further than 10 years.
      </div>

      {experience?.map((edu, index) => (
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
                  {edu?.jobTitle} At {edu?.companyName}
                </div>
                <div
                  className={styles.boxDuration}
                  style={
                    boxOpenIndex === index && boxOpen
                      ? {visibility: 'hidden'}
                      : {}
                  }>
                  {moment(edu?.startDate || new Date()).format('MMMM YYYY')} -{' '}
                  {edu?.endDate
                    ? moment(edu?.endDate).format('MMMM YYYY')
                    : 'Present'}
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
                    label="Job Title"
                    value={edu?.jobTitle}
                    onChange={(e) =>
                      setInputValue(index, 'jobTitle', e.target.value)
                    }
                    error={!edu?.jobTitle && required('Job Title')}
                    placeholder="Type Here"
                  />
                  <Select
                    label="Job Type"
                    options={['Programmer', 'Designer', 'QA', 'Tester']}
                    value={edu?.jobType}
                    onChange={(e) =>
                      setInputValue(index, 'jobType', e.target.value)
                    }
                    error={!edu?.jobType && required('Job Type')}
                  />
                  <TextInput
                    label="Company Name"
                    value={edu?.companyName}
                    placeholder="Type Here"
                    onChange={(e) =>
                      setInputValue(index, 'companyName', e.target.value)
                    }
                    error={!edu?.companyName && required('Company Name')}
                  />
                  <CountrySelect
                    label="Country"
                    value={edu?.country}
                    onChange={(e) =>
                      setInputValue(index, 'country', e.target.value)
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
                      id="endDate"
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      showFullMonthYearPicker
                      showTwoColumnMonthYearPicker
                    />
                  </div>
                  <div className={styles.experience}>
                    {moment(edu?.endDate || new Date())?.diff(
                      edu?.startDate || new Date(),
                      'years',
                    )}{' '}
                    years of experience.{' '}
                    <img
                      src="/images/celeberation-emoji.svg"
                      className={styles.emoji}
                    />
                  </div>
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
            + Add Experience
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
              label="Job Title"
              placeholder="Type Here"
              error={errors.jobTitle}
              {...register('jobTitle', {
                required: required('Job Title'),
              })}
            />
            <Select
              label="Job Type"
              options={['Programmer', 'Designer', 'QA', 'Tester']}
              {...register('jobType', {
                required: required('Job Type'),
              })}
              value={jobType}
              error={!jobType && errors.jobType}
              onChange={(e) => setValue('jobType', e.target.value)}
            />
            <TextInput
              label="Company Name"
              placeholder="Type Here"
              error={errors.companyName}
              {...register('companyName', {
                required: required('Company Name'),
              })}
            />
            <CountrySelect
              label="Country"
              {...register('country', {
                required: required('Country'),
              })}
              value={country}
              error={!country && errors.country}
              onChange={(e) => setValue('country', e.target.value)}
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
                {...register('endDate')}
                onChange={(date) => setValue('endDate', date)}
                selected={endDate}
                id="endDate"
                dateFormat="MM/yyyy"
                showMonthYearPicker
                showFullMonthYearPicker
                showTwoColumnMonthYearPicker
              />
            </div>
            <div className={styles.experience}>
              {moment(endDate || new Date())?.diff(
                startDate || new Date(),
                'years',
              )}{' '}
              years of experience.{' '}
              <img
                src="/images/celeberation-emoji.svg"
                className={styles.emoji}
              />
            </div>
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

export default ExperienceForm;
