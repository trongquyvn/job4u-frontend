import { combineReducers } from 'redux';
import companiesReducer from './companiesReducer';
import jobsReducer from './jobsReducer';
import loginReducer from './loginReducer';

export default combineReducers({
    companiesReducer,
    jobsReducer,
    loginReducer,
});
