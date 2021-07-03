import axios from 'axios';

export const getCompanyDetails = async (id) => {
    const api = process.env.NEXT_PUBLIC_ELASTICSEARCH_SERVER_API;
    const params = { index: 'companies', id };
    const url = `${api}/manage/info`;
    return axios
        .post(url, params)
        .then((res) => {
            return res.data._source;
        })
        .catch((error) => {
            const response = error.response || {};
            const err = response.data || {};
            const message = err.message || response.statusText || error.message;
            console.log('>> getCompanyDetails error: ', message);
            // alert(message);
            // if (typeof window !== 'undefined') window.location.href = '/companies';
        });
};

export const getJobsByCompany = async (id) => {
    const api = process.env.NEXT_PUBLIC_ELASTICSEARCH_SERVER_API;
    const params = { id };
    const url = `${api}/manage/getJobsByCompany`;
    return axios
        .post(`${url}`, params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            const response = error.response || {};
            const err = response.data || {};
            const message = err.message || response.statusText || error.message;
            console.log('>> getJobsByCompany error: ', message);
            return false;
        });
};
