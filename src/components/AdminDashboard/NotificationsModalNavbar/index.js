import { faBell } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, {forwardRef} from 'react';
import styles from './styles.module.css';

const NotificationsModalNavbar = forwardRef(({open, Notifications}, ref) => {
  return (
    open && (
      <div className={styles.notificationsModal} ref={ref}>
        <div className={styles.notificationsContainer}>
          <div className={styles.notificationsHeader}>
            <FontAwesomeIcon
              icon={faBell}
              className={styles.notificationBell}
            />
            <h4 className={styles.notificationsHeading}>Notifications</h4>
            <FontAwesomeIcon
              icon={faBell}
              className={styles.notificationBell}
              style={{visibility: 'hidden'}}
            />
          </div>
          {Notifications?.map((notification) => (
            <div className={styles.notification}>
              <div
                style={
                  notification?.readed ? {color: '#2B2E35'} : {color: '#00B884'}
                }
                className="flex justify-between items-center">
                <h3 className={styles.notificationTitle}>
                  {notification?.title}
                </h3>
                <div className={styles.notificationTime}>
                  {notification?.time}
                </div>
              </div>
              <div className={styles.notificationDetails}>
                {notification?.details}
              </div>
            </div>
          ))}
          <div className={styles.notificationSeeMore}>
            <Link href="/notifications">See More</Link>
          </div>
        </div>
      </div>
    )
  );
});

export default NotificationsModalNavbar;
