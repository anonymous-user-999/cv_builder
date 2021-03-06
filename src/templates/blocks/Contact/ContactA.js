import {FaCaretRight} from 'react-icons/fa';
import {get} from 'lodash';
import {useTranslation} from 'react-i18next';
import React, {memo, useContext} from 'react';
import {hasAddress, isItemVisible, safetyCheck} from '../../../utils';
import BirthDateB from '../BirthDate/BirthDateB';
import Icons from '../Icons';
import PageContext from '../../../contexts/PageContext';

const ContactItem = ({value, icon, link}) => {
  const {data} = useContext(PageContext);
  const Icon = get(Icons, icon && icon.toLowerCase(), FaCaretRight);

  return value ? (
    <div className="flex items-center">
      <Icon
        size="10px"
        className="mr-2"
        style={{color: data.metadata.colors.primary}}
      />
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <span className="font-medium break-all">{value}</span>
        </a>
      ) : (
        <span className="font-medium break-all">{value}</span>
      )}
    </div>
  ) : null;
};

const ContactA = () => {
  const {t} = useTranslation();
  const {data} = useContext(PageContext);

  return (
    <div className="text-xs grid gap-2">
      {hasAddress(data.profile.address) && (
        <ContactItem
          label={t('shared.forms.address')}
          value={`${[
            data.profile.address.line1,
            data.profile.address.line2,
            data.profile.address.city,
          ]
            .filter(Boolean)
            .join(', ')} ${data.profile.address.pincode ?? ''}`}
          icon="address"
        />
      )}
      <ContactItem
        label={t('shared.forms.phone')}
        value={data.profile.phone}
        icon="phone"
        link={`tel:${data.profile.phone}`}
      />
      <ContactItem
        label={t('shared.forms.website')}
        value={data.profile.website}
        icon="website"
        link={data.profile.website}
      />
      <ContactItem
        label={t('shared.forms.email')}
        value={data.profile.email}
        icon="email"
        link={`mailto:${data.profile.email}`}
      />
      <ContactItem
        label={t('shared.forms.nationality')}
        value={data.profile.nationality}
        icon="flag"
      />
      <ContactItem
        label={t('shared.forms.portifolio')}
        value={data.profile.portfolio}
        icon="bag"
        link={data.profile.portfolio}
      />
      <ContactItem
        label={t('shared.forms.linkedin')}
        value={data.profile.linkedin}
        icon="linkedin"
        link={data.profile.linkedin}
      />

      <BirthDateB />

      {safetyCheck(data.social) &&
        data.social.items.map(
          (x) =>
            isItemVisible(x) && (
              <ContactItem
                key={x.id}
                value={x.username}
                icon={x.network}
                link={x.url}
              />
            ),
        )}
    </div>
  );
};

export default memo(ContactA);
