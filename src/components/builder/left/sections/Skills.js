import {useTranslation} from 'react-i18next';
import React, {memo, useContext, useEffect, useState} from 'react';
import Heading from '../../../shared/Heading';
import Input from '../../../shared/Input';
import List from '../../lists/List';
import SuggestedSkills from './SuggestedSkills';
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
import Languages from './Languages';
import Tip from '../../../shared/Tip';

const initialValues = {
  name: '',
  level: '',
};

const Skills = ({id, event, visible}) => {
  const {setCurrentStep} = useContext(SettingsContext);
  const path = `${id}.items`;
  const items = useSelector(path, []);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [showForm, setShowForm] = useState(items.length == 0);
  const [isAddingLangue, setIsAddingLangue] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    name: Yup.string().required(t('shared.forms.validation.required')),
    level: Yup.string(),
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

  useEffect(() => {
    items.length && setShowForm(false);
  }, [items.length]);

  return (
    <section className={visible ? 'flex flex-1 flex-col' : 'hidden'}>
      <Heading id={id} />
      <SuggestedSkills path={path} />
      <List
        path={path}
        event={event}
        hasDate
        titlePath="name"
        subtitlePath="level"
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
                label={t('shared.forms.name')}
                placeholder="ReactJS"
                {...getFieldProps(formik, schema, 'name')}
              />

              <Input
                type="date"
                label={t('shared.forms.startDate')}
                {...getFieldProps(formik, schema, 'startDate')}
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
      {!showForm && (
        <Tip
          text={t('builder.sections.skillsTip')}
          value={items.length}
          maxValue={20}
          mb={5}
        />
      )}
      <Languages
        id="languages"
        visible={true}
        onShowForm={(showForm) => {
          setIsAddingLangue(showForm);
        }}
      />
      {items.length > 0 && !showForm && !isAddingLangue && (
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

export default memo(Skills);
