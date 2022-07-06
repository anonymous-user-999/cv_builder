import React, {useState} from 'react';
import styles from './styles.module.css';
import AdminNavbar from '../../src/components/AdminDashboard/Navbar';
import {faAngleUp, faPlus, faCheck} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import BtnToggler from '../../src/components/AdminDashboard/BtnToggler';
import {sliderUnstyledClasses, useMediaQuery} from '@mui/material';

const AccountSettings = () => {
  const isSmallerThan768 = useMediaQuery('(max-width: 767px)');
  const [salaries, setSaleries] = useState([
    {
      range: '260 - 500 Jd',
      selected: true,
    },
    {
      range: '500 - 750 Jd',
      selected: false,
    },
    {
      range: '750 - 1000 Jd',
      selected: false,
    },
    {
      range: '1000 - 1250 Jd',
      selected: false,
    },
    {
      range: '1250 - 1500 Jd',
      selected: false,
    },
    {
      range: '1500 - 1750 Jd',
      selected: false,
    },
    {
      range: '1750 - 2000 Jd',
      selected: false,
    },
  ]);

  const [availableDays, setAvailableDays] = useState([
    {
      day: 'Sun',
      available: false,
    },
    {
      day: 'Mon',
      available: true,
    },
    {
      day: 'Tue',
      available: false,
    },

    {
      day: 'Wed',
      available: false,
    },
    {
      day: 'Thu',
      available: false,
    },
    {
      day: 'Fri',
      available: false,
    },
    {
      day: 'Sat',
      available: false,
    },
  ]);

  const [jobTypes, setJobTypes] = useState([
    {
      type: 'Full Time',
      selected: false,
    },

    {
      type: 'Part Time',
      selected: true,
    },
    {
      type: 'Contract',
      selected: false,
    },
  ]);
  /*Email Notifications*/
  const [offers, setOffers] = useState(true);
  const [resume, setResume] = useState(true);
  const [jobTips, setJobTips] = useState(true);
  const [accountSettingsOpen, setAccountSettingsOpen] = useState(false);
  const [passwordsOpen, setPasswordsOpen] = useState(false);
  const [jobInfoOpen, setJobInfoOpen] = useState(false);
  const [emailNotificationsOpen, setEmailNotificationsOpen] = useState(false);

  const updateJobType = (index) => {
    const tempJobs = [...jobTypes];
    let checkedIndex = jobTypes?.findIndex((job) => job?.selected);
    tempJobs[checkedIndex] = {...tempJobs?.[checkedIndex], selected: false};
    tempJobs[index] = {...tempJobs[index], selected: true};
    setJobTypes(tempJobs);
  };

  const updateSelectedSalary = (index) => {
    const tempSalaries = [...salaries];
    let checkedIndex = salaries.findIndex((sal) => sal.selected);
    tempSalaries[checkedIndex] = {
      ...tempSalaries?.[checkedIndex],
      selected: false,
    };
    tempSalaries[index] = {...tempSalaries?.[index], selected: true};
    setSaleries(tempSalaries);
  };

  const updateAvaibleDays = (index) => {
    const tempDays = [...availableDays];
    tempDays[index] = {
      ...tempDays[index],
      available: !tempDays[index]?.available,
    };
    setAvailableDays(tempDays);
  };

  return (
    <>
      <AdminNavbar />
      <div className={styles.main}>
        <h3 className={styles.heading}>Account Settings</h3>
        <div className={styles.planContainer}>
          <h3 className={styles.planHeading}>Your Plan</h3>
          <div className={styles.planSubContainer}>
            <div>
              <div className={styles.planSubHeading}>Free Account</div>
              <p className={styles.planPara}>
                You Are On The Free Plan. You Can Save Your Data And Job Post.
                Upgrade For PDF Downloads & Premium Features.
              </p>
            </div>
            <button className={styles.planBtn}>Upgrade</button>
          </div>
        </div>

        {/* Personal Info Form  */}
        <div className={styles.formContainer}>
          <div className="flex justify-between items-center ">
            <h3 className={styles.formHeading}>Account Settings</h3>
            <FontAwesomeIcon
              icon={faAngleUp}
              className={
                !accountSettingsOpen
                  ? styles.formAngleUP
                  : styles.formAngleUPOpen
              }
              onClick={() => setAccountSettingsOpen(!accountSettingsOpen)}
            />
          </div>
          {accountSettingsOpen && (
            <>
              <div className={styles.inputsContainer}>
                <div className={styles.inputContainer}>
                  <label className={styles.label} htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    className={styles.input}
                    id="firstName"
                    placeholder="Musab"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.label} htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className={styles.input}
                    id="lastName"
                    placeholder="Daoud"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.label} htmlFor="userEmail">
                    Email
                  </label>
                  <input
                    type="email"
                    className={styles.input}
                    id="userEmail"
                    placeholder="Musa3bdaoud@Gmail.Com"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.label} htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className={styles.input}
                    id="phoneNumber"
                    placeholder="+966 | 65654246465"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button className={styles.formBtn}>Save</button>
              </div>
            </>
          )}
        </div>
        {/* Passwords Form  */}
        <div className={styles.formContainer}>
          <div className="flex justify-between items-center">
            <h3 className={styles.formHeading}>Change Password</h3>
            <FontAwesomeIcon
              icon={faAngleUp}
              className={
                !passwordsOpen ? styles.formAngleUP : styles.formAngleUPOpen
              }
              onClick={() => setPasswordsOpen(!passwordsOpen)}
            />
          </div>
          {passwordsOpen && (
            <>
              <div className={styles.inputsContainer}>
                <div className={styles.inputContainer}>
                  <label className={styles.label} htmlFor="oldPassword">
                    Old Password
                  </label>
                  <input
                    type="password"
                    className={styles.input}
                    id="oldPassword"
                    placeholder="***********"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.label} htmlFor="newPassword">
                    New Password
                  </label>
                  <input
                    type="password"
                    className={styles.input}
                    id="newPassword"
                    placeholder="***********"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.label} htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className={styles.input}
                    id="confirmPassword"
                    placeholder="***********"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button className={styles.formBtn}>Change</button>
              </div>
            </>
          )}
        </div>
        {/* Job Search Info  */}
        <div className={styles.formContainer}>
          <div className="flex justify-between items-center">
            <h3 className={styles.formHeading}>Job Search Information</h3>
            <FontAwesomeIcon
              icon={faAngleUp}
              className={
                !jobInfoOpen ? styles.formAngleUP : styles.formAngleUPOpen
              }
              onClick={() => setJobInfoOpen(!jobInfoOpen)}
            />
          </div>
          {jobInfoOpen && (
            <div className={isSmallerThan768 ? 'mt-5' : 'mt-10'}>
              <h4 className={styles.jobSubHeading}>Job Type Looking For</h4>
              <div className={isSmallerThan768 ? 'mb-7' : 'flex mb-10 '}>
                {jobTypes?.map((job, index) => (
                  <div
                    className={styles.jobTypeContainer}
                    onClick={() => updateJobType(index)}>
                    <div
                      className={
                        job?.selected
                          ? `${styles.jobTypeCheck} ${styles.jobTypeCheckTicked}`
                          : styles.jobTypeCheck
                      }>
                      <FontAwesomeIcon
                        icon={job?.selected ? faCheck : faPlus}
                      />
                    </div>
                    <div className={styles.jobTypeText}>{job?.type}</div>
                  </div>
                ))}
              </div>

              <h4 className={styles.jobSubHeading}>Availability Days</h4>
              <div className={`${styles.availabilityDays} mb-10`}>
                {availableDays?.map((day, index) => (
                  <div
                    className={`${styles.jobTypeContainer} ${styles.availabilityDay}`}
                    onClick={() => updateAvaibleDays(index)}>
                    <div
                      className={
                        day?.available
                          ? `${styles.jobTypeCheck} ${styles.dayAvailable} ${styles.jobTypeCheckTicked}`
                          : `${styles.jobTypeCheck} ${styles.dayAvailable}`
                      }>
                      <FontAwesomeIcon
                        icon={day?.available ? faCheck : faPlus}
                      />
                    </div>
                    <div className={styles.jobTypeText}>{day?.day}</div>
                  </div>
                ))}
              </div>

              <div className={styles.jobSubHeading}>
                Salary{' '}
                <span className={styles.jobSubHeadingSpan}>
                  Per Hour 1.5 - 3.0 Per Month 260 - 500
                </span>{' '}
              </div>
              <div className={`${styles.salariesRangeContainer} mb-0`}>
                {salaries?.map((sal, index) => (
                  <div
                    className={`${styles.jobTypeContainer} ${styles.salaryRange} mb-4`}
                    onClick={() => updateSelectedSalary(index)}>
                    <div
                      className={
                        sal?.selected
                          ? `${styles.jobCircleCheck} ${styles.jobCircleCheckTicked}`
                          : `${styles.jobCircleCheck}`
                      }
                    />
                    <div className={styles.jobTypeText}>{sal?.range}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <button className={styles.formBtn}>Save</button>
              </div>
            </div>
          )}
        </div>
        {/* Email Notifications  */}
        <div className={styles.formContainer}>
          <div className="flex justify-between items-center">
            <h3 className={styles.formHeading}>Email Notifications</h3>
            <FontAwesomeIcon
              icon={faAngleUp}
              className={
                !emailNotificationsOpen
                  ? styles.formAngleUP
                  : styles.formAngleUPOpen
              }
              onClick={() => setEmailNotificationsOpen(!emailNotificationsOpen)}
            />
          </div>
          {emailNotificationsOpen && (
            <div className="mt-10">
              <div className={styles.notification}>
                <div>
                  <h3 className={styles.notificationHeading}>
                    Updates And Offers
                  </h3>
                  <div className={styles.notificationDetails}>
                    Discounts, Special Offers, New Features And More
                  </div>
                </div>
                <BtnToggler checked={offers} onChange={setOffers} />
              </div>
              <div className={styles.notification}>
                <div>
                  <h3 className={styles.notificationHeading}>
                    Resume Analytics
                  </h3>
                  <div className={styles.notificationDetails}>
                    Views, Downloads And Monthly Statistics For Each Resume
                  </div>
                </div>
                <BtnToggler checked={resume} onChange={setResume} />
              </div>
              <div className={styles.notification}>
                <div>
                  <h3 className={styles.notificationHeading}>
                    Resume And Job Tips Newsletter
                  </h3>
                  <div className={styles.notificationDetails}>
                    Useful Resume And Job Tips! Straight To Your Inbox Every 2
                    Weeks
                  </div>
                </div>
                <BtnToggler checked={jobTips} onChange={setJobTips} />
              </div>
            </div>
          )}
        </div>
        {/* Accounts Connect  */}
        <div className={styles.formContainer}>
          <div className="flex justify-between items-center mb-10">
            <h3 className={styles.formHeading}>Social Profile</h3>
          </div>
          <div className={styles.socilaAccount}>
            <div className={styles.socialAccountNameContainer}>
              <FontAwesomeIcon
                icon={faLinkedinIn}
                style={{color: '#2867B2'}}
                className={styles.socialAccountIcon}
              />
              <h4 className={styles.socialAccountName}>Linkedin</h4>
            </div>
            <div className={styles.socilaAccountStatus}>Connect</div>
          </div>
          <div className={styles.socilaAccount}>
            <div className={styles.socialAccountNameContainer}>
              <FontAwesomeIcon
                icon={faTwitter}
                style={{color: '#1DA1F2'}}
                className={styles.socialAccountIcon}
              />
              <h4 className={styles.socialAccountName}>Twitter</h4>
            </div>
            <div className={styles.socilaAccountStatus}>Connect</div>
          </div>
          <div className={styles.socilaAccount}>
            <div className={styles.socialAccountNameContainer}>
              <FontAwesomeIcon
                icon={faFacebookF}
                style={{color: '#4267B3'}}
                className={styles.socialAccountIcon}
              />
              <h4 className={styles.socialAccountName}>Facebook</h4>
            </div>
            <div className={styles.socilaAccountStatus}>Connect</div>
          </div>
          <div className={styles.socilaAccount}>
            <div className={styles.socialAccountNameContainer}>
              <img
                src="/images/googleIcon.svg"
                alt="google"
                className={styles.socilaAccountImg}
              />
              <h4 className={styles.socialAccountName}>
                Google . Musa3bdaoud@Gmail.Com
              </h4>
            </div>
            <div className={styles.socilaAccountStatus}>Disconnect</div>
          </div>
        </div>
        {/* Danger Zone  */}
        <div className={styles.formContainer}>
          <div className="flex justify-between items-center mb-10">
            <h3 className={styles.formHeading}>Danger Zone</h3>
          </div>
          <div className={styles.danger}>
            <div className={styles.dangerText}>
              Once You Delete Your Account, It Cannot Be Undone. This Is
              Permanent.
            </div>
            <button className={styles.dangerBtn}>Delete Account</button>
          </div>
        </div>
        <div className={styles.bottomText}>
          Need Help? Have Questions Or Feedback? Our Team Would
        </div>
        <div className={`${styles.bottomText} mb-24`}>
          Love To Hear From You —
          <span style={{}} className={styles.bottomLink}>
            Contact Our Support
          </span>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
