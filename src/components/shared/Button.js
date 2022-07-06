import {useTranslation} from 'react-i18next';
import React, {memo} from 'react';
import cx from 'classnames';
import {handleKeyUp} from '../../utils';
import * as styles from './Button.module.css';
import Image from 'next/image';
import {AiOutlineLoading} from 'react-icons/ai';

const Button = ({
  icon,
  onClick,
  outline,
  children,
  className,
  isLoading,
  isDelete,
  iconType = 'icon',
  iconSize = '14px',
  ref,
  style,
  disabled,
}) => {
  const {t} = useTranslation();
  const Icon = icon;

  return (
    <button
      disabled={isLoading || disabled}
      ref={ref}
      onKeyUp={(e) => handleKeyUp(e, onClick)}
      onClick={isLoading ? undefined : onClick}
      className={cx(styles.container, className, {
        [styles.outline]: outline,
        [styles.remove]: isDelete,
        [styles.disabled]: disabled,
        [styles.loadingcursor]: isLoading,
      })}
      style={style}>
      {icon ? (
        iconType == 'icon' ? (
          <Icon size={iconSize} className={children ? 'mr-3' : ''} />
        ) : (
          <span
            className={children ? 'mr-3 flex items-center justify-center' : ''}>
            <Image src={icon} width={iconSize} height={iconSize} />
          </span>
        )
      ) : null}
      {isLoading ? (
        <AiOutlineLoading size="18" className={styles.loading} />
      ) : icon && children ? (
        children
      ) : (
        children
      )}
    </button>
  );
};

export default memo(Button);
