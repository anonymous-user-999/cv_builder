import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from './styles.module.css';
import Logo from '../../shared/Logo';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBell} from '@fortawesome/free-regular-svg-icons';
import {faCrown, faXmark} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import {useRouter} from 'next/router';
import useClickOutside from '../../../utils/useClickOutside';
import MobileNav from '../MobileNav';

import NotificationsModalNavbar from '../NotificationsModalNavbar';
import NavbarLanguagesDropdown from '../NavbarLanguagesDropdown';
import {useMediaQuery} from '@mui/material';
import API from '../../../services';
import {useLocalStorage} from '../../../hooks';
import UserContext from '../../../contexts/UserContext';
import LoadingScreen from '../../router/LoadingScreen';

const Notifications = [
  {
    title: 'Updates And Offers',
    time: '3h ago',
    details: 'Discounts, Special Offers, New Features And More',
    readed: false,
  },
  {
    title: 'Updates And Offers',
    time: '3h ago',
    details: 'Discounts, Special Offers, New Features And More',
    readed: false,
  },
  {
    title: 'Updates And Offers',
    time: '3h ago',
    details: 'Discounts, Special Offers, New Features And More',
    readed: true,
  },
  {
    title: 'Updates And Offers',
    time: '3h ago',
    details: 'Discounts, Special Offers, New Features And More',
    readed: true,
  },
];

const AdminNavbar = () => {
  const {logout, user} = useContext(UserContext);
  const isSmallerThan767 = useMediaQuery('(max-width: 767px)');

  const router = useRouter();
  const languagesRef = useRef(null);
  const notificationsRef = useRef(null);
  const settingsRef = useRef(null);

  const [languages, setLanguages] = useState([
    'english',
    'arabic',
    'hindi',
    'english',
    'arabic',
    'hindi',
    'english',
    'arabic',
    'hindi',
  ]);
  const [languagesPopup, setLanguagesPopup] = useState(false);
  const [language, setLanguage] = useState(languages[0]);
  const [notificationsPopup, setNotificationsPopup] = useState(false);
  const [settingsPopup, setSettingsPopup] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [upgradePopup, setUpgradePopup] = useState(true);
  const [mobileUpgradeBtn, setMobileUpgradeBtn] = useState(true);

  const getStyle = (href) => {
    return {
      color: router.asPath === href ? '#00B884' : '#2B2E35',
    };
  };
  const onLanguageSelect = (lang) => {
    setLanguage(lang);
    setLanguagesPopup(false);
  };
  useClickOutside(languagesRef, () => {
    setLanguagesPopup(false);
  });
  useClickOutside(notificationsRef, () => {
    if (!isSmallerThan767) {
      setNotificationsPopup(false);
    }
  });
  useClickOutside(settingsRef, () => {
    setSettingsPopup(false);
  });

  const onLogout = async () => {
    await logout();
  };

  useEffect(()=>{
    if(user?.usedLanguage){
      setLanguage(user?.usedLanguage==="en"?"english":"english");
    }
  },[user])

  return (
    <>
      {!isSmallerThan767 && (notificationsPopup || settingsPopup) && (
        <div className={styles.overlay} />
      )}
      <nav
        className={`${styles.nav} flex items-center justify-between w-full `}>
        <Link href="/dashboard">
          <Logo className="shadow-lg" size="35px" />
        </Link>

        <div className={`${styles.navContent} flex items-center`}>
          {!isSmallerThan767&&user?.role==="user" && (
            <Link href="/upgrade">
              <div className={styles.upgrade}>
                <FontAwesomeIcon icon={faCrown} className="mr-2" />
                Upgrade Now 25$ Yearly
              </div>
            </Link>
          )}

          <ul className={styles.list}>
            <li className={styles.listItem} style={getStyle('/dashboard')}>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className={styles.listItem} style={getStyle('/documents')}>
              <Link href="/documents">Documents</Link>
            </li>
            <li className={styles.listItem} style={getStyle('/tracking')}>
              <Link href="/tracking">Tracking</Link>
            </li>
            <li
              className={styles.listItem}
              style={getStyle('/job-applications')}>
              <Link href="/job-applications">Job Applications</Link>
            </li>
          </ul>
          <div className={styles.languageContainer}>
            {!isSmallerThan767 ? (
              <img
                src={`/images/${language}.png`}
                alt="country"
                className={styles.language}
                onClick={() => setLanguagesPopup(!languagesPopup)}
              />
            ) : (
              mobileNav && (
                <div className={styles.mobileLanguageFlag}>
                  <img
                    src={`/images/${language}.png`}
                    alt="country"
                    className={styles.mobileLanguage}
                    onClick={() => setLanguagesPopup(!languagesPopup)}
                  />
                </div>
              )
            )}

            {!isSmallerThan767 && languagesPopup && (
              <NavbarLanguagesDropdown
                ref={languagesRef}
                languages={languages}
                language={language}
                setLanguage={onLanguageSelect}
              />
            )}
          </div>
          <div className={styles.notificationsWrapper}>
            {!isSmallerThan767 ? (
              <FontAwesomeIcon
                icon={faBell}
                onClick={() => setNotificationsPopup(!notificationsPopup)}
                className={styles.bellIcon}
              />
            ) : (
              <div className={styles.mobileBellContainer}>
                <FontAwesomeIcon
                  icon={notificationsPopup ? faXmark : faBell}
                  onClick={() => setNotificationsPopup(!notificationsPopup)}
                  className={styles.mobileBellIcon}
                />
              </div>
            )}

            {!isSmallerThan767 && notificationsPopup && (
              <NotificationsModalNavbar
                open={notificationsPopup}
                ref={notificationsRef}
                Notifications={Notifications}
              />
            )}
          </div>
          {!isSmallerThan767 ? (
            <div className={styles.settingsWrapper}>
              <div
                className="flex cursor-pointer items-center"
                onClick={() => setSettingsPopup(!settingsPopup)}>
                <div className={styles.profileContainer}>
                  <img
                    src={user?.profilePicture ?? '/images/profile-avatar.svg'}
                    className={styles.profile}
                    alt="profile"
                  />
                </div>
                <h4 className={styles.username}>
                  {user?.fullname ?? 'user name'}
                </h4>
                <img
                  src="/images/angle-down.svg"
                  alt="down"
                  className={styles.angleDown}
                />
              </div>
              {!isSmallerThan767 && settingsPopup && (
                <div className={styles.settingsModal} ref={settingsRef}>
                  <div className={styles.settingsContainer}>
                    <Link href="/account-settings">
                      <div className={styles.settingsLink}>
                        Account Settings
                      </div>
                    </Link>
                    <Link href="/support">
                      <div className={styles.settingsLink}>Support</div>
                    </Link>
                    <div onClick={onLogout} className={styles.settingsLink}>
                      Log Out
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              className={styles.navMobileIconContainer}
              onClick={() => setMobileNav(!mobileNav)}>
              {!mobileNav ? (
                <img
                  src="/images/mobileNavIcon.svg"
                  className={styles.navMobileIcon}
                  alt="box"
                />
              ) : (
                <FontAwesomeIcon icon={faXmark} className={styles.xMark} />
              )}
            </div>
          )}
        </div>
        {isSmallerThan767 && (
          <>
            <MobileNav
              open={mobileNav}
              setOpen={setMobileNav}
              languages={languages}
              language={language}
              setLanguage={onLanguageSelect}
              languagesPopup={languagesPopup}
              setLanguagesPopup={setLanguagesPopup}
              onLogout={onLogout}
            />
            {notificationsPopup && (
              <NotificationsModalNavbar
                open={notificationsPopup}
                ref={notificationsRef}
                Notifications={Notifications}
              />
            )}
          </>
        )}
      </nav>
      {mobileUpgradeBtn && (
        <div className={styles.upgradeMobileButton}>
          <Link href="/upgrade">
            <div className={styles.upgradeMobileButtonText}>
              <FontAwesomeIcon icon={faCrown} className="mr-2" />
              Upgrade Now 25$ Yearly
            </div>
          </Link>
          <FontAwesomeIcon
            icon={faXmark}
            className={styles.upgradeMobileXMark}
            onClick={() => setMobileUpgradeBtn(false)}
          />
        </div>
      )}
    </>
  );
};

export default AdminNavbar;
