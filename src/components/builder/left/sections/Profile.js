import {useTranslation} from 'react-i18next';
import React, {memo, useContext, useState} from 'react';
import Heading from '../../../shared/Heading';
import Input from '../../../shared/Input';
import PhotoUpload from '../../../shared/PhotoUpload';
import Button from '../../../shared/Button';
import {BsChevronDown, BsChevronUp} from 'react-icons/bs';
import * as styles from './Profile.module.css';
import {MdLocationOn} from 'react-icons/md';
import AddButton from '../../../shared/AddButton';
import SettingsContext from '../../../../contexts/SettingsContext';
import {ResumeProvider, useSelector} from '../../../../contexts/ResumeContext';

const Profile = ({id, visible}) => {
  const {t} = useTranslation();
  const [showMore, setShowMore] = useState(false);
  const {setCurrentStep} = useContext(SettingsContext);

  return (
    <section className={visible ? 'flex flex-1 flex-col' : 'hidden'}>
      <Heading id={id} />

      {/* <Input
        name="heading"
        label={t('builder.sections.heading')}
        path={`${id}.heading`}
      /> */}

      <PhotoUpload />

      <div className="grid gap-8">
        <div key={'firstRow'} className="grid grid-cols-2 gap-6 mt-8">
          <Input
            name="firstName"
            label={t('builder.profile.firstName')}
            path="profile.firstName"
          />
          <Input
            name="lastName"
            label={t('builder.profile.lastName')}
            path="profile.lastName"
          />
        </div>
        <div key={'seconRow'} className="grid grid-cols-2 gap-6">
          <Input
            name="phone"
            label={t('shared.forms.phone')}
            path="profile.phone"
          />
          <Input
            name="email"
            label={t('shared.forms.email')}
            path="profile.email"
          />
        </div>
        <div key={'thirdRow'} className="grid grid-cols-2 gap-6">
          <Input
            type="date"
            name="birthDate"
            label={t('builder.profile.birthDate')}
            path="profile.birthDate"
          />
          <Input
            name="addressLine1"
            label={t('builder.profile.address.line1')}
            path="profile.address.line1"
            icon={MdLocationOn}
          />
        </div>

        {showMore && (
          <>
            <div key={'fourthRow'} className="grid grid-cols-2 gap-6">
              <Input
                name="nationality"
                label={t('shared.forms.nationality')}
                path="profile.nationality"
              />
              <Input
                name="website"
                label={t('shared.forms.website')}
                path="profile.website"
              />
            </div>
            {/* <Input
            name="addressLine2"
            label={t('builder.profile.address.line2')}
            path="profile.address.line2"
          /> */}

            <div key={'fifthRow'} className="grid grid-cols-2 gap-6">
              <Input
                name="linkedin"
                label={t('builder.profile.linkedin')}
                path="profile.linkedin"
              />
              <Input
                name="portfolio"
                label={t('builder.profile.portfolio')}
                path="profile.portfolio"
              />
            </div>
          </>
        )}
        <Button
          icon={showMore ? BsChevronUp : BsChevronDown}
          className={styles.showmore}
          onClick={() => setShowMore((prev) => !prev)}>
          {showMore
            ? t('builder.profile.hideMore')
            : t('builder.profile.showMore')}
        </Button>
      </div>
      <AddButton
        onClick={() => {
          setCurrentStep((prev) => prev + 1);
        }}
        title={t('shared.buttons.next')}
      />
    </section>
  );
};

export default memo(Profile);
