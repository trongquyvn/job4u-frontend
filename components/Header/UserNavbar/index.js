import React, { useState } from 'react';

// @material-ui/core components
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';
// import Person from '@material-ui/icons/Person';
import Notifications from '@material-ui/icons/Notifications';
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';

import CustomButton from 'components/Utils/CustomButton';
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
    const idNot = openNotification ? 'notification-popover' : undefined;

    const openProfile = Boolean(anchorEl2);
    const idPro = openProfile ? 'profile-popover' : undefined;
    return (
        <>
            <CustomButton transparent justIcon>
                <Load>
                    <Dashboard />
                </Load>
            </CustomButton>

            <div className={classes.manager}>
                <CustomButton transparent justIcon onClick={handleClickNotification} aria-describedby={idNot}>
                    <Load>
                        <Notifications />
                        <span className={classes.notifications}>5</span>
                    </Load>
                </CustomButton>
                <Popover
                    id={idNot}
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
                <CustomButton transparent justIcon onClick={handleClickProfile} aria-describedby={idPro}>
                    <Load>
                        <Person />
                    </Load>
                </CustomButton>

                <Popover
                    id={idPro}
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
