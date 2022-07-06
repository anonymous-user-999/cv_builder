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

const VolunteeringForm = (props) => {
  const {volunteering, setVolunteering} = props;
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
    formState: {errors},
    handleSubmit,
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: {},
  });

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  const onSubmitForm = (data) => {
    const tempVolunteering = [...volunteering];
    tempVolunteering?.push(data);
    setVolunteering(tempVolunteering);
    setFormOpen(false);
    reset({});
  };

  const setInputValue = (index, type, value) => {
    const tempVolunteering = [...volunteering];
    tempVolunteering[index] = {...tempVolunteering[index], [type]: value};
    setVolunteering(tempVolunteering);
    const edu = tempVolunteering?.[index];
    if (!edu?.institutionName || !edu?.startDate || !edu?.endDate) {
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
    const tempVolunteering = [...volunteering];
    tempVolunteering.splice(index, 1);
    setVolunteering(tempVolunteering);
  };

  console.log('volunteering', volunteering);

  return (
    <div className={styles.main}>
      <div className={styles.headerPara}>
        Hello Dear Mus'ab, This is the core of most resumes - your Volunteering
        story is told in dates, roles & bullet points. Start from your most
        recent volunteer and go back no further than 10 years.
      </div>

      {volunteering?.map((edu, index) => (
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
                <div className={styles.boxName}>{edu?.institutionName}</div>
                <div
                  className={styles.boxDuration}
                  style={
                    boxOpenIndex === index && boxOpen
                      ? {visibility: 'hidden'}
                      : {}
                  }>
                  {moment(edu?.startDate || new Date()).format('MMM YYYY')} -{' '}
                  {moment(edu?.endDate || new Date()).format('MMM YYYY')}
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
                    label="Institution Name"
                    value={edu?.institutionName}
                    onChange={(e) =>
                      setInputValue(index, 'institutionName', e.target.value)
                    }
                    error={
                      !edu?.institutionName && required('Institution Name')
                    }
                    placeholder="Type Here"
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
            + Add Volunteer
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
              label="Institution Name"
              placeholder="Type Here"
              error={errors.institutionName}
              {...register('institutionName', {
                required: required('Institution Name'),
              })}
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

export default VolunteeringForm;
