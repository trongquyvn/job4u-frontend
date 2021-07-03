import { all } from 'redux-saga/effects';
import companiesLoad from './companies.saga';
import jobsLoad from './jobs.saga';

export default function createRootSaga() {
    return function* rootSaga() {
        yield all([companiesLoad(), jobsLoad()]);
    };
}
