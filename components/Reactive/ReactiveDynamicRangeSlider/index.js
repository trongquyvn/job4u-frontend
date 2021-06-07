import React, { useState, useEffect } from 'react';

import DropdownMenu from 'components/DropdownMenu';
import DynamicRangeSlider from '@appbaseio/reactivesearch/lib/components/range/DynamicRangeSlider';
import Button from '@material-ui/core/Button';
import { numberFormat } from 'utils/NumberFunction';
import { getCache, setCache } from 'utils/LocalStorage';

import classes from './ReactiveDynamicRangeSlider.module.scss';

let dynamicSalaryTitle = '';
const List = (props) => {
    const { properties, onChange, handleToggle = () => {} } = props;

    return (
        <div className={classes.search}>
            <DynamicRangeSlider
                {...properties}
                rangeLabels={(min, max) => ({
                    start: '$ ' + numberFormat(min, 0, '.', ','),
                    end: '$ ' + numberFormat(max, 0, '.', ','),
                })}
                loader="Loading ..."
                className={classes.dynamicRange}
                onValueChange={(value) => {
                    if (value && value.length) {
                        if (dynamicSalaryTitle === `${value[0]} - ${value[1]}`) {
                            value = [];
                        }
                    } else {
                        value = [];
                    }
                    onChange(value, handleToggle);
                }}
            />
        </div>
    );
};

const ReactiveDynamicRangeSlider = (props) => {
    const { properties = {}, buttonTitle, cacheId } = props;
    const [init, setInit] = useState(false);
    const [defaultValue, setDefaultValue] = useState([]);
    const [active, setActive] = useState([]);

    useEffect(() => {
        let defaultValue;
        try {
            defaultValue = JSON.parse(getCache(cacheId) || '[]');
        } catch (error) {
            defaultValue = [];
        }
        setDefaultValue(defaultValue);
    }, []);

    properties.defaultValue = (min, max) => {
        dynamicSalaryTitle = `${min} - ${max}`;
        return {
            start: defaultValue.length ? parseFloat(defaultValue[0]) : min,
            end: defaultValue.length ? parseFloat(defaultValue[1]) : max,
        };
    };
    return (
        <DropdownMenu
            className={classes.reactiveRangeSlider}
            options={
                <List
                    properties={properties}
                    onChange={(value, handleToggle) => {
                        setActive(value);
                        if (init) {
                            handleToggle(false);
                            setCache(cacheId, JSON.stringify(value));
                        } else {
                            setInit(true);
                        }
                    }}
                />
            }
        >
            <Button className={classes.button + ' ' + `${active.length ? classes.active : ''}`} variant="outlined">
                {!active.length ? buttonTitle : active[0] + ' - ' + active[1]}
            </Button>
        </DropdownMenu>
    );
};

export default ReactiveDynamicRangeSlider;
