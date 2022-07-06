// import {navigate} from '@reach/router';
import {useTranslation} from 'react-i18next';
import React, {memo, useContext, useEffect, useState} from 'react';
import BaseModal from './BaseModal';
import Button from '../components/shared/Button';
import ModalContext from '../contexts/ModalContext';
import UserContext from '../contexts/UserContext';
import {FaFacebook, FaGoogle, FaTwitter, FaLinkedin} from 'react-icons/fa';
import {MdEmail} from 'react-icons/md';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {useRouter} from 'next/router';
import * as styles from './AuthModal.module.css';
import {IoCloseOutline} from 'react-icons/io5';
import TwitterLogin from 'react-twitter-auth';
import keys from '../constants/keys';
import {getAuth, signInWithPopup, TwitterAuthProvider} from 'firebase/auth';
import Link from 'next/link';

const AuthModal = () => {
  const {t} = useTranslation();
  const [open, setOpen] = useState(false);
  const [isLoadingGoogle, setLoadingGoogle] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingFacebook, setIsLoadingFacebook] = useState(false);
  const router = useRouter();
  const {emitter, events} = useContext(ModalContext);
  const {
    user,
    loginWithGoogle,
    loginWithFacebook,
    loginWithEmail,
    logout,
    isGoogleLoading,
    isGoogleReady,
    isTwitterLoading,
    setIsTwitterLoading,
    loginWithTwitter,
  } = useContext(UserContext);

  useEffect(() => {
    const unbind = emitter.on(events.AUTH_MODAL, () => {
      setOpen(true);
    });
    const unbind2 = emitter.on(events.CLOSE_AUTH_MODAL, () => {
      setOpen(false);
    });

    return () => (unbind(), unbind2());
  }, [emitter, events]);

  const handleSignInWithGoogle = async () => {
    setLoadingGoogle(true);
    await loginWithGoogle();
    setLoadingGoogle(false);
  };

  const handleSignInWithLinkedin = async () => {};

  const responseFacebook = async (response) => {
    if (response?.accessToken) {
      await loginWithFacebook(response.accessToken);
    }
    setIsLoadingFacebook(false);
  };

  const handleSignInWithFacebook = async (renderProps) => {
    setIsLoadingFacebook(true);
    renderProps.onClick();
  };

  const handleSignInWithEmail = async () => {
    setIsLoadingEmail(true);
    await loginWithEmail();
    setIsLoadingEmail(false);
  };

  const handleSigninWithTwitter = async () => {
    setIsTwitterLoading(true);
  };

  const handleGotoApp = () => {
    router.push('/app/dashboard');
    setOpen(false);
  };

  const handleCloseModal = () => setOpen(false);

  const onTwitterSuccess = async (response) => {
    try {
      const result = await response.json();
      loginWithTwitter(result);
      setIsTwitterLoading(false);
    } catch (error) {}
  };

  const onTwitterFailed = (err) => {
    setIsTwitterLoading(false);
  };

  const LoginButton = ({text, icon, onClick, isLoading}) => (
    <Button
      onClick={onClick}
      icon={icon}
      iconType="image"
      className={styles.loginbtn}
      isLoading={isLoading}>
      {text}
    </Button>
  );

  return (
    <BaseModal
      modalClassName={styles.loginmodal}
      state={[open, setOpen]}
      hideActions>
      <div className={'items-center flex flex-col	'}>
        <div className={styles.closebtn} onClick={handleCloseModal}>
          <IoCloseOutline size={'30px'} color={'black'} />
        </div>
        <h1 className={styles.title}>{t('modals.auth.Title')}</h1>
        <h3 className={styles.prefill}>{t('modals.auth.PrefillResume')}</h3>
        <div className={styles.actions}>
          <TwitterLogin
            loginUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL}talentPage/auth/twitter`}
            requestTokenUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL}talentPage/auth/twitter/reverse`}
            onSuccess={onTwitterSuccess}
            onFailure={onTwitterFailed}
            style={{
              width: '100%',
            }}>
            <LoginButton
              text={t('modals.auth.buttons.twitter')}
              onClick={handleSigninWithTwitter}
              icon={'/images/twitter.svg'}
              isLoading={isTwitterLoading}
            />
          </TwitterLogin>
          <FacebookLogin
            appId="4379863485444133"
            callback={responseFacebook}
            render={(renderProps) => (
              <LoginButton
                text={t('modals.auth.buttons.facebook')}
                icon={'/images/facebook.svg'}
                className="ml-8"
                isLoading={isLoadingFacebook}
                onClick={() => handleSignInWithFacebook(renderProps)}
              />
            )}
          />
          <LoginButton
            text={t('modals.auth.buttons.google')}
            onClick={handleSignInWithGoogle}
            icon={'/images/google.svg'}
            isLoading={isGoogleLoading}
          />
          <LoginButton
            text={t('modals.auth.buttons.Linkedin')}
            onClick={handleSignInWithLinkedin}
            icon={'/images/linkedin.svg'}
            // isLoading={isGoogleLoading}
          />
        </div>
        <Link href="auth/sign-in">
          <div className={styles.singInEmail} onClick={() => setOpen(false)}>
            Or Sign In With <span style={{color: '#00B884'}}>E-Mail</span>{' '}
          </div>
        </Link>
        <p className={styles.termsnconditions}>{t('modals.auth.byRegister')}</p>
      </div>
    </BaseModal>
  );
};

export default memo(AuthModal);
