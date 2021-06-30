import React, { useState } from 'react';

import DropdownMenu from 'components/DropdownMenu';
import MultiList from '@appbaseio/reactivesearch/lib/components/list/MultiList';
import Button from '@material-ui/core/Button';
import { getCache, setCache } from 'utils/LocalStorage';

import classes from './ReactiveMultiList.module.scss';

const List = (props) => {
    const { properties, onChange, handleToggle = () => {} } = props;
    const { renderItem } = properties;
    const initRenderItem = (label, count) => (
        <div>
            {label.replace('_', ' ') + ' '}
            <span className={classes.count}>({count})</span>
        </div>
    );
    if (renderItem) {
        properties.renderItem = (label, count) => renderItem(label, count, classes);
    }

    return (
        <div className={classes.search}>
            <MultiList
                className={classes.dynamicRange}
                renderItem={initRenderItem}
                onValueChange={(value) => {
                    onChange(value, handleToggle);
                }}
                {...properties}
            />
        </div>
    );
};

const ReactiveMultiList = (props) => {
    const { properties = {}, buttonTitle, cacheId, renderActiveTitle, id } = props;
    const [active, setActive] = useState([]);

    const defaultValue = JSON.parse(getCache(cacheId) || '[]');
    if (defaultValue) {
        properties.defaultValue = defaultValue;
    }

    return (
        <DropdownMenu
            options={
                <List
                    properties={properties}
                    onChange={(value, handleToggle) => {
                        setActive(value);
                        setCache(cacheId, JSON.stringify(value));
                        handleToggle(false);
                    }}
                />
            }
        >
            <Button
                id={id}
                className={classes.button + ' ' + `${active.length ? classes.active : ''}`}
                variant="outlined"
            >
                {!active.length
                    ? buttonTitle
                    : renderActiveTitle
                    ? renderActiveTitle(active)
                    : active.length + '. ' + active[0]}
            </Button>
        </DropdownMenu>
    );
};

export default ReactiveMultiList;
