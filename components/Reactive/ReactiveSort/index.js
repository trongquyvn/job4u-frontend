import React, { Fragment } from 'react';
import classNames from 'classnames';

import WhatshotIcon from '@material-ui/icons/Whatshot';

import classes from './ReactiveSort.module.scss';

const ReactiveSort = (props) => {
    const { data, hotJob } = props;

    const hotClasses = classNames({
        [classes.icon]: true,
        [classes.active]: hotJob ? hotJob.active : false,
    });

    return data ? (
        <>
            <span className={classes.sortBy}>
                {data.map((e, i) => {
                    let add = '';
                    if (i !== 0) add = ' | ';
                    return (
                        <Fragment key={i}>
                            {add}
                            <a className={classes['sortContent-' + e.value]} onClick={e.onClick}>
                                {e.name}
                            </a>
                        </Fragment>
                    );
                })}
            </span>
            {hotJob ? (
                <span className={hotClasses} title="Hot jobs" onClick={hotJob.onClick}>
                    <WhatshotIcon />
                </span>
            ) : (
                ''
            )}
        </>
    ) : (
        ''
    );
};

export default ReactiveSort;
