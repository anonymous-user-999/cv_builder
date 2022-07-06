import React, {memo, useContext} from 'react';
import {isItemVisible, safetyCheck} from '../../../utils';
import PageContext from '../../../contexts/PageContext';
import dayjs from 'dayjs';

const SkillItem = ({id, name, startDate}) => (
  <div key={id} className="flex flex-col">
    <h6 className="font-semibold text-sm">{name}</h6>
    {startDate && (
      <span className="text-xs">{dayjs(startDate).format('YYYY-MM')}</span>
    )}
  </div>
);

const SkillsA = () => {
  const {data, heading: Heading} = useContext(PageContext);

  return safetyCheck(data.skills) ? (
    <div>
      <Heading>{data.skills.heading}</Heading>
      <div className="grid grid-cols-2 gap-y-2 gap-x-4">
        {data.skills.items.map((x) => isItemVisible(x) && SkillItem(x))}
      </div>
    </div>
  ) : null;
};

export default memo(SkillsA);
