import { OPEN_LOGIN_FROM } from '../actions/actionTypes';

const initialState = {
    isOpenLoginFrom: false,
    userData: false,
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_LOGIN_FROM: {
            return { ...state, isOpenLoginFrom: action.payload };
        }
        default: {
            return state;
        }
    }
};

export default loginReducer;
