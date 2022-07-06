import React, {useRef, useState} from 'react';
import AdminNavbar from '../../src/components/AdminDashboard/Navbar';
import styles from './styles.module.css';
import {
  faMagnifyingGlass,
  faFilter,
  faCalendarDay,
  faArrowRightLong,
  faXmark,
  faChartPie,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import useClickOutside from '../../src/utils/useClickOutside';
import Modal from '@mui/material/Modal';
import TrackingDetailModal from '../../src/components/AdminDashboard/TrackingDetailModal';
import JobApplicationsFilter from '../../src/components/AdminDashboard/JobApplicationsFilter';
import JobApplicationsDetailedModal from '../../src/components/AdminDashboard/JobApplicationsDetailedModal';
import { useMediaQuery } from '@mui/material';

const ApplicationsList = [
  {
    title: 'Ui/Ux Designer',
    emptyStar: true,
    socialMedia: faFacebookF,
    color: '#4267B3',
  },
  {
    title: 'User Interface Designer',
    socialMedia: faTwitter,
    color: '#1DA1F2',
    emptyStar: false,
  },
  {
    title: 'Web Developer',
    socialMedia: faTwitter,
    color: '#1DA1F2',
    emptyStar: true,
  },
  {
    title: 'Web Developer',
    socialMedia: faLinkedinIn,
    color: '#2867B2',
    emptyStar: true,
  },
];

const JobApplications = () => {
  const isSmallerThan768 = useMediaQuery('(max-width: 768px)');

  const filterPopupRef = useRef(null);

  const [logIn, setLogIn] = useState(true);
  const [filterPopup, setFilterPopup] = useState(false);
  const [searchPopup, setSearchPopup] = useState(false);
  const [cvPopup, setCVPopup] = useState(false);

  useClickOutside(filterPopupRef, () => {
    setFilterPopup(false);
  });

  return (
    <>
      <JobApplicationsDetailedModal open={cvPopup} setOpen={setCVPopup} />
      <Modal
        open={searchPopup}
        onClose={() => setSearchPopup(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div className={styles.searchPopup}>
          <div className={styles.mainContainer}>
            <div className={styles.searchPopupBar}>
              <div
                className={`${styles.inputContainer} ${styles.searchPopupInputContainer}`}>
                <input
                  type="text"
                  className={`${styles.inputSearch} ${styles.searchPopupInput}`}
                  placeholder="Search here"
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className={styles.searchPopupSearchIcon}
                />
              </div>   
              <div className="flex items-center">
                <div
                  onClick={() => setSearchPopup(false)}
                  className={styles.searchPopupCrossContainer}>
                  <FontAwesomeIcon
                    icon={faXmark}
                    className={styles.searchPopupCross}   
                  />
                </div>
                <button className={styles.searchPopupBtn}>
                  {isSmallerThan768 ? (
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  ) : (
                    'Find it now'
                  )}
                </button>
              </div>
            </div>
            <div
              className={`${styles.trakWrapper} ${styles.searchPopupTrakWrapper}`}>
              <div className={styles.trackSubContainer}>
                <div className={styles.trackContentContainer}>
                  <h4 className={styles.trakHeading}>Ui/Ux Designer</h4>
                  <span className={styles.trackDash}>&nbsp; - &nbsp; </span>
                  <div className={styles.trackEmail}>
                    Employer-Email@Email.Com
                  </div>
                </div>
                <div className={styles.trackDetails}>
                  <div className={styles.trackDetail}>
                    <FontAwesomeIcon
                      icon={faFacebookF}
                      className={styles.trackDetailFile}
                      color="#4267B3"
                    />
                    <div className={styles.trackDetailText}>Job Post Link</div>
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
                    className={styles.trackDetail}
                    style={{
                      border: 'none',
                      paddingRight: '0',
                      marginRight: '0',
                    }}>
                    <FontAwesomeIcon
                      icon={faCalendarDay}
                      className={styles.trackDetailCalendar}
                    />
                    <div className={styles.trackDetailText}>10 January</div>
                  </div>
                </div>
              </div>
              <div className={styles.trackEmailDetails}>
                <div className="flex">
                  <div className="flex items-center">
                    <div className={styles.emailOpen}>Email Open</div>
                    <div className={styles.emailNumber}>3</div>
                  </div>
                  <div className={`${styles.star} ${styles.starResponsive}`}>
                    {true && <div className={styles.starInside} />}
                  </div>
                </div>
                <div className={`${styles.star} ${styles.starResponsiveXL}`}>
                  {true && <div className={styles.starInside} />}
                </div>
                <div className={styles.trackOpenDetails}>
                  Open Details
                  <FontAwesomeIcon
                    icon={faArrowRightLong}
                    className={styles.trackRightArrow}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {filterPopup && <div className={styles.overlay} />}
      <AdminNavbar />
      <div className={styles.mainContainer}>
        <div className={styles.documetnsHeader}>
          <div className={styles.headingWrapper}>
            <h3 className={styles.documentsHeading}>Job Applications</h3>
          </div>
          {logIn && (
            <div className="flex items-center">
              {!isSmallerThan768 && (
                <div
                  className={styles.inputContainer}
                  onClick={() => setSearchPopup(true)}>
                  <input
                    type="text"
                    className={styles.inputSearch}
                    placeholder="Search here"
                  />
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className={styles.searchIcon}
                  />
                </div>
              )}

              <div className={styles.starContainer}>
                <div className={styles.star}></div>
              </div>
              <div style={{position: 'relative'}}>
                <div
                  className={styles.filterContainer}
                  onClick={() => setFilterPopup(!filterPopup)}>
                  <FontAwesomeIcon
                    icon={faFilter}
                    className={styles.filterIcon}
                  />
                  <div className={styles.filterText}>Filter</div>
                </div>
                <JobApplicationsFilter
                  open={filterPopup}
                  setOpen={setFilterPopup}
                  ref={filterPopupRef}
                />
              </div>
            </div>
          )}
        </div>
        {isSmallerThan768 && (
          <div
            className={styles.inputContainer}
            onClick={() => setSearchPopup(true)}>
            <input
              type="text"
              className={styles.inputSearch}
              placeholder="Search here"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={styles.searchIcon}
            />
          </div>
        )}
        {logIn &&
          ApplicationsList?.map((application) => (
            <div
              className={styles.trakWrapper}
              onClick={() => setCVPopup(true)}>
              <div className={styles.trackSubContainer}>
                <div className={styles.trackContentContainer}>
                  <h4 className={styles.trakHeading}>{application?.title}</h4>
                  <span className={styles.trackDash}>&nbsp; - &nbsp; </span>
                  <div className={styles.trackEmail}>
                    Employer-Email@Email.Com
                  </div>
                </div>
                <div className={styles.trackDetails}>
                  <div className={styles.trackDetail}>
                    <FontAwesomeIcon
                      icon={application?.socialMedia}
                      className={styles.trackDetailFile}
                      color={application?.color}
                    />
                    <div className={styles.trackDetailText}>Job Post Link</div>
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
                    className={styles.trackDetail}
                    style={{
                      border: 'none',
                      paddingRight: '0',
                      marginRight: '0',
                    }}>
                    <FontAwesomeIcon
                      icon={faCalendarDay}
                      className={styles.trackDetailCalendar}
                    />
                    <div className={styles.trackDetailText}>10 January</div>
                  </div>
                </div>
              </div>
              <div className={styles.trackEmailDetails}>
                <div className="flex">
                  <div className="flex items-center">
                    <div className={styles.emailOpen}>Email Open</div>
                    <div className={styles.emailNumber}>0</div>
                  </div>
                  <div className={`${styles.star} ${styles.starResponsive}`}>
                    {application?.emptyStar && (
                      <div className={styles.starInside} />
                    )}
                  </div>
                </div>
                <div className={`${styles.star} ${styles.starResponsiveXL}`}>
                  {application?.emptyStar && (
                    <div className={styles.starInside} />
                  )}
                </div>
                <div className={styles.trackOpenDetails}>
                  Open Details
                  <FontAwesomeIcon
                    icon={faArrowRightLong}
                    className={styles.trackRightArrow}
                  />
                </div>
              </div>
            </div>
          ))}
        {!logIn && (
          <div className={styles.main}>
            <div className={styles.imageContainer}>
              <img
                src={
                  isSmallerThan768
                    ? '/images/trackingMobileImg.svg'
                    : '/images/tracking.svg'
                }
                alt="mainImg"
                className={styles.mainImg}
              />
            </div>
            <div className={styles.contentContainr}>
              <h3 className={styles.mainHeading}>Tracking</h3>
              <p className={styles.mainPara}>
                Save time and effort with the easiest-to-use resume maker.
              </p>
              <p className={styles.mainPara}>
                Impress hiring managers with a modern and effective resume and
                get the job your want.
              </p>
              <button className={styles.mainButton}>
                Upgrade Now 25$ Yearly
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default JobApplications;
