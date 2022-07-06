import React, {memo} from 'react';
import cx from 'classnames';
import * as styles from './Logo.module.css';
import Image from 'next/image';

const Logo = ({size = '40px', className}) => {
  return (
    <span className={styles.container}>
      <object type="image/svg+xml" data="/images/logo_animated.svg" width={size} ></object>
      <object type="image/svg+xml" data="/images/title.svg" height={size} style={{marginLeft: 10 + 'px'}} ></object>
    </span>
  );
};

export default memo(Logo);
