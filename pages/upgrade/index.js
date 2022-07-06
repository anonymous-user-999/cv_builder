import Link from 'next/link';
import React, {useRef, useState} from 'react';
import styles from './styles.module.css';
import {
  faCrown,
  faChevronRight,
  faChevronLeft,
  faCheck,
  faCreditCard,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import {faCcPaypal} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Carousel from 'react-multi-carousel';
import PaymentSuccessModal from '../../src/components/AdminDashboard/PaymentSuccessModal';
import PaymentFailModal from '../../src/components/AdminDashboard/PaymentFailModal';
import {useMediaQuery} from '@mui/material';
const carouselItems = [
  {
    image: 'CarouselImage.png',
    title: 'Job Tracking1',
  },
  {
    image: 'CarouselImage.png',
    title: 'Job Tracking2',
  },
  {
    image: 'CarouselImage.png',
    title: 'Job Tracking3',
  },
  {
    image: 'CarouselImage.png',
    title: 'Job Tracking4',
  },
  {
    image: 'CarouselImage.png',
    title: 'Job Tracking5',
  },
];
const Features1 = [
  'Create/ transform unlimited resumes.',
  "Create unlimited cover latter's.",
  'This resume will be saved on his profile.',
  'Share, Edit & Download the resume.',
  'Use job tracking.',
  'Email tracking on the dashboard.',
];
const Features2 = [
  'Track applied jobs.',
  'Generate a tailored resume.',
  'Download the extension.',
  'Email cover latter.',
  'Add job posts to favorite.',
  'Matching rate with the job post.',
];

const Upgrade = () => {
  const isSmallerThan768 = useMediaQuery('(max-width: 767px)');
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 1,
    },
    mobile: {
      breakpoint: {
        max: 1024,
        min: 200,
      },
      items: 1,
    },
  };

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [paymentSuccessPopup, setPaymentSuccessPopup] = useState(false);
  const [paymentFailPopup, setPaymentFailPopup] = useState(false);

  const ButtonGroup = ({next, previous, goToSlide, ...rest}) => {
    const {
      carouselState: {currentSlide},
    } = rest;
    return (
      <div className={styles.carouselButtonGroup}>
        <button
          className={
            currentSlide === 0
              ? `${styles.carouselBtn} ${styles.carouselBtnDisabled}`
              : styles.carouselBtn
          }
          onClick={() => previous()}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={styles.carouselBtnIcon}
          />
        </button>
        <button
          onClick={() => next()}
          className={
            currentSlide === carouselItems?.length - 1
              ? `${styles.carouselBtn} ${styles.carouselBtnDisabled}`
              : styles.carouselBtn
          }>
          <FontAwesomeIcon
            icon={faChevronRight}
            className={styles.carouselBtnIcon}
          />
        </button>
      </div>
    );
  };

  const CustomDot = ({onClick, ...rest}) => {
    const {
      onMove,
      index,
      active,
      carouselState: {currentSlide, deviceType},
    } = rest;
    return (
      <div
        className={
          !active
            ? styles.carouselDots
            : `${styles.carouselDots} ${styles.carouselDotActive} `
        }
        onClick={() => onClick()}></div>
    );
  };
  const onCarouselItemChange = (previousSlide, _ref) => {
    setCarouselIndex(_ref.currentSlide);
  };

  return (
    <>
      <PaymentSuccessModal
        open={paymentSuccessPopup}
        setOpen={setPaymentSuccessPopup}
        onButtonClick={() => {
          setPaymentSuccessPopup(false);
          setPaymentFailPopup(true);
        }}
      />
      <PaymentFailModal
        open={paymentFailPopup}
        setOpen={setPaymentFailPopup}
        onButtonClick={() => setPaymentFailPopup(false)}
      />
      <div className={styles.upgrade}>
        <div className="flex justify-end">
          <Link href="/dashboard">
            <div className={styles.crossContainer}>
              <img
                className={styles.crossIcon}
                src="/images/crossIcon.png"
                alt="cross"
              />
            </div>
          </Link>
        </div>
        <div className={styles.main}>
          <div className={styles.crownContainer}>
            <FontAwesomeIcon icon={faCrown} className={styles.crownIcon} />
          </div>
          <h1 className={styles.heading}>
            Invest in your Growing career, Get your personal AI recruiter Now.
          </h1>
          <div className={styles.carouselContainer}>
            <Carousel
              autoPlay={false}
              autoPlaySpeed={1}
              afterChange={onCarouselItemChange}
              arrows={false}
              responsive={responsive}
              keyBoardControl={false}
              containerClass="carousel-container"
              dotListClass="custom-dot-list-style"
              customButtonGroup={<ButtonGroup />}
              showDots
              shouldResetAutoplay={false}
              customDot={<CustomDot />}
              itemClass="carousel-item-padding-40-px">
              {carouselItems?.map((item) => (
                <img
                  src={`/images/${item?.image}`}
                  className={styles.crsImg}
                  alt="crslImg"
                />
              ))}
            </Carousel>
            <div className={styles.carouselTitle}>
              {carouselItems?.[carouselIndex]?.title}
            </div>
          </div>
          <div className={styles.featuresWrapper}>
            <div className={styles.featuresContainer}>
              {Features1?.map((feature) => (
                <div className={styles.feature}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={styles.featureCheck}
                  />
                  <div className={styles.featureText}>{feature}</div>
                </div>
              ))}
            </div>
            <div className={styles.featuresContainer}>
              {Features2?.map((feature) => (
                <div className={styles.feature}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={styles.featureCheck}
                  />
                  <div className={styles.featureText}>{feature}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.premium}>
            <div className="">
              <h3 className={styles.premiumHeading}>
                Join Our Premium Members Club Now,
              </h3>
              <p className={styles.premiumDetails}>
                Early Birds Offer Valid For A Limited Number Of Users.
              </p>
            </div>
            <div>
              <span className={styles.premiumPriceCut}>$300</span>
              <span className={styles.premiumPrice}>$25 </span>
              <span className={styles.premiumPriceDuration}> / Yearly</span>
            </div>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardHeading}>Payment Method</h3>
            <div className="flex justify-between">
              <div
                className={`${styles.cardButton} ${styles.cardButtonActive}`}>
                <FontAwesomeIcon
                  icon={faCreditCard}
                  className={styles.cardButtonIcon}
                />
                Cards
              </div>
              <div className={`${styles.cardButton}`}>
                <FontAwesomeIcon
                  icon={faCcPaypal}
                  className={styles.cardButtonIcon}
                />
                Paypal
              </div>
            </div>
            <h3 className={styles.cardSubHeading}>Enter Payment Details</h3>
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor="cardNumber">
                Card Number
              </label>
              <input
                type="number"
                placeholder="**** **** **** ****"
                className={styles.input}
                id="cardNumber"
              />
              <FontAwesomeIcon icon={faLock} className={styles.inputLock} />
            </div>
            <div className="flex justify-between">
              <div className={`${styles.inputContainer} ${styles.halfInput}`}>
                <label className={styles.label} htmlFor="expiryDate">
                  Expiry Date
                </label>
                <input
                  type="date"
                  id="expiryDate"
                  placeholder="07 02"
                  className={styles.input}
                />
              </div>
              <div className={`${styles.inputContainer} ${styles.halfInput}`}>
                <label className={styles.label} htmlFor="ccv">
                  CVV Code
                </label>
                <input
                  type="number"
                  id="ccv"
                  placeholder="071"
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.cardBottom}>
              <div
                className={
                  isSmallerThan768
                    ? `${styles.inputContainer}`
                    : `${styles.inputContainer} ${styles.halfInput}`
                }>
                <label className={styles.label} htmlFor="name">
                  Name On Card
                </label>
                <input
                  type="text"
                  placeholder="MUSAB DAOUD"
                  className={styles.input}
                  id="name"
                />
              </div>
              <button
                onClick={() => setPaymentSuccessPopup(true)}
                className={styles.cardPayButton}>
                <div className="flex items-start justify-center">
                  Pay 
                  25 $ 
                </div>
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <h3 className={styles.cardsHeading}>We Accept:</h3>
            <img
              src="/images/visaLogo.svg"
              alt="visa"
              className={styles.cardLogo}
            />
            <img
              src="/images/masterLogo.svg"
              alt="master"
              className={styles.cardLogo}
              style={isSmallerThan768 ? {height: '1.5rem'} : {height: '3rem'}}
            />
            <img
              src="/images/paypalLogo.svg"
              alt="paypal"
              className={styles.cardLogo}
            />
          </div>
          <div className={styles.cardsPara}>
            By placing an order you waive your right of withdrawal and agree to
            the immediate delivery of the services and related digital products.
          </div>
        </div>
      </div>
    </>
  );
};

export default Upgrade;
