import {useTranslation} from 'react-i18next';
import React, {memo, useCallback, useContext, useEffect, useState} from 'react';
import Heading from '../../../shared/Heading';
import {useDispatch, useSelector} from '../../../../contexts/ResumeContext';
import Button from '../../../shared/Button';
import leftSections from '../../../../data/leftSections';
import * as styles from './AddSection.module.css';
import {BsCheck2} from 'react-icons/bs';
import {FiTrash} from 'react-icons/fi';
import {AiOutlinePlus} from 'react-icons/ai';
import cx from 'classnames';
import Image from 'next/image';
import SettingsContext from '../../../../contexts/SettingsContext';
import ModalContext from '../../../../contexts/ModalContext';

const Section = ({section, onAdded}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const visibleSections = useSelector('metadata.visibleSections', []);
  const {setCurrentStep} = useContext(SettingsContext);
  const {icon, id, added} = section;
  const handleAddRemove = () => {
    if (!added) {
      dispatch({
        type: 'on_add_item',
        payload: {
          path: 'metadata.visibleSections',
          value: id,
        },
        callback: (items) => {
          onAdded(id);
        },
      });
    } else {
      dispatch({
        type: 'on_delete_visible_section',
        payload: {
          path: 'metadata.visibleSections',
          value: id,
        },
        callback: (items) => {
          onAdded('addsection');
        },
      });
    }
    dispatch({
      type: 'on_input',
      payload: {
        path: `${id}.visible`,
        value: !added,
      },
    });
  };

  return (
    <div className={'flex flex-1 w-full'}>
      <Button
        onClick={handleAddRemove}
        className={cx(styles.section, {
          [styles.added]: added,
        })}>
        <span
          className={cx(styles.icon, {
            [styles.addedicon]: added,
          })}>
          <Image src={icon} width={'19'} height={'19'} />
        </span>
        <div className={styles.container}>
          <p>{t(`builder.sections.${id}`)}</p>
          {added && (
            <BsCheck2 className={styles.check} color="#00B884" size={'18'} />
          )}
          {added && (
            <span className={styles.remove}>
              <FiTrash color="#FD71AF" size={'18'} />
            </span>
          )}
          {!added && (
            <span className={styles.remove}>
              <AiOutlinePlus color="#00B884" size={'18'} />
            </span>
          )}
        </div>
      </Button>
    </div>
  );
};

const AddSection = ({id, event, visible}) => {
  const path = `metadata.visibleSections`;
  const items = useSelector(path, []);
  const {t} = useTranslation();
  const {setCurrentStep, visibleSections} = useContext(SettingsContext);
  const [sections, setSections] = useState(
    leftSections.filter((x) => x.alwaysAdded != true && x.alwaysAdded != null),
  );
  const [visibleSecs, setVisibleSecs] = useState([]);
  const [addedId, setAddedId] = useState(null);
  const {emitter, events} = useContext(ModalContext);

  useEffect(() => {
    setVisibleSecs(
      sections.map((x) => ({
        added: items.findIndex((y) => y == x.id) != -1,
        ...x,
      })),
    );
  }, [items, items.length]);

  useEffect(() => {
    if (addedId == 'addsection') {
      setCurrentStep(items.length - 1);
    } else if (
      addedId != 'addsection' &&
      visibleSections.length >= items.length
    ) {
      const index = visibleSections.findIndex((x) => x.id == addedId);
      if (index != -1) {
        setCurrentStep(index);
        setAddedId(null);
      }
    }
  }, [addedId, visibleSections, items]);

  const onAdded = (id) => {
    setAddedId(id);
  };

  return (
    <section className={visible ? 'flex flex-1 flex-col' : 'hidden'}>
      <Heading id={id} />
      <div className={'grid grid-cols-2 gap-8'}>
        {visibleSecs.map((x) => (
          <Section
            key={`section${x.id}`}
            section={x}
            added={x.added}
            onAdded={onAdded}
          />
        ))}
      </div>
      {false && (
        <Button onClick={() => emitter.emit(events.EXPORT_MODAL)}>
          Export
        </Button>
      )}
    </section>
  );
};

export default memo(AddSection);
