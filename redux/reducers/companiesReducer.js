import { ADD_COMPANY_DETAIL } from '../actions/actionTypes';

const initialState = {
    companyDetails: {},
};

const companiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMPANY_DETAIL: {
            return { ...state, companyDetails: { ...state.companyDetails, [action.payload.id]: action.payload.data } };
        }
        default: {
            return state;
        }
    }
};

export default companiesReducer;
