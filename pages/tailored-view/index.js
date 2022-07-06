import React, {useState} from 'react';
import styles from './styles.module.css';
import Template from '../../src/components/Template';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faArrowsRotate,
  faChevronLeft,
  faChevronRight,
  faExpand,
  faPlus,
  faXmark,
  faPen,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import CoverLetter from '../../src/components/CoverLetter';
import CompletePercent from '../../src/components/AdminDashboard/CompletePercent';
import CoverLetterShowPopup from '../../src/components/AdminDashboard/CoverLetterShowPopup';
import ResumeShowPopup from '../../src/components/AdminDashboard/ResumeShowPopup';
import Link from 'next/link';
import {useMediaQuery} from '@mui/material';

const TailoredView = () => {
  const isSmallerThan1024 = useMediaQuery('(max-width: 1023px)');
  const [coverLetterShow, setCoverLetterShow] = useState(false);
  const [resumeShow, setResumeShow] = useState(false);
  const [selected, setSelected] = useState(0);

  const checkIsResume = () => {
    if (!isSmallerThan1024) {
      return true;
    }
    if (isSmallerThan1024) {
      if (selected === 0) {
        return true;
      }
    }
    return false;
  };
  const checkIsLetter = () => {
    if (!isSmallerThan1024) {
      return true;
    }
    if (isSmallerThan1024) {
      if (selected === 1) {
        return true;
      }
    }
    return false;
  };
  const checkIsDetails = () => {
    if (!isSmallerThan1024) {
      return true;
    }
    if (isSmallerThan1024) {
      if (selected === 2) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <CoverLetterShowPopup
        open={coverLetterShow}
        setOpen={setCoverLetterShow}
        onCross={() => setCoverLetterShow(false)}
      />
      <ResumeShowPopup
        open={resumeShow}
        setOpen={setResumeShow}
        onCross={() => setResumeShow(false)}
      />

      <div className={styles.container}>
        <div className="flex items-center justify-between">
          <h3 className={styles.heading}>Ui/Ux Designer</h3>
          <Link href="/job-applications">
            <div className={styles.cross}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </Link>
        </div>
        <div className={styles.selectedBtnsContainer}>
          <button
            onClick={() => setSelected(0)}
            className={
              selected === 0
                ? `${styles.selectBtn} ${styles.selected}`
                : `${styles.selectBtn}`
            }>
            Resume
          </button>
          <button
            onClick={() => setSelected(1)}
            className={
              selected === 1
                ? `${styles.selectBtn} ${styles.selected}`
                : `${styles.selectBtn}`
            }>
            Cover Latter
          </button>
          <button
            onClick={() => setSelected(2)}
            className={
              selected === 2
                ? `${styles.selectBtn} ${styles.selected}`
                : `${styles.selectBtn}`
            }>
            Details
          </button>
        </div>
        <div className={styles.main}>
          {checkIsResume() && (
            <div
              className={styles.templateContainer}
              onClick={() => {
                if (isSmallerThan1024) {
                  setResumeShow(true);
                }
              }}>
              <div
                className={`${styles.expand1} ${styles.expand}`}
                onClick={() => setResumeShow(true)}>
                <FontAwesomeIcon icon={faExpand} />
              </div>
              <div className={styles.arrowsBtns}>
                <div className={styles.ArrowBtn}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </div>
                <div className={styles.pageNumber}>1/2</div>
                <div className={styles.ArrowBtn}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </div>
              <div className={styles.templateWrapper}>
                <Template />
              </div>
            </div>
          )}
          {checkIsLetter() && (
            <div
              className={styles.letterContainer}
              onClick={() => {
                if (isSmallerThan1024) {
                  setCoverLetterShow(true);
                }
              }}>
              <div
                className={`${styles.expand2} ${styles.expand}`}
                onClick={() => setCoverLetterShow(true)}>
                <FontAwesomeIcon icon={faExpand} />
              </div>
              <CoverLetter />
            </div>
          )}
          {checkIsDetails() && (
            <div className={styles.resumeStrengthContainer}>
              <div className="flex items-center mb-8">
                <CompletePercent
                  height={76}
                  width={76}
                  fontSize={14}
                  strokeWidth={16}
                  percentage={80}
                />
                <div className="ml-8">
                  <div className={styles.strengthHeading}>Resume Strength</div>
                  <div className={styles.strengthPara}>complete your info</div>
                </div>
              </div>
              <h3 className={styles.tailorHeading}>Tailor Resume</h3>
              <div className={styles.subHeading}>Skills</div>
              <div className="flex items-center mb-4">
                <div className={`${styles.icon} ${styles.plus}`}>
                  <FontAwesomeIcon icon={faPlus} />
                </div>
                <div
                  className={`${styles.tailorItem} ${styles.greenItem} ml-3`}>
                  Emotional Intelligence
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className={`${styles.tailorItem} ${styles.peachItem}`}>
                  Google Adwords
                </div>
                <div className={`${styles.icon} ${styles.rotateIcon} mx-3`}>
                  <FontAwesomeIcon icon={faArrowsRotate} />
                </div>
                <div className={`${styles.tailorItem} ${styles.peachItem}`}>
                  Google Adsense
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className={`${styles.icon} ${styles.plus}`}>
                  <FontAwesomeIcon icon={faPlus} />
                </div>
                <div
                  className={`${styles.tailorItem} ${styles.greenItem} ml-3`}>
                  Emotional Intelligence
                </div>
              </div>
              <div className={styles.subHeading}>Objective</div>
              <div className="flex items-center mb-4">
                <div className={`${styles.tailorItem} ${styles.peachItem}`}>
                  Google Adwords
                </div>
                <div className={`${styles.icon} ${styles.rotateIcon} mx-3`}>
                  <FontAwesomeIcon icon={faArrowsRotate} />
                </div>
                <div className={`${styles.tailorItem} ${styles.peachItem} `}>
                  Google Adsense
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className={`${styles.icon} ${styles.crossIcon}`}>
                  <FontAwesomeIcon icon={faXmark} />
                </div>
                <div className={`${styles.tailorItem} ${styles.redItem} ml-3`}>
                  Emotional Intelligence
                </div>
              </div>
              <div className={styles.subHeading}>Experience</div>
              <div className="flex items-center mb-4">
                <div className={`${styles.tailorItem} ${styles.peachItem}`}>
                  Google Adwords
                </div>
                <div className={`${styles.icon} ${styles.rotateIcon} mx-3`}>
                  <FontAwesomeIcon icon={faArrowsRotate} />
                </div>
                <div className={`${styles.tailorItem} ${styles.peachItem} `}>
                  Google Adsense
                </div>
              </div>
              <div className="flex items-center">
                <div className={`${styles.icon} ${styles.crossIcon}`}>
                  <FontAwesomeIcon icon={faXmark} />
                </div>
                <div className={`${styles.tailorItem} ${styles.redItem} ml-3`}>
                  Emotional Intelligence
                </div>
              </div>
              {!isSmallerThan1024 && (
                <div className="flex mt-20">
                  <button className={styles.btn}>
                    <FontAwesomeIcon
                      icon={faPen}
                      color="#00B884"
                      className="mr-4"
                    />
                    Edit Mode
                  </button>
                  <button className={`${styles.btn} ml-7`}>
                    <FontAwesomeIcon
                      icon={faArrowDown}
                      color="#00B884"
                      className="mr-4"
                    />
                    Download Tailored
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {isSmallerThan1024 && (
          <div className={styles.footer}>
            <button className={styles.btn}>
              <FontAwesomeIcon icon={faPen} color="#00B884" className="mr-4" />
              Edit Mode
            </button>
            <button className={`${styles.btn} ml-7`}>
              <FontAwesomeIcon
                icon={faArrowDown}
                color="#00B884"
                className="mr-4"
              />
              Download
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TailoredView;
