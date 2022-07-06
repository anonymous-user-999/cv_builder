import React, {useContext, useEffect, useState} from 'react';
import AdminNavbar from '../../src/components/AdminDashboard/Navbar';
import styles from './styles.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faMagnifyingGlass,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import {useMediaQuery} from '@mui/material';
import DocumentsSearchModal from '../../src/components/AdminDashboard/DocumentsSearchModal';
import API from '../../src/services';
import {useLocalStorage} from '../../src/hooks';
import DashboardContext from '../../src/contexts/DashboardContext';
import UserContext from '../../src/contexts/UserContext';
import DatabaseContext from '../../src/contexts/DatabaseContext';
import LoadingScreen from '../../src/components/router/LoadingScreen';

const DocumentsArr = [
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

const Documents = () => {
  const isSmallerThan768 = useMediaQuery('(max-width: 767px)');
  const [login, setLogin] = useState(true);
  const [searchModal, setSearchModal] = useState(false);

  const {user} = useContext(UserContext);
  const {getResumes, resumes, loading} = useContext(DatabaseContext);

  useEffect(() => {
    !user && router.replace('/');
    (async () => {
      user && getResumes();
    })();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <DocumentsSearchModal open={searchModal} setOpen={setSearchModal} />
      <div>
        <AdminNavbar />
        <div className={styles.mainContainer}>
          <div
            className={`flex items-center justify-between ${styles.documetnsHeader}`}>
            <h3 className={styles.documentsHeading}>Documents</h3>
            {!isSmallerThan768 && (
              <div className="flex">
                {login && (
                  <div className={styles.inputContainer}>
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className={styles.searchIcon}
                    />
                    <input
                      type="text"
                      placeholder="Search Here"
                      className={styles.searchInput}
                    />
                  </div>
                )}
                <Link href="/app/dashboard">
                  <button className={styles.documentsButton}>
                    + Create Now
                  </button>
                </Link>
              </div>
            )}
          </div>
          {isSmallerThan768 && (
            <>
              {login && (
                <div
                  className={styles.inputContainer}
                  onClick={() => setSearchModal(true)}>
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className={styles.searchIcon}
                  />
                  <input
                    type="text"
                    placeholder="Search Here"
                    className={styles.searchInput}
                  />
                </div>
              )}
              <Link href="/app/dashboard">
                <button className={styles.documentsButton}>+ Create Now</button>
              </Link>
            </>
          )}

          {/* Documents without Login  */}
          {!login && (
            <div className={styles.allDocuments}>
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
          {login && (
            <div className={styles.allDocuments}>
              {resumes?.map((doc, index) => (
                <div className={styles.documentWrpper}>
                  <Link href={`/resume-profile/${doc?.id}`}>
                    <div
                      className={styles.documentBox}
                      style={{
                        backgroundColor: `${
                          DocumentsArr[index % DocumentsArr?.length]?.color
                        }`,
                      }}>
                      <div className={styles.dotsContainer}>
                        <FontAwesomeIcon
                          icon={faEllipsis}
                          className={styles.dots}
                        />
                      </div>
                      <div className={styles.documentsImgsContainer}>
                        <img
                          src={`/images/${
                            DocumentsArr[index % DocumentsArr?.length]?.cvImg
                          }.svg`}
                          className={styles.documentImg}
                          alt="cv"
                        />
                        <img
                          src={`/images/${
                            DocumentsArr[index % DocumentsArr?.length]
                              ?.cvBackImg
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
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Documents;
