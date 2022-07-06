import {useTranslation} from 'react-i18next';
import React, {memo, useContext} from 'react';
import Button from '../shared/Button';
import Logo from '../shared/Logo';
import ModalContext from '../../contexts/ModalContext';
import UserContext from '../../contexts/UserContext';
// import {navigate} from '@reach/router';
import {useRouter} from 'next/router';
import * as styles from './Hero.module.css';
import {BsFillSuitHeartFill} from 'react-icons/bs';
import {FiArrowRight} from 'react-icons/fi';
import Link from 'next/link';
import DatabaseContext from '../../contexts/DatabaseContext';

const Hero = () => {
  const {t} = useTranslation();
  const {emitter, events} = useContext(ModalContext);
  const {user, loading} = useContext(UserContext);
  const router = useRouter();

  const handleLogin = () => {
    emitter.emit(events.AUTH_MODAL);
  };

  const handleBuileResume = () => {
    if (!user) {
      return emitter.emit(events.AUTH_MODAL);
    }
    router.push('/app/questionnaire');
  };

  return (
    <div
      className="flex flex-1 max-w-max flex-col justify-center"
      style={{
        color: '#676d7d'
      }}>
      <a href="/home" className={styles.logo}>
        <span className="sr-only">CVitae</span>
        <Logo className="shadow-lg" size="40px" />
      </a>
      <p className={styles.tailored}>{t('landing.hero.TailoredResume')}</p>
      <h1 className={styles.prof}>{t('landing.hero.ProfResume')}</h1>
      <p className={styles.savetime}>{t('landing.hero.SaveTime')}</p>
      <div className={styles.actions}>
        <Button
          icon={'/images/red-heart.png'}
          iconType="image"
          onClick={handleBuileResume}
          className={styles.buildaresume}>
          {t('landing.hero.BuildResume')}
        </Button>
        {!user && (
          <Button
            icon={FiArrowRight}
            onClick={handleLogin}
            className={styles.login}>
            {t('landing.hero.Login')}
          </Button>
        )}
      </div>
      <p className={styles.privacy}>
        {t('landing.hero.ByCLick')}
        &nbsp;
        <span className={styles.bolder}>
          <Link href="/privacy">{t('landing.hero.PrivacyPolicy')}</Link>
        </span>
      </p>
      <div className={styles.madewithlove}>
        <p>{t('landing.hero.MadeWithLove')}</p>
        <span className={'ml-2'}>
          <BsFillSuitHeartFill size={'14px'} />
        </span>
        <span className={styles.bolder}><Link href="https://talentspace.ai" target="_blank">{t('landing.hero.AppName')}</Link></span>
      </div>
    </div>
  );
};

export default memo(Hero);
