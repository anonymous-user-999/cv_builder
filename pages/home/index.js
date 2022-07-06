import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, {memo, useContext, useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {useTranslation} from 'react-i18next';
import Hero from '../../src/components/landing/Hero';
import UserContext from '../../src/contexts/UserContext';
import * as styles from './home.module.css';

const Home = () => {
  const {t} = useTranslation();
  const {user} = useContext(UserContext);
  const history=useRouter();

 useEffect(()=>{
   if(user&&Object.keys(user).length !== 0){
    history.push('/dashboard');
   }
 },[user]);

  return (
    <>
      <Head>
        <title>{t('shared.appName')}</title>
        <link rel="canonical" href="https://cvitae.ai/" />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:light"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:normal"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:bold"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.container }>
        <Hero />
        <div className={'flex flex-1 p-5 pb-0 hidden md:flex text-left'} style={{maxWidth: 50 + 'vw'}}>
        <object type="image/svg+xml" data="images/Lastone.svg" style={{marginLeft: -5 + 'vw'}}></object>
        </div>
      </div>
    </>
  );
};

export default memo(Home);
export async function getServerSideProps() {
  return {
    props: {},
  };
}
