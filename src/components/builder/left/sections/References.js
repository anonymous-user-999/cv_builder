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
  name: '',
  institution: '',
  phone: '',
  email: '',
};

const References = ({id, event, visible}) => {
  const {setCurrentStep} = useContext(SettingsContext);
  const path = `${id}.items`;
  const items = useSelector(path, []);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [showForm, setShowForm] = useState(items.length == 0);
  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    name: Yup.string().required(t('shared.forms.validation.required')),
    institution: Yup.string().required(t('shared.forms.validation.required')),
    phone: Yup.string(),
    email: Yup.string().email(t('shared.forms.validation.email')),
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
        titlePath="name"
        subtitlePath="institution"
        textPath="phone"
      />
      {(items?.length == 0 || showForm) && (
        <Formik
          validateOnBlur
          initialValues={initialValues}
          validationSchema={schema}>
          {(formik) => (
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
              <div className={'col-span-2'}>
                <AddButton
                  onClick={async () => {
                    const isValid = await formik.validateForm(formik.values);
                    onSubmit(formik.values, isValid);
                  }}
                  showCancel={showForm && items.length > 0}
                  title={t('shared.buttons.add')}
                  onCancel={() => {
                    items.length > 0 ? setShowForm(false) : onSkip();
                  }}
                  cancelTitle={t('shared.buttons.cancel')}
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

export default memo(References);
