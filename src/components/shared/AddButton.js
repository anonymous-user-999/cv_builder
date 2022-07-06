import React from 'react';
import {useTranslation} from 'react-i18next';
import {MdAdd} from 'react-icons/md';
import Button from './Button';
import * as styles from './AddButton.module.css';
import cx from 'classnames';

const AddButton = ({
  onClick,
  onCancel,
  showCancel,
  title,
  cancelTitle,
  loading,
  flex,
}) => {
  const {t} = useTranslation();
  return (
    <div className={styles.container}>
      {showCancel && (
        <Button onClick={onCancel} className={styles.cancel}>
          <span>{cancelTitle || t('shared.buttons.cancel')}</span>
        </Button>
      )}
      <Button
        icon={showCancel || title == t('shared.buttons.next') ? null : MdAdd}
        onClick={onClick}
        isLoading={loading}
        className={cx(styles.add, {
          [styles.end]: !flex,
        })}>
        <span>{title || t('shared.buttons.add')}</span>
      </Button>
    </div>
  );
};

export default AddButton;
