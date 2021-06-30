import React from 'react';
import Router from 'next/router';
import routes from 'routes/Footer';
import classes from './Footer.module.scss';

const ListRoute = ({ list, classes, goTo }) => {
    return (
        <div className={classes.left}>
            {list.map((e, i) => (
                <div
                    key={i}
                    className={classes.block}
                    onClick={() => {
                        goTo(e.path);
                    }}
                >
                    {e.name}
                </div>
            ))}
        </div>
    );
};

const Footer = () => {
    const { main = [], title, url } = routes;
    const { route } = Router.router || {};
    const goTo = (e) => {
        if (e !== route) Router.push(e);
    };

    const year = `@${new Date().getFullYear()}, `;
    return (
        <div className={classes.footer}>
            <ListRoute list={main} classes={classes} goTo={goTo} />
            <div className={classes.right}>
                {year}
                <a href={url} className={classes.title}>
                    {title}
                </a>
            </div>
        </div>
    );
};

export default Footer;
