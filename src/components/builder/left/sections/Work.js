import {useTranslation} from 'react-i18next';
import React, {memo, useContext, useEffect, useState} from 'react';
import Heading from '../../../shared/Heading';
import Input from '../../../shared/Input';
import AddButton from '../../../shared/AddButton';
import List from '../../lists/List';
import {useDispatch, useSelector} from '../../../../contexts/ResumeContext';
import * as Yup from 'yup';
import SettingsContext from '../../../../contexts/SettingsContext';
import {Formik} from 'formik';
import {getFieldProps} from '../../../../utils';
import dayjs from 'dayjs';
import {isEmpty} from 'lodash';
import {v4 as uuidv4} from 'uuid';
import {toast} from 'react-toastify';
import {Menu, MenuItem, Popover} from '@material-ui/core';
import * as styles from './Work.module.css';
import API from '../../../../services';
import UserContext from '../../../../contexts/UserContext';
import {MdSearch} from 'react-icons/md';
import SmartTailorButton from '../../../shared/SmartTailorButton';
import Image from 'next/image';

const initialValues = {
  company: '',
  position: '',
  website: '',
  startDate: '',
  endDate: '',
  summary: '',
};

const Work = ({id, event, visible}) => {
  let timeout = null;
  const {setCurrentStep} = useContext(SettingsContext);
  const {authToken, clearUser} = useContext(UserContext);
  const path = `${id}.items`;
  const items = useSelector(path, []);
  const visibleSections = useSelector('metadata.visibleSections');
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [showForm, setShowForm] = useState(items.length == 0);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState('');
  const [smartTailorData, setSmartTailorData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [description, setDescription] = useState('');

  const schema = Yup.object().shape({
    company: Yup.string().required(t('shared.forms.validation.required')),
    position: Yup.string().required(t('shared.forms.validation.required')),
    website: Yup.string().url(t('shared.forms.validation.url')),
    startDate: Yup.date().max(new Date(), t('shared.forms.validation.maxDate')),
    endDate: Yup.date()
      .max(new Date(), t('shared.forms.validation.maxDate'))
      .when(
        'startDate',
        (startDate, yupSchema) =>
          startDate &&
          yupSchema.min(startDate, t('shared.forms.validation.dateRange')),
      ),
    summary: Yup.string().min(
      10,
      t('shared.forms.validation.min', {number: 10}),
    ),
  });

  useEffect(() => {
    !showForm &&
      (setSmartTailorData([]),
      setSelectedItems([]),
      setDescription(''),
      setSearch(''));
  }, [showForm]);

  const getSmartTailorData = (title) => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(async () => {
      const result = await API.ResumeAPI.getSmartTailorData(
        {
          title: [title],
        },
        authToken,
      );
      if (!result.authorized) return clearUser();
      if (result.data) {
        setSearch('');
        const {activities, duties, detailedWorkActivity} =
          result.data.smartTailorData;
        setSmartTailorData([...detailedWorkActivity, ...duties, ...activities]);
      }
    }, 3000);
  };

  const getExperience = () => {
    let diff = dayjs(endDate || dayjs()).diff(startDate, 'months');
    if (diff <= 0) return '';
    if (diff >= 12) {
      diff = dayjs(endDate || dayjs()).diff(startDate, 'year');
      return `${diff} ${'Years of Experience'}`;
    }
    return `${diff} ${'Months of Experience'}`;
  };

  const onSubmit = async (newData, errors) => {
    setLoading(true);

    if (isEmpty(errors)) {
      newData.id = uuidv4();
      newData.summary = description;
      setShowForm(false);
      dispatch({
        type: 'on_add_item',
        payload: {
          path,
          value: newData,
        },
      });
      setLoading(false);
    } else {
      toast.error(t('builder.toasts.formErrors'));
      setLoading(false);
    }
  };

  const onSkip = () => {
    if (visibleSections.findIndex((x) => x == 'internship') == -1) {
      dispatch({
        type: 'on_add_item',
        payload: {
          path: 'metadata.visibleSections',
          value: 'internship',
        },
      });
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleItem = (item) => {
    const selected = selectedItems.findIndex((x) => x.id == item.id) != -1;
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

      <List
        path={path}
        event={event}
        titlePath="position"
        textPath="summary"
        hasDate
      />
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
      {(items?.length == 0 || showForm) && (
        <Formik
          validateOnBlur
          initialValues={initialValues}
          validationSchema={schema}>
          {(formik) => (
            <div className="grid grid-cols-2 gap-8">
              <Input
                label={t('shared.forms.position')}
                placeholder="Full Stack Web Developer"
                {...getFieldProps(formik, schema, 'position')}
                onChange={(e) => {
                  formik.getFieldProps('position').onChange(e);
                  setSmartTailorData([]);
                  if (e.target.value) {
                    getSmartTailorData(e.target.value);
                  }
                }}
              />
              <Input
                type="dropdown"
                label={t('shared.forms.jobType')}
                placeholder="6th August 2018"
                options={['Select', 'Full-time', 'Part-time', 'Contract']}
                {...getFieldProps(formik, schema, 'jobType')}
              />
              <Input
                label={t('builder.work.company')}
                placeholder="Postdot Technologies Pvt. Ltd."
                {...getFieldProps(formik, schema, 'company')}
              />
              <Input
                type="dropdown"
                label={t('shared.forms.country')}
                placeholder="6th August 2018"
                options={['Select', 'Saudi Arabia', 'Jordan', 'USA']}
                {...getFieldProps(formik, schema, 'country')}
              />
              <div className={'col-span-2 grid grid-cols-2 gap-8'}>
                <div className={'col-span-1 grid grid-cols-2 gap-8'}>
                  <Input
                    type="date"
                    label={t('shared.forms.startDate')}
                    placeholder="6th August 2018"
                    {...getFieldProps(formik, schema, 'startDate')}
                    onChange={(e) => {
                      formik.getFieldProps().onChange(e);
                      setStartDate(e.target.value);
                    }}
                  />

                  <Input
                    type="date"
                    label={t('shared.forms.endDate')}
                    placeholder="6th August 2018"
                    {...getFieldProps(formik, schema, 'endDate')}
                    onChange={(e) => {
                      formik.getFieldProps().onChange(e);
                      setEndDate(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col flex-1 self-center col-span-1 gap-8 pt-5">
                  <p>{startDate ? getExperience() : ''}</p>
                </div>
              </div>
              <div className={'relative col-span-2'}>
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
                <Input
                  type="textarea"
                  label={t('shared.forms.summary')}
                  {...getFieldProps(formik, schema, 'summary')}
                  onChange={(e) => {
                    formik.getFieldProps('summary').onChange(e);
                    setDescription(e.target.value);
                  }}
                  value={description}
                />
              </div>
              <div className={'col-span-2'}>
                <AddButton
                  onClick={async () => {
                    const isValid = await formik.validateForm(formik.values);
                    onSubmit(formik.values, isValid);
                  }}
                  showCancel={true || (showForm && items.length > 0)}
                  title={t('shared.buttons.add')}
                  onCancel={() => {
                    items.length > 0 ? setShowForm(false) : onSkip();
                  }}
                  cancelTitle={
                    items.length > 0
                      ? t('shared.buttons.cancel')
                      : t('shared.buttons.skip')
                  }
                  loading={loading}
                  flex={false && items.length == 0}
                />
              </div>
            </div>
          )}
        </Formik>
      )}
      {items.length > 0 && !showForm && (
        <div>
          <AddButton
            onClick={() => {
              setShowForm(true);
            }}
            title={t('shared.buttons.add')}
            flex
          />
        </div>
      )}
      {items.length > 0 && !showForm && (
        <div>
          <AddButton
            onClick={() => {
              setCurrentStep((prev) => prev + 1);
            }}
            onCancel={() => {
              setShowForm(false);
            }}
            showCancel={showForm && items.length > 0}
            title={
              showForm ? t('shared.buttons.add') : t('shared.buttons.next')
            }
            loading={loading}
            flex={showForm && items.length > 0}
          />
        </div>
      )}
    </section>
  );
};

export default memo(Work);
