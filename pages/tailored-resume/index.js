import React, {useState} from 'react';
import styles from './styles.module.css';
import Template from '../../src/components/Template';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faExpand,
  faXmark,
  faArrowDown,
  faFile,
  faArrowUpRightFromSquare,
  faEnvelopeOpenText,
  faEye,
  faCalendarDay,
  faChartPie,
  faShareNodes,
} from '@fortawesome/free-solid-svg-icons';
import CoverLetter from '../../src/components/CoverLetter';
import CoverLetterShowPopup from '../../src/components/AdminDashboard/CoverLetterShowPopup';
import ResumeShowPopup from '../../src/components/AdminDashboard/ResumeShowPopup';
import Link from 'next/link';
import ViewersRequestModal from '../../src/components/AdminDashboard/ViewersRequestModal';
import {useMediaQuery} from '@mui/material';

const TailoredView = () => {
  const isSmallerThan1024 = useMediaQuery('(max-width: 1023px)');

  const [coverLetterShow, setCoverLetterShow] = useState(false);
  const [resumeShow, setResumeShow] = useState(false);
  const [viewersDetailPopup, setViewersDetailPopup] = useState(false);
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
      <ViewersRequestModal
        open={viewersDetailPopup}
        setOpen={setViewersDetailPopup}
      />
      <div className={styles.container}>
        <div className="flex items-center justify-between">
          <h3 className={styles.heading}>Ui/Ux Designer</h3>
          <Link href="/resume-profile">
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
              {!isSmallerThan1024 && (
                <h3 className={styles.detailMainHeading}>Details</h3>
              )}
              <div className={styles.detail}>
                <div className="flex items-center">
                  <div className={styles.detailIconContainer}>
                    <FontAwesomeIcon
                      icon={faFile}
                      className={styles.detailIcon}
                    />
                  </div>
                  <h4 className={styles.detailHeading}>Resume</h4>
                </div>
                <div
                  className={styles.detailView}
                  onClick={() => setResumeShow(true)}>
                  View{' '}
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="ml-2"
                  />
                </div>
              </div>
              <div className={styles.detail}>
                <div className="flex items-center">
                  <div className={styles.detailIconContainer}>
                    <FontAwesomeIcon
                      icon={faEnvelopeOpenText}
                      className={styles.detailIcon}
                    />
                  </div>
                  <h4 className={styles.detailHeading}>Cover Letter</h4>
                </div>
                <div
                  className={styles.detailView}
                  onClick={() => setCoverLetterShow(true)}>
                  View{' '}
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="ml-2"
                  />
                </div>
              </div>
              <div className={styles.detail}>
                <div className="flex items-center">
                  <div
                    className={styles.detailIconContainer}
                    style={{backgroundColor: '#FF5C07'}}>
                    <FontAwesomeIcon
                      icon={faChartPie}
                      className={styles.detailIcon}
                    />
                  </div>
                  <h4 className={styles.detailHeading}>80% Resume Strength</h4>
                </div>
              </div>
              <div className={styles.detail}>
                <div className="flex items-center">
                  <div
                    className={styles.detailIconContainer}
                    style={{backgroundColor: '#00B884'}}>
                    <FontAwesomeIcon
                      icon={faEye}
                      className={styles.detailIcon}
                    />
                  </div>
                  <h4 className={styles.detailHeading}>
                    Viewers Request{' '}
                    <span style={{color: '#00B884'}}>&nbsp; 12</span>
                  </h4>
                </div>
                <div
                  className={styles.detailView}
                  onClick={() => setViewersDetailPopup(true)}>
                  View{' '}
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="ml-2"
                  />
                </div>
              </div>

              <div className={styles.detail}>
                <div className="flex items-center">
                  <div
                    className={styles.detailIconContainer}
                    style={{backgroundColor: '#FD71AF'}}>
                    <FontAwesomeIcon
                      icon={faCalendarDay}
                      className={styles.detailIcon}
                    />
                  </div>
                  <h4 className={styles.detailHeading}>10 January</h4>
                </div>
              </div>
              <div className={styles.detail}>
                <div className="flex items-center">
                  <div
                    className={styles.detailIconContainer}
                    style={{backgroundColor: '#3E67F3'}}>
                    <img
                      src="/images/interviewIconWhite.svg"
                      alt="interview"
                      width={12}
                    />
                  </div>
                  <h4 className={styles.detailHeading}>Interview</h4>
                </div>
              </div>
              <div className={styles.detail}>
                <div className="flex items-center">
                  <div
                    className={styles.detailIconContainer}
                    style={{backgroundColor: '#2699FB'}}>
                    <FontAwesomeIcon
                      icon={faShareNodes}
                      className={styles.detailIcon}
                    />
                  </div>
                  <h4 className={styles.detailHeading}>Share Resume </h4>
                </div>
                <div
                  className={styles.detailView}
                  onClick={() => setViewersDetailPopup(true)}>
                  Share Option{' '}
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="ml-2"
                  />
                </div>
              </div>
              <div className={styles.detail}>
                <div className="flex items-center">
                  <div
                    className={styles.detailIconContainer}
                    style={{backgroundColor: '#2699FB'}}>
                    <FontAwesomeIcon
                      icon={faArrowDown}
                      className={styles.detailIcon}
                    />
                  </div>
                  <h4 className={styles.detailHeading}>Download</h4>
                </div>
                <div
                  className={styles.detailView}
                  onClick={() => setViewersDetailPopup(true)}>
                  Download{' '}
                  <FontAwesomeIcon icon={faArrowDown} className="ml-2" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TailoredView;
