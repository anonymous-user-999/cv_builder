// import {ResumeModel} from '../constants/Types';
import {useLocalStorage} from '../hooks';
import AppService from './restService';
import AppServiceForm from './restServiceForm';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const join = (params, separator = '&') => {
  let string = '';
  Object.keys(params).map((key, index) => {
    string +=
      params[key] != null && params[key] != undefined
        ? `${key}=${params[key]}${
            index == Object.keys(params)?.length - 1 ? '' : separator
          }`
        : '';
  });
  return string;
};

const objectToFormData = (params) => {
  const form = new FormData();
  Object.keys(params).forEach((key) => {
    params[key] && form.append(key, params[key]);
  });
  return form;
};

const getUserResumes = (authToken) => {
  let url = `${apiUrl}talentPage/resume/userResumes`;
  return AppService({
    url,
    method: 'get',
    authToken,
  });
};

const getResume = (params, authToken) => {
  let url = `${apiUrl}talentPage/resume/get/${params.id}`;
  return AppService({
    url,
    method: 'get',
    authToken,
  });
};

const viewResume = (params) => {
  let url = `${apiUrl}talentPage/resume/view/${params.id}`;
  return AppService({
    url,
    method: 'get',
  });
};

const createResume = (params, authToken) => {
  let url = `${apiUrl}talentPage/resume/create`;
  return AppService({
    url,
    method: 'POST',
    params,
    authToken,
  });
};

const updateResume = (params, authToken) => {
  let url = `${apiUrl}talentPage/resume/update/${params.resume.id}`;
  return AppService({
    url,
    method: 'put',
    params,
    authToken,
  });
};

const checkCompletedResume = (authToken) => {
  let url = `${apiUrl}talentPage/resume/checkCompletedResume`;
  return AppService({
    url,
    method: 'get',
    authToken,
  });
};

const uploadResume = (params, authToken) => {
  let url = `${apiUrl}talentPage/resume/upload`;
  const form = objectToFormData(params);
  return AppServiceForm({
    url,
    method: 'POST',
    authToken,
    form,
  });
};

const uploadResumeImage = (params, authToken) => {
  let url = `${apiUrl}talentPage/resume/uploadImage`;
  const form = objectToFormData(params);
  return AppServiceForm({
    url,
    method: 'POST',
    authToken,
    form,
  });
};

const getJobTitles = (authToken) => {
  const url = `${apiUrl}talentPage/resume/getJobTitles`;
  return AppService({
    url,
    method: 'get',
    authToken,
  });
};

const getRelatedJobTitles = (params, authToken) => {
  const url = `${apiUrl}talentPage/resume/getRelatedJobTitles?`;
  url += join(params);
  return AppService({
    url,
    method: 'get',
    authToken,
  });
};

const getSuggestedSkills = (params, authToken) => {
  const url = `${apiUrl}talentPage/resume/getSuggestedSkills?`;
  return AppService({
    url,
    method: 'POST',
    authToken,
    params,
  });
};

const deleteResume = (params) => {
  const url = `${apiUrl}talentPage/resume/delete/${params.id}`;
  return AppService({
    url,
    method: 'DELETE',
  });
};

const renameResume = (params) => {
  const url = `${apiUrl}talentPage/resume/rename/${params.resume.id}`;
  return AppService({
    url,
    method: 'put',
    params,
  });
};

const getUniversities = (authToken) => {
  const url = `${apiUrl}talentPage/resume/getUniversities`;
  return AppService({
    url,
    method: 'get',
    authToken,
  });
};

const getEducationTitles = (authToken) => {
  const url = `${apiUrl}talentPage/resume/getEducationTitles`;
  return AppService({
    url,
    method: 'get',
    authToken,
  });
};

const getSmartTailorData = (params, authToken) => {
  const url = `${apiUrl}talentPage/resume/getSmartTailorData`;
  return AppService({
    url,
    method: 'POST',
    authToken,
    params,
  });
};


const updateCoverLetter = (params,id) => {
  const url = `${apiUrl}talentPage/resume/coverLetter/${id}`;
  return AppService({
    url,
    method: 'PATCH',
    params,
  });
};


const ResumeAPI = {
  getUserResumes,
  getResume,
  viewResume,
  createResume,
  updateResume,
  checkCompletedResume,
  uploadResume,
  uploadResumeImage,
  getJobTitles,
  getRelatedJobTitles,
  getSuggestedSkills,
  deleteResume,
  renameResume,
  getUniversities,
  getEducationTitles,
  getSmartTailorData,
  updateCoverLetter
};

export default ResumeAPI;
