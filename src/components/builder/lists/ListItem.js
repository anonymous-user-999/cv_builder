import {Draggable} from 'react-beautiful-dnd';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import {MdMoreVert, MdSearch} from 'react-icons/md';
import {Menu, MenuItem, Popover} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import React, {memo, useContext, useEffect, useRef, useState} from 'react';
import Switch from '@material-ui/core/Switch';
import {useDispatch} from '../../../contexts/ResumeContext';
import * as styles from './ListItem.module.css';
import {MdOutlineDragIndicator} from 'react-icons/md';
import {FiTrash} from 'react-icons/fi';
import {BsChevronDown, BsChevronUp} from 'react-icons/bs';
import cx from 'classnames';
import * as Yup from 'yup';
import {Formik} from 'formik';
import Input from '../../shared/Input';
import {getFieldProps} from '../../../utils';
import dayjs from 'dayjs';
import {isEmpty} from 'lodash';
import DatabaseContext from '../../../contexts/DatabaseContext';
import degrees from '../../../data/degrees';
import appLanguages from '../../../data/languages';
import fluencies from '../../../data/fluencies';
import API from '../../../services';
import SmartTailorButton from '../../shared/SmartTailorButton';
import Image from 'next/image';
import {toast} from 'react-toastify';
import UserContext from '../../../contexts/UserContext';

const dataTestIdPrefix = 'list-item-';

const ListItem = ({
  title,
  subtitle,
  text,
  path,
  data,
  isFirst,
  isLast,
  onEdit,
  index,
  event,
}) => {
  let timeout = null;
  const dispatch = useDispatch();
  const {educationTitles, universities} = useContext(DatabaseContext);
  const {authToken} = useContext(UserContext);
  const {t} = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteClickCount, setDeleteClickCount] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [startDate, setStartDate] = useState(data.startDate);
  const [endDate, setEndDate] = useState(data.endDate);
  const [search, setSearch] = useState('');
  const [smartTailorData, setSmartTailorData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [description, setDescription] = useState(
    path == 'work.items' ? data.summary : '',
  );

  useEffect(() => {
    if (path != 'work.items') return;
    expanded
      ? smartTailorData.length
        ? null
        : getSmartTailorData(data.position)
      : setSearch('');
  }, [expanded]);

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

  const formikRef = useRef();
  const initialValues = {
    ...data,
  };

  const getSchema = () => {
    switch (path) {
      case 'education.items':
        return Yup.object().shape({
          institution: Yup.string().required(
            t('shared.forms.validation.required'),
          ),
          field: Yup.string().required(t('shared.forms.validation.required')),
          degree: Yup.string(),
          gpa: Yup.string(),
          startDate: Yup.date(),
          endDate: Yup.date().when(
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
      case 'work.items':
      case 'iternship.items':
        return Yup.object().shape({
          company: Yup.string().required(t('shared.forms.validation.required')),
          position: Yup.string().required(
            t('shared.forms.validation.required'),
          ),
          website: Yup.string().url(t('shared.forms.validation.url')),
          startDate: Yup.date(),
          endDate: Yup.date().when(
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
      case 'volunteering.items':
        return Yup.object().shape({
          company: Yup.string().required(t('shared.forms.validation.required')),
          startDate: Yup.date().max(
            new Date(),
            t('shared.forms.validation.maxDate'),
          ),
          endDate: Yup.date()
            .max(new Date(), t('shared.forms.validation.maxDate'))
            .when(
              'startDate',
              (startDate, yupSchema) =>
                startDate &&
                yupSchema.min(
                  startDate,
                  t('shared.forms.validation.dateRange'),
                ),
            ),
          summary: Yup.string().min(
            10,
            t('shared.forms.validation.min', {number: 10}),
          ),
        });
      case 'skills.items':
        return Yup.object().shape({
          name: Yup.string().required(t('shared.forms.validation.required')),
          date: Yup.string(),
        });
      case 'languages.items':
        return Yup.object().shape({
          name: Yup.string().required(t('shared.forms.validation.required')),
          fluency: Yup.string(),
        });
      case 'references.items':
        return Yup.object().shape({
          name: Yup.string().required(t('shared.forms.validation.required')),
          institution: Yup.string().required(
            t('shared.forms.validation.required'),
          ),
          phone: Yup.string(),
          email: Yup.string().email(t('shared.forms.validation.email')),
        });
      case 'awards.items':
        return Yup.object().shape({
          title: Yup.string().required(t('shared.forms.validation.required')),
          date: Yup.date()
            .required(t('shared.forms.validation.required'))
            .max(new Date()),
          summary: Yup.string(),
        });
      case 'groups.items':
        return Yup.object().shape({
          name: Yup.string().required(t('shared.forms.validation.required')),
          startDate: Yup.date().max(
            new Date(),
            t('shared.forms.validation.maxDate'),
          ),
          endDate: Yup.date()
            .max(new Date(), t('shared.forms.validation.maxDate'))
            .when(
              'startDate',
              (startDate, yupSchema) =>
                startDate &&
                yupSchema.min(
                  startDate,
                  t('shared.forms.validation.dateRange'),
                ),
            ),
          summary: Yup.string(),
        });
      case 'projects.items':
        return Yup.object().shape({
          title: Yup.string().required(t('shared.forms.validation.required')),
          institution: Yup.string(),
          link: Yup.string().url(t('shared.forms.validation.url')),
          startDate: Yup.date(),
          endDate: Yup.date().when(
            'startDate',
            (startDate, yupSchema) =>
              startDate &&
              yupSchema.min(startDate, t('shared.forms.validation.dateRange')),
          ),
          summary: Yup.string(),
        });
    }
  };

  const schema = getSchema();

  const handleClose = () => setAnchorEl(null);

  const handleDelete = () => {
    dispatch({
      type: 'on_delete_item',
      payload: {
        path,
        value: data,
      },
    });

    handleClose();
  };

  const checkConfirmationAndDelte = () => {
    // const con = confirm(t('shared.buttons.confirmation'));
    // if (con) {
    handleDelete();
    // }
  };

  const handleSubmit = async (values) => {
    if (description) values.summary = description;
    dispatch({
      type: 'on_edit_item',
      payload: {
        path,
        value: {...values, id: data.id},
      },
    });
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

  const getForm = (formik) => {
    switch (path) {
      case 'education.items': {
        return (
          <div className="grid grid-cols-2 gap-8">
            <Input
              type="autocomplete"
              options={universities}
              label={t('builder.education.institution')}
              className="col-span-1"
              placeholder="Dayananda Sagar College of Engineering"
              {...getFieldProps(formik, schema, 'institution')}
            />

            <Input
              type="autocomplete"
              options={educationTitles}
              label={t('builder.education.field')}
              className="col-span-1"
              placeholder="Computer Science &amp; Engineering"
              {...getFieldProps(formik, schema, 'field')}
            />

            <Input
              type="dropdown"
              options={['-select-', ...degrees]}
              label={t('builder.education.degree')}
              placeholder="Bachelor's Degree"
              {...getFieldProps(formik, schema, 'degree')}
            />

            <Input
              label={t('builder.education.gpa')}
              placeholder="8.8"
              {...getFieldProps(formik, schema, 'gpa')}
            />

            <div className={'col-span-2 grid grid-cols-2 gap-8'}>
              <div className={'col-span-1 grid grid-cols-2 gap-8'}>
                <Input
                  type="date"
                  label={t('shared.forms.startDate')}
                  placeholder="6th August 2018"
                  {...getFieldProps(formik, schema, 'startDate')}
                />

                <Input
                  type="date"
                  label={t('shared.forms.endDate')}
                  placeholder="6th August 2018"
                  {...getFieldProps(formik, schema, 'endDate')}
                />
              </div>
              <Input
                type="dropdown"
                label={t('shared.forms.country')}
                className="col-span-1"
                placeholder="6th August 2018"
                options={['Saudi Arabia', 'Jordan', 'USA']}
                {...getFieldProps(formik, schema, 'country')}
              />
            </div>

            <Input
              type="textarea"
              label={t('shared.forms.summary')}
              className="col-span-2"
              {...getFieldProps(formik, schema, 'summary')}
            />
          </div>
        );
      }
      case 'work.items': {
        return (
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
          </div>
        );
      }
      case 'internship.items': {
        return (
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t('shared.forms.internshipTitle')}
              placeholder="Full Stack Web Developer"
              {...getFieldProps(formik, schema, 'position')}
            />
            <Input
              label={t('shared.forms.institution')}
              placeholder="Postdot Technologies Pvt. Ltd."
              {...getFieldProps(formik, schema, 'company')}
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
              <Input
                type="dropdown"
                label={t('shared.forms.country')}
                placeholder="6th August 2018"
                options={['Select', 'Saudi Arabia', 'Jordan', 'USA']}
                {...getFieldProps(formik, schema, 'country')}
              />
            </div>

            <Input
              type="textarea"
              label={t('shared.forms.summary')}
              className="col-span-2"
              {...getFieldProps(formik, schema, 'summary')}
            />
          </div>
        );
      }

      case 'volunteering.items': {
        return (
          <div className="grid grid-cols-2 gap-8">
            <div className={'col-span-2 grid grid-cols-2 gap-8'}>
              <Input
                label={t('shared.forms.institution')}
                placeholder="Postdot Technologies Pvt. Ltd."
                {...getFieldProps(formik, schema, 'company')}
              />
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
            </div>
            {/* <Input
                label={t('shared.forms.position')}
                placeholder="Full Stack Web Developer"
                {...getFieldProps(formik, schema, 'position')}
              />
              <Input
                type="dropdown"
                label={t('shared.forms.jobType')}
                placeholder="6th August 2018"
                options={['Select', 'Full-time', 'Part-time', 'Contract']}
                {...getFieldProps(formik, schema, 'jobType')}
              /> */}
            {/* <Input
                type="dropdown"
                label={t('shared.forms.country')}
                placeholder="6th August 2018"
                options={['Select', 'Saudi Arabia', 'Jordan', 'USA']}
                {...getFieldProps(formik, schema, 'country')}
              /> */}

            <Input
              type="textarea"
              label={t('shared.forms.summary')}
              className="col-span-2"
              {...getFieldProps(formik, schema, 'summary')}
            />
          </div>
        );
      }
      case 'skills.items': {
        return (
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t('shared.forms.name')}
              placeholder="ReactJS"
              {...getFieldProps(formik, schema, 'name')}
            />

            <Input
              type="date"
              label={t('shared.forms.startDate')}
              {...getFieldProps(formik, schema, 'startDate')}
            />
          </div>
        );
      }
      case 'languages.items': {
        return (
          <div className="grid grid-cols-2 gap-8">
            <Input
              type="autocomplete"
              options={appLanguages.map((x, i) => ({name: x, id: i}))}
              label={t('shared.forms.name')}
              placeholder="ReactJS"
              {...getFieldProps(formik, schema, 'name')}
            />

            <Input
              type="dropdown"
              options={fluencies}
              label={t('builder.languages.fluency')}
              placeholder="Native"
              {...getFieldProps(formik, schema, 'fluency')}
            />
          </div>
        );
      }
      case 'references.items': {
        return (
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t('shared.forms.name')}
              placeholder="John Doe"
              {...getFieldProps(formik, schema, 'name')}
            />
            <Input
              label={t('shared.forms.institution')}
              placeholder="Postdot Technologies Pvt. Ltd."
              {...getFieldProps(formik, schema, 'institution')}
            />
            <Input
              label={t('shared.forms.phone')}
              placeholder={t('shared.forms.phone')}
              {...getFieldProps(formik, schema, 'phone')}
            />
            <Input
              label={t('shared.forms.email')}
              placeholder="mail@example.com"
              {...getFieldProps(formik, schema, 'email')}
            />
          </div>
        );
      }
      case 'awards.items': {
        return (
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t('shared.forms.achievmentTitle')}
              placeholder="Intl. Flutter Hackathon '19"
              {...getFieldProps(formik, schema, 'title')}
            />

            <Input
              type="date"
              label={t('shared.forms.achievmentDate')}
              {...getFieldProps(formik, schema, 'date')}
            />

            <Input
              type="textarea"
              label={t('shared.forms.summary')}
              className="col-span-2"
              {...getFieldProps(formik, schema, 'summary')}
              tip={t('builder.sections.awardsTip')}
              maxLength={60}
            />
          </div>
        );
      }
      case 'groups.items': {
        return (
          <div className="grid grid-cols-2 gap-8">
            <div className={'col-span-2 grid grid-cols-2 gap-8'}>
              <Input
                label={t('shared.forms.groupName')}
                placeholder="Type here"
                {...getFieldProps(formik, schema, 'name')}
              />
              <div className={'col-span-1 grid grid-cols-2 gap-8'}>
                <Input
                  type="date"
                  label={t('shared.forms.startDate')}
                  placeholder="6th August 2018"
                  {...getFieldProps(formik, schema, 'startDate')}
                />

                <Input
                  type="date"
                  label={t('shared.forms.endDate')}
                  placeholder="6th August 2018"
                  {...getFieldProps(formik, schema, 'endDate')}
                />
              </div>
            </div>

            <Input
              type="textarea"
              label={t('shared.forms.summary')}
              className="col-span-2"
              {...getFieldProps(formik, schema, 'summary')}
            />
          </div>
        );
      }
      case 'projects.items': {
        return (
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t('shared.forms.projectName')}
              placeholder="CVitae"
              {...getFieldProps(formik, schema, 'title')}
            />

            <Input
              label={t('shared.forms.institution')}
              placeholder="https://github.com/AmruthPillai/Reactive-Resume"
              {...getFieldProps(formik, schema, 'institution')}
            />
            <div className={'col-span-2 grid grid-cols-2 gap-8'}>
              <div className={'col-span-1 grid grid-cols-2 gap-8'}>
                <Input
                  type="date"
                  label={t('shared.forms.startDate')}
                  placeholder="6th August 2018"
                  {...getFieldProps(formik, schema, 'startDate')}
                />

                <Input
                  type="date"
                  label={t('shared.forms.endDate')}
                  placeholder="6th August 2018"
                  {...getFieldProps(formik, schema, 'endDate')}
                />
              </div>
              <Input
                label={t('shared.forms.link')}
                placeholder="Type here"
                {...getFieldProps(formik, schema, 'link')}
              />
            </div>

            <Input
              type="textarea"
              label={t('shared.forms.summary')}
              className="col-span-2"
              {...getFieldProps(formik, schema, 'summary')}
              tip={t('builder.sections.projectsTip')}
              maxLength={60}
            />
          </div>
        );
      }
    }
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

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Draggable isDragDisabled={expanded} draggableId={data.id} index={index}>
      {(dragProvided) => (
        <div
          ref={dragProvided.innerRef}
          className={'flex items-center relative flex-row w-full flex-1 mb-5'}
          data-testid={`${dataTestIdPrefix}${path}`}
          {...dragProvided.draggableProps}
          {...dragProvided.dragHandleProps}>
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
          {!expanded && (
            <div
              className={styles.absolutebtn}
              style={{
                left: '-20px',
                color: '#49CCF9',
              }}>
              <MdOutlineDragIndicator size={'20px'} color="#49CCF9" />
            </div>
          )}

          <div
            className={cx({
              [styles.listItem]: !expanded,
              [styles.editItem]: expanded,
            })}>
            {!expanded && (
              <div className={'flex flex-col'}>
                <span className="font-medium truncate">{title}</span>

                {subtitle && (
                  <span className="mt-1 text-sm opacity-75 truncate">
                    {subtitle}
                  </span>
                )}
              </div>
            )}
            <div
              className={cx('pointer-cursor', {
                'self-end': expanded,
              })}
              onClick={async () => {
                if (expanded) {
                  const valid = await formikRef?.current.validateForm(
                    formikRef.current.values,
                  );
                  if (isEmpty(valid)) {
                    handleSubmit(formikRef.current.values);
                    setExpanded((prev) => !prev);
                  } else {
                    toast.error(t('builder.toasts.formErrors'));
                  }
                } else {
                  setExpanded((prev) => !prev);
                }
              }}>
              {expanded ? (
                <span
                  style={{
                    color: 'var(--app-color)',
                    cursor: 'pointer',
                  }}>
                  {t('shared.buttons.save')}
                </span>
              ) : (
                <BsChevronDown size="18px" className={'pointer-cursor'} />
              )}
            </div>
            {expanded && (
              <Formik
                validateOnBlur
                initialValues={initialValues}
                validationSchema={schema}
                innerRef={formikRef}>
                {(formik) => getForm(formik)}
              </Formik>
            )}
          </div>
          {!expanded && (
            <div
              className={styles.absolutebtn}
              style={{
                right: '-22px',
              }}
              onClick={expanded ? null : checkConfirmationAndDelte}>
              <FiTrash size={'18px'} color="#FD71AF" />
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default memo(ListItem);

export {dataTestIdPrefix};
