import React, {forwardRef, useEffect, useRef, useState} from 'react';
import styles from './styles.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen, faXmark} from '@fortawesome/free-solid-svg-icons';
import useClickOutside from '../../../utils/useClickOutside';
import NavbarLanguagesDropdown from '../NavbarLanguagesDropdown';
import Link from 'next/link';

const languages = [
  'english',
  'arabic',
  'hindi',
  'english',
  'arabic',
  'hindi',
  'english',
  'arabic',
  'hindi',
];

const ResumeHeader = forwardRef(({title, setTitle}, ref) => {
  const titleRef = useRef();
  const languagesRef = useRef(null);

  const [languagesPopup, setLanguagesPopup] = useState(false);
  const [language, setLanguage] = useState('');

  // if (typeof window === 'object') {
  //   let el = document.querySelector('.input-wrap .input');
  //   let widthMachine = document.querySelector('.input-wrap .width-machine');
  //   el?.addEventListener('keyup', () => {
  //     widthMachine.innerHTML = titleRef?.current?.value;
  //   });
  // }
  const onLanguageSelect = (lang) => {
    setLanguage(lang);
    setLanguagesPopup(false);
  };

  useEffect(() => {
    setTitle('Ui/Ux Designer');
    setLanguage(languages[0]);
  }, []);

  useClickOutside(languagesRef, () => {
    setLanguagesPopup(false);
  });

  return (
    <div className={styles.formHeader}>
      <div className={styles.titleContainer}>
        <span className={styles.inputWrap}>
          <span className={styles.widthMachine} aria-hidden="true">
            {titleRef?.current?.value}
          </span>
          <input
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            ref={titleRef}
          />
        </span>
        <FontAwesomeIcon
          icon={faPen}
          className={styles.editIcon}
          onClick={() => titleRef.current.focus()}
        />
      </div>
      <div className={styles.languageContainer}>
        <div
          className="flex items-center"
          onClick={() => setLanguagesPopup(!languagesPopup)}>
          <img
            src={`/images/${language}.png`}
            alt="flag"
            className={styles.languageFlag}
          />
          <div className={styles.languageName}>{language}</div>
        </div>
        {languagesPopup && (
          <NavbarLanguagesDropdown
            ref={languagesRef}
            languages={languages}
            language={language}
            setLanguage={onLanguageSelect}
            position={{top: '3rem', right: '0'}}
          />
        )}
        <Link href="/resume-profile">
          <div className={styles.templateCross}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </Link>
      </div>
    </div>
  );
});

export default ResumeHeader;
