import React from 'react';
import cx from 'classnames';
import * as styles from './SmartTailorButton.module.css';
import {AiOutlinePlus, AiOutlineCheck} from 'react-icons/ai';

const SmartTailorButton = ({data, onClick}) => (
  <div
    onClick={() => {
      onClick && onClick(data);
    }}
    className={styles.container}>
    <span
      className={cx(styles.icon, {
        [styles.selected]: data.selected,
      })}>
      {data.selected ? (
        <AiOutlineCheck color={'white'} size={'14px'} />
      ) : (
        <AiOutlinePlus color={'var(--app-color)'} size={'14px'} />
      )}
    </span>
    <p>{data.name}</p>
  </div>
);

export default SmartTailorButton;
