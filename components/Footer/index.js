import React from 'react';
import routes from 'routes/Footer';

import classes from './Footer.module.scss';

const ListRoute = ({ list, classes }) => {
    return (
        <div className={classes.left}>
            {list.map((e, i) => (
                <div key={i} className={classes.block}>
                    {e.name}
                </div>
            ))}
        </div>
    );
};

const Footer = () => {
    const { main = [], title, url } = routes;

    const year = `2020-${new Date().getFullYear()}, `;
    return (
        <div className={classes.footer}>
            <ListRoute list={main} classes={classes} />
            <div className={classes.right}>
                {year}
                <span className={classes.title}>{title}</span>
            </div>
        </div>
    );
};

export default Footer;
