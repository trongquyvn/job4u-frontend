import { call, put, select, takeEvery } from 'redux-saga/effects';
import { ADD_COMPANY_DETAIL, GET_COMPANY_DETAIL } from 'redux/actions/actionTypes';
import { getCompanyDetails } from 'services/Companies';

function* initGetCompanyDetail(action) {
    const id = action.payload;
    const stateData = yield select(({ companiesReducer }) => companiesReducer.companyDetails[id]);
    if (!stateData) {
        const data = yield call(getCompanyDetails, id);
        yield put({ type: ADD_COMPANY_DETAIL, payload: { id, data } });
    }
}

export default function* companiesLoad() {
    yield takeEvery(GET_COMPANY_DETAIL, initGetCompanyDetail);
}
