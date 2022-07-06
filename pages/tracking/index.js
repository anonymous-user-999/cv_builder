import React, {useCallback, useEffect, useRef, useState} from 'react';
import AdminNavbar from '../../src/components/AdminDashboard/Navbar';
import styles from './styles.module.css';
import {
  faMagnifyingGlass,
  faFilter,
  faCalendarDay,
  faArrowRightLong,
  faCheck,
  faXmark,
  faStar as solidStar,
} from '@fortawesome/free-solid-svg-icons';
import {faFile, faStar} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import TrackingFilterModal from '../../src/components/AdminDashboard/TrackingFilterModal';
import useClickOutside from '../../src/utils/useClickOutside';
import Modal from '@mui/material/Modal';
import TrackingDetailModal from '../../src/components/AdminDashboard/TrackingDetailModal';
import CoverLetterShowPopup from '../../src/components/AdminDashboard/CoverLetterShowPopup';
import {useMediaQuery} from '@mui/material';
import API from '../../src/services';
import {toast} from 'react-toastify';
import moment from 'moment';

const Tracking = () => {
  const isSmallerThan768 = useMediaQuery('(max-width: 768px)');

  const filterPopupRef = useRef(null);

  const [logIn, setLogIn] = useState(true);
  const [jobTrackingList, setJobTrackingList] = useState([]);
  const [filterPopup, setFilterPopup] = useState(false);
  const [searchPopup, setSearchPopup] = useState(false);
  const [cvPopup, setCVPopup] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [jobTrackingId, setJobTrackingId] = useState();
  const [jobTrackingDetails, setJobTrackingDetails] = useState({});
  const [trackingStatus, setTrackingStatus] = useState('');

  useClickOutside(filterPopupRef, () => {
    setFilterPopup(false);
  });

  const getTrackingStatusIcon = (value) => {
    if (value === 'EMAIL LIST') {
      return 'emailList';
    } else if (value === 'APPLIED') {
      return 'applied';
    } else {
      return 'interview';
    }
  };

  const getJobApplications = useCallback(async () => {
    let response = await API.JobTrackingAPI.getJobsUnderTracking();
    if (response?.data) {
      setJobTrackingList(response?.data?.results);
    }
  }, []);
  console.log('jobTrackingList', jobTrackingList);

  // get Search results for job tracking
  const onSearchJobTracking = async () => {
    const res = await API.JobTrackingAPI.searchJobTracking(
      searchValue,
      filterValue,
    );
    if (res?.data) {
      console.log('res', res);
    }
    if (res?.error) {
      toast?.error(res?.error?.message);
    }
  };

  // get job tracking id details

  const onGetJobTarkingClick = async (id) => {
    setJobTrackingId(id);
    setCVPopup(true);
    const res = await API.JobTrackingAPI.getJobApplicationById(id);
    if (res?.data) {
      console.log('res', res);
      setJobTrackingDetails(res?.data?.data);
      setTrackingStatus(res?.data?.data?.trackingStatus);
    }
    if (res?.error) {
      toast?.error(res?.error?.message);
    }
  };

  useEffect(() => {
    getJobApplications();
  }, [getJobApplications]);

  // toggle favorite job tracking
  const onToggleFavorite = async () => {
    const res = await API.JobTrackingAPI.toggleFavorite(jobTrackingId);
    if (res?.data) {
      console.log('res', res);
      const res = await API.JobTrackingAPI.getJobApplicationById(jobTrackingId);
      if (res?.data) {
        setJobTrackingDetails(res?.data?.data);
      }
      getJobApplications();
    }
    if (res?.error) {
      toast?.error(res?.error?.message);
    }
  };

  // change tracking status
  const onChangeTrackingStatus = async () => {
    const data = {
      trackingStatus,
    };
    console.log('tracking status', data);
    const res = await API.JobTrackingAPI.changeTrackingStatus(
      jobTrackingId,
      data,
    );
    if (res?.data?.data) {
      getJobApplications();
      console.log('tracking status response', res);
    }
    if (res?.error) {
      toast?.error(res?.error?.message);
    }
  };

  useEffect(() => {
    if (trackingStatus) {
      onChangeTrackingStatus();
    }
  }, [trackingStatus]);

  // delete job tracking by id
  const onDeleteJobTracking = async () => {
    const res = await API.JobTrackingAPI.deleteById(jobTrackingId);
    if (res?.data) {
      console.log('res', res);
      setCVPopup(false);
      getJobApplications();
    }
    if (res?.error) {
      toast?.error(res?.error?.message);
    }
  };

  return (
    <>
      <TrackingDetailModal
        data={jobTrackingDetails}
        onChangeTrackingStatus={onChangeTrackingStatus}
        onToggleFavorite={onToggleFavorite}
        trackingStatus={trackingStatus}
        setTrackingStatus={setTrackingStatus}
        onDeleteJobTracking={onDeleteJobTracking}
        open={cvPopup}
        setOpen={setCVPopup}
      />

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
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
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
                <button
                  className={styles.searchPopupBtn}
                  onClick={onSearchJobTracking}>
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
                      icon={faFile}
                      className={styles.trackDetailFile}
                    />
                    <div className={styles.trackDetailText}>Ui/Ux Designer</div>
                  </div>
                  <div className={styles.trackDetail}>
                    <FontAwesomeIcon
                      icon={faCalendarDay}
                      className={styles.trackDetailCalendar}
                    />
                    <div className={styles.trackDetailText}>10 January</div>
                  </div>
                  <div
                    className={`${styles.trackDetail}  ${styles.borderNone} items-center`}>
                    {'Email List' === 'Offer' ? (
                      <div className={styles.trackCheckContainer}>
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={styles.trackCheck}
                        />
                      </div>
                    ) : (
                      <img
                        src={`/images/emailListIcon.svg`}
                        className={styles.trackDetailImg}
                        alt="email"
                      />
                    )}
                    <div className={styles.trackDetailText}>Email List</div>
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
            <h3 className={styles.documentsHeading}>Tracking</h3>
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
                <FontAwesomeIcon
                  icon={false ? solidStar : faStar}
                  className={`${styles.star}`}
                />
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
                <TrackingFilterModal
                  open={filterPopup}
                  setOpen={setFilterPopup}
                  ref={filterPopupRef}
                  filterValue={filterValue}
                  setFilterValue={setFilterValue}
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
          jobTrackingList?.map((track) => (
            <div
              className={styles.trakWrapper}
              onClick={
                isSmallerThan768
                  ? () => onGetJobTarkingClick(track?.id)
                  : () => {}
              }>
              <div className={styles.trackSubContainer}>
                <div className={styles.trackContentContainer}>
                  <h4 className={styles.trakHeading}>{track?.job_title}</h4>
                  <span className={styles.trackDash}>&nbsp; - &nbsp; </span>
                  <div className={styles.trackEmail}>{track?.email}</div>
                </div>
                <div className={styles.trackDetails}>
                  <div className={styles.trackDetail}>
                    <FontAwesomeIcon
                      icon={faFile}
                      className={styles.trackDetailFile}
                    />
                    <div className={styles.trackDetailText}>
                      {track?.job_title}
                    </div>
                  </div>
                  <div className={styles.trackDetail}>
                    <FontAwesomeIcon
                      icon={faCalendarDay}
                      className={styles.trackDetailCalendar}
                    />
                    <div className={styles.trackDetailText}>
                      {moment(track?.date).format('DD MMMM')}
                    </div>
                  </div>
                  <div
                    className={`${styles.trackDetail}  ${styles.borderNone} items-center`}>
                    {track?.trackingStatus === 'OFFER' ? (
                      <div className={styles.trackCheckContainer}>
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={styles.trackCheck}
                        />
                      </div>
                    ) : (
                      <img
                        src={`/images/${getTrackingStatusIcon(
                          track?.trackingStatus,
                        )}Icon.svg`}
                        className={styles.trackDetailImg}
                        alt="email"
                      />
                    )}
                    <div className={styles.trackDetailText}>
                      {track?.trackingStatus}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.trackEmailDetails}>
                <div className="flex">
                  <div className="flex items-center">
                    <div className={styles.emailOpen}>Email Open</div>
                    <div className={styles.emailNumber}>3</div>
                  </div>
                  <FontAwesomeIcon
                    icon={track?.isFavorite ? solidStar : faStar}
                    className={`${styles.star} ${styles.starResponsive}`}
                    onClick={onToggleFavorite}
                    style={{cursor: 'pointer'}}
                  />
                </div>
                <FontAwesomeIcon
                  icon={track?.isFavorite ? solidStar : faStar}
                  className={`${styles.star} ${styles.starResponsiveXL}`}
                  onClick={onToggleFavorite}
                  style={{cursor: 'pointer'}}
                />
                <div
                  className={styles.trackOpenDetails}
                  onClick={() => onGetJobTarkingClick(track?.id)}>
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

export default Tracking;
