import {Helmet} from 'react-helmet';
import {useTranslation} from 'react-i18next';
import React, {useContext, useEffect, useState} from 'react';
import CreateResume from '../../src/components/dashboard/CreateResume';
import LoadingScreen from '../../src/components/router/LoadingScreen';
import ResumePreview from '../../src/components/dashboard/ResumePreview';
import TopNavbar from '../../src/components/dashboard/TopNavbar';
import DatabaseContext from '../../src/contexts/DatabaseContext';
import UserContext from '../../src/contexts/UserContext';
import {useRouter} from 'next/router';
import withAuth from '../../src/hooks/withAuth';
import Head from 'next/head';

const Dashboard = () => {
  const router = useRouter();
  const {t} = useTranslation();
  const {getResumes, resumes, loading, checkCompletedResume} =
    useContext(DatabaseContext);
  const {user} = useContext(UserContext);

  useEffect(() => {
    !user && router.replace('/');
    (async () => {
      user && (await checkCompletedResume(true));
      user && getResumes();
    })();
  }, []);

  useEffect(() => {}, [user]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Head>
        <title>
          {t('dashboard.title')} | {t('shared.appName')}
        </title>
        <link rel="canonical" href="https://cvitae.ai/app/dashboard" />
      </Head>

      <TopNavbar />

      <div className="container mt-12 px-12 xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8">
          <CreateResume />

          {resumes.map((x) => (
            <ResumePreview key={x.id} resume={x} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
