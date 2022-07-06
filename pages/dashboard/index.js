import React, {useContext, useEffect, useState} from 'react';
import AdminNavbar from '../../src/components/AdminDashboard/Navbar';
import styles from './styles.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faPlus,
  faCalendarDay,
  faChartPie,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import {faFile} from '@fortawesome/free-regular-svg-icons';
import UpgradeModal from '../../src/components/AdminDashboard/UpgradeModal';
import Link from 'next/link';
import TrackingDetailModal from '../../src/components/AdminDashboard/TrackingDetailModal';
import JobApplicationsDetailedModal from '../../src/components/AdminDashboard/JobApplicationsDetailedModal';
import {useMediaQuery} from '@mui/material';
import Carousel from 'react-multi-carousel';
import withAuth from '../../src/hooks/withAuth';
import API from '../../src/services';
import {useLocalStorage} from '../../src/hooks';
import DashboardContext from '../../src/contexts/DashboardContext';
import UserContext from '../../src/contexts/UserContext';
import LoadingScreen from '../../src/components/router/LoadingScreen';
import DatabaseContext from '../../src/contexts/DatabaseContext';

const Tracking = [
  {
    emailNumber: 3,
    detail: 'Email List',
    detailImage: 'emailList',
  },
  {
    emailNumber: 12,
    detail: 'Interview',
    detailImage: 'interview',
  },
  {
    emailNumber: 6,
    detail: 'Applied',
    detailImage: 'applied',
  },
];

const JobApplications = [
  {
    icon: faFacebookF,
    color: '#4267B3',
  },
  {
    icon: faTwitter,
    color: '#1DA1F2',
  },
  {
    icon: faFacebookF,
    color: '#4267B3',
  },
  {
    icon: faLinkedinIn,
    color: '#2867B2',
  },
];

const Documents = [
  {
    cvImg: 'document-cv',
    cvBackImg: 'cv-back',
    color: '#ccf1e6',
  },
  {
    cvImg: 'webCVFront',
    cvBackImg: 'webCVBack',
    color: '#B4BFFF',
  },
  {
    cvImg: 'uiCVFront',
    cvBackImg: 'uiCVBack',
    color: '#FFB1D4',
  },
  {
    cvImg: 'ueCVFront',
    cvBackImg: 'ueCVBack',
    color: '#FFE9D1',
  },
];

const Dashboard = () => {
  const isSmallerThan768 = useMediaQuery('(max-width: 767px)');

  const {user} = useContext(UserContext);
  const {getResumes, resumes, loading} = useContext(DatabaseContext);

  const [upgradePopup, setUpgradePopup] = useState(false);
  const [login, setLogin] = useState(true);
  const [trackingModal, setTrackingModal] = useState(false);
  const [jobApplicationModal, setJobApplicationModal] = useState(false);

  useEffect(() => {
    if(user){
      getResumes()
    }else{
      router.push('/');
    }
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  console.log('resumes', resumes);

  const getDocuments = () => {
    return resumes?.map((doc, index) => (
      <div className={styles.documentWrpper}>
        <Link href={`/resume-profile/${doc?.id}`}>
          <div
            className={styles.documentBox}
            style={{
              backgroundColor: `${Documents[index % Documents?.length]?.color}`,
            }}>
            <div className={styles.dotsContainer}>
              <FontAwesomeIcon icon={faEllipsis} className={styles.dots} />
            </div>
            <div className={styles.documentsImgsContainer}>
              <img
                src={`/images/${
                  Documents[index % Documents?.length]?.cvImg
                }.svg`}
                className={styles.documentImg}
                alt="cv"
              />
              <img
                src={`/images/${
                  Documents[index % Documents?.length]?.cvBackImg
                }.svg`}
                className={`${styles.documentImg} ${styles.documentImgBack}`}
                alt="cv"
              />
              <img
                src="/images/cv-dots.svg"
                className={styles.documentDots}
                alt="cv"
              />
            </div>
          </div>
        </Link>
        <div className={styles.documentHeading}>
          {!doc?.opened && <div className={styles.greenDot} />}
          {doc?.name}
        </div>
      </div>
    ));
  };

  return (
    <>
      <UpgradeModal open={upgradePopup} setOpen={setUpgradePopup} />
      <TrackingDetailModal open={trackingModal} setOpen={setTrackingModal} />
      <JobApplicationsDetailedModal
        open={jobApplicationModal}
        setOpen={setJobApplicationModal}
      />
      <div>
        <AdminNavbar />
        <div className={styles.mainContainer}>
          <div
            className={`${styles.extensionContainer} flex justify-between items-center`}>
            <div className="flex items-center">
              <img
                src="/images/chrome-logo.svg"
                alt="chrome"
                className={styles.chrome}
              />
              <h6 className={styles.extensionPara}>
                Get Chrome Extension, Boost And Organize Your Job Search.
              </h6>
            </div>
            <button className={styles.extensionButton}>Install Now</button>
          </div>
          <div
            className={`flex items-center justify-between ${styles.documetnsHeader}`}>
            <h3 className={styles.documentsHeading}>Documents</h3>
            {!isSmallerThan768 ? (
              <Link href="/app/questionnaire">
                <button className={styles.documentsButton}>+ Create Now</button>
              </Link>
            ) : (
              <Link href="/documents">
                <div className={styles.viewAll}>View All</div>
              </Link>
            )}
          </div>
          {isSmallerThan768 && (
            <Link href="/app/questionnaire">
              <button className={styles.documentsButton}>+ Create Now</button>
            </Link>
          )}

          {/* Documents without Login  */}
          {!login && (
            <div className={styles.allDocuments}>
              <div className={styles.documentWrpper}>
                <div className={styles.documentBox}>
                  <div className={styles.dotsContainer}>
                    <FontAwesomeIcon
                      icon={faEllipsis}
                      className={styles.dots}
                    />
                  </div>
                  <div className={styles.documentsImgsContainer}>
                    <img
                      src="/images/document-cv.svg"
                      className={styles.documentImg}
                      alt="cv"
                    />
                    <img
                      src="/images/cv-back.svg"
                      className={`${styles.documentImg} ${styles.documentImgBack}`}
                      alt="cv"
                    />
                    <img
                      src="/images/cv-dots.svg"
                      className={styles.documentDots}
                      alt="cv"
                    />
                  </div>
                </div>
                <div className={styles.documentHeading}>
                  <div className={styles.greenDot} />
                  Ui / Ux Design
                </div>
              </div>
              <div className={styles.documentWrpper}>
                <div
                  className={styles.documentBox}
                  style={{backgroundColor: '#b4bfff'}}>
                  <div className={styles.documentsImgsContainer}>
                    <div
                      onClick={() => setUpgradePopup(true)}
                      className={styles.addIconContainer}>
                      <FontAwesomeIcon
                        icon={faPlus}
                        className={styles.plusIcon}
                      />
                    </div>
                    <img
                      src="/images/blank-page.svg"
                      className={styles.documentImg}
                      alt="cv"
                    />
                    <img
                      src="/images/cv-back.svg"
                      className={`${styles.documentImg} ${styles.documentImgBack}`}
                      alt="cv"
                    />
                    <img
                      src="/images/cv-dots.svg"
                      className={styles.documentDots}
                      alt="cv"
                    />
                  </div>
                </div>
                <div className={styles.documentHeading}>Create New Resume</div>
              </div>
            </div>
          )}
          {/* Documents with Login   */}
          {login &&
            (!isSmallerThan768 ? (
              <div className={styles.allDocuments}>{getDocuments()}</div>
            ) : (
              // Documents with corousel
              <Carousel
                additionalTransfrom={0}
                centerMode={false}
                className=""
                autoPlay={false}
                arrows={false}
                containerClass="container"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite={false}
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                  mobile: {
                    breakpoint: {
                      max: 576,
                      min: 0,
                    },
                    items: 2.1,
                    partialVisibilityGutter: 30,
                  },
                  tablet: {
                    breakpoint: {
                      max: 768,
                      min: 576,
                    },
                    items: 3.1,
                    partialVisibilityGutter: 30,
                  },
                }}
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable>
                {getDocuments()}
              </Carousel>
            ))}

          <div className={styles.trackingsContainer}>
            <div className={styles.tracking}>
              <div className={styles.trackingHeader}>
                <h3 className={styles.trackingHeading}>Tracking</h3>
                <Link href="/tracking">
                  <div className={styles.viewAll}>View All</div>
                </Link>
              </div>
              {/* Tracking  with Login  */}
              {login && (
                <>
                  {Tracking?.map((track) => (
                    <div
                      className={styles.trakWrapper}
                      onClick={() => setTrackingModal(!trackingModal)}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className={styles.trakHeading}>Ui/Ux Designer</h4>
                          <div className={styles.trackEmail}>
                            Employer-Email@Email.Com
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className={styles.emailOpen}>Email Open</div>
                          <div className={styles.emailNumber}>
                            {track?.emailNumber}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap">
                        <div className={styles.trackDetail}>
                          <FontAwesomeIcon
                            icon={faFile}
                            className={styles.trackDetailFile}
                          />
                          <div className={styles.trackDetailText}>
                            Ui/Ux Designer
                          </div>
                        </div>
                        <div className={styles.trackDetail}>
                          <FontAwesomeIcon
                            icon={faCalendarDay}
                            className={styles.trackDetailCalendar}
                          />
                          <div className={styles.trackDetailText}>
                            10 January
                          </div>
                        </div>
                        <div
                          className={`${styles.trackDetail}  ${styles.borderNone} items-center`}>
                          <img
                            src={`/images/${track?.detailImage}Icon.svg`}
                            className={styles.trackDetailImg}
                            alt="email"
                          />
                          <div className={styles.trackDetailText}>
                            {track?.detail}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isSmallerThan768 && (
                    <Link href="/tracking">
                      <button className={styles.showMore}>Show More</button>
                    </Link>
                  )}
                </>
              )}
              {/* Tracking without Login  */}
              {!login && (
                <div className={styles.trackingMain}>
                  <img
                    src="/images/trackingScreen.svg"
                    className={styles.trakingImg}
                    alt="tracking"
                  />
                  {!isSmallerThan768 && (
                    <p className={styles.trackingPara}>
                      Save time and effort with the easiest-to-use resume maker.
                    </p>
                  )}

                  <p className={styles.trackingPara}>
                    Impress hiring managers with a modern and effective resume
                    and get the job your want.
                  </p>
                </div>
              )}
            </div>
            <div className={styles.tracking}>
              <div className={styles.trackingHeader}>
                <h3 className={styles.trackingHeading}>Job Applications</h3>
                <Link href="/job-applications">
                  <div className={styles.viewAll}>View All</div>
                </Link>
              </div>
              {/* Job Applications with Login  */}
              {login && (
                <>
                  {JobApplications?.map((job) => (
                    <div
                      className={styles.trakWrapper}
                      onClick={() =>
                        setJobApplicationModal(!jobApplicationModal)
                      }>
                      <div className={styles.jobApplicationBoxMain}>
                        <div>
                          <h4 className={styles.trakHeading}>Ui/Ux Designer</h4>
                          <div
                            className={`${styles.trackEmail} ${styles.margin0}`}>
                            Employer-Email@Email.Com
                          </div>
                        </div>
                        <div className="flex items-center justify-center flex-wrap mt-4">
                          <div className={styles.trackDetail}>
                            <FontAwesomeIcon
                              icon={job?.icon}
                              className={styles.trackDetailIcon}
                              color={job?.color}
                            />
                            <div className={styles.trackDetailText}>
                              10 January
                            </div>
                          </div>
                          <div
                            className={`${styles.trackDetail} ${styles.borderNone}`}>
                            <FontAwesomeIcon
                              icon={faChartPie}
                              className={styles.trackDetailIcon}
                              color="#FCA84E"
                            />
                            <div className={styles.trackDetailText}>
                              80% Matching
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isSmallerThan768 && (
                    <Link href="/job-applications">
                      <button className={styles.showMore}>Show More</button>
                    </Link>
                  )}
                </>
              )}
              {/* Job Applications without Login  */}
              {!login && (
                <div className={styles.trackingMain}>
                  <img
                    src="/images/jobApplicationScreen.svg"
                    className={styles.trakingImg}
                    alt="tracking"
                  />
                  {!isSmallerThan768 && (
                    <p className={styles.trackingPara}>
                      Save time and effort with the easiest-to-use resume maker.
                    </p>
                  )}
                  <p className={styles.trackingPara}>
                    Impress hiring managers with a modern and effective resume
                    and get the job your want.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Dashboard);
