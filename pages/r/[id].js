import {Helmet} from 'react-helmet';
import {toast} from 'react-toastify';
import {useTranslation} from 'react-i18next';
import React, {memo, useContext, useEffect, useMemo, useState} from 'react';
import * as styles from './view.module.css';
import {scaler} from '../../src/utils';
import Castform from '../../src/templates/Castform';
import Celebi from '../../src/templates/Celebi';
import DatabaseContext from '../../src/contexts/DatabaseContext';
import Gengar from '../../src/templates/Gengar';
import Glalie from '../../src/templates/Glalie';
import LoadingScreen from '../../src/components/router/LoadingScreen';
import Onyx from '../../src/templates/Onyx';
import Pikachu from '../../src/templates/Pikachu';
import fontSizeOptions from '../../src/data/fontSizeOptions';
import Link from 'next/link';
import {useRouter} from 'next/router';
import API from '../../src/services';
import Head from 'next/head';

const ResumeViewer = ({resume}) => {
  const {t, i18n} = useTranslation();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {id} = router.query;

  useEffect(() => {
    (async () => {
      if (!resume) {
        // router.replace('/');
        toast.error(
          `The resume you were looking for does not exist anymore... or maybe it never did?`,
        );
        return null;
      }
      i18n.changeLanguage(resume.metadata.language || 'en');

      for (const [key, sizeDefault] of Object.entries(fontSizeOptions)) {
        document.documentElement.style.setProperty(
          key,
          `${scaler(resume.metadata.fontSize) * sizeDefault}rem`,
        );
      }

      return setLoading(false);
    })();
  }, []);

  return useMemo(() => {
    if (loading) {
      return <LoadingScreen />;
    }

    return (
      <div className={styles.container}>
        <Head>
          <title>
            {resume.name} | {t('shared.appName')}
          </title>
          <link rel="canonical" href={`https://cvitae.ai/r/${resume.id}`} />
        </Head>

        <div
          className={styles.page}
          style={{backgroundColor: resume.metadata.colors.background}}>
          {resume.metadata.template === 'onyx' && <Onyx data={resume} />}
          {resume.metadata.template === 'pikachu' && <Pikachu data={resume} />}
          {resume.metadata.template === 'gengar' && <Gengar data={resume} />}
          {resume.metadata.template === 'castform' && (
            <Castform data={resume} />
          )}
          {resume.metadata.template === 'glalie' && <Glalie data={resume} />}
          {resume.metadata.template === 'celebi' && <Celebi data={resume} />}
        </div>

        <p className={styles.footer}>
          Built with <Link href="/">CVitae</Link>
        </p>
      </div>
    );
  });
};

ResumeViewer.getInitialProps = async ({query}) => {
  const result = await API.ResumeAPI.viewResume({id: query.id});
  if (result.data) {
    return {
      resume: result.data.resume,
    };
  }
  return {
    resume: null,
  };
};

export default ResumeViewer;
