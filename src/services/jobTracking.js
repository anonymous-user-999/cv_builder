import AppService from './restService.js';

const apiUrl = 'https://cvitae-test.herokuapp.com/api/';

const getJobsUnderTracking = (params) => {
  let url = `${apiUrl}job/tracking`;
  return AppService({
    url,
    method: 'GET',
    params,
  });
};
const searchJobTracking = (query, status, params) => {
  let url = `${apiUrl}job/tracking/search?query=${query}&trackingStatus=${status}`;
  return AppService({
    url,
    method: 'GET',
    params,
  });
};
const getJobApplicationById = (id, params) => {
  let url = `${apiUrl}job/tracking/${id}`;
  return AppService({
    url,
    method: 'GET',
    params,
  });
};

const toggleFavorite = (id, params) => {
  let url = `${apiUrl}job/tracking/toggleFavorite/${id}`;
  return AppService({
    url,
    method: 'PUT',
    params,
  });
};

const changeTrackingStatus = (id, params) => {
  let url = `${apiUrl}job/tracking/changeStatus/${id}`;
  return AppService({
    url,
    method: 'PUT',
    params,
  });
};

const enableJobTracking = (id) => {
  let url = `${apiUrl}job/tracking/enable/${id}`;
  return AppService({
    url,
    method: 'PUT',
  });
};

const addViewerRequest = (id, params) => {
  let url = `${apiUrl}job/tracking/viewerRequest/add/${id}`;
  return AppService({
    url,
    method: 'POST',
    params,
  });
};

const deleteById = (id) => {
  let url = `${apiUrl}job/tracking/${id}`;
  return AppService({
    url,
    method: 'DEL',
  });
};

const JobTrackingAPI = {
  enableJobTracking,
  getJobsUnderTracking,
  searchJobTracking,
  getJobApplicationById,
  deleteById,
  toggleFavorite,
  addViewerRequest,
  changeTrackingStatus,
};

export default JobTrackingAPI;
