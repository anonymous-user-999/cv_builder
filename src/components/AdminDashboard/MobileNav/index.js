import {faCrown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import NavbarLanguagesModal from '../NavbarLanguagesModal';
import styles from './styles.module.css';

const MobileNav = ({
  open,
  setOpen,
  languages,
  language,
  setLanguage,
  languagesPopup,
  setLanguagesPopup,
  onLogout,
}) => {
  return (
    open && (
      <>
        <NavbarLanguagesModal
          languages={languages}
          language={language}
          setLanguage={setLanguage}
          open={languagesPopup}
          setOpen={setLanguagesPopup}
        />
        <div className={styles.main}>
          <div className={styles.linksContainer}>
            <Link href="/dashboard">
              <div onClick={() => setOpen(false)} className={styles.link}>
                Dashboard
              </div>
            </Link>
            <Link href="/documents">
              <div onClick={() => setOpen(false)} className={styles.link}>
                Documents
              </div>
            </Link>
            <Link href="/tracking">
              <div onClick={() => setOpen(false)} className={styles.link}>
                Tracking
              </div>
            </Link>
            <Link href="/job-applications">
              <div onClick={() => setOpen(false)} className={styles.link}>
                Job Applications
              </div>
            </Link>
          </div>
          <div className={styles.linksContainer2}>
            <h3 className={styles.heading}>User Name</h3>
            <Link href="/account-settings">
              <div onClick={() => setOpen(false)} className={styles.link}>
                Account Settings
              </div>
            </Link>
            <Link href="/support">
              <div onClick={() => setOpen(false)} className={styles.link}>
                Support
              </div>
            </Link>
            <div onClick={onLogout} className={styles.link}>
              Log Out
            </div>

            <Link href="/upgrade">
              <div className={styles.upgrade}>
                <FontAwesomeIcon icon={faCrown} className="mr-2" />
                Upgrade Now 25$ Yearly
              </div>
            </Link>
          </div>
        </div>
      </>
    )
  );
};

export default MobileNav;
