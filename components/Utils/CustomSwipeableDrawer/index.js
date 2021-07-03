import React, { useState, useEffect, cloneElement } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import classes from './CustomSwipeableDrawer.module.scss';

const CustomSwipeableDrawer = (props) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(false);
    }, [props.forceClose]);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
        setOpen(open);
    };

    const { autoClose, swipeClassName, position, children, className = '', options } = props;
    return (
        <div className={className}>
            <div className={classes.title} onClick={toggleDrawer(true)}>
                {children}
            </div>

            <SwipeableDrawer
                className={`CustomSwipeableDrawer ${swipeClassName ? swipeClassName : ''}`}
                classes={{ paper: classes.container }}
                // ModalProps={{
                //     BackdropProps: {
                //         classes: {
                //             root: classes.backdropProps,
                //         },
                //     },
                // }}
                anchor={position || 'left'}
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <div
                    className={classes.list}
                    role="presentation"
                    onClick={autoClose ? toggleDrawer(false) : () => {}}
                    onKeyDown={autoClose ? toggleDrawer(false) : () => {}}
                >
                    {cloneElement(options, {
                        handleClose: () => {
                            setOpen(false);
                        },
                    })}
                </div>
            </SwipeableDrawer>
        </div>
    );
};

export default CustomSwipeableDrawer;
