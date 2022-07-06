import {useTranslation} from 'react-i18next';
import React, {memo, useContext, useEffect, useState} from 'react';
import Heading from '../../../shared/Heading';
import Input from '../../../shared/Input';
import SettingsContext from '../../../../contexts/SettingsContext';
import AddButton from '../../../shared/AddButton';
import {MdSearch} from 'react-icons/md';
import UserContext from '../../../../contexts/UserContext';
import {useDispatch, useSelector} from '../../../../contexts/ResumeContext';
import API from '../../../../services';
import Image from 'next/image';
import {Popover} from '@material-ui/core';
import SmartTailorButton from '../../../shared/SmartTailorButton';
import * as styles from './Objective.module.css';

const Objective = ({id, visible}) => {
  let timeout = null;
  const path = 'objective.body';
  const dispatch = useDispatch();
  const {setCurrentStep} = useContext(SettingsContext);
  const experience = useSelector('work.items', []);
  const summary = useSelector(path, '');
  const {clearUser, user, authToken} = useContext(UserContext);
  const {t} = useTranslation();
  const [search, setSearch] = useState('');
  const [smartTailorData, setSmartTailorData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [description, setDescription] = useState(summary);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (!visible) return;
    if (experience.length > 0) {
      getSmartTailorData([...experience.map((x) => x.position)]);
    } else if (user) {
      getSmartTailorData([...user.targetedJobTitles.map((x) => x)]);
    }
  }, [user, experience.length, visible]);

  useEffect(() => {
    if (description != summary) {
      dispatch({
        type: 'on_input',
        payload: {
          path,
          value: description,
        },
      });
    }
  }, [description]);

  const getSmartTailorData = async (title) => {
    const result = await API.ResumeAPI.getSmartTailorData(
      {
        title,
      },
      authToken,
    );
    if (!result.authorized) return clearUser();
    if (result.data) {
      setSearch('');
      const {activities, duties, detailedWorkActivity} =
        result.data.smartTailorData;
      setSmartTailorData([
        ...detailedWorkActivity.map((x) => ({
          ...x,
          selected: description.includes(x.name),
        })),
        ...duties.map((x) => ({...x, selected: description.includes(x.name)})),
        ...activities.map((x) => ({
          ...x,
          selected: description.includes(x.name),
        })),
      ]);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleItem = (item) => {
    const selected =
      selectedItems.findIndex((x) => x.id == item.id) != -1 || item.selected;
    const index = smartTailorData.findIndex((x) => x.id == item.id);
    if (selected) {
      smartTailorData[index].selected = false;
      setSelectedItems((prev) => prev.filter((x) => x.id != item.id));
      setDescription((prev) =>
        prev.replace(`\n-${item.name}`, '').replace(`-${item.name}`, '').trim(),
      );
    } else {
      smartTailorData[index].selected = true;
      setSelectedItems((prev) => [...prev, item]);
      setDescription((prev) =>
        prev ? prev.concat(`\n-${item.name}`) : `-${item.name}`,
      );
    }
    setSmartTailorData(smartTailorData);
  };

  return (
    <section className={visible ? 'flex flex-1 flex-col' : 'hidden'}>
      <Heading id={id} />
      <div className={'relative'}>
        <Input
          type="textarea"
          label={t('shared.forms.summary')}
          // path="objective.body"
          tip={t('builder.sections.objectiveTip')}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        {smartTailorData.length > 0 && (
          <span
            onClick={handleMenuClick}
            className={
              'flex items-center animate__animated animate__bounceIn absolute top-0 right-0 mb-1 text-xs  tracking-wide uppercase cursor-pointer'
            }
            style={{
              color: 'var(--app-color)',
            }}>
            Smart tailor
            <span className={'pl-1'}>
              <Image
                src={'/images/smart-tailor.png'}
                width={'13px'}
                height={'13px'}
              />
            </span>
          </span>
        )}
      </div>
      <Popover
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}>
        <div className={styles.popovercontainer}>
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            name="search"
            placeholder={t('shared.forms.searchTailorData')}
            icon={MdSearch}
            iconColor={'black'}
            iconPosition={'left'}
          />
          {[
            ...(search
              ? smartTailorData.filter((x) =>
                  x.name.toLowerCase().includes(search.toLowerCase()),
                )
              : smartTailorData),
          ].map((x) => (
            <SmartTailorButton
              key={x.id}
              data={x}
              onClick={(e) => {
                toggleItem(e);
              }}
            />
          ))}
        </div>
      </Popover>
      <div className="mt-5">
        <AddButton
          onClick={() => {
            setCurrentStep((prev) => prev + 1);
          }}
          title={t('shared.buttons.next')}
        />
      </div>
    </section>
  );
};

export default memo(Objective);
