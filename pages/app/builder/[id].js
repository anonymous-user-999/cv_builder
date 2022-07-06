import {toast} from 'react-toastify';
import {useTranslation} from 'react-i18next';
import React, {memo, useContext, useEffect, useMemo, useState} from 'react';
import * as styles from './builder.module.css';
import {useDispatch} from '../../../src/contexts/ResumeContext';
import Artboard from '../../../src/components/builder/center/Artboard';
import LeftSidebar from '../../../src/components/builder/left/LeftSidebar';
import LoadingScreen from '../../../src/components/router/LoadingScreen';
import RightSidebar from '../../../src/components/builder/right/RightSidebar';
import SettingsContext from '../../../src/contexts/SettingsContext';
import {useRouter} from 'next/router';
import API from '../../../src/services';
import withAuth from '../../../src/hooks/withAuth';
import Cookies from 'cookies';
import UserContext from '../../../src/contexts/UserContext';
import dayjs from 'dayjs';
import DatabaseContext from '../../../src/contexts/DatabaseContext';

const Builder = (
  {
    // resume
  },
) => {
  const router = useRouter();
  const {query} = router;
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [loading, setLoading] = useState(true);
  const {isSideBarOpen} = useContext(SettingsContext);
  const {authToken, clearUser} = useContext(UserContext);
  const {getUniversities, getEducationTitles, universities, educationTitles} =
    useContext(DatabaseContext);
  const [resume, setResume] = useState(null);

  const handleLoadDemoData = () => {
    dispatch({type: 'load_demo_data'});
  };

  useEffect(() => {
    (async () => {
      const result = await API.ResumeAPI.getResume(
        {
          id: query.id,
        },
        authToken,
      );
      if (!result.authorized) return clearUser();
      try {
        const resume = result.data.resume;
        if (!resume) {
          router.replace('/app/dashboard');
          toast.error(t('builder.toasts.doesNotExist'));
        } else {
          educationTitles.length == 0 && (await getEducationTitles());
          universities.length == 0 && (await getUniversities());
          if (!resume.groups) {
            resume.groups = {
              heading: 'Groups',
              items: [],
              resumeId: resume.id,
              visible: true,
            };
          }
          resume.profile.birthDate = resume.profile.birthDate
            ? dayjs(resume.profile.birthDate).format('YYYY-MM-DD')
            : '';
          dispatch({type: 'set_data', payload: resume});
          setResume(resume);
          return setLoading(false);
        }
      } catch (error) {
        router.replace('/app/dashboard');
        toast.error(t('builder.toasts.doesNotExist'));
      }
    })();
  }, []);

  return useMemo(() => {
    if (loading) {
      return <LoadingScreen />;
    }

    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <LeftSidebar />
        </div>
        <div className={`${styles.center} ${!isSideBarOpen && 'flex-1'}`}>
          <Artboard />
        </div>
        {/* <div className={styles.right}>
          <RightSidebar />
        </div> */}
      </div>
    );
  }, [loading, isSideBarOpen]);
};

export default memo(withAuth(Builder));
