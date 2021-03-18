import axios from 'axios';
import * as qs from 'qs';

const defaultJsonHeaders = {
  'Content-Type': 'application/json',
};

const defaultUploadHeaders = {
  'Content-Type': 'multipart/form-data',
}

const paramsSerializer = (params) => {
  return qs.stringify(params, { arrayFormat: 'repeat' });
};

export function requestGet(url, params, isLoading = true) {
  return new Promise((resolve, reject) => {
    axios({ url, params, paramsSerializer, isLoading }).then(dataResolver(resolve), errorRejector(reject));
  });
}

export function requestPut(url, data, isLoading = true) {
  return new Promise((resolve, reject) => {
    axios({ url, data, method: 'PUT', isLoading }).then(dataResolver(resolve), errorRejector(reject));
  });
}

export function requestPatch(url, data, isLoading = true) {
  return new Promise((resolve, reject) => {
    axios({ url, data, method: 'PATCH', isLoading }).then(dataResolver(resolve), errorRejector(reject));
  });
}

export function requestDelete(url, isLoading = true) {
  return new Promise((resolve, reject) => {
    axios({ url, headers: defaultJsonHeaders, method: 'DELETE', isLoading }).then(dataResolver(resolve), errorRejector(reject));
  });
}

export function requestPost(url, data, isLoading = true) {
  return new Promise((resolve, reject) => {
    axios({ url, data, headers: defaultJsonHeaders, method: 'POST', isLoading }).then(dataResolver(resolve), errorRejector(reject));
  });
}

export function requestPostForm(url, data, isLoading = true) {
  return new Promise((resolve, reject) => {
    axios({ url, data, method: 'POST', isLoading }).then(dataResolver(resolve), errorRejector(reject));
  });
}

export function requestFileUpload(url, data, isLoading = true) {
  //axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  return new Promise((resolve, reject) => {
    axios({ url, data, headers: defaultUploadHeaders, method: 'PUT', isLoading }).then(dataResolver(resolve), errorRejector(reject));
  });
}

export function requestFiledownload(url, data, isLoading = true) {
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  return new Promise((resolve, reject) => {
    axios({ url, data, method: 'POST', responseType: 'blob', isLoading }).then(dataResolver(resolve), errorRejector(reject));
  });
}


const dataResolver = (resolve) => (response) => resolve(response.data);
const errorRejector = (reject) => (error) => reject((error.response && error.response.data) || error);
