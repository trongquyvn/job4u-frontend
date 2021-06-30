import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleLoginFrom } from 'redux/actions/login';
import {
    AmplifyAuthenticator,
    AmplifyContainer,
    // AmplifySignOut,
} from '@aws-amplify/ui-react';
import CustomModal from 'components/Utils/CustomModal';
import classes from './LoginForm.module.scss';

const LoginForm = (props) => {
    const dispatch = useDispatch();
    const { popup } = props;
    const handleClose = () => {
        dispatch(toggleLoginFrom(false));
    };

    return popup ? (
        <CustomModal open={true} handleClose={handleClose}>
            <div className={classes.customContainer}>
                <AmplifyContainer>
                    <AmplifyAuthenticator />
                </AmplifyContainer>
            </div>
        </CustomModal>
    ) : (
        <>
            <AmplifyContainer>
                <AmplifyAuthenticator />
            </AmplifyContainer>
        </>
    );
};

export default LoginForm;
