import cx from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';
import * as styles from './Steps.module.css';
import {BsArrowRight} from 'react-icons/bs';

const Step = ({active, title, index, hideChevron}) => (
  <div className={`${styles.step}`} key={`step-${index}`}>
    <div
      className={cx(styles.stepnumber, {
        [styles.selected]: active,
      })}>
      <p>{index + 1}</p>
    </div>
    <div
      className={cx(styles.chevron, {
        [styles.selectedchevron]: active,
      })}>
      {!hideChevron && <BsArrowRight size={'14px'} />}
    </div>
    {active && (
      <>
        <p
          className={`animate__animated animate__zoomIn animate__faster ${styles.steptitle}`}>
          {title}
        </p>
      </>
    )}
  </div>
);

const Steps = ({currentStep}) => {
  const {t} = useTranslation();
  const steps = [
    t('builder.questionnaire.steps.name'),
    t('builder.questionnaire.steps.phone'),
    t('builder.questionnaire.steps.phone'),
    t('builder.questionnaire.steps.resume'),
    t('builder.questionnaire.steps.jobTitle'),
  ];
  return (
    <div className={styles.stepscontainer}>
      {steps.map((x, index) =>
        index == 2 ? null : (
          <Step
            key={`step${index}`}
            active={currentStep == index}
            title={x}
            index={index < 2 ? index : index - 1}
            hideChevron={index == steps.length - 1}
          />
        ),
      )}
    </div>
  );
};

export default Steps;
