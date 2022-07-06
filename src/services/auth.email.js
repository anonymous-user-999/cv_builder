import AppService from './restService.js';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const signUp = (params) => {
  let url = `${apiUrl}talentPage/auth/register`;
  return AppService({
    url,
    method: 'POST',
    params,
  });
};

const signIn = (params) => {
  let url = `${apiUrl}talentPage/auth/login`;
  return AppService({
    url,
    method: 'POST',
    params,
  });
};
const logout = (params) => {
  let url = `${apiUrl}talentPage/auth/logout`;
  return AppService({
    url,
    method: 'POST',
    params,
  });
};

const AuthEmailAPI = {
  signUp,
  signIn,
  logout,
};

export default AuthEmailAPI;
