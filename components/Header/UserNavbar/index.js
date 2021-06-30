import React, { useState } from 'react';
import Router from 'next/router';

import CustomButton from 'jobs-storybook/component/CustomButton';

// @material-ui/core components
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';
import Notifications from '@material-ui/icons/Notifications';
import Person from '@material-ui/icons/Person';
import Dashboard from '@material-ui/icons/Dashboard';

import IconButton from 'components/Utils/IconButton';
import Load from 'components/Load';

import classes from './Header.module.scss';

const UserNavbar = () => {
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);

    const handleClickNotification = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleCloseNotification = () => {
        setAnchorEl1(null);
    };

    const handleClickProfile = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleCloseProfile = () => {
        setAnchorEl2(null);
    };

    const openNotification = Boolean(anchorEl1);
    const openProfile = Boolean(anchorEl2);
    const onClickLogin = () => {
        Router.push('/login');
    };

    return (
        <>
            {/* <div className={classes.manager}>
                <CustomButton hover type="primary" text="Sign In" width="80px" onClick={onClickLogin} />
            </div> */}
            <div className={classes.manager}>
                <IconButton transparent justIcon>
                    <Load>
                        <Dashboard />
                    </Load>
                </IconButton>
                <IconButton transparent justIcon onClick={handleClickNotification}>
                    <Load>
                        <Notifications />
                        <span className={classes.notifications}>5</span>
                    </Load>
                </IconButton>
                <Popover
                    open={openNotification}
                    anchorEl={anchorEl1}
                    onClose={handleCloseNotification}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <MenuList role="menu">
                        <MenuItem onClick={handleCloseNotification}>Mike John responded to your email</MenuItem>
                        <MenuItem onClick={handleCloseNotification}>You have 5 new tasks</MenuItem>
                    </MenuList>
                </Popover>
            </div>

            <div className={classes.manager}>
                <IconButton transparent justIcon onClick={handleClickProfile}>
                    <Load>
                        <Person />
                    </Load>
                </IconButton>

                <Popover
                    open={openProfile}
                    anchorEl={anchorEl2}
                    onClose={handleCloseProfile}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <MenuList role="menu">
                        <MenuItem onClick={handleCloseProfile}>Profile</MenuItem>
                        <MenuItem onClick={handleCloseProfile}>Settings</MenuItem>
                        <Divider light />
                        <MenuItem onClick={handleCloseProfile}>Logout</MenuItem>
                    </MenuList>
                </Popover>
            </div>
        </>
    );
};

export default UserNavbar;
