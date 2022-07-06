import React, {useContext, useEffect, useState} from 'react';
import styles from './styles.module.css';
import AdminNavbar from '../../src/components/AdminDashboard/Navbar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faPen,
  faShareNodes,
  faArrowDown,
  faClockRotateLeft,
  faArrowRightLong,
  faChartPie,
  faCalendarDay,
  faCheck,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import {faEye} from '@fortawesome/free-regular-svg-icons';
import CompletePercent from '../../src/components/AdminDashboard/CompletePercent';
import ViewersRequestModal from '../../src/components/AdminDashboard/ViewersRequestModal';
import UpdateHistoryModal from '../../src/components/AdminDashboard/UpdateHistoryModal';
import ShareResumeModal from '../../src/components/AdminDashboard/ShareResumeModal';
import Link from 'next/link';
import {useMediaQuery} from '@mui/material';
import {useRouter} from 'next/router';
import ResumeProfileMenuPopup from '../../src/components/AdminDashboard/ResumeProfileMenuPopup';
import API from '../../src/services';
import UserContext from '../../src/contexts/UserContext';
import moment from 'moment';
import LoadingScreen from '../../src/components/router/LoadingScreen';
import DatabaseContext from '../../src/contexts/DatabaseContext';
import CoverLetter from '../../src/components/CoverLetter';
import CvTemplate from '../../src/components/CvTemplate';

const ResumeProfiles = [
  {
    title: 'Ui/Ux Designer',
    status: 'Interview',
    icon: 'interview',
    emailOpen: 1,
  },
  {
    title: 'Ui/Ux Designer',
    status: 'Email List',
    icon: 'emailList',
    emailOpen: 0,
  },
  {
    title: 'Ui/Ux Designer',
    status: 'Offer',
    icon: 'offer',
    emailOpen: 12,
  },
  {
    title: 'Ui/Ux Designer',
    status: 'Interview',
    icon: 'interview',
    emailOpen: 1,
  },
];

const ResumeProfile = () => {
  const isSmallerThan768 = useMediaQuery('(max-width: 767px)');
  const router = useRouter();
  const {query} = router;

  const {user, authToken} = useContext(UserContext);
  const {getResume, loading} = useContext(DatabaseContext);

  const [viewersModal, setViewersModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [menuPopup, setMenuPopup] = useState(false);
  const [isCvShare, setIsCvShare] = useState(false);
  const [resume, setResume] = useState({});

  useEffect(() => {
    !user && router.push('/');
    (async () => {
      const res = await getResume(query?.id);
      setResume(res);
    })();
  }, []);

  console.log('resume', resume);

  const oResumeProfileClick = () => {
    if (isSmallerThan768) {
      router.push('/tailored-resume');
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  const onPrintCoverLetter = () => {
    var divContents = document.getElementById('jobLetterEditMode').innerHTML;
    var a = window.open('', '', 'height=1000, width=1000');
    a.document.write(divContents);
    a.print();
    a.document.close();
  };

  const onPrintResume = () => {
    var divContents = document.getElementById('CvTemplateIdForPrint').innerHTML;
    var a = window.open('', '', 'height=1000, width=1000');
    a.document.write(divContents);
    a.print();
    a.document.close();
  };

  return (
    <>
      <ViewersRequestModal
        open={viewersModal}
        setOpen={setViewersModal}
        data={resume?.viewerRequests}
      />
      <UpdateHistoryModal
        open={historyModal}
        setOpen={setHistoryModal}
        data={resume?.updateHistory}
      />
      <ShareResumeModal
        open={shareModal}
        id={query?.id}
        setOpen={setShareModal}
        title={isCvShare ? 'Resume' : 'Cover Letter'}
        endpoint={
          isCvShare
            ? `/template-view/${resume?.id}`
            : `/letter-view/${resume?.coverLetter?.id}`
        }
      />
      <ResumeProfileMenuPopup open={menuPopup} setOpen={setMenuPopup} />
      <AdminNavbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.heading}>{resume?.name}</h3>
          {isSmallerThan768 && (
            <div className={styles.menuBtn} onClick={() => setMenuPopup(true)}>
              <FontAwesomeIcon icon={faEllipsis} />
            </div>
          )}
        </div>
        <div className={styles.main}>
          <div className={styles.resumeContainer}>
            <img
              src="/images/templateex.png"
              className={styles.resumeImg}
              alt="resume"
            />
            <div className={styles.resumeContent}>
              <h3 className={styles.resumeHeading}>Resume</h3>
              <div className={styles.resumeDetails}>
                Updated {moment(resume?.updatedAt).format('DD MMMM, hh:mm A')}{' '}
              </div>
              <div className={styles.resumeCompletion}>
                <CompletePercent percentage={80} />
                <div className={styles.resumeCompleteionContent}>
                  <h4 className={styles.resumeStrengthHeading}>
                    Resume Strength
                  </h4>
                  <div className={styles.resumeStrengthDetail}>
                    complete your info
                  </div>
                </div>
              </div>
              <div className={styles.resumeOptions}>
                <Link href={`/app/builder/${query?.id}`}>
                  <div className={styles.resumeOption}>
                    <FontAwesomeIcon
                      icon={faPen}
                      className={styles.resumeOptionIcon}
                    />
                    <div className={styles.resumeOptionText}>Edit</div>
                  </div>
                </Link>
                <div
                  className={styles.resumeOption}
                  onClick={() => {
                    setShareModal(true);
                    setIsCvShare(true);
                  }}>
                  <FontAwesomeIcon
                    icon={faShareNodes}
                    className={styles.resumeOptionIcon}
                  />
                  <div className={styles.resumeOptionText}>Share</div>
                </div>
                <div
                  className={styles.resumeOption}
                  style={{border: 'none', paddingRight: '0', marginRight: '0'}}
                  onClick={onPrintResume}>
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    className={styles.resumeOptionIcon}
                  />
                  <div className={styles.resumeOptionText}>Download</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.resumeContainer}>
            <img
              src="/images/templateex.png"
              className={styles.resumeImg}
              alt="resume"
            />
            <div className={styles.resumeContent}>
              <h3 className={styles.resumeHeading}>Cover Letter</h3>
              <div className={styles.resumeDetails}>
                Updated {moment(resume?.coverLetter?.updatedAt).format('DD MMMM, hh:mm A')}
              </div>
              <div className={styles.resumeCompletion}>
                <CompletePercent percentage={85} />

                <div className={styles.resumeCompleteionContent}>
                  <h4 className={styles.resumeStrengthHeading}>
                    Resume Strength
                  </h4>
                  <div className={styles.resumeStrengthDetail}>
                    complete your info
                  </div>
                </div>
              </div>
              <div className={styles.resumeOptions}>
                <Link href={`/edit-letter/${query?.id}`}>
                  <div className={styles.resumeOption}>
                    <FontAwesomeIcon
                      icon={faPen}
                      className={styles.resumeOptionIcon}
                    />
                    <div className={styles.resumeOptionText}>Edit</div>
                  </div>
                </Link>
                <div
                  className={styles.resumeOption}
                  onClick={() => {
                    setShareModal(true);
                    setIsCvShare(false);
                  }}>
                  <FontAwesomeIcon
                    icon={faShareNodes}
                    className={styles.resumeOptionIcon}
                  />
                  <div className={styles.resumeOptionText}>Share</div>
                </div>
                <div
                  className={styles.resumeOption}
                  style={{marginRight: '0', paddingRight: '0', border: 'none'}}
                  onClick={onPrintCoverLetter}>
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    className={styles.resumeOptionIcon}
                  />
                  <div className={styles.resumeOptionText}>Download</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.header}>
          <h3 className={styles.heading2}>Resumes Statistics</h3>
        </div>
        <div className={styles.statics}>
          <div className={styles.stat}>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faEye}
                className={styles.statIcon}
                color="#00B884"
              />
              <div className={styles.statText}>
                {resume?.viewerRequests?.length || 0} Views
              </div>
            </div>
            <div
              onClick={() => setViewersModal(true)}
              className="flex items-center cursor-pointer">
              <div className={styles.statDetails}>More Details</div>
              <FontAwesomeIcon
                icon={faArrowRightLong}
                className={styles.statArrow}
                color="#00B884"
              />
            </div>
          </div>
          <div className={styles.stat}>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faClockRotateLeft}
                className={styles.statIcon}
                color="#3E67F3"
              />
              <div className={styles.statText}>Updates History</div>
            </div>
            <div
              onClick={() => setHistoryModal(true)}
              className="flex items-center cursor-pointer">
              <div className={styles.statDetails}>More Details</div>
              <FontAwesomeIcon
                icon={faArrowRightLong}
                className={styles.statArrow}
                color="#00B884"
              />
            </div>
          </div>
        </div>
        <div className={`${styles.header} mb-8`}>
          <h3 className={styles.heading2}>Tailored Resumes</h3>
        </div>
        {ResumeProfiles?.map((resume) => (
          <div className={styles.trakWrapper} onClick={oResumeProfileClick}>
            <div className={styles.trackSubContainer}>
              <div className={styles.trackContentContainer}>
                <h4 className={styles.trakHeading}>{resume.title}</h4>
              </div>
              <div className={styles.trackDetails}>
                <div className={styles.trackDetail}>
                  <FontAwesomeIcon
                    icon={faCalendarDay}
                    className={styles.trackDetailCalendar}
                  />
                  <div className={styles.trackDetailText}>10 January</div>
                </div>
                <div className={styles.trackDetail}>
                  <FontAwesomeIcon
                    icon={faChartPie}
                    className={styles.trackDetailCalendar}
                    style={{color: '#FCA84E'}}
                  />
                  <div className={styles.trackDetailText}>80% Matching</div>
                </div>
                <div
                  className={`${styles.trackDetail}  ${styles.borderNone} items-center`}>
                  {resume.status === 'Offer' ? (
                    <div className={styles.trackCheckContainer}>
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={styles.trackCheck}
                      />
                    </div>
                  ) : (
                    <img
                      src={`/images/${resume.icon}Icon.svg`}
                      className={styles.trackDetailImg}
                      alt="email"
                    />
                  )}
                  <div className={styles.trackDetailText}>{resume.status}</div>
                </div>
              </div>
            </div>
            <div className={styles.trackEmailDetails}>
              <div className="flex">
                <div className="flex items-center">
                  <div className={styles.emailNumber}>{resume.emailOpen}</div>
                  <div className={styles.emailOpen}>Email Open</div>
                </div>
              </div>
              <Link href="/tailored-resume">
                <div className={styles.trackOpenDetails}>
                  Open Details
                  <FontAwesomeIcon
                    icon={faArrowRightLong}
                    className={styles.trackRightArrow}
                  />
                </div>
              </Link>
            </div>
          </div>
        ))}
        <div style={{display:"none"}}>
          <CoverLetter
            jobTitle={resume?.coverLetter?.companyName}
            data={resume?.coverLetter?.body}
            hiringManager={resume?.coverLetter?.hiringManagerName}
          />
        </div>
        <div  style={{display:"none"}}>
          <CvTemplate resume={resume} />
        </div>
      </div>
    </>
  );
};

export default ResumeProfile;
