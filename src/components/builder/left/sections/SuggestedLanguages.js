import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from '../../../../contexts/ResumeContext';
import appLanguages from '../../../../data/languages';
import Button from '../../../shared/Button';
import * as styles from './SuggestedLanguages.module.css';
import cx from 'classnames';
import {v4 as uuidv4} from 'uuid';

const Language = ({lang, path}) => {
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();

  const handleSelect = () => {
    if (selected) return;
    setSelected(true);
    dispatch({
      type: 'on_add_item',
      payload: {
        path,
        value: {
          id: uuidv4(),
          name: lang,
          fluency: '',
        },
      },
    });
  };
  return (
    <Button
      icon={selected ? '/images/check.png' : '/images/plus.png'}
      iconType="image"
      iconSize="18"
      className={cx('animate__animated animate__bounceIn', styles.skill, {
        ['animate__delay-2s']: selected,
        ['animate__bounceOut']: selected,
      })}
      onClick={handleSelect}>
      <img src={`/images/${lang.toLowerCase()}.png`} className={styles.flag} />
      <p>{lang}</p>
    </Button>
  );
};

const SuggestedLanguages = ({path}) => {
  let timeout = null;
  const items = useSelector(path, []);
  const [languages, setLanguages] = useState(appLanguages);
  const [suggestedLanguages, setSuggestedLanguages] = useState([
    'English',
    'Mandarin',
    'Hindi',
    'Spanish',
    'Arabic',
  ]);
  const [visibleLanguages, setVisibleLanguages] = useState([]);

  useEffect(() => {
    try {
      if (timeout) clearTimeout(timeout);
    } catch (error) {}
    timeout = setTimeout(
      () => {
        setVisibleLanguages(
          suggestedLanguages.filter(
            (x) =>
              items.findIndex((y) => y.name.toLowerCase() == x.toLowerCase()) ==
              -1,
          ),
        );
      },
      items.length == 0 ? 0 : 1000,
    );
  }, [items.length]);

  return (
    <div className={styles.list}>
      {visibleLanguages.map((x, i) => (
        <Language key={x} lang={x} path={path} />
      ))}
    </div>
  );
};

export default SuggestedLanguages;
