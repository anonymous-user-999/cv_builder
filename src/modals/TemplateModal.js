import {useTranslation} from 'react-i18next';
import React, {memo, useContext, useEffect, useRef, useState} from 'react';
import BaseModal from './BaseModal';
import Button from '../components/shared/Button';
import ModalContext from '../contexts/ModalContext';
import {useRouter} from 'next/router';
import * as styles from './TemplateModal.module.css';
import {IoCloseOutline} from 'react-icons/io5';
import cx from 'classnames';
import {Swiper, SwiperSlide} from 'swiper/react';
import {BsChevronLeft, BsChevronRight} from 'react-icons/bs';
import templateOptions from '../data/templateOptions';
import {useDispatch, useSelector} from '../contexts/ResumeContext';

const Template = ({template, i, selected, onSelect}) => {
  const {t} = useTranslation();
  return (
    <div>
      <div
        className={cx(styles.imagecontainer, {
          [styles.selected]: selected,
        })}>
        <div className={styles.image}>
          <img src="/images/templateex.png" />
          <div className={styles.use}>
            <Button
              className={styles.usebtn}
              onClick={() => {
                onSelect(template.id);
              }}>
              {t('modals.template.use')}
            </Button>
          </div>
        </div>
      </div>
      <h1 className={styles.resumename}>{template.name}</h1>
      <h1 className={styles.resumeusage}>
        {'530000'}&nbsp;{t('modals.template.usage')}
      </h1>
    </div>
  );
};

const TemplateModal = () => {
  const dispatch = useDispatch();
  const selected = useSelector('metadata.template', '');
  const {t} = useTranslation();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const {emitter, events} = useContext(ModalContext);
  const [templates, setTemplates] = useState(templateOptions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const unbind = emitter.on(events.TEMPLATE_MODAL, (payload) => {
      if (payload) {
        setResume(payload);
      }
      setOpen(true);
    });
    return () => unbind();
  }, [emitter, events]);

  useEffect(() => {
    const index = templates.findIndex((x) => x.id == selected);
    if (index != -1) {
      setCurrentIndex(index);
      slideTo(index);
    } else {
      setCurrentIndex(0);
      slideTo(0);
    }
  }, [selected, open]);

  const handleCloseModal = () => {
    setOpen(false);
    setSwiper(null);
  };

  const slideTo = (index) => {
    if (swiper && !swiper.destroyed) swiper.slideTo(index);
  };

  const handleSelect = (value) => {
    if (resume) {
    } else {
      dispatch({
        type: 'on_input',
        payload: {
          path: 'metadata.template',
          value,
        },
      });
    }
    setOpen(false);
  };

  return (
    <BaseModal
      modalClassName={styles.loginmodal}
      state={[open, setOpen]}
      hideActions>
      <div className={'items-center flex flex-col	relative'}>
        <div className={styles.closebtn} onClick={handleCloseModal}>
          <IoCloseOutline size={'30px'} color={'black'} />
        </div>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('modals.template.best')}</h1>
          <p className={styles.noworry}>{t('modals.template.noworry')}</p>
        </div>
        <div className={'relative'}>
          {currentIndex > 0 && (
            <div className={styles.chevroncontainer}>
              <Button
                icon={BsChevronLeft}
                iconSize={'20px'}
                className={styles.chevron}
                onClick={() => {
                  if (currentIndex > 0) {
                    slideTo(currentIndex - 1);
                  }
                }}
              />
            </div>
          )}
          <Swiper
            initialSlide={currentIndex}
            onSwiper={setSwiper}
            centeredSlides
            onActiveIndexChange={(e) => {
              setCurrentIndex(e.activeIndex);
            }}
            style={{
              width: '100vw',
            }}
            slidesPerView="auto"
            cubeEffect={{
              shadow: true,
            }}
            effect="cube"
            keyboard={true}>
            {templates.map((x, i) => (
              <SwiperSlide key={x.id} className={styles.slide}>
                <Template
                  template={x}
                  i={i}
                  onSelect={handleSelect}
                  selected={currentIndex == i}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {currentIndex < templates.length - 1 && (
            <div className={styles.rightchevroncontainer}>
              <Button
                icon={BsChevronRight}
                iconSize={'20px'}
                className={styles.chevron}
                onClick={() => {
                  if (currentIndex < templates.length - 1) {
                    slideTo(currentIndex + 1);
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </BaseModal>
  );
};

export default memo(TemplateModal);
