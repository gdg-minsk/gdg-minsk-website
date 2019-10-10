import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        backgroundColor: '#3f51b5',
    },
}));

function Footer() {
    const classes = useStyles();

    return (
        <footer className={classes.root}>
            <Typography component="div" variant="body1">
                <Box bgcolor="primary.main" color="primary.contrastText" p={2} m={1}>
                    GDG Minsk {new Date().getFullYear()}
                </Box>
            </Typography>
        </footer>
    );
}

export default Footer;
