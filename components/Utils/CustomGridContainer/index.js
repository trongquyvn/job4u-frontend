import classNames from 'classnames';
import classes from './CustomGridContainer.module.scss';

const CustomGridContainer = (props) => {
    const { children, columns, gap } = props;
    const gridClasses = classNames({
        [classes.gird]: true,
        [classes.columns2]: columns === 2,
        [classes.columns3]: columns === 3,
        [classes.gap4]: gap === 4,
        [classes.gap8]: gap === 8,
        [classes.gap12]: gap === 12,
        [classes['responsive-2']]: columns === 2,
        [classes['responsive-3']]: columns === 3,
    });

    return <div className={gridClasses}>{children}</div>;
};

CustomGridContainer.defaultProps = {
    columns: 2,
    gap: 12,
};

export default CustomGridContainer;
