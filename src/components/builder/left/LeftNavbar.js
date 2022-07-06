// import { Link } from 'gatsby';
import {Tooltip} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import React, {
  createRef,
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as styles from './LeftNavbar.module.css';
import sections from '../../../data/leftSections';
import Button from '../../shared/Button';
import SettingsContext from '../../../contexts/SettingsContext';
import {BsChevronLeft, BsChevronRight} from 'react-icons/bs';
import cx from 'classnames';
import {useDispatch, useSelector} from '../../../contexts/ResumeContext';
import {BsPencil} from 'react-icons/bs';
import Input from '../../shared/Input';
import {AiOutlineCheck} from 'react-icons/ai';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {isEmpty} from 'lodash';
import {toast} from 'react-toastify';
import DatabaseContext from '../../../contexts/DatabaseContext';
import {getFieldProps} from '../../../utils';
import ProgressBar from '@ramonak/react-progress-bar';
import {IoInformationCircleOutline} from 'react-icons/io5';

const LeftNavbar = () => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const resumeVisibleSections = useSelector('metadata.visibleSections', []);
  const resume = useSelector('', {});
  const {setCurrentStep, currentStep, visibleSections, setVisibleSections} =
    useContext(SettingsContext);
  const {renameResume} = useContext(DatabaseContext);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(resume.name || '');
  const [isEditting, setIsEditting] = useState(false);
  const [progress, setProgress] = useState(1);

  const initialValues = {
    name: resume.name,
  };

  const schema = Yup.object().shape({
    name: Yup.string().required(t('shared.forms.validation.required')),
  });

  useEffect(() => {
    const secWRefs = sections
      .filter((x) => resumeVisibleSections.find((y) => y == x.id))
      .map((x) => ({...x, ref: createRef()}));
    setVisibleSections(secWRefs);
  }, [resumeVisibleSections.length]);

  useEffect(() => {
    visibleSections[currentStep]?.ref?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'start',
    });
  }, [currentStep]);

  useEffect(() => {
    if (resume) {
      let progress = 0;
      const {
        profile,
        objective,
        work,
        education,
        skills,
        certifications,
        hobbies,
        references,
        internship,
        volunteering,
        groups,
        awards,
        languages,
        projects,
        metadata: {visibleSections},
      } = resume;
      if (profile) {
        const {
          firstName,
          lastName,
          photograph,
          phone,
          email,
          birthDate,
          address,
          nationality,
          website,
          linkedin,
          portfolio,
        } = resume.profile;
        if (firstName.length && lastName.length) progress += 5;
        if (photograph.length) progress += 5;
        if (phone.length) progress += 5;
        if (email.length) progress += 5;
        if (birthDate.length) progress += 5;
        if (address && address.line1.length) progress += 5;
        if (nationality.length) progress += 5;
        if (website.length) progress += 5;
        if (linkedin.length) progress += 5;
        if (portfolio.length) progress += 5;
      }
      if (objective && objective.body && objective.body.length > 10)
        progress += 10;
      if (work && work.items.length > 0) progress += 10;
      if (education && education.items.length > 0) progress += 10;
      if (skills && skills.items.length > 0) progress += 10;
      if (
        certifications &&
        certifications.items.length > 0 &&
        visibleSections.findIndex((x) => x == 'certifications') != -1
      )
        progress += 10;
      if (
        hobbies &&
        hobbies.items.length > 0 &&
        visibleSections.findIndex((x) => x == 'hobbies') != -1
      )
        progress += 5;
      if (
        references &&
        references.items.length > 0 &&
        visibleSections.findIndex((x) => x == 'references') != -1
      )
        progress += 5;
      if (
        internship &&
        internship.items.length > 0 &&
        visibleSections.findIndex((x) => x == 'internship') != -1
      )
        progress += 5;
      if (
        volunteering &&
        volunteering.items.length > 0 &&
        visibleSections.findIndex((x) => x == 'volunteering') != -1
      )
        progress += 5;
      if (
        groups &&
        groups.items.length > 0 &&
        visibleSections.findIndex((x) => x == 'groups') != -1
      )
        progress += 5;
      if (
        awards &&
        awards.items.length > 0 &&
        visibleSections.findIndex((x) => x == 'awards') != -1
      )
        progress += 5;
      if (languages && languages.items.length > 0) progress += 5;
      if (
        projects &&
        projects.items.length > 0 &&
        visibleSections.findIndex((x) => x == 'projects') != -1
      )
        progress += 5;
      setProgress(progress > 100 ? 100 : progress);
    }
  }, [resume]);

  useEffect(() => {
    initialValues = {
      name: resume.name,
    };
  }, [resume]);

  const handleEdit = () => {
    setEditMode((prev) => !prev);
  };

  const onSubmit = async (values, errors) => {
    if (values.name?.trim() == resume.name.trim()) return setEditMode(false);
    if (isEmpty(errors)) {
      setIsEditting(true);
      const result = await renameResume({
        ...resume,
        name: values.name,
      });
      if (result) {
        dispatch({
          type: 'on_input',
          payload: {
            path: 'name',
            value: values.name,
          },
        });
      }
      setIsEditting(false);
      setEditMode(false);
    } else {
      toast.error(t('builder.toasts.formErrors'));
    }
  };

  const getIcon =
    i18n.language == 'ar' ? `/images/arabic.png` : '/images/english.png';

  const Progress = () => (
    <div key={'progress'} className={styles.header}>
      <div className={`mb-5 ${styles.between} ${styles.row}`}>
        <div className={`items-center ${styles.row}`}>
          {editMode ? (
            <Formik
              validateOnBlur
              initialValues={initialValues}
              validationSchema={schema}>
              {(formik) => (
                <div className={'flex flex-row items-center'}>
                  <Input
                    onKeyDown={async (e) => {
                      if (e.keyCode === 13) {
                        const errors = await formik.validateForm(formik.values);
                        onSubmit(formik.values, errors);
                      }
                    }}
                    {...getFieldProps(formik, schema, 'name')}
                  />
                  <Button
                    onClick={async () => {
                      const errors = await formik.validateForm(formik.values);
                      onSubmit(formik.values, errors);
                    }}
                    icon={
                      isEditting ? null : editMode ? AiOutlineCheck : BsPencil
                    }
                    isLoading={isEditting}
                    className={cx(styles.editbtn, {
                      [styles.check]: editMode,
                    })}></Button>
                </div>
              )}
            </Formik>
          ) : (
            <h1 className={styles.resumename}>{resume.name}</h1>
          )}
          {!editMode && (
            <Button
              onClick={handleEdit}
              icon={editMode ? AiOutlineCheck : BsPencil}
              className={cx(styles.editbtn, {
                [styles.check]: editMode,
              })}></Button>
          )}
        </div>
        <Button iconType="image" className={styles.language}>
          <img src={getIcon} className={styles.flag} />
          {t(`shared.langs.${i18n.language}`, {
            lng: i18n.language,
          })}
        </Button>
      </div>
      <div className={styles.progresscontainer}>
        <div className={`${styles.row} ${styles.between} items-center mb-1`}>
          <p className={styles.completeness}>
            <span className={styles.progresstext}>{progress}%</span>
            {t('builder.sections.completeness')}
          </p>
          <Button
            className={styles.info}
            icon={IoInformationCircleOutline}
            iconSize={'18px'}></Button>
        </div>
        <ProgressBar
          baseBgColor={'#EBEDEE'}
          bgColor={'#ff5c07'}
          height={'3px'}
          completed={progress}
          labelClassName={styles.label}
        />
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {Progress()}
      <div key={'rowsectionssss'} className={styles.row}>
        {currentStep > 0 && (
          <div className={cx(styles.leftchvron)}>
            <Button
              icon={BsChevronLeft}
              className={styles.chevron}
              onClick={() => setCurrentStep(currentStep - 1)}
            />
          </div>
        )}
        <div className={styles.sections}>
          {visibleSections.map((x, i) => (
            <div key={`navbarSection${x.id}`} ref={x.ref}>
              <Button
                onClick={() => {
                  setCurrentStep(i);
                }}
                className={cx(styles.section, {
                  [styles.selected]: i == currentStep,
                })}>
                <span style={{display: 'flex', flex: 1}}>
                  {t(`builder.sections.${x.id}`)}
                </span>
              </Button>
            </div>
          ))}
        </div>
        {currentStep < visibleSections.length - 1 && (
          <div className={cx(styles.rightchvron)}>
            <Button
              icon={BsChevronRight}
              className={cx(styles.right)}
              onClick={() => setCurrentStep(currentStep + 1)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(LeftNavbar);
