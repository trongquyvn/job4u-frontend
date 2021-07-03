import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function GridItem(props) {
    const { children, ...rest } = props;
    return (
        <Grid item {...rest}>
            {children}
        </Grid>
    );
}
