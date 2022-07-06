import Head from 'next/head';
import {useRouter} from 'next/router';
import React, {memo, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {useTranslation} from 'react-i18next';

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace('/home');
  }, []);
  const {t} = useTranslation();
  return (
    <>
      <Head>
        <title>{t('shared.appName')}</title>
        <link rel="canonical" href="https://cvitae.ai/" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&display=optional"
          rel="stylesheet"
        />
      </Head>

      <div className="container px-8 xl:px-0 text-center md:text-left mt-24 home-page-container"></div>
    </>
  );
};

export default memo(Home);
export async function getServerSideProps() {
  return {
    props: {},
  };
}
