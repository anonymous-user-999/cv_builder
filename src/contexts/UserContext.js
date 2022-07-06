// import {navigate} from '@reach/router';
import {useLocalStorage} from '../hooks';
import {toast} from 'react-toastify';
import React, {
  createContext,
  memo,
  useContext,
  useEffect,
  useState,
} from 'react';
import API from '../services';
import {useGoogleLogin, useGoogleLogout} from 'react-google-login';
import keys from '../constants/keys';
import {useRouter} from 'next/router';
import ModalContext from './ModalContext';
import DatabaseContext from './DatabaseContext';
import cookie from 'cookie-cutter';
import DashboardContext from './DashboardContext';

const defaultUser = {
  uid: null,
  email: null,
  displayName: null,
  isAnonymous: false,
};

const defaultState = {
  loading: false,
  user: null, // defaultUser,
  logout: async () => {},
  loginWithGoogle: async () => {},
  loginWithFacebook: async (accessToken) => {},
  loginWithTwitter: (result) => {},
  loginWithEmail: async () => {},
  signUpWithEmail: async () => {},
  deleteAccount: async () => {},
  authToken: null,
  isGoogleLoading: false,
  isTwitterLoading: false,
  setIsTwitterLoading: () => {},
  updateProfile: async ({
    email,
    phone,
    fullname,
    confirmedName,
    isPhoneVerified,
    targetedJobTitles,
  }) => true,
  getUserData: () => {},
  clearUser: () => {},
};

const UserContext = createContext(defaultState);

const UserProvider = ({children}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isTwitterLoading, setIsTwitterLoading] = useState(false);
  const [user, setUser] = useLocalStorage('user');
  const [authToken, setAuthToken] = useLocalStorage('authToken');
  const [refreshToken, setRefreshToken] = useLocalStorage('refreshToken');

  const {signIn, loaded} = useGoogleLogin({
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    onSuccess: (res) => googleResponse(res),
    onFailure: (res) => googleResponse(res),
  });
  const {emitter, events} = useContext(ModalContext);
  const {checkCompletedResume} = useContext(DatabaseContext);

  const {signOut} = useGoogleLogout({
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    onLogoutSuccess: () => {},
  });

  useEffect(() => {
    if (user || authToken) {
      getUserData().then(() => {
        authToken && cookie.set('authToken', null, {expires: new Date(0)});
        authToken &&
          cookie.set('authToken', authToken, {secure: true, httpOnly: true});
      });
    }
  }, []);

  useEffect(() => {
    if (user || authToken) {
      authToken && cookie.set('authToken', null, {expires: new Date(0)});
      authToken &&
        cookie.set('authToken', authToken, {secure: true, httpOnly: true});
    }
  }, [user, authToken]);

  const googleResponse = async (response) => {
    if (!response.tokenId) {
      toast.error(response + '');
      return setIsGoogleLoading(false);
    }
    const result = await API.AuthAPI.socialLoginCall({
      type: 'GOOGLE',
      token: response.tokenId,
      deviceId: '21222',
    });
    if (result.data) {
      await saveUser(result.data);
    }
    setIsGoogleLoading(false);
  };

  const loginWithGoogle = async () => {
    try {
      setIsGoogleLoading(true);
      signIn();
    } catch (error) {
      toast.error(error.message);
      setIsGoogleLoading(false);
    }
  };

  const loginWithFacebook = async (accessToken) => {
    try {
      const result = await API.AuthAPI.socialLoginCall({
        token: accessToken,
        type: 'FACEBOOK',
        deviceId: '333333',
      });
      if (result.data) {
       await saveUser(result.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loginWithTwitter =async (result) => {
   await saveUser(result);
  };

  const loginWithEmail = async (data) => {
    setLoading(true);
    try {
      const result = await API.AuthEmailAPI.signIn(data);
      if (result?.data) {
        setRefreshToken(result?.data?.tokens?.refresh?.token);
        setAuthToken(result?.data?.tokens?.access?.token);
        setUser(result?.data?.user);
        const resumes = await API.ResumeAPI.getUserResumes(
          result?.data?.tokens?.access?.token,
        );
        if (resumes?.data?.resumes?.results?.length > 0) {
          router.push('/dashboard');
        } else {
          router.push('/app/questionnaire');
        }

        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
    setLoading(false);
  };

  const signUpWithEmail = async (data) => {
    setLoading(true);
    try {
      const result = await API.AuthEmailAPI.signUp(data);
      if (result?.data) {
        setRefreshToken(result?.data?.tokens?.refresh?.token);
        setAuthToken(result?.data?.tokens?.access?.token);
        setUser(result?.data?.user);
        router.push('/app/dashboard');
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
    setLoading(false);
  };

  const saveUser = (result) => {
    setUser(result.user);
    setRefreshToken(result?.tokens?.refresh?.token);
    setAuthToken(result?.tokens?.access?.token);
    if (result.completedResume.hasCompletedResume)
      router.push('/app/dashboard');
    else router.push('/app/questionnaire');
    emitter.emit(events.CLOSE_AUTH_MODAL);
  };

  const logout = async () => {
    try {
      signOut();
      if (refreshToken) {
        try {
          const data = {};
          data.refreshToken = refreshToken;
          const res = await API.AuthEmailAPI.logout(data);
         localStorage.clear();
        } catch (error) {
          toast.error(error?.data?.message);
        }
      }
    } catch (error) {}
    clearUser();
  };

  const updateProfile = async ({
    email,
    fullname,
    phone,
    confirmedName,
    isPhoneVerified,
    targetedJobTitles,
  }) => {
    const result = await API.AuthAPI.updateProfile(
      {
        email,
        fullname,
        phone,
        confirmedName,
        isPhoneVerified,
        targetedJobTitles,
      },
      authToken,
    );
    if (!result.authorized) return clearUser();
    if (result.data) {
      await getUserData();
      return true;
    } else {
      return false;
    }
  };

  const getUserData = async () => {
    const result = await API.AuthAPI.getUserData(authToken);
    if (!result.authorized) return clearUser();
    if (result.data) {
      setUser(result.data.user);
    }
  };

  const clearUser = async () => {
    setUser(null);
    setAuthToken(null);
    cookie.set('authToken', null, {expires: new Date(0)});
    router.replace('/');
  };

  return (
    <UserContext.Provider
      value={{
        authToken,
        user,
        logout,
        loading,
        loginWithGoogle,
        loginWithFacebook,
        loginWithEmail,
        signUpWithEmail,
        isGoogleReady: loaded,
        isGoogleLoading,
        isTwitterLoading,
        setIsTwitterLoading,
        loginWithTwitter,
        updateProfile,
        getUserData,
        clearUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

const memoizedProvider = memo(UserProvider);

export {memoizedProvider as UserProvider};
