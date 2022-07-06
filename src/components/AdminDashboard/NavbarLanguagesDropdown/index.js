import React, {forwardRef} from 'react';
import styles from './styles.module.css';

const NavbarLanguagesDropdown = forwardRef(
  ({languages, language, setLanguage, position}, ref) => {
    return (
      <div
        className={styles.languages}
        style={position ? position : {}}
        ref={ref}>
        <div className={styles.languagesSubWrapper}>
          <h4 className={styles.languageHeading}>Your Language</h4>
          <div className={styles.languagesNames}>
            {languages?.map((lang) => (
              <div
                className={styles.languageNameContainer}
                onClick={() => setLanguage(lang)}>
                <img
                  src={`/images/${lang}.png`}
                  alt="country"
                  className={styles.languageFlag}
                />
                <span
                  className={styles.languageName}
                  style={
                    lang === language ? {color: '#00B884'} : {color: '#2B2E35'}
                  }>
                  {lang}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

export default NavbarLanguagesDropdown;
