import {set} from 'lodash';
import {toast} from 'react-toastify';
import {errorExtractor} from '../utils';

export default function AppServiceForm({
  url,
  method,
  form,
  headers = {},
  authToken = null,
  timeoutValue = 60 * 1000,
}) {
  set(headers, 'Accept', 'application/json');
  // set(
  //   headers,
  //   'Content-Type',
  //   headers['Content-Type'] || 'multipart/form-data',
  // );
  authToken != '' && set(headers, 'Authorization', `Bearer ${authToken}`);

  const reqBody = {
    method,
    headers,
    body: null,
  };
  reqBody.body = form;

  // const abortController = new AbortController();

  const timeout = setTimeout(() => {
    // abortController.abort();
  }, timeoutValue);

  return fetch(url, {
    ...reqBody,
    //  signal: abortController.signal
  })
    .then(async (response) => {
      clearTimeout(timeout);
      if (response?.status == 401) {
        //Unautherized

        throw new Error(
          `{"message": "${'Languages.YourSessionExpired'}","code": 401}`,
        );
      } else if (response?.status == 404) {
        throw new Error(`{"message": "${'Languages.Oops'}"}`);
      } else if (response.status >= 500 && response.status <= 600) {
        throw new Error(`{"message": "${'Languages.ServerError'}"}`);
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
