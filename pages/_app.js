import '../src/styles/global.css';
import '../src/i18n';
import '../src/styles/forms.css';
import '../src/styles/shadows.css';
import '../src/styles/toastify.css';
import '../src/utils/dayjs';
import 'animate.css';
import 'swiper/css';
import 'react-phone-input-2/lib/style.css';
import React from 'react';
import {SettingsProvider} from '../src/contexts/SettingsContext';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import {ModalProvider} from '../src/contexts/ModalContext';
import {UserProvider} from '../src/contexts/UserContext';
import {DashboardProvider} from '../src/contexts/DashboardContext';
import {DatabaseProvider} from '../src/contexts/DatabaseContext';
import {ResumeProvider} from '../src/contexts/ResumeContext';
import {StorageProvider} from '../src/contexts/StorageContext';
import {CookiesProvider} from 'react-cookie';
import Wrapper from '../src/components/shared/Wrapper';
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import favicon from '../public/favicon.ico';
import Head from 'next/head';
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import 'react-multi-carousel/lib/styles.css';
import {config} from '@fortawesome/fontawesome-svg-core';
import 'react-multi-carousel/lib/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-circular-progressbar/dist/styles.css';
config.autoAddCss = false;

if (typeof window !== 'undefined') {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: 'AIzaSyCnuPQHPu-Rg3xt7J12qoVh9kOI0zqLLDQ',
    authDomain: 'resume-builder-334417.firebaseapp.com',
    projectId: 'resume-builder-334417',
    storageBucket: 'resume-builder-334417.appspot.com',
    messagingSenderId: '652339360451',
    appId: '1:652339360451:web:836dd3317d2e4933a36876',
    measurementId: 'G-B87SSFBFNS',
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
}
const theme = createMuiTheme({
  typography: {
    fontWeightRegular: 500,
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
});
function MyApp({Component, pageProps}) {
  return (
    <CookiesProvider>
      <SettingsProvider>
        <MuiThemeProvider theme={theme}>
          <ModalProvider>
            <UserProvider>
              <DashboardProvider>
                <DatabaseProvider>
                  <ResumeProvider>
                    <StorageProvider>
                      <Wrapper>
                        <Head>
                          <link rel="shortcut icon" href={favicon.src} />
                        </Head>
                        <Component {...pageProps} />
                      </Wrapper>
                    </StorageProvider>
                  </ResumeProvider>
                </DatabaseProvider>
              </DashboardProvider>
            </UserProvider>
          </ModalProvider>
        </MuiThemeProvider>
      </SettingsProvider>
    </CookiesProvider>
  );
}

MyApp.getInitialProps = async ({Component, ctx}) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return {pageProps};
};

export default MyApp;
