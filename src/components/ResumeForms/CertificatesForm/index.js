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

const CertificatesForm = (props) => {
  const {certificates, setCertificates} = props;
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

  const endDate = watch('endDate');

  const onSubmitForm = (data) => {
    const tempEducation = [...certificates];
    tempEducation?.push(data);
    setCertificates(tempEducation);
    setFormOpen(false);
    reset({});
  };

  const setInputValue = (index, type, value) => {
    const tempEducation = [...certificates];
    tempEducation[index] = {...tempEducation[index], [type]: value};
    setCertificates(tempEducation);
    const edu = tempEducation?.[index];
    if (!edu?.certification || !edu?.institution || !edu?.endDate) {
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
    const tempEducation = [...certificates];
    tempEducation.splice(index, 1);
    setCertificates(tempEducation);
  };

  console.log('certificates', certificates);

  return (
    <div className={styles.main}>
      <div className={styles.headerPara}>
        Hello Dear Mus'ab, This is the core of most resumes - your Certificates
        story is told in dates, roles & bullet points. Start from your most
        recent Certificate and go back no further than 10 years.
      </div>

      {certificates?.map((edu, index) => (
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
                <div className={styles.boxName}>{edu?.institution}</div>
                <div
                  className={styles.boxDuration}
                  style={
                    boxOpenIndex === index && boxOpen
                      ? {visibility: 'hidden'}
                      : {}
                  }>
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
                    label="Licenses & Certifications"
                    value={edu?.certification}
                    onChange={(e) =>
                      setInputValue(index, 'certification', e.target.value)
                    }
                    error={
                      !edu?.certification &&
                      required('Licenses & Certifications')
                    }
                    placeholder="Type Here"
                  />

                  <TextInput
                    value={edu?.institution}
                    label="Institution"
                    placeholder="Type Here"
                    onChange={(e) =>
                      setInputValue(index, 'institution', e.target.value)
                    }
                    error={!edu?.institution && required('Institution')}
                  />
                  <div className="mb-10">
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
            + Add Certificate
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
              label="Licenses & Certifications"
              placeholder="Type Here"
              error={errors.certification}
              {...register('certification', {
                required: required('Licenses & Certifications'),
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
            <div className="mb-10">
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

export default CertificatesForm;
