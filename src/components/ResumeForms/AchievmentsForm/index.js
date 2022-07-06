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

const AchievmentsForm = (props) => {
  const {achievements, setAchievments} = props;
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

  const achievmentDate = watch('achievmentDate');

  const onSubmitForm = (data) => {
    const tempAchievments = [...achievements];
    tempAchievments?.push(data);
    setAchievments(tempAchievments);
    setFormOpen(false);
    reset({});
  };

  const setInputValue = (index, type, value) => {
    const tempAchievments = [...achievements];
    tempAchievments[index] = {...tempAchievments[index], [type]: value};
    setAchievments(tempAchievments);
    const edu = tempAchievments?.[index];
    if (!edu?.achievmentTitle || !edu?.achievmentDate) {
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
    const tempAchievments = [...achievements];
    tempAchievments.splice(index, 1);
    setAchievments(tempAchievments);
  };

  console.log('achievements', achievements);

  return (
    <div className={styles.main}>
      <div className={styles.headerPara}>
        Hello Dear Mus'ab, A varied achievements on your resume sums up the
        value that your learnings and background will bring to the job.
      </div>

      {achievements?.map((edu, index) => (
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
                <div className={styles.boxName}>{edu?.achievmentTitle}</div>
                <div
                  className={styles.boxDuration}
                  style={
                    boxOpenIndex === index && boxOpen
                      ? {visibility: 'hidden'}
                      : {}
                  }>
                  {moment(edu?.achievmentDate).format('MMM YYYY')}
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
                    label="Achievement Title"
                    value={edu?.achievmentTitle}
                    onChange={(e) =>
                      setInputValue(index, 'achievmentTitle', e.target.value)
                    }
                    error={
                      !edu?.achievmentTitle && required('Achievement Title')
                    }
                    placeholder="Type Here"
                  />
                  <div className="mb-10">
                    <DatePicker
                      label="Achievement Date"
                      placeholderText="MM/YYYY"
                      selected={edu?.achievmentDate}
                      onChange={(date) =>
                        setInputValue(index, 'achievmentDate', date)
                      }
                      error={
                        !edu?.achievmentDate && required('Achievement Date')
                      }
                      id="achievmentDate"
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      showFullMonthYearPicker
                      showTwoColumnMonthYearPicker
                    />
                  </div>
                </div>
                <Textarea
                  value={edu?.description}
                  label="Description"
                  onChange={(e) =>
                    setInputValue(index, 'description', e.target.value)
                  }
                  small
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
            + Add Achievements And Awards
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
              label="Achievement Title"
              placeholder="Type Here"
              error={errors.achievmentTitle}
              {...register('achievmentTitle', {
                required: required('Achievement Title'),
              })}
            />
            <div className="mb-10">
              <DatePicker
                label="Achievement Date"
                placeholderText="MM/YYYY"
                {...register('achievmentDate', {
                  required: required('Achievement Date'),
                })}
                onChange={(date) => setValue('achievmentDate', date)}
                selected={achievmentDate}
                error={!achievmentDate && errors.achievmentDate}
                id="achievmentDate"
                dateFormat="MM/yyyy"
                showMonthYearPicker
                showFullMonthYearPicker
                showTwoColumnMonthYearPicker
              />
            </div>
          </div>
          <Textarea
            label="Description"
            {...register('description')}
            error={errors.description}
            small
          />
          <div className="flex items-center justify-between mt-4">
            <div className={styles.textareaBottomText}>
              Recruiter Tip: Write 60- Characters To Increase Interview Chances.
            </div>
            <div className="flex ">
              <div className={styles.textLength}>0 / 60</div>
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

export default AchievmentsForm;
