import axios from 'axios';

const api = process.env.NEXT_PUBLIC_ELASTICSEARCH_SERVER_API;

export const getJobDetails = async (id) => {
    const params = { index: 'jobs', id };
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
            console.log('>> getJobDetails error: ', message);
            // alert(message);
            // if (typeof window !== 'undefined') window.location.href = '/jobs';
        });
};

export const getJobRelated = async (skills) => {
    const params = { skills };
    const url = `${api}/manage/getJobRelated`;
    return axios
        .post(`${url}`, params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            const response = error.response || {};
            const err = response.data || {};
            const message = err.message || response.statusText || error.message;
            console.log('>> getJobRelated error: ', message);
            return false;
        });
};

// export const getAggsCity = async () => {
//     const params = { skills };
//     const url = `${api}/manage/aggsCity`;
//     return axios
//         .post(`${url}`, params)
//         .then((response) => {
//             return response.data;
//         })
//         .catch((error) => {
//             return false;
//         });
// };
