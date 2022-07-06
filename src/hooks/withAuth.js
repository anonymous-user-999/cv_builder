import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import LoadingScreen from '../components/router/LoadingScreen';
import {useLocalStorage} from './useLocalStorage';

const withAuth = (Component) => {
  const Auth = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [authToken, setAuthToken] = useLocalStorage('authToken');

    const router = useRouter();

    useEffect(() => {
      if (!authToken) {
        router.replace('/home');
      } else {
        setIsLoading(false);
      }
    }, [authToken]);

    if (isLoading) return <LoadingScreen />;

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
