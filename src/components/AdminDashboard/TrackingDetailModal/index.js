import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.css';
import Modal from '@mui/material/Modal';
import {
  faXmark,
  faArrowUpRightFromSquare,
  faEnvelopeOpenText,
  faCalendarDay,
  faLocationDot,
  faAngleDown,
  faTrash,
  faChevronLeft,
  faChevronRight,
  faStar as solidStar,
} from '@fortawesome/free-solid-svg-icons';
import {faFile, faEye, faStar} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebookF} from '@fortawesome/free-brands-svg-icons';
import DeleteJobModal from '../DeleteJobModal';
import useClickOutside from '../../../utils/useClickOutside';
import ViewersRequestModal from '../ViewersRequestModal';
import Link from 'next/link';
import CoverLetterShowPopup from '../CoverLetterShowPopup';
import ResumeShowPopup from '../ResumeShowPopup';
import {useMediaQuery} from '@mui/material';
import moment from 'moment';

const TrackingDetailModal = ({
  data,
  onToggleFavorite,
  trackingStatus,
  setTrackingStatus,
  onDeleteJobTracking,
  open,
  setOpen,
}) => {
  const isSmallerThan768 = useMediaQuery('(max-width: 767px)');
  const deleteJobRef = useRef(null);
  const statusChangeRef = useRef(null);

  const [deleteJobPopup, setDeleteJobPopup] = useState(false);
  const [statusChangePopup, setStatusChangePopup] = useState(false);
  const [viewersDetailPopup, setViewersDetailPopup] = useState(false);
  const [coverLetterShow, setCoverLetterShow] = useState(false);
  const [resumeShow, setResumeShow] = useState(false);
  const [selectedArea, setSelectedArea] = useState(0);

  useClickOutside(deleteJobRef, () => {
    setDeleteJobPopup(false);
  });
  useClickOutside(statusChangeRef, () => {
    setStatusChangePopup(false);
  });

  const onViewCoverLetter = () => {
    setOpen(false);
    setCoverLetterShow(true);
  };

  const onCross = () => {
    setOpen(true);
    setCoverLetterShow(false);
  };
  const onResumeLetterView = () => {
    setOpen(false);
    setResumeShow(true);
  };

  const onCrossResume = () => {
    setOpen(true);
    setResumeShow(false);
  };

  const checkContentArea = () => {
    if (!isSmallerThan768) {
      return true;
    }
    if (selectedArea === 0) {
      return true;
    }
    return false;
  };
  const checkDetailsArea = () => {
    if (!isSmallerThan768) {
      return true;
    }
    if (selectedArea === 1) {
      return true;
    }
    return false;
  };

  const changeTrackingStatus = (status) => {
    setStatusChangePopup(false);
    setTrackingStatus(status);
  };

  return (
    <>
      <CoverLetterShowPopup
        open={coverLetterShow}
        setOpen={setCoverLetterShow}
        onCross={onCross}
        data={data?.cover_letter}
      />
      <ResumeShowPopup
        open={resumeShow}
        setOpen={setResumeShow}
        onCross={onCrossResume}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.modalContainer}>
        <>
          <button className={`${styles.sliderBtn} ${styles.leftBtn}`}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className={`${styles.sliderBtn} ${styles.rightBtn}`}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
          <div
            id="mainDiv"
            className={styles.modalMain}
            style={
              deleteJobPopup || (statusChangePopup && isSmallerThan768)
                ? {overflow: 'hidden'}
                : {}
            }>
            {/* {deleteJobPopup && <div className={styles.overlay} />} */}

            <DeleteJobModal
              onDelete={onDeleteJobTracking}
              open={deleteJobPopup}
              ref={deleteJobRef}
              setOpen={setDeleteJobPopup}
            />
            <ViewersRequestModal
              data={data?.viewerRequests}
              open={viewersDetailPopup}
              setOpen={setViewersDetailPopup}
            />
            <div className={styles.header}>
              <div className="flex items-center">
                {!isSmallerThan768 ? (
                  <>
                    <h3 className={styles.heading}>{data?.job_title}</h3>
                    <FontAwesomeIcon
                      icon={data?.isFavorite ? solidStar : faStar}
                      className={styles.star}
                      onClick={onToggleFavorite}
                      style={{cursor: 'pointer'}}
                    />
                  </>
                ) : (
                  <button
                    className={`${styles.btn} ${styles.deleteBtn}`}
                    style={{color: '#676D7D'}}
                    onClick={() => setDeleteJobPopup(true)}>
                    <FontAwesomeIcon icon={faTrash} /> &nbsp; Delete
                  </button>
                )}
              </div>
              <FontAwesomeIcon
                onClick={() => setOpen(false)}
                icon={faXmark}
                className={styles.cross}
              />
            </div>
            {isSmallerThan768 && (
              <div className="flex items-center">
                <h3 className={styles.heading}>{data?.job_title}</h3>
                <FontAwesomeIcon
                  icon={data?.isFavorite ? solidStar : faStar}
                  className={styles.star}
                  onClick={onToggleFavorite}
                />
              </div>
            )}
            <h3 className={styles.email}>{data?.email}</h3>
            {isSmallerThan768 && (
              <div className="flex justify-between items-center mb-7">
                <button
                  className={
                    selectedArea === 0
                      ? `${styles.selectionBtn} ${styles.btnSelected}`
                      : `${styles.selectionBtn}`
                  }
                  onClick={() => setSelectedArea(0)}>
                  Job Post
                </button>
                <button
                  className={
                    selectedArea === 1
                      ? `${styles.selectionBtn} ${styles.btnSelected}`
                      : `${styles.selectionBtn}`
                  }
                  onClick={() => setSelectedArea(1)}>
                  Details
                </button>
              </div>
            )}
            <div className={styles.main}>
              {checkContentArea() && (
                <div className={styles.contentContainer}>
                  <h4 className={styles.subHeading}>Responsibilities</h4>
                  {data?.duties?.map((duty) => (
                    <div className={styles.plainText}>{duty}</div>
                  ))}
                  <h4 className={`${styles.subHeading} mt-6`}>Requirements</h4>
                  {data?.requirements?.map((req) => (
                    <div className={styles.plainText}>{req}</div>
                  ))}
                </div>
              )}
              {checkDetailsArea() && (
                <div className={styles.detailsContainer}>
                  {!isSmallerThan768 && (
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
                      onClick={onResumeLetterView}>
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
                      onClick={onViewCoverLetter}>
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
                        style={{backgroundColor: '#4267B3'}}>
                        <FontAwesomeIcon
                          icon={faFacebookF}
                          className={styles.detailIcon}
                        />
                      </div>
                      <h4 className={styles.detailHeading}>
                        {data?.job_post_website}
                      </h4>
                    </div>
                    <Link href={data?.job_post_link || ''}>
                      <div className={styles.detailView}>
                        View{' '}
                        <FontAwesomeIcon
                          icon={faArrowUpRightFromSquare}
                          className="ml-2"
                        />
                      </div>
                    </Link>
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
                      <h4 className={styles.detailHeading}>
                        {moment(data?.date).format('DD MMMM')}
                      </h4>
                    </div>
                  </div>
                  <div className={styles.detail}>
                    <div className="flex items-center">
                      <div
                        className={styles.detailIconContainer}
                        style={{backgroundColor: '#FCA84E'}}>
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className={styles.detailIcon}
                        />
                      </div>
                      <h4 className={styles.detailHeading}>{data?.location}</h4>
                    </div>
                  </div>
                  <div style={{position: 'relative'}}>
                    <div className={styles.detail}>
                      <div className="flex items-center">
                        <div
                          className={styles.detailIconContainer}
                          style={{backgroundColor: '#676D7D'}}>
                          <div className={styles.dashedCircle} />
                        </div>
                        <h4 className={styles.detailHeading}>
                          {trackingStatus}
                        </h4>
                      </div>
                      <div
                        className={styles.detailView}
                        onClick={() => setStatusChangePopup(true)}>
                        Change Status{' '}
                        <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
                      </div>
                    </div>

                    {statusChangePopup && (
                      <div className={styles.statusPopupOverlay}>
                        <div
                          ref={statusChangeRef}
                          className={styles.statusPopupContainer}>
                          <div className={styles.statusPopup}>
                            <h4 className={styles.statusPopupHeading}>
                              Change Status
                            </h4>
                            <div
                              className={styles.statusValue}
                              onClick={() =>
                                changeTrackingStatus('EMAIL LIST')
                              }>
                              Email List
                            </div>
                            <div
                              className={styles.statusValue}
                              onClick={() => changeTrackingStatus('APPLIED')}>
                              Applied
                            </div>
                            <div
                              className={styles.statusValue}
                              onClick={() => changeTrackingStatus('INTERVIEW')}>
                              Interview
                            </div>
                            <div
                              className={styles.statusValue}
                              onClick={() => changeTrackingStatus('OFFER')}>
                              Offer
                            </div>
                          </div>
                          <button
                            onClick={() => setStatusChangePopup(false)}
                            className={styles.statusPopupBtn}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {checkDetailsArea() && (
              <div className={styles.footer}>
                {!isSmallerThan768 && (
                  <button
                    className={styles.btn}
                    style={{color: '#676D7D'}}
                    onClick={() => setDeleteJobPopup(true)}>
                    <FontAwesomeIcon icon={faTrash} /> &nbsp; Delete
                  </button>
                )}

                <div className={styles.footerBtns}>
                  <button
                    className={`${styles.btn} ${styles.cancelBtn} mr-7`}
                    onClick={() => setOpen(false)}
                    style={{color: '#2B2E35', backgroundColor: '#CCF1E6'}}>
                    Cancel
                  </button>
                  <button
                    className={`${styles.btn} ${styles.saveBtn}`}
                    onClick={() => setOpen(false)}
                    style={{color: '#fff', backgroundColor: '#00B884'}}>
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      </Modal>
    </>
  );
};

export default TrackingDetailModal;
