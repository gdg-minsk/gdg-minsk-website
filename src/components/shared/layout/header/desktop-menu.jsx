import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Link from '../../link';

const useStyles = makeStyles(theme => ({
    link: {
        margin: theme.spacing(1, 1.5),
        color: 'white',
    },
}));

const DesktopMenu = ({ menuItems }) => {
    const classes = useStyles();

    return (
        <Box component="nav" display="flex">
            {menuItems.map(x => {
                return (
                    <Link key={x.path} to={x.path} variant="button" color="textPrimary" className={classes.link}>
                        <Typography variant="subtitle1" component="h5">
                            {x.title}
                        </Typography>
                    </Link>
                );
            })}
        </Box>
    );
};

DesktopMenu.propTypes = {
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default DesktopMenu;
