import React, { Fragment } from 'react';

import classes from './ReactiveSort.module.scss';

const ReactiveSort = (props) => {
    const { data } = props;

    return data ? (
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
    ) : (
        ''
    );
};

export default ReactiveSort;
