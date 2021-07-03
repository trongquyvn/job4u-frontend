import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import { toggleLoginFrom } from 'redux/actions/login';

const Apply = (props) => {
    const dispatch = useDispatch();
    const userData = useSelector(({ loginReducer }) => loginReducer.userData);
    const { children } = props;

    const handleClick = () => {
        if (!userData) {
            dispatch(toggleLoginFrom(true));
        } else {
            console.log('userData: ', userData);
        }
    };

    return (
        <Box clone onClick={handleClick}>
            {children}
        </Box>
    );
};

export default Apply;
