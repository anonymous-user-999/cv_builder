import {FaAngleDown} from 'react-icons/fa';
import {MdOpenInNew} from 'react-icons/md';
import {Trans, useTranslation} from 'react-i18next';
import {isFunction} from 'lodash';
import {v4 as uuidv4} from 'uuid';
import React, {memo, useEffect, useState} from 'react';
import cx from 'classnames';
import {useDispatch, useSelector} from '../../contexts/ResumeContext';
import {handleKeyUp} from '../../utils';
import * as styles from './Input.module.css';
import Tip from './Tip';
import {ReactSearchAutocomplete} from 'react-search-autocomplete';
import PhoneInput from 'react-phone-input-2';

const Input = ({
  name,
  path,
  label,
  error,
  value,
  onBlur,
  options,
  touched,
  onClick,
  onChange,
  className,
  inputClassName,
  isRequired,
  placeholder,
  type = 'text',
  icon,
  iconColor,
  iconPosition = 'right',
  maxLength = type == 'textarea' ? 200 : 50,
  tip,
  onKeyDown,
  onlySelect = false,
  ...rest
}) => {
  const {t} = useTranslation();
  const [uuid, setUuid] = useState(null);
  const stateValue = useSelector(path, '');
  const dispatch = useDispatch();
  const Icon = icon;
  const [focused, setFocused] = useState(false);
  const [phoneUtil, setPhoneUtil] = useState(null);

  useEffect(() => {
    setUuid(uuidv4());
  }, []);

  value = path ? stateValue : value;
  onChange = isFunction(onChange)
    ? onChange
    : (e) => {
        dispatch({
          type: 'on_input',
          payload: {
            path,
            value: e.target.value,
          },
        });
      };
  const [search, setSearch] = useState(value);

  const handleOnSearch = (string, results) => {
    setSearch(string);
    !onlySelect && onChange({target: {name, value: string}});
  };

  const handleOnHover = (result) => {};

  const handleOnSelect = (item) => {
    setFocused(false);
    onChange({target: {name, value: item.name}});
  };

  const handleOnFocus = () => {
    setFocused(true);
  };

  const formatResult = (item) => {
    return item;
  };

  return (
    <div className={className}>
      <label htmlFor={uuid}>
        <span
          onClick={() => {
            setFocused(false);
          }}
          style={{
            color: 'black',
          }}>
          {label}{' '}
          {isRequired && (
            <span className="opacity-75 font-normal lowercase">
              ({t('shared.forms.required')})
            </span>
          )}
        </span>

        {(type === 'text' ||
          type === 'date' ||
          type === 'email' ||
          type === 'password') && (
          <div className="relative  flex items-center">
            <input
              id={uuid}
              name={name}
              type={type}
              value={value}
              onBlur={onBlur}
              style={{
                backgroundColor: '#EBF9F5',
                paddingLeft: icon && iconPosition == 'left' ? '24px' : '',
                paddingRight: icon && iconPosition == 'right' ? '24px' : '',
              }}
              onChange={onChange}
              placeholder={placeholder}
              className={styles.myinput}
              maxLength={maxLength}
              onKeyDown={onKeyDown}
              {...rest}
            />
            {icon && (
              <div className={`absolute ${iconPosition}-2`}>
                <Icon size="16px" color={iconColor || 'var(--app-color)'} />
              </div>
            )}
          </div>
        )}
        {type == 'phone' && (
          <PhoneInput
            inputProps={{
              id: uuid,
              name,
            }}
            country={'jo'}
            value={value}
            onBlur={onBlur}
            onChange={(phone, country, e, f) => {
              onChange({
                target: {
                  value: phone,
                  country,
                  name,
                },
              });
            }}
            containerClass={styles.phone}
            inputClass={styles.phoneinput}
            buttonClass={styles.flag}
            dropdownClass={styles.countries}
            countryCodeEditable={false}
            enableSearch
            disableSearchIcon
            searchClass={styles.search}
          />
        )}
        {type === 'autocomplete' && (
          <div className="">
            <ReactSearchAutocomplete
              items={options}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              autoFocus={false}
              showClear={false}
              // formatResult={formatResult}
              maxResults={4}
              styling={{
                boxShadow: null,
                borderRadius: '4px',
                border: focused ? '1px solid var(--app-color)' : '',
                width: '100%',
                zIndex: '100',
                position: 'auto',
                dispaly: 'block',
                backgroundColor: 'rgb(235, 249, 245)',
                fontWeight: 'lighter !important',
                minHeight: '30px !important',
                height: '37px',
                display: 'flex',
                flex: '1',
                fontFamily: 'Arial',
                fontSize: '13px',
                color: 'var(--color-primary-900)',
              }}
              showIcon={false}
              placeholder={placeholder}
              inputSearchString={search}
              fuseOptions={{minMatchCharLength: 2}}
            />
            {false && (
              <input
                id={uuid}
                name={name}
                type={type}
                value={value}
                onBlur={onBlur}
                style={{
                  backgroundColor: '#EBF9F5',
                }}
                onChange={onChange}
                placeholder={placeholder}
                className={styles.myinput}
                maxLength={maxLength}
                onKeyDown={onKeyDown}
              />
            )}
            {icon && (
              <div className="absolute right-2">
                <Icon size="16px" color="var(--app-color)" />
              </div>
            )}
          </div>
        )}
        {type === 'textarea' && (
          <div className="flex flex-col">
            <textarea
              id={uuid}
              rows="4"
              name={name}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder={placeholder}
              className={inputClassName}
              style={{
                backgroundColor: '#EBF9F5',
              }}
              className={styles.myinput}
              maxLength={1000}
            />
            {tip && (
              <Tip
                text={tip}
                value={value.trim().length}
                maxValue={maxLength}
                mb={0}
                mt={1}
              />
            )}
          </div>
        )}

        {type === 'dropdown' && (
          <div className="relative grid items-center">
            <select
              id={uuid}
              name={name}
              value={value}
              onBlur={onBlur}
              className={styles.myinput}
              style={{
                backgroundColor: '#EBF9F5',
              }}
              onChange={onChange}>
              {options.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>

            <FaAngleDown
              size="16px"
              className="absolute right-0 opacity-50 hover:opacity-75 mx-4"
            />
          </div>
        )}

        {type === 'color' && (
          <div className="relative grid items-center">
            <div className={styles.circle} style={{backgroundColor: value}} />

            <input
              id={uuid}
              name={name}
              type="text"
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder={placeholder}
              className={inputClassName}
            />
          </div>
        )}

        {type === 'action' && (
          <div className={cx('relative grid items-center', styles.readOnly)}>
            <input readOnly id={uuid} name={name} type="text" value={value} />

            <div
              tabIndex="0"
              role="button"
              onClick={onClick}
              onKeyUp={(e) => handleKeyUp(e, onClick)}>
              <MdOpenInNew size="16px" />
            </div>
          </div>
        )}

        {error && touched && <p className={styles.inputError}>{error}</p>}
      </label>
    </div>
  );
};

export default memo(Input);
