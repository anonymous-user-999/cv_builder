import React from 'react';
import styles from './styles.module.css';
import AdminNavbar from '../../src/components/AdminDashboard/Navbar';
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faTiktok,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Support = () => {
  return (
    <>
      <AdminNavbar />
      <div className={styles.mainContainer}>
        <div className={styles.documetnsHeader}>
          <h3 className={styles.documentsHeading}>Support</h3>
        </div>
        <div className={styles.main}>
          <form className={styles.form}>
            <div className={styles.inputContainer}>
              <label htmlFor="subject" className={styles.label}>
                Subject
              </label>
              <input
                type="text"
                id="subject"
                placeholder="Type Here"
                className={styles.input}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
              <textarea
                id="message"
                placeholder="Type Here"
                className={styles.input}
                rows="15"
                style={{minHeight: '23.5rem'}}
              />
            </div>
            <button className={styles.button}>Send</button>
          </form>
          <div className={styles.contentContainer}>
            <img
              src="/images/supportImg.svg"
              alt="support"
              className={styles.img}
            />
            <h3 className={styles.subHeading}>Favorite Post</h3>
            <p className={styles.para}>
              Save time and effort with the easiest-to-use resume maker.{'\n'}{' '}
              Impress hiring managers with a modern and effective resume and get
              the job your want.
            </p>
            <div className="flex justify-center">
              <div className={styles.brandContainer}>
                <FontAwesomeIcon icon={faFacebookF} />
              </div>
              <div
                className={styles.brandContainer}
                style={{backgroundColor: '#1DA1F2'}}>
                <FontAwesomeIcon icon={faTwitter} />
              </div>
              <div
                className={styles.brandContainer}
                style={{backgroundColor: '#0A66C2'}}>
                <FontAwesomeIcon icon={faLinkedinIn} />
              </div>
              <div
                className={styles.brandContainer}
                style={{backgroundColor: '#010101'}}>
                <FontAwesomeIcon icon={faTiktok} />
              </div>
              <div
                className={styles.brandContainer}
                style={{backgroundColor: '#C32AA3'}}>
                <FontAwesomeIcon icon={faInstagram} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;
