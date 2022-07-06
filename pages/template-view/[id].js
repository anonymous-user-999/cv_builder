import React, {memo, useContext, useEffect, useState} from 'react';
import Template from '../../src/components/Template';
import styles from './styles.module.css';
import {useTranslation} from 'react-i18next';

import Head from 'next/head';
import {useSelector} from '../../src/contexts/ResumeContext';
import DatabaseContext from '../../src/contexts/DatabaseContext';
import {useRouter} from 'next/router';
import CvTemplate from '../../src/components/CvTemplate';

const TemplateView = () => {
  const state = useSelector();
  const {t} = useTranslation();

  const router = useRouter();

  const {query} = router;

  console.log('our state', state);
  const {getResume} = useContext(DatabaseContext);
  const [resume, setResume] = useState({});

  useEffect(() => {
    (async () => {
      const res = await getResume(query?.id);
      setResume(res);
    })();
  }, []);

  const {id, name} = resume || {};

  return (
    <>
      <Head>
        <title>
          {name} | {t('shared.appName')}
        </title>
        <link rel="canonical" href={`https://cvitae.ai/app/builder/${id}`} />
      </Head>

      <div className={styles.main}>
        <div
          className={
            'relative overflow-hidden flex flex-col w-full px-20 py-10'
          }>
          <CvTemplate resume={resume} />
        </div>
      </div>
    </>
  );
};

export default memo(TemplateView);
