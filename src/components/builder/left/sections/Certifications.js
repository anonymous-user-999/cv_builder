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
import {isEmpty} from 'lodash';
import {v4 as uuidv4} from 'uuid';
import {toast} from 'react-toastify';

const initialValues = {
  title: '',
  issuer: '',
  date: '',
  summary: '',
};

const Certifications = ({id, event, visible}) => {
  const {setCurrentStep} = useContext(SettingsContext);
  const path = `${id}.items`;
  const items = useSelector(path, []);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [showForm, setShowForm] = useState(items.length == 0);
  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    title: Yup.string().required(t('shared.forms.validation.required')),
    issuer: Yup.string().required(t('shared.forms.validation.required')),
    date: Yup.date().max(new Date()),
    summary: Yup.string(),
  });

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

  return (
    <section className={visible ? 'flex flex-1 flex-col' : 'hidden'}>
      <Heading id={id} />

      <List
        path={path}
        event={event}
        titlePath="title"
        subtitlePath="issuer"
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
                label={t('shared.forms.licenses')}
                placeholder="CCNP"
                {...getFieldProps(formik, schema, 'title')}
              />

              <Input
                label={t('shared.forms.institution')}
                placeholder="Cisco Systems"
                {...getFieldProps(formik, schema, 'issuer')}
              />

              <Input
                type="date"
                label={t('shared.forms.date')}
                {...getFieldProps(formik, schema, 'date')}
              />

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
                    items.length > 0
                      ? setShowForm(false)
                      : setCurrentStep((prev) => prev + 1);
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

export default memo(Certifications);
