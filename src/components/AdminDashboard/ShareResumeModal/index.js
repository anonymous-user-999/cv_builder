import React, { useState } from 'react';
import styles from './styles.module.css';
import Modal from '@mui/material/Modal';
import {faXmark, faCopy} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faWhatsapp,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import {useMediaQuery} from '@mui/material';
import { toast } from 'react-toastify';

const Base_Url="https://staging.cvitae.ai"

const ShareResumeModal = ({open, setOpen, id,endpoint,title}) => {
  const isSmallerThan768 = useMediaQuery('(max-width: 768px)');
  const [copied,setCopied]=useState(false);

const onClickCopy=(text)=>{
  navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(()=>{
setCopied(false)
    },5000)
    toast.success("Copied!")
}

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <div className={styles.modalWrapper}>
        <div className={styles.modalMain}>
          <div className={styles.header}>
            <div className={styles.heading}>Share</div>
            {!isSmallerThan768 && (
              <div className={styles.cross} onClick={() => setOpen(false)}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            )}
          </div>
          <div className={styles.mainContainer}>
            <h3 className={styles.mainHeading}>Share a Link to Your Resume</h3>
            <div className={styles.para}>
              Share This Link On Social Media Or Copy And Paste The URL To Send
              Your Resume Via Text, Email Or To Share Your Resume On Your
              Personal Website.
            </div>
            {isSmallerThan768 ? (
              <div className={styles.urlHeading}>
                Link <span className={styles.optionalText}>(Optional)</span>{' '}
              </div>
            ) : (
              <div className={styles.urlHeading}>Copy This Private URL</div>
            )}
            <div className={styles.urlContainer}>
              <div
                className={
                  styles.url
                }>{`${Base_Url}${endpoint}`}</div>
              {/* https://staging.cvitae.ai/ */}
              <div className={styles.copyIcon} title={copied?"Copied":"Copy"}
              onClick={()=>onClickCopy(`${Base_Url}${endpoint}`)}
              id="share-modal-copy-to-clipboard"
              >
                <FontAwesomeIcon icon={faCopy} />
              </div>
            </div>
            <div className="flex justify-between items-center flex-wrap">
              <div className="flex flex-wrap">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${Base_Url}${endpoint}&t=${title}`} target="_blank" title="Share on Facebook">
                <div className={styles.media}>
                  <FontAwesomeIcon icon={faFacebookF} color="#1877F2" />
                </div>
                  </a>
                  <a href={`https://twitter.com/share?url=${Base_Url}${endpoint}&text=${title}`}  target="_blank" title="Share on Twitter">
                <div className={styles.media}>
                  <FontAwesomeIcon icon={faTwitter} color="#1DA1F2" />
                </div>
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${Base_Url}${endpoint}`}  target="_blank" title="Share on Linkedin">
                <div className={styles.media}>
                  <FontAwesomeIcon icon={faLinkedinIn} color="#0A66C2" />
                </div>
                </a>
                <a href={`whatsapp://send?text==${Base_Url}${endpoint}`} data-action="share/whatsapp/share"  target="_blank" title="Share on whatsapp">
                <div className={styles.media}>
                  <FontAwesomeIcon icon={faWhatsapp} color="#25D366" />
                </div>
                </a>
                {/* <div className={styles.media}>
                  <FontAwesomeIcon icon={faInstagram} color="#C32AA3" />
                </div>  */}
                <a href={`mailto:?subject=My ${title}&body=${Base_Url}${endpoint}`}  target="_blank" title="Share on Mail">
                <div className={styles.media}>
                  <FontAwesomeIcon icon={faEnvelope} color="#2B2E35" />
                </div>
                </a>
              </div>
              {!isSmallerThan768 && (
                <a href={`${Base_Url}${endpoint}`} target="_blank">
                  <button className={styles.btn}>Open Link</button>
                </a>
              )}
            </div>
          </div>
        </div>
        {isSmallerThan768 && (
          <div className={styles.footer}>
            <button
              onClick={() => setOpen(false)}
              className={styles.btnOutline}>
              Cancel
            </button>
            <a href={`${Base_Url}${endpoint}`} target="_blank">
              <button className={styles.btn}>Open Link</button>
            </a>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ShareResumeModal;
