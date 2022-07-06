import {useTranslation} from 'react-i18next';
import React, {memo, useContext, useEffect, useState} from 'react';
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
import * as styles from './Languages.module.css';
import SuggestedLanguages from './SuggestedLanguages';
import appLanguages from '../../../../data/languages';
import fluencies from '../../../../data/fluencies';

const initialValues = {
  name: '',
  fluency: '',
};

const Languages = ({id, event, visible, onShowForm}) => {
  const {setCurrentStep} = useContext(SettingsContext);
  const path = `${id}.items`;
  const items = useSelector(path, []);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [showForm, setShowForm] = useState(items.length == 0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    name: Yup.string().required(t('shared.forms.validation.required')),
    fluency: Yup.string(),
  });

  useEffect(() => {
    onShowForm && onShowForm(showForm);
  }, [showForm]);

  useEffect(() => {
    items.length && setShowForm(false);
  }, [items.length]);

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
    <section
      className={visible ? `flex flex-1 flex-col ${styles.border}` : 'hidden'}>
      <h2
        style={{fontWeight: 'bold', fontSize: '14px'}}
        className=" focus:outline-none py-5">
        {t(`builder.sections.${id}`)}
      </h2>
      <SuggestedLanguages path={path} />
      <List path={path} event={event} titlePath="name" subtitlePath="fluency" />

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
                options={appLanguages.map((x, i) => ({name: x, id: i}))}
                label={t('shared.forms.name')}
                placeholder="English"
                {...getFieldProps(formik, schema, 'name')}
              />

              <Input
                type="dropdown"
                options={fluencies}
                label={t('builder.languages.fluency')}
                placeholder="Native"
                {...getFieldProps(formik, schema, 'fluency')}
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
    </section>
  );
};

export default memo(Languages);
