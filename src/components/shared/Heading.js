import {useTranslation} from 'react-i18next';
import React, {memo, useContext} from 'react';
import {useSelector} from '../../contexts/ResumeContext';
import UserContext from '../../contexts/UserContext';

const Heading = ({id}) => {
  const {t} = useTranslation();
  const {user} = useContext(UserContext);
  const heading = t(`builder.sections.${id}Desc`)?.replace(
    '{0}',
    user?.fullname,
  );

  return (
    <h6
      style={{fontSize: '14px', fontWeight: 'normal'}}
      className=" focus:outline-none pb-8">
      {heading}
    </h6>
  );
};

export default memo(Heading);
