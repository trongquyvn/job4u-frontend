import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Router from 'next/router';

import MenuList from 'components/MenuList';
import CustomSwipeableDrawer from 'components/Utils/CustomSwipeableDrawer';
import Load from 'components/Load';
import routes from 'routes/Menu';
import Logo from 'public/job4u-logo.svg';
import Menu from '@material-ui/icons/Menu';

import classes from './Header.module.scss';

let tempRoute = '';
const UserNavbar = dynamic(() => import('./UserNavbar'), { loading: () => <p>Loading</p> });
const Header = () => {
    const { route = '' } = Router.router || {};
    useEffect(() => {
        if (route !== tempRoute) {
            tempRoute = route;
            const categorySearch = document.getElementById('ActiveCategorySearch');
            if (categorySearch) categorySearch.innerHTML = '';

            const locationSearch = document.getElementById('ActiveLocationSearch');
            if (locationSearch) locationSearch.innerHTML = '';
        }
    }, [route]);

    return (
        <div className={classes.container}>
            <CustomSwipeableDrawer options={<MenuList routes={routes} />}>
                <Load>
                    <Menu className={classes.menu} />
                    <Logo className={classes.logo} />
                </Load>
            </CustomSwipeableDrawer>
            <div className={classes.rightMenu}>
                <div className={classes.searchWrapper} id="ActiveCategorySearch" />
                <div className={classes.searchWrapper} id="ActiveLocationSearch" />
                <UserNavbar />
            </div>
        </div>
    );
};

export default Header;
