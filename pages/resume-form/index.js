import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faXmark,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import NavbarLanguagesDropdown from '../../src/components/AdminDashboard/NavbarLanguagesDropdown';
import useClickOutside from '../../src/utils/useClickOutside';
import ResumeHeader from '../../src/components/AdminDashboard/ResumeHeader';
import ResumeProgressLine from '../../src/components/AdminDashboard/ResumeProgressLine';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PersonalDetailsForm from '../../src/components/ResumeForms/PersonalDetailsForm';
import Template from '../../src/components/Template';
import EducationForm from '../../src/components/ResumeForms/EducationForm';
import ExperienceForm from '../../src/components/ResumeForms/ExperienceForm';
import InternshipForm from '../../src/components/ResumeForms/InternshipForm';
import Link from 'next/link';
import VolunteeringForm from '../../src/components/ResumeForms/VolunteeringForm';
import CertificatesForm from '../../src/components/ResumeForms/CertificatesForm';
import SummaryForm from '../../src/components/ResumeForms/SummaryForm';
import ReferencesForm from '../../src/components/ResumeForms/RefrencesForm';
import AchievmentsForm from '../../src/components/ResumeForms/AchievmentsForm';

const carouselItems = [
  {
    title: 'Personal Details',
    value: 'personalDetails',
  },
  {
    title: 'Education',
    value: 'education',
  },
  {
    title: 'Experience',
    value: 'experience',
  },
  {
    title: 'Internship',
    value: 'internship',
  },
  {
    title: 'Volunteering',
    value: 'volunteering',
  },
  {
    title: 'Certificates',
    value: 'certificates',
  },
  {
    title: 'Skills',
    value: 'skills',
  },
  {
    title: 'Summary',
    value: 'summary',
  },
  {
    title: 'References',
    value: 'references',
  },
  {
    title: 'Hobbies',
    value: 'hobbies',
  },
  {
    title: 'Achievements And Awards',
    value: 'achievements',
  },
];

const ResumeForm = () => {
  const responsive = {
    tv: {
      breakpoint: {max: 3000, min: 1750},
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    desktop: {
      breakpoint: {max: 1750, min: 1374},
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    laptop: {
      breakpoint: {max: 1374, min: 1024},
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: {max: 1023, min: 560},
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobileWideScreen: {
      breakpoint: {max: 560, min: 375},
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobileScreen: {
      breakpoint: {max: 375, min: 0},
      items: 2.5,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [internship, setInternship] = useState([]);
  const [volunteering, setVolunteering] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [references, setReferences] = useState([]);
  const [achievements, setAchievments] = useState([]);

  const ButtonGroup = ({next, previous, goToSlide, ...rest}) => {
    const {
      carouselState: {currentSlide},
    } = rest;
    return (
      <div className={styles.carouselButtonGroup}>
        <button
          style={
            currentSlide !== 0
              ? {backgroundColor: '#00B884', color: '#fff'}
              : {}
          }
          className={`${styles.carouselBtn} ${styles.carouselBtnLeft}`}
          onClick={() => previous()}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={styles.carouselBtnIcon}
          />
        </button>
        <button
          onClick={() => next()}
          style={
            currentSlide < 3 ? {backgroundColor: '#00B884', color: '#fff'} : {}
          }
          className={`${styles.carouselBtn} ${styles.carouselBtnRigth}`}>
          <FontAwesomeIcon
            icon={faChevronRight}
            className={styles.carouselBtnIcon}
          />
        </button>
      </div>
    );
  };

  const onCarouselItemChange = (previousSlide, _ref) => {
    // setCarouselIndex(_ref.currentSlide);
  };
  return (
    <div className={styles.main}>
      <div className={styles.formContainer}>
        <ResumeHeader />
        <ResumeProgressLine percentage={17} />
        <div className={styles.carouselContainer}>
          <Carousel
            autoPlay={false}
            autoPlaySpeed={1}
            afterChange={onCarouselItemChange}
            arrows={false}
            draggable
            minimumTouchDrag={80}
            responsive={responsive}
            itemClass={styles.itemContainer}
            containerClass={styles.carouselListContainer}
            dotListClass="custom-dot-list-style"
            customButtonGroup={<ButtonGroup />}
            shouldResetAutoplay={false}
            slidesToSlide={1}
            swipeable>
            {carouselItems?.map((item, i) => (
              <div
                className={
                  carouselIndex === i
                    ? ` ${styles.carouselItem}  ${styles.carouselItemActive}`
                    : styles.carouselItem
                }
                onClick={() => setCarouselIndex(i)}>
                {item?.title}
              </div>
            ))}
          </Carousel>
        </div>
        {carouselIndex === 0 && <PersonalDetailsForm />}
        {carouselIndex === 1 && (
          <EducationForm education={education} setEducation={setEducation} />
        )}
        {carouselIndex === 2 && (
          <ExperienceForm
            experience={experience}
            setExperience={setExperience}
          />
        )}
        {carouselIndex === 3 && (
          <InternshipForm
            internship={internship}
            setInternship={setInternship}
          />
        )}
        {carouselIndex === 4 && (
          <VolunteeringForm
            volunteering={volunteering}
            setVolunteering={setVolunteering}
          />
        )}

        {carouselIndex === 5 && (
          <CertificatesForm
            certificates={certificates}
            setCertificates={setCertificates}
          />
        )}
        {carouselIndex === 7 && (
          <SummaryForm education={education} setEducation={setEducation} />
        )}
        {carouselIndex === 8 && (
          <ReferencesForm references={references} setReferences={setReferences} />
        )}
        {carouselIndex === 10 && (
          <AchievmentsForm
            achievements={achievements}
            setAchievments={setAchievments}
          />
        )}
      </div>
      <div className={styles.templateContainer}>
        <Link href="/resume-profile">
          <div className={styles.templateCross}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </Link>
        <Link href="/template-view">
          <div className={styles.templateWrapper} style={{pointer: 'cursor'}}>
            <Template />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ResumeForm;
