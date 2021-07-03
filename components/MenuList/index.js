import Router from 'next/router';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

import classes from './MenuList.module.scss';

const MenuList = (props) => {
    const { routes, handleClose } = props;
    const { main = [], sub = [] } = routes;
    const { route } = Router.router;

    const goTo = (e) => {
        if (e !== route) Router.push(e);
        if (handleClose) handleClose();
    };

    return (
        <div className={classes.root}>
            <List component="nav">
                {main.map((e, i) => (
                    <ListItem
                        key={i}
                        button
                        className={classes.title + ` ${route === e.path ? classes.active : ''}`}
                        onClick={() => {
                            goTo(e.path);
                        }}
                    >
                        {e.icon} &nbsp; {e.name}
                    </ListItem>
                ))}
            </List>
            {sub.length ? (
                <>
                    <Divider />
                    <List component="nav">
                        {sub.map((e, i) => (
                            <ListItem
                                key={i}
                                button
                                className={classes.title + ` ${route === e.path ? classes.active : ''}`}
                                onClick={() => {
                                    goTo(e.path);
                                }}
                            >
                                {e.icon} &nbsp; {e.name}
                            </ListItem>
                        ))}
                    </List>
                </>
            ) : (
                ''
            )}
        </div>
    );
};

export default MenuList;
