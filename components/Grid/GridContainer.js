import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const gridMainCss = {
    width: '100%',
    margin: 'unset',
};

const useStyles = makeStyles({
    'spacing-xs-1': gridMainCss,
    'spacing-xs-2': gridMainCss,
    'spacing-xs-3': gridMainCss,
    'spacing-xs-4': gridMainCss,
    'spacing-xs-5': gridMainCss,
    'spacing-xs-6': gridMainCss,
    'spacing-xs-7': gridMainCss,
    'spacing-xs-8': gridMainCss,
    'spacing-xs-9': gridMainCss,
    'spacing-xs-10': gridMainCss,
});

export default function GridContainer(props) {
    const classes = useStyles();
    const { children, ...rest } = props;
    return (
        <Grid container classes={classes} {...rest}>
            {children}
        </Grid>
    );
}
