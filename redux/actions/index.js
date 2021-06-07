import { GET_COMPANY_DETAIL, GET_JOB_DETAIL } from './actionTypes';

const actionGetCompanyDetail = (payload) => ({ type: GET_COMPANY_DETAIL, payload });
const actionGetJobDetail = (payload) => ({ type: GET_JOB_DETAIL, payload });

export { actionGetCompanyDetail, actionGetJobDetail };
