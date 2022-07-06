import React from 'react';
import AdminNavbar from '../../src/components/AdminDashboard/Navbar';
import styles from './styles.module.css';

const NoticationsArr = [
  {
    title: 'Updates And Offers',
    time: '3H Ago',
    details: 'Discounts, Special Offers, New Features And More',
  },
  {
    title: 'Updates And Offers',
    time: '3H Ago',
    details: 'Discounts, Special Offers, New Features And More',
  },
  {
    title: 'Updates And Offers',
    time: '3H Ago',
    details: 'Discounts, Special Offers, New Features And More',
  },
  {
    title: 'Updates And Offers',
    time: '3H Ago',
    details: 'Discounts, Special Offers, New Features And More',
  },
  {
    title: 'Updates And Offers',
    time: '3H Ago',
    details: 'Discounts, Special Offers, New Features And More',
  },
  {
    title: 'Updates And Offers',
    time: '3H Ago',
    details: 'Discounts, Special Offers, New Features And More',
  },
  {
    title: 'Updates And Offers',
    time: '3H Ago',
    details: 'Discounts, Special Offers, New Features And More',
  },
  {
    title: 'Updates And Offers',
    time: '3H Ago',
    details: 'Discounts, Special Offers, New Features And More',
  },
];

const Notifications = () => {
  return (
    <div>
      <AdminNavbar />
      <div className={styles.mainContainer}>
        <div className={styles.documetnsHeader}>
          <h3 className={styles.documentsHeading}>Notifications</h3>
        </div>
        {NoticationsArr?.map((notfc) => (
          <div className={styles.notification}>
            <div className="flex justify-between items-center">
              <h3 className={styles.notificationHeading}>{notfc?.title}</h3>
              <div className={styles.notificationTime}>{notfc?.time}</div>
            </div>
            <div className={styles.notificationDetails}>{notfc?.details}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
