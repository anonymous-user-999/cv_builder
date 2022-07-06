import {useTranslation} from 'react-i18next';
import React, {memo, useContext, useState} from 'react';
import Heading from '../../../shared/Heading';
import Input from '../../../shared/Input';
import {useDispatch, useSelector} from '../../../../contexts/ResumeContext';
import * as Yup from 'yup';
import SettingsContext from '../../../../contexts/SettingsContext';
import {Formik} from 'formik';
import {getFieldProps} from '../../../../utils';
import dayjs from 'dayjs';
import {isEmpty} from 'lodash';
import {v4 as uuidv4} from 'uuid';
import {toast} from 'react-toastify';
import * as styles from './Hobbies.module.css';
import Button from '../../../shared/Button';
import cx from 'classnames';
import {VscChromeClose} from 'react-icons/vsc';
import AddButton from '../../../shared/AddButton';

const initialValues = {
  name: '',
};

const Hobby = ({hobby, path}) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch({
      type: 'on_delete_item',
      payload: {
        path,
        value: hobby,
      },
    });
  };

  return (
    <Button
      className={cx('animate__animated animate__bounceIn', styles.hobby, {
        // [styles.selected]: selected,
        // [styles.softskill]: softSkill,
      })}>
      <p>{hobby.name}</p>
      <div className={styles.icon}>
        <VscChromeClose size={'10'} onClick={handleRemove} />
      </div>
    </Button>
  );
};

const Hobbies = ({id, event, visible}) => {
  const dispatch = useDispatch();
  const path = `${id}.items`;
  const items = useSelector(path, []);
  const {setCurrentStep} = useContext(SettingsContext);
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [hobby, setHobby] = useState('');

  const schema = Yup.object().shape({
    name: Yup.string().required(t('shared.forms.validation.required')),
  });

  const onSubmit = async (newData, errors) => {
    setLoading(true);

    if (isEmpty(errors) && hobby != '') {
      dispatch({
        type: 'on_add_item',
        payload: {
          path,
          value: {
            id: uuidv4(),
            name: newData.name,
          },
        },
      });
      setLoading(false);
      setHobby('');
    } else {
      toast.error(t('builder.toasts.formErrors'));
      setLoading(false);
    }
  };

  return (
    <section className={visible ? 'flex flex-1 flex-col' : 'hidden'}>
      <Heading id={id} />
      <Formik
        validateOnBlur
        initialValues={initialValues}
        validationSchema={schema}>
        {(formik) => (
          <div className="grid grid-cols-1 ">
            <Input
              placeholder="Playing Chess"
              {...getFieldProps(formik, schema, 'name')}
              onKeyDown={async (e) => {
                if (e.keyCode === 13) {
                  const errors = await formik.validateForm(formik.values);
                  // isEmpty(errors) &&
                  //   formik.getFieldProps().onChange({e: {target: {value: ''}}});
                  onSubmit(formik.values, errors);
                }
              }}
              value={hobby}
              onChange={(e) => {
                setHobby(e.target.value);
                formik.getFieldProps().onChange(e);
              }}
            />
            <span
              style={{
                opacity: 0.6,
                fontSize: '10px',
                marginTop: '5px',
              }}>
              {t('shared.forms.pressEnter')}
            </span>
          </div>
        )}
      </Formik>
      <div className={styles.list}>
        {items.map((x) => {
          return <Hobby key={x.id} hobby={x} path={path} />;
        })}
      </div>
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

export default memo(Hobbies);
