import { combineReducers } from 'redux';
import companiesReducer from './companiesReducer';
import jobsReducer from './jobsReducer';

export default combineReducers({
    companiesReducer,
    jobsReducer,
});
