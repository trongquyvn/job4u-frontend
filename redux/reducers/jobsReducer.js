import { ADD_JOB_DETAIL } from '../actions/actionTypes';

const initialState = {
    jobDetails: {},
};

const jobsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_JOB_DETAIL: {
            return { ...state, jobDetails: { ...state.jobDetails, [action.payload.id]: action.payload.data } };
        }
        default: {
            return state;
        }
    }
};

export default jobsReducer;
