import {debounce} from 'lodash';
import React, {createContext, memo, useContext, useState} from 'react';
import UserContext from './UserContext';
import {toast} from 'react-toastify';
import {useTranslation} from 'react-i18next';
import API from '../services/index';
import {useRouter} from 'next/router';
import {useLocalStorage} from '../hooks';

const DEBOUNCE_WAIT_TIME = 4000;

const defaultState = {
  isUpdating: false,
  resumes: [],
  loading: true,
  createResume: async ({name}) => {},
  duplicateResume: async () => {},
  deleteResume: async () => true,
  getResume: async () => {},
  getResumes: async () => {},
  updateResume: async () => {},
  renameResume: async () => true,
  debouncedUpdateResume: async () => {},
  checkCompletedResume: async (e) => {},
  activeResume: null,
  setActiveResume: () => {},
  userProgress: 0,
  uploadResume: (file) => {},
  universities: [],
  setUniversities: (value) => {},
  educationTitles: [],
  setEducationTitles: (value) => {},
  getUniversities: async () => {},
  getEducationTitles: async () => {},
};

const DatabaseContext = createContext(defaultState);

const DatabaseProvider = ({children}) => {
  const dictionary = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  const router = useRouter();
  const {t} = useTranslation();

  const [isUpdating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resumes, setResumes] = useState([]);
  const [activeResume, setActiveResume] = useState(null);
  const [userProgress, setUserProgress] = useState(0);
  const [universities, setUniversities] = useState([]);
  const [educationTitles, setEducationTitles] = useState([]);
  const {user, authToken, clearUser} = useContext(UserContext);

  const getResume = async (id) => {
    setLoading(true);
    try {
      const result = await API.ResumeAPI.getResume(
        {
          id,
        },
        authToken,
      );
      if (!result.authorized) return clearUser();
      if (result.data) {
        setLoading(false);
        return result.data.resume;
      }
      setLoading(false);
      return null;
    } catch (error) {
      setLoading(false);
      return null;
    }
  };

  const getResumes = async (loading = true) => {
    setLoading(loading);
    const result = await API.ResumeAPI.getUserResumes(authToken);
    if (!result.authorized) return clearUser();
    if (result.data) {
      setResumes(result.data.resumes.results);
    }
    setLoading(false);
  };

  const createResume = async ({name}) => {
    if (!authToken) {
      return toast.error(t('modals.auth.unAuthorized'));
    }
    const newResume = {
      name,
    };
    const result = await API.ResumeAPI.createResume(newResume, authToken);
    if (!result.authorized) return clearUser();
    if (result.data) {
      getResumes(false);
      return result.data.resume;
    }
    return null;
  };

  const uploadResume = async (file) => {
    if (!authToken) {
      return toast.error(t('modals.auth.unAuthorized'));
    }
    const result = await API.ResumeAPI.uploadResume({file}, authToken);
    if (!result.authorized) return clearUser();
    if (result.data) {
      return result.data.resume;
    }
    return null;
  };

  const duplicateResume = async (originalResume) => {};

  const updateResume = async (resume) => {
    setUpdating(true);
    const result = await API.ResumeAPI.updateResume({resume}, authToken);
    if (!result.authorized) return clearUser();
    setUpdating(false);
  };

  const renameResume = async (resume) => {
    setUpdating(true);
    const result = await API.ResumeAPI.renameResume({resume});
    if (!result.authorized) return clearUser();
    if (result.data) {
      const idx = resumes.findIndex((x) => x.id == resume.id);
      if (idx != -1) {
        resumes[idx] = resume;
        setResumes(resumes);
      }
    }
    setUpdating(false);
    return result.data != null;
  };

  const checkCompletedResume = async (isReplace = false) => {
    const result = await API.ResumeAPI.checkCompletedResume(authToken);
    if (!result.authorized) return clearUser();
    if (result.data) {
      if (result.data.hasCompletedResume) {
        setActiveResume(null);
        setUserProgress(0);
        router.push('/app/dashboard');
      } else {
        setActiveResume(result.data.activeResume);
        setUserProgress(result.data.userProgress);
        isReplace
          ? router.replace('/app/questionnaire')
          : router.push('/app/questionnaire');
      }
    }
  };

  const debouncedUpdateResume = debounce(updateResume, DEBOUNCE_WAIT_TIME);

  const deleteResume = async (id) => {
    const result = await API.ResumeAPI.deleteResume({id});
    if (!result.authorized) return clearUser();
    if (result.data) {
      setResumes((prev) => prev.filter((x) => x.id != id));
      return true;
    }
    return false;
  };

  const getUniversities = async () => {
    const result = await API.ResumeAPI.getUniversities(authToken);
    if (!result.authorized) return clearUser();
    if (result.data) {
      setUniversities(result.data.universities);
    }
  };

  const getEducationTitles = async () => {
    const result = await API.ResumeAPI.getEducationTitles(authToken);
    if (!result.authorized) return clearUser();
    if (result.data) {
      setEducationTitles(result.data.educationTitles);
    }
  };

  return (
    <DatabaseContext.Provider
      value={{
        isUpdating,
        loading,
        resumes,
        getResume,
        getResumes,
        createResume,
        duplicateResume,
        updateResume,
        deleteResume,
        debouncedUpdateResume,
        checkCompletedResume,
        activeResume,
        userProgress,
        uploadResume,
        setActiveResume,
        renameResume,
        universities,
        setUniversities,
        educationTitles,
        setEducationTitles,
        getUniversities,
        getEducationTitles,
      }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseContext;

const memoizedProvider = memo(DatabaseProvider);

export {
  memoizedProvider as DatabaseProvider,
  DEBOUNCE_WAIT_TIME as DebounceWaitTime,
};
