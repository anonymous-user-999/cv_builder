import {toast} from 'react-toastify';
import React, {createContext, memo, useContext, useRef} from 'react';
// import firebase from 'gatsby-plugin-firebase';
import {isFileImage} from '../utils';
import {useDispatch, useSelector} from './ResumeContext';
import UserContext from './UserContext';
import API from '../services';

const defaultState = {
  uploadPhotograph: async () => {},
};

const StorageContext = createContext(defaultState);

const StorageProvider = ({children}) => {
  const toastId = useRef(null);

  const {clearUser, authToken} = useContext(UserContext);

  const id = useSelector('id');
  const dispatch = useDispatch();

  const uploadPhotograph = async (file) => {
    if (!file) {
      return null;
    }

    if (!isFileImage(file)) {
      toast.error(
        "You tried to upload a file that was not an image. That won't look good on your resume. Please try again.",
      );
      return null;
    }

    if (file.size > 2097152) {
      toast.error(
        "Your image seems to be bigger than 2 MB. That's way too much. Maybe consider reducing its size?",
      );
      return null;
    }

    const result = await API.ResumeAPI.uploadResumeImage(
      {
        id,
        file,
      },
      authToken,
    );
    if (!result.authorized) return clearUser();
    if (result.data) {
      dispatch({
        type: 'on_input',
        payload: {
          path: 'profile.photograph',
          value: result.data.imageUrl,
        },
      });
    }
  };

  return (
    <StorageContext.Provider
      value={{
        uploadPhotograph,
      }}>
      {children}
    </StorageContext.Provider>
  );
};

export default StorageContext;

const memoizedProvider = memo(StorageProvider);

export {memoizedProvider as StorageProvider};
