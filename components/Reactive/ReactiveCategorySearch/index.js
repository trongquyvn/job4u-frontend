import React, { useEffect } from 'react';

import CategorySearch from '@appbaseio/reactivesearch/lib/components/search/CategorySearch';
import { getCache, setCache } from 'utils/LocalStorage';

import classes from './ReactiveCategorySearch.module.scss';

const ReactiveCategorySearch = (props) => {
    const { properties = {}, id, cacheId } = props;
    if (typeof document !== 'undefined') {
        const topSearch = document.getElementById('Active' + id);
        if (topSearch) topSearch.innerHTML = '';
    }
    useEffect(() => {
        if (id) {
            const search = document.getElementById(id);
            const topSearch = document.getElementById('Active' + id);
            if (search && topSearch) {
                topSearch.append(search);
            }
        }
    }, [id]);

    const defaultValue = getCache(cacheId) || '';
    if (defaultValue) {
        properties.defaultValue = {
            term: defaultValue,
            category: '*',
        };
    }

    properties.onValueSelected = (value) => {
        const name = value ? value.term : '';
        setCache(cacheId, name);
    };

    const component = <CategorySearch {...properties} showClear={true} className={classes.search} />;

    return id ? (
        <div className={classes.reactiveSearch}>
            <div id={id}>{component}</div>
        </div>
    ) : (
        component
    );
};

export default ReactiveCategorySearch;
