import {useTranslation} from 'react-i18next';
import React, {memo, useContext} from 'react';
import Markdown from '../../../components/shared/Markdown';
import PageContext from '../../../contexts/PageContext';
import {formatDateRange, isItemVisible, safetyCheck} from '../../../utils';

const VolunteeringItem = ({item, language}) => {
  const {t} = useTranslation();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col text-left mr-2">
          <h6 className="font-semibold text-sm">{item.company}</h6>
          <span className="text-xs">{item.position}</span>
        </div>
        {item.startDate && (
          <h6 className="text-xs font-medium text-right">
            (
            {formatDateRange(
              {
                startDate: item.startDate,
                endDate: item.endDate,
                language,
              },
              t,
            )}
            )
          </h6>
        )}
      </div>
      {item.summary && (
        <div style={{whiteSpace: 'pre-wrap'}} className="markdown mt-2 text-sm">
          {item.summary}
        </div>
      )}
    </div>
  );
};

const VolunteeringA = () => {
  const {data, heading: Heading} = useContext(PageContext);
  return safetyCheck(data.volunteering) ? (
    <div>
      <Heading>{data.volunteering.heading}</Heading>
      <div className="grid gap-4">
        {data.volunteering.items.map(
          (x) =>
            isItemVisible(x) && (
              <VolunteeringItem
                key={x.id}
                item={x}
                language={data.metadata.language}
              />
            ),
        )}
      </div>
    </div>
  ) : null;
};

export default memo(VolunteeringA);