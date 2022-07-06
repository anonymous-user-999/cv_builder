import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useContext, useEffect, useState} from 'react';
import CoverLetter from '../../src/components/CoverLetter';
import DatabaseContext from '../../src/contexts/DatabaseContext';
import UserContext from '../../src/contexts/UserContext';
import styles from './styles.module.css';

const LetterView = () => {
  const {user, authToken} = useContext(UserContext);
  const {getResume, loading} = useContext(DatabaseContext);
  const [coverLetter, setCoverLetter] = useState({});

  const router = useRouter();
  const {query} = router;
  useEffect(() => {
    !user && router.push('/');
    (async () => {
      const res = await getResume(query?.id);
      setCoverLetter(res?.coverLetter);
    })();
  }, []);
  const {
    companyName = '',
    hiringManagerName,
    body,
    resumeId,
    visible,
    createdAt,
    updatedAt,
    id,
  } = coverLetter;
  return (
    <div className={styles.main}>
      <Link href={`/edit-letter/${query?.id}`}>
        <div className={styles.templateCross}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </Link>
      <div className={styles.templateContainer}>
        <CoverLetter
          mainView
          jobTitle={companyName}
          data={body}
          hiringManager={hiringManagerName}
        />
      </div>
    </div>
  );
};

export default LetterView;
