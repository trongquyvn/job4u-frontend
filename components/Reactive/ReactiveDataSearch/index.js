import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import DataSearch from '@appbaseio/reactivesearch/lib/components/search/DataSearch';
import { getCache, setCache } from 'utils/LocalStorage';

import classes from './ReactiveDataSearch.module.scss';

const ReactiveDataSearch = (props) => {
    const isDesktop = useMediaQuery({ minWidth: 960 });
    const { properties = {}, id, cacheId, bottom } = props;
    const activeId = !isDesktop ? 'Mobile_' + id : 'Active' + id;
    if (typeof document !== 'undefined') {
        const topSearch = document.getElementById(activeId);
        if (topSearch) topSearch.innerHTML = '';
    }

    useEffect(() => {
        if (id) {
            const search = document.getElementById(id);
            const topSearch = document.getElementById(activeId);
            if (search && topSearch) {
                topSearch.append(search);
            }
        }
    }, [id, isDesktop]);;

    const defaultValue = getCache(cacheId) || '';
    if (defaultValue) {
        properties.defaultValue = defaultValue;
    }

    properties.onValueSelected = (value) => {
        value = value ? value : '';
        setCache(cacheId, value);
    };

    return (
        <>
            <div
                className="empty-data"
                id={'Mobile_' + id}
                style={{ marginBottom: bottom ? '8px' : '0' }}
            />
            <div id={id}>
                <DataSearch {...properties} showClear={true} className={classes.search} />
            </div>
        </>
    );
};

export default ReactiveDataSearch;
