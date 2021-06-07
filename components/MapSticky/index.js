import classes from './MapSticky.module.scss';

const MapSticky = (props) => {
    return <div className={classes.root}>{props.children}</div>;
};

export default MapSticky;
