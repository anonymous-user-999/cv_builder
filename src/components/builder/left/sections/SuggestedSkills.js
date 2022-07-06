import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {get, isEmpty} from 'lodash';
import {useTranslation} from 'react-i18next';
import React, {memo, useContext, useEffect, useRef, useState} from 'react';
import * as styles from './SuggestedSkills.module.css';
import {useDispatch, useSelector} from '../../../../contexts/ResumeContext';
import Button from '../../../shared/Button';
import API from '../../../../services';
import UserContext from '../../../../contexts/UserContext';
import cx from 'classnames';

const Skill = ({skill, index, path}) => {
  const {softSkill, name, id} = skill;
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(skill.selected);
  const handleSelectSkill = () => {
    if (selected) return;
    else {
      dispatch({
        type: 'on_add_item',
        payload: {
          path,
          value: {
            id,
            name,
            startDate: '',
          },
        },
      });
    }
    setSelected((prev) => !prev);
  };
  return (
    <Button
      key={id}
      onClick={handleSelectSkill}
      className={cx('animate__animated animate__bounceIn', styles.skill, {
        [styles.selected]: selected,
        [styles.softskill]: softSkill,
      })}
      disabled={selected}
      iconType="image"
      iconSize={'18px'}
      icon={
        softSkill
          ? selected
            ? '/images/soft-check.png'
            : '/images/soft-plus.png'
          : selected
          ? '/images/check.png'
          : '/images/plus.png'
      }>
      <p>{name}</p>
    </Button>
  );
};

const SuggestedSkills = ({
  path,
  title,
  titlePath,
  subtitle,
  subtitlePath,
  text,
  textPath,
  hasDate,
  event,
}) => {
  let timeout = null;
  const {t, i18n} = useTranslation();
  const items = useSelector(path, []);
  const experience = useSelector('work.items', []);
  const {user, authToken, clearUser} = useContext(UserContext);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [suggestedKnowledges, setSuggestedKnowledges] = useState([]);
  const [suggestedTools, setSuggestedTools] = useState([]);
  const [suggestedTechnologies, setSuggestedTechnologies] = useState([]);

  useEffect(() => {
    getSuggestedSkills();
  }, []);

  useEffect(() => {
    getSuggestedSkills();
  }, [experience.length]);

  const getSuggestedSkills = async () => {
    const result = await API.ResumeAPI.getSuggestedSkills(
      {
        title: experience.length
          ? [...experience.map((x) => x.position)]
          : [...user.targetedJobTitles],
      },
      authToken,
    );
    if (!result.authorized) return clearUser();
    if (result.data) {
      setData(result.data.skills);
    }
  };

  useEffect(() => {
    if (timeout) clearTimeout(timeout);
    if (data) {
      timeout = setTimeout(() => {
        setSuggestedSkills(
          data.Skills.filter(
            (x) => items.findIndex((y) => x.Code == y.id) == -1,
          ).map((x) => ({
            name: x.Title,
            id: x.Code,
            selected: false,
            softSkill: false,
          })),
        );
        setSuggestedKnowledges(
          data.Knowledges.filter(
            (x) => items.findIndex((y) => x.Code == y.id) == -1,
          ).map((x) => ({
            name: x.Title,
            id: x.Code,
            selected: false,
            softSkill: true,
          })),
        );
        setSuggestedTools(
          data.Tools.filter(
            (x) => items.findIndex((y) => x.Code == y.id) == -1,
          ).map((x) => ({
            name: x.tool,
            id: x.Code,
            selected: false,
            softSkill: false,
          })),
        );
        setSuggestedTechnologies(
          data.Technologies.filter(
            (x) => items.findIndex((y) => x.Code == y.id) == -1,
          ).map((x) => ({
            name: x.Technology,
            id: x.Code,
            selected: false,
            softSkill: true,
          })),
        );
      }, 2500);
    }
  }, [data, items]);

  return (
    <div
      className={cx(styles.list, {
        [styles.border]:
          suggestedSkills.length > 0 ||
          suggestedKnowledges.length > 0 ||
          suggestedTechnologies.length > 0 ||
          suggestedTools.length > 0,
      })}>
      {suggestedSkills.slice(0, 3).map((x, i) => (
        <Skill key={x.id} index={i} path={path} skill={x} />
      ))}
      {suggestedKnowledges.slice(0, 2).map((x, i) => (
        <Skill key={x.id} index={i + 2} path={path} skill={x} />
      ))}
      {suggestedTools.slice(0, 2).map((x, i) => (
        <Skill key={x.id} index={i + 6} path={path} skill={x} />
      ))}
      {suggestedTechnologies.slice(0, 3).map((x, i) => (
        <Skill key={x.id} index={i + 4} path={path} skill={x} />
      ))}
    </div>
  );
};

export default memo(SuggestedSkills);
