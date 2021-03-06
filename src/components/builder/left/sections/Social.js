import {useTranslation} from 'react-i18next';
import React, {memo} from 'react';
import Heading from '../../../shared/Heading';
import Input from '../../../shared/Input';
import List from '../../lists/List';

const Social = ({id, event, visible}) => {
  const path = `${id}.items`;
  const {t} = useTranslation();

  return (
    <section className={visible ? 'flex flex-1 flex-col' : 'hidden'}>
      <Heading id={id} />

      {/* <Input
        name="heading"
        label={t('builder.sections.heading')}
        path={`${id}.heading`}
      /> */}

      <List
        path={path}
        event={event}
        titlePath="network"
        subtitlePath="username"
      />
    </section>
  );
};

export default memo(Social);
