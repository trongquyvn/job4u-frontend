import { call, put, select, takeEvery } from 'redux-saga/effects';
import { ADD_JOB_DETAIL, GET_JOB_DETAIL } from 'redux/actions/actionTypes';
import { getJobDetails } from 'services/Jobs';

function* initGetJobDetail(action) {
    const id = action.payload;
    const stateData = yield select(({ jobsReducer }) => jobsReducer.jobDetails[id]);
    if (!stateData) {
        const data = yield call(getJobDetails, id);
        yield put({ type: ADD_JOB_DETAIL, payload: { id, data } });
    }
}

export default function* jobsLoad() {
    yield takeEvery(GET_JOB_DETAIL, initGetJobDetail);
}
