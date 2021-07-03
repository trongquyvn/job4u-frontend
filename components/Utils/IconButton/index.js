import Button from '@material-ui/core/Button';
import classNames from 'classnames';

import classes from './IconButton.module.scss';

const IconButton = (props) => {
    const { children, justIcon, transparent, className, round, ...rest } = props;

    const btnClasses = classNames({
        [classes.button]: true,
        [classes.round]: round,
        [classes.transparent]: transparent,
        [classes.justIcon]: justIcon,
        [className]: className,
    });

    return (
        <Button {...rest} className={btnClasses}>
            {children}
        </Button>
    );
};

export default IconButton;
