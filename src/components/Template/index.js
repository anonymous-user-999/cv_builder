import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './styles.module.css';
import {
  faLinkedin,
  faFacebookF,
  faChrome,
} from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faMobileScreen,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

const Skills = [
  'SEO',
  'Public Speaking',
  'Negotiation',
  'Teamwork',
  'Decision Making',
  'Research & Strategy',
  'Emotional Intelligence',
  'Outbound Marketing',
  'Email Marketing',
  'Google Analytics',
  'Sales & Marketing',
];
const Connections = [
  {
    icon: faEnvelope,
    text: 'muhammadali@gmail.com',
  },
  {
    icon: faMobileScreen,
    text: '+92 336 420 5030',
  },
  {
    icon: faLocationDot,
    text: 'Amman, Jordan',
  },
  {
    icon: faLinkedin,
    text: 'Muhammad Ali',
  },
];

const Experience = [
  {
    jobTitle: 'Bussiness Development Manager',
    company: 'Airstate Solutions',
    duration: '01/2014 - 03/2017',
    details: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    ],
  },
  {
    jobTitle: 'Bussiness Development Manager',
    company: 'Airstate Solutions',
    duration: '01/2014 - 03/2017',
    details: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    ],
  },
  {
    jobTitle: 'Bussiness Development Manager',
    company: 'Airstate Solutions',
    duration: '01/2014 - 03/2017',
    details: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    ],
  },
];

const Template = () => {
  return (
    <div className={styles.template}>
      <div className={styles.header}>
        <div className="flex justify-start items-center">
          <img
            src="/images/dummyProfile.svg"
            className={styles.profile}
            alt="profile"
          />
        </div>
        <div className={styles.headerContent}>
          <div className={styles.name}>Mohammad Ali</div>
          <div className={styles.post}>Business Development Manager</div>
          <div className={styles.about}>
            Professional Business Developer with more than four years of
            experience in the Business Development Processes. Including in
            product testing, management and development of new bussiness
            opportunities.{' '}
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.sideContent}>
          <div className={styles.connections}>
            {Connections?.map((connection) => (
              <div className={styles.connection}>
                <div className={styles.connectionIcon}>
                  <FontAwesomeIcon icon={connection?.icon} />
                </div>
                <div className={styles.connectionText}>{connection?.text}</div>
              </div>
            ))}
          </div>
          <div className={styles.skillsContainer}>
            <div className={styles.skillHeading}>Skills</div>
            <div className={styles.skillsWrapper}>
              {Skills?.map((skill) => (
                <div className={styles.skill}>{skill}</div>
              ))}
            </div>
          </div>
          <div className={styles.skillsContainer}>
            <div className={styles.skillHeading}>Languages</div>
            <div className={styles.skillsWrapper}>
              <div className={styles.skill}>Arabic</div>
              <div className={styles.skill}>English</div>
              <div className={styles.skill}>French</div>
            </div>
          </div>
        </div>
        <div className={styles.mainContent}>
          <div className={styles.workingContainer}>
            <div className={styles.skillHeading}>Work Experience</div>
            {Experience?.map((exp) => (
              <>
                <div className={styles.jobTitle}>{exp?.jobTitle}</div>
                <div className="flex items-center justify-between">
                  <div className={styles.companyName}>{exp?.company}</div>
                  <div className={styles.duration}>{exp?.duration}</div>
                </div>
                <div className={styles.list}>
                  {exp?.details?.map((detail) => (
                    <div className={styles.listItem}>
                      <div className={styles.listDot} />
                      <div className={styles.listContent}>{detail}</div>
                    </div>
                  ))}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
