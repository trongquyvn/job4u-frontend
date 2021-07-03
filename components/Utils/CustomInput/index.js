import Input from '@material-ui/core/Input';

import classes from './CustomInput.module.scss';

const CustomInput = (props) => {
    const { inputProps } = props;

    return (
        <Input
            classes={{
                input: classes.input,
                underline: classes.underline,
            }}
            {...inputProps}
        />
    );
};

export default CustomInput;
