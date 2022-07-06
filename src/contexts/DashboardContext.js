import {toast} from 'react-toastify';
import React, {
  createContext,
  memo,
  useContext,
  useEffect,
  useState,
} from 'react';
import API from '../services';
import {useRouter} from 'next/router';
import UserContext from './UserContext';

const defaultState = {
  loading: false,
};

const DashboardContext = createContext(defaultState);

const DashboardProvider = ({children}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {user, authToken} = useContext(UserContext);

  return (
    <DashboardContext.Provider
      value={{
        loading,
      }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;

const memoizedProvider = memo(DashboardProvider);

export {memoizedProvider as DashboardProvider};
