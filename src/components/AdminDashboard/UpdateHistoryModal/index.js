import React from 'react';
import styles from './styles.module.css';
import Modal from '@mui/material/Modal';
import {
  faXmark,
  faDesktop,
  faMobileScreenButton,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import moment from 'moment';

const Veiwers = [
  {
    device: faDesktop,
    name: 'Jordan, 02',
    time: '11:20 Am',
  },
  {
    device: faDesktop,
    name: 'Jordan, 02',
    time: '11:20 Am',
  },
  {
    device: faMobileScreenButton,
    name: 'Jordan, 02',
    time: '11:20 Am',
  },
  {
    device: faMobileScreenButton,
    name: 'Jordan, 02',
    time: '11:20 Am',
  },
  {
    device: faMobileScreenButton,
    name: 'Jordan, 02',
    time: 'Jan 10',
  },
];

const UpdateHistoryModal = ({open, setOpen, data = []}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <div className={styles.modalMain}>
        <div className={styles.header}>
          <div className={styles.heading}>Updates History</div>
          <div className={styles.cross} onClick={() => setOpen(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className={styles.main}>

          {data?.length>0?data?.map((veiwer) => (
            <div className={styles.viewer}>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={
                    veiwer?.device === 'computer'
                      ? faDesktop
                      : faMobileScreenButton
                  }
                  className={styles.device}
                />
                <h4 className={styles.name}>
                  {`${veiwer?.location?.location || 'Jordan'},
                    ${moment(veiwer?.time)?.format('DD')}`}
                </h4>
              </div>
              <div className={styles.time}>{moment(veiwer?.time)?.format('hh:mm A')}</div>
            </div>
          )):<div className={`${styles.heading} text-center` }>Nothing to show</div>}
        </div>
      </div>
    </Modal>
  );
};

export default UpdateHistoryModal;
