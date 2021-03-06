import {Menu, MenuItem} from '@material-ui/core';
// import { toUrl } from 'gatsby-source-gravatar';
import {useTranslation} from 'react-i18next';
import React, {memo, useContext, useMemo, useState} from 'react';
import cx from 'classnames';
import UserContext from '../../contexts/UserContext';
import {handleKeyUp} from '../../utils';
import * as styles from './Avatar.module.css';
import Image from 'next/image';

const Avatar = ({className}) => {
  const {t} = useTranslation();
  const {user, logout} = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <div>
      <div
        tabIndex="0"
        role="button"
        className="flex focus:outline-none"
        onClick={handleClick}
        onKeyUp={(e) => handleKeyUp(e, handleClick)}>
        <img
          src={user ? user.profilePicture : '/logo.png'}
          alt={user ? user.fullname : 'Anonymous User'}
          className={cx(styles.container, className)}
        />
      </div>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}>
        <MenuItem onClick={handleLogout}>{t('shared.buttons.logout')}</MenuItem>
      </Menu>
    </div>
  );
};

export default memo(Avatar);
