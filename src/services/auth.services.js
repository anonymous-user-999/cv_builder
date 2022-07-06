import AppService from './restService.js';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const signInCall = (params) => {
  let url = `${apiUrl}talentPage/auth/login`;
  return AppService({
    url,
    method: 'POST',
    params,
  });
};

const socialLoginCall = (params) => {
  let url = `${apiUrl}talentPage/auth/social`;
  return AppService({
    url,
    method: 'POST',
    params: {
      ...params,
      deviceId: '123123-32424234123123',
    },
  });
};

const updateProfile = (params, authToken) => {
  let url = `${apiUrl}talentPage/auth/updateProfile`;
  return AppService({
    url,
    method: 'POST',
    params,
    authToken,
  });
};

const getUserData = (authToken) => {
  let url = `${apiUrl}talentPage/auth/user`;
  return AppService({
    url,
    method: 'get',
    authToken,
  });
};

const AuthAPI = {
  signInCall,
  socialLoginCall,
  updateProfile,
  getUserData,
};

export default AuthAPI;
