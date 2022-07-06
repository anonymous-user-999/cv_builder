import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.css';
import Modal from '@mui/material/Modal';
import {
  faXmark,
  faArrowUpRightFromSquare,
  faCalendarDay,
  faLocationDot,
  faChartPie,
  faTrash,
  faShareNodes,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import {faCopy} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebookF} from '@fortawesome/free-brands-svg-icons';
import DeleteJobModal from '../DeleteJobModal';
import useClickOutside from '../../../utils/useClickOutside';
import ViewersRequestModal from '../ViewersRequestModal';
import Link from 'next/link';
import { useMediaQuery } from '@mui/material';

const JobApplicationsDetailedModal = ({open, setOpen}) => {
  const isSmallerThan768 = useMediaQuery('(max-width: 767px)');
  const deleteJobRef = useRef(null);
  const statusChangeRef = useRef(null);

  const [deleteJobPopup, setDeleteJobPopup] = useState(false);
  const [statusChangePopup, setStatusChangePopup] = useState(false);
  const [viewersDetailPopup, setViewersDetailPopup] = useState(false);
  const [selectedArea, setSelectedArea] = useState(0);

  useClickOutside(deleteJobRef, () => {
    setDeleteJobPopup(false);
  });
  useClickOutside(statusChangeRef, () => {
    setStatusChangePopup(false);
  });

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

  return (
    <>
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
            style={deleteJobPopup ? {overflow: 'hidden'} : {}}>
            {deleteJobPopup && <div className={styles.overlay} />}
            <DeleteJobModal
              open={deleteJobPopup}
              ref={deleteJobRef}
              setOpen={setDeleteJobPopup}
            />
            <ViewersRequestModal
              open={viewersDetailPopup}
              setOpen={setViewersDetailPopup}
            />
            <div className={styles.header}>
              <div className="flex items-center">
                {!isSmallerThan768 ? (
                  <>
                    <h3 className={styles.heading}>Ui/Ux Designer</h3>
                    <div className={`${styles.star}`} />
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
                <h3 className={styles.heading}>Ui/Ux Designer</h3>
                <div className={`${styles.star}`} />
              </div>
            )}
            <h3 className={styles.email}>Employer-Email@Email.Com</h3>
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
                  <div className={styles.plainText}>
                    Gather and evaluate user requirements in collaboration with
                    product managers and engineers
                  </div>
                  <div className={styles.plainText}>
                    Illustrate design ideas using storyboards, process flows and
                    sitemaps
                  </div>
                  <div className={styles.plainText}>
                    Design graphic user interface elements, like menus, tabs and
                    widgets
                  </div>
                  <div className={styles.plainText}>
                    Build page navigation buttons and search fields
                  </div>
                  <div className={styles.plainText}>
                    {' '}
                    Develop UI mockups and prototypes that clearly illustrate
                    how sites function and look like
                  </div>
                  <div className={styles.plainText}>
                    Create original graphic designs (e.g. images, sketches and
                    tables){' '}
                  </div>
                  <div className={styles.plainText}>
                    Prepare and present rough drafts to internal teams and key
                    stakeholders{' '}
                  </div>
                  <div className={styles.plainText}>
                    Identify and troubleshoot UX problems (e.g. responsiveness){' '}
                  </div>
                  <div className={styles.plainText}>
                    Conduct layout adjustments based on user feedback
                  </div>
                  <div className={styles.plainText}>
                    Adhere to style standards on fonts, colors and images
                  </div>
                  <h4 className={`${styles.subHeading} mt-6`}>Requirements</h4>
                  <div className={styles.plainText}>
                    Proven work experience as a UI/UX Designer or similar role
                  </div>
                  <div className={styles.plainText}>
                    Portfolio of design projects
                  </div>
                  <div className={styles.plainText}>
                    Knowledge of wireframe tools (e.g. Wireframe.cc and
                    InVision)
                  </div>
                  <div className={styles.plainText}>
                    Up-to-date knowledge of design software like Adobe
                    Illustrator and Photoshop
                  </div>
                  <div className={styles.plainText}>
                    Team spirit; strong communication skills to collaborate with
                    various stakeholders
                  </div>
                  <div className={styles.plainText}>
                    Good time-management skills
                  </div>
                  <div className={styles.plainText}>
                    {' '}
                    BSc in Design, Computer Science or relevant field
                  </div>
                </div>
              )}
              {checkDetailsArea() && (
                <div className={styles.detailsContainer}>
                  {!isSmallerThan768 && (
                    <h3 className={styles.detailMainHeading}>Details</h3>
                  )}
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
                      <h4 className={styles.detailHeading}>Job Post Link</h4>
                    </div>
                    <div className={styles.detailView}>
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
                      <h4 className={styles.detailHeading}>80% Matching</h4>
                    </div>
                  </div>
                  <div className={styles.detail}>
                    <div className="flex items-center">
                      <div
                        className={styles.detailIconContainer}
                        style={{backgroundColor: '#3E67F3'}}>
                        <FontAwesomeIcon
                          icon={faShareNodes}
                          className={styles.detailIcon}
                        />
                      </div>
                      <h4 className={styles.detailHeading}>Share Job Post</h4>
                    </div>
                    <div className={styles.detailView}>
                      Copy Link{' '}
                      <FontAwesomeIcon icon={faCopy} className="ml-2" />
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
                        style={{backgroundColor: '#FCA84E'}}>
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className={styles.detailIcon}
                        />
                      </div>
                      <h4 className={styles.detailHeading}>Amman, Jordan</h4>
                    </div>
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
                  <Link href="/tailored-view">
                    <button
                      className={`${styles.btn} ${styles.tailoredBtn} mr-7 px-7`}
                      onClick={() => setOpen(false)}
                      style={{width: 'auto'}}>
                      View Tailored Documents
                    </button>
                  </Link>
                  <button
                    className={`${styles.btn} ${styles.applyBtn}`}
                    onClick={() => setOpen(false)}>
                    Apply
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

export default JobApplicationsDetailedModal;
