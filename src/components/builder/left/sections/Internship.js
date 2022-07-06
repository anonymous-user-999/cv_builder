import {useTranslation} from 'react-i18next';
import React, {memo, useContext, useState} from 'react';
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

const initialValues = {
  company: '',
  position: '',
  website: '',
  startDate: '',
  endDate: '',
  summary: '',
};

const Internship = ({id, event, visible}) => {
  const {setCurrentStep} = useContext(SettingsContext);
  const path = `${id}.items`;
  const items = useSelector(path, []);
  const visibleSections = useSelector('metadata.visibleSections');
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [showForm, setShowForm] = useState(items.length == 0);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
    if (visibleSections.findIndex((x) => x == 'volunteering') == -1) {
      dispatch({
        type: 'on_add_item',
        payload: {
          path: 'metadata.visibleSections',
          value: 'volunteering',
        },
      });
    }
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <section className={visible ? 'flex flex-1 flex-col' : 'hidden'}>
      <Heading id={id} />

      <List
        hasDate
        path={path}
        event={event}
        titlePath="position"
        textPath="summary"
      />
      {(items?.length == 0 || showForm) && (
        <Formik
          validateOnBlur
          initialValues={initialValues}
          validationSchema={schema}>
          {(formik) => (
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

export default memo(Internship);
