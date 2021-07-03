import React from 'react';

// @material-ui/icons
// https://material-ui.com/components/material-icons/
import Home from '@material-ui/icons/Home';
import HelpIcon from '@material-ui/icons/Help';
import BusinessIcon from '@material-ui/icons/Business';
import WorkIcon from '@material-ui/icons/Work';

const routes = {
    main: [
        {
            path: '/',
            name: 'Home',
            icon: <Home fontSize="small" />,
        },
    ],
    sub: [
        {
            path: '/jobs',
            name: 'Jobs',
            icon: <WorkIcon fontSize="small" />,
        },
        {
            path: '/companies',
            name: 'Companies',
            icon: <BusinessIcon fontSize="small" />,
        },
        {
            path: '/help',
            name: 'Help',
            icon: <HelpIcon fontSize="small" />,
        },
    ],
};

export default routes;
