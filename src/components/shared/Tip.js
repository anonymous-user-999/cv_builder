import Image from 'next/image';
import React from 'react';
import {useTranslation} from 'react-i18next';
import * as styles from './Tip.module.css';

const Tip = ({text, value, maxValue, mb = 0, mt = 0}) => {
  const {t} = useTranslation();
  return (
    <div className={`${styles.container} mb-${mb} mt-${mt}`}>
      <p>{t('builder.sections.recruiterTip')}</p>
      &nbsp;
      <p>{text}</p>
      <p className={styles.value}>
        {value}/{maxValue}
      </p>
      <Image src={'/images/innocent.png'} width={'14px'} height={'14px'} />
    </div>
  );
};

export default Tip;
