import axios from 'axios';

const getAxiosRequestWithToken = () => axios.create({
  headers: {
    Authorization: 'Token e0fdb92b7fcbbf9241a9a8f22b592b3d83544ffa',
  },
});

export default {
  getCameraData(page: number) {
    const request = getAxiosRequestWithToken();
    // return request.get('https://data.gov.spb.ru/opendata/7825457753-address_radar/');
    return request.get(`https://data.gov.spb.ru/api/v1/datasets/132/versions/latest/data/?&per_page=100&page=${page}`);
  },
  getVersionNumber() {
    const request = getAxiosRequestWithToken();
    // return request.get('https://data.gov.spb.ru/opendata/7825457753-address_radar/');
    return request.get('https://data.gov.spb.ru/api/v1/datasets/132/versions/latest/');
  },
};
