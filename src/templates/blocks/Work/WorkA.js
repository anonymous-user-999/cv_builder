import {useTranslation} from 'react-i18next';
import React, {memo, useContext} from 'react';
import Markdown from '../../../components/shared/Markdown';
import PageContext from '../../../contexts/PageContext';
import {formatDateRange, isItemVisible, safetyCheck} from '../../../utils';

const WorkItem = ({item, language}) => {
  const {t} = useTranslation();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col text-left mr-2">
          <h6 className="font-semibold text-sm">{item.company}</h6>
          <span className="text-xs">{item.position}</span>
        </div>
        <div>
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
          {item.country && (
            <span className="text-xs flex items-end justify-end">
              {item.country}
            </span>
          )}
        </div>
      </div>
      {item.summary && (
        <div style={{whiteSpace: 'pre-wrap'}} className="markdown mt-2 text-sm">
          {item.summary}
        </div>
      )}
    </div>
  );
};

const WorkA = () => {
  const {data, heading: Heading} = useContext(PageContext);
  return safetyCheck(data.work) ? (
    <div>
      <Heading>{data.work.heading}</Heading>
      <div className="grid gap-4">
        {data.work.items.map(
          (x) =>
            isItemVisible(x) && (
              <WorkItem key={x.id} item={x} language={data.metadata.language} />
            ),
        )}
      </div>
    </div>
  ) : null;
};

export default memo(WorkA);
