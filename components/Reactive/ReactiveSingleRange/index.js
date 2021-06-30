import React, { useState, useEffect } from 'react';

import DropdownMenu from 'components/DropdownMenu';
import SingleRange from '@appbaseio/reactivesearch/lib/components/range/SingleRange';
import Button from '@material-ui/core/Button';
import { getCache, setCache } from 'utils/LocalStorage';

import classes from './ReactiveSingleRange.module.scss';

const List = (props) => {
    const { properties, onChange, handleToggle = () => {} } = props;

    return (
        <div className={classes.search}>
            <SingleRange
                {...properties}
                className={classes.dynamicRange}
                onValueChange={(value) => {
                    onChange(value && value.label ? value.label : '', handleToggle);
                }}
            />
        </div>
    );
};

const ReactiveSingleRange = (props) => {
    const { properties = {}, buttonTitle, cacheId } = props;
    const [init, setInit] = useState(false);
    const [active, setActive] = useState();

    const defaultValue = getCache(cacheId);
    if (defaultValue) {
        properties.defaultValue = defaultValue;
    }

    const isDefault = defaultValue && defaultValue !== 'null';
    return (
        <DropdownMenu
            options={
                <List
                    properties={properties}
                    onChange={(value, handleToggle) => {
                        const iValue = value === 'All' ? null : value;
                        setActive(iValue);
                        if (!isDefault) {
                            handleToggle(false);
                            setCache(cacheId, iValue);
                        } else {
                            if (init) {
                                handleToggle(false);
                                setCache(cacheId, iValue);
                            } else {
                                setInit(true);
                            }
                        }
                    }}
                />
            }
        >
            <Button className={classes.button + ' ' + `${active ? classes.active : ''}`} variant="outlined">
                {!active ? buttonTitle : active}
            </Button>
        </DropdownMenu>
    );
};

export default ReactiveSingleRange;
