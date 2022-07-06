import cookie from 'cookie-cutter';
import {set, isEmpty} from 'lodash';
import {toast} from 'react-toastify';
import {errorExtractor, fixNumbers} from '../utils';
import jwt from 'jwt-decode';
// interface AppServiceParams {
//   url: string;
//   method: 'POST' | 'get' | 'put' | 'OPTIONS' | 'DELETE';
//   params?: any;
//   headers?: any;
//   authToken?: string;
// }

const tokenUpdated = async () => {
  let refreshToken = localStorage.getItem('refreshToken');
  refreshToken = refreshToken && JSON.parse(refreshToken);
  let token = localStorage.getItem('authToken');
  token = token && JSON.parse(token);

  try {
    const refreshAPI = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}talentPage/auth/refresh-tokens`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': 'en',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          refreshToken,
        }),
      },
    );
    const response = await refreshAPI.json();

    localStorage.setItem(
      'refreshToken',
      JSON.stringify(response?.refresh?.token),
    );
    localStorage.setItem('authToken', JSON.stringify(response?.access?.token));

  } catch (error) {
    console.log('refresh token error', error);
  }
};

export default async function AppService({
  url,
  method,
  params,
  headers = {},
  authToken = '',
}) {
  let token = null;
  set(headers, 'Accept', 'application/json');
  set(headers, 'Content-Type', 'application/json');
  set(headers, 'Accept-Language', 'en');
  if (typeof localStorage != 'undefined') {
    token = localStorage.getItem('authToken');
    if (authToken) {
      var decodedToken = jwt(authToken, {complete: true});
      var dateNow = new Date();
      if (decodedToken.exp * 1000 < dateNow.getTime()) {
        tokenUpdated();
      }
    }
  }
  token = JSON.parse(localStorage.getItem('authToken'));
  (authToken != '' || token != null) &&
    set(headers, 'Authorization', `Bearer ${token}`);
  const reqBody = {
    method,
  };


  if (!isEmpty(params)) {
    reqBody.body = JSON.stringify(params);
  }

  const cleanedRequest = JSON.parse(fixNumbers(JSON.stringify(reqBody)));
  const cleanedUrl = fixNumbers(url);
  // const abortController = new AbortController();

  const timeout = setTimeout(() => {
    // abortController.abort();
  }, 20000);

  return fetch(cleanedUrl, {
    ...cleanedRequest,
    headers,
    // signal: abortController.signal,
  })
    .then(async (response) => {
      clearTimeout(timeout);
      if ((authToken != '' || token != null) && response?.status == 401) {
        //Unautherized
        throw new Error(
          `{"message": "${'Languages.YourSessionExpired'}","code": 401}`,
        );
      } else if (response?.status == 404) {
        throw new Error(`{"message": "${'Languages.Oops'}"}`);
      } else if (response?.status < 200 || response?.status >= 300) {
        const error = await response?.json();
        throw new Error(JSON.stringify(error) + '');
      }
      return response.json();
    })
    .then((data) => {
      return {
        result: 'ok',
        data,
        error: null,
        authorized: true,
      };
    })
    .catch((error) => {
      let errorJSON = error;
      try {
        timeout && clearTimeout(timeout);
        const errorMessage = errorExtractor(error);
        toast.error(errorMessage);
        // ShowToast(
        //   errorMessage,
        //   errorMessage == Languages.YourSessionExpired ||
        //     errorMessage == 'Unauthenticated.'
        //     ? 'info'
        //     : 'error',
        // );
        try {
          errorJSON = JSON.parse(error?.message);
        } catch (error) {}
      } catch (error) {}
      return {
        result: 'error',
        data: null,
        error: errorJSON,
        authorized: error.code != 401,
      };
    })
    .catch((error) => {
      let errorJSON = error;
      try {
        timeout && clearTimeout(timeout);
        const errorMessage = errorExtractor(error);
        toast.error(errorMessage);
        // ShowToast(
        //   errorMessage,
        //   errorMessage == Languages.YourSessionExpired ||
        //     errorMessage == 'Unauthenticated.'
        //     ? 'info'
        //     : 'error',
        // );
        try {
          errorJSON = JSON.parse(error?.message);
        } catch (error) {}
      } catch (error) {}
      return {
        result: 'error',
        data: null,
        error: errorJSON,
        authorized: error.code != 401,
      };
    });
}
