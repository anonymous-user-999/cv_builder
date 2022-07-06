import {useTranslation} from 'react-i18next';
import React, {memo, useContext, useEffect, useState} from 'react';
import Heading from '../../../shared/Heading';
import Input from '../../../shared/Input';
import List from '../../lists/List';
import {Formik, useFormikContext} from 'formik';
import * as Yup from 'yup';
import {getFieldProps} from '../../../../utils';
import {useDispatch, useSelector} from '../../../../contexts/ResumeContext';
import {MdAdd} from 'react-icons/md';
import AddButton from '../../../shared/AddButton';
import {isEmpty, isFunction} from 'lodash';
import {v4 as uuidv4} from 'uuid';
import {toast} from 'react-toastify';
import SettingsContext from '../../../../contexts/SettingsContext';
import DatabaseContext from '../../../../contexts/DatabaseContext';
import degrees from '../../../../data/degrees';

const initialValues = {
  institution: '',
  field: '',
  degree: '',
  gpa: '',
  startDate: '',
  endDate: '',
  summary: '',
};

const Education = ({id, event, visible}) => {
  const {setCurrentStep} = useContext(SettingsContext);
  const {educationTitles, universities} = useContext(DatabaseContext);
  const path = `${id}.items`;
  const items = useSelector(path, []);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [showForm, setShowForm] = useState(items.length == 0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // if (!visible) setShowForm(false);
  }, [visible]);

  const schema = Yup.object().shape({
    institution: Yup.string().required(t('shared.forms.validation.required')),
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

  const onSubmit = async (newData, errors) => {
    setLoading(true);

    if (isEmpty(errors)) {
      if (isEditMode) {
        if (data !== newData) {
          dispatch({
            type: 'on_edit_item',
            payload: {
              path,
              value: newData,
            },
          });
        }
      } else {
        newData.id = uuidv4();
        setShowForm(false);
        dispatch({
          type: 'on_add_item',
          payload: {
            path,
            value: newData,
          },
        });
      }
      setLoading(false);
    } else {
      toast.error(t('builder.toasts.formErrors'));
      setLoading(false);
    }
  };

  return (
    <section className={visible ? 'flex flex-1 flex-col' : 'hidden'}>
      <Heading id={id} />
      {/* <Input
        name="heading"
        label={t('builder.sections.heading')}
        path={`${id}.heading`}
      /> */}
      <List
        hasDate
        path={path}
        event={event}
        titlePath="institution"
        textPath="field"
      />
      {(items?.length == 0 || showForm) && (
        <Formik
          validateOnBlur
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values, {validate}) => {}}>
          {(formik) => (
            <div className="grid grid-cols-2 gap-8">
              <Input
                type="autocomplete"
                options={universities}
                label={t('builder.education.institution')}
                placeholder="Dayananda Sagar College of Engineering"
                {...getFieldProps(formik, schema, 'institution')}
              />

              <Input
                type="autocomplete"
                options={educationTitles}
                label={t('builder.education.field')}
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
                    if (showForm) {
                      const isValid = await formik.validateForm(formik.values);
                      onSubmit(formik.values, isValid);
                    } else {
                      setShowForm(true);
                    }
                  }}
                  onCancel={() => {
                    setShowForm(false);
                  }}
                  showCancel={showForm && items.length > 0}
                  title={
                    showForm || items.length == 0
                      ? t('shared.buttons.add')
                      : t('shared.buttons.next')
                  }
                  loading={loading}
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

export default memo(Education);
