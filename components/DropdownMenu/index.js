import React, { useState, useRef, cloneElement } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

import classes from './DropdownMenu.module.scss';

const DropdownMenu = (props) => {
    const { children, options, className = '', disabled } = props;
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = (force) => {
        setOpen((prevOpen) => (typeof force !== 'undefined' ? force : !prevOpen));
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <span
                className={classes.root + (disabled ? ' ' + classes.disabled : '')}
                ref={anchorRef}
                onClick={disabled ? () => { } : handleToggle}
            >
                {children}
            </span>
            <Popper
                className={!open ? classes.hidden : className}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                // disablePortal
                placement="bottom-start"
                keepMounted={true}
            >
                {({ TransitionProps }) => (
                    <Grow {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <div>{cloneElement(options, { handleToggle })}</div>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

export default DropdownMenu;
