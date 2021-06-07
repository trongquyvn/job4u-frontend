import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// import classes from './CustomSwitchButton.module.scss';

const CustomSwitchButton = (props) => {
    const { onChange, title, className = '', checked, id = '' } = props;

    return (
        <FormControlLabel
            control={<Switch checked={checked} onChange={onChange} />}
            label={title}
            className={className}
            id={id}
        />
    );
};

export default CustomSwitchButton;
