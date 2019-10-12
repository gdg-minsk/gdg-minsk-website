import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Link from '../../link';

const useStyles = makeStyles(() => ({}));

const MobileMenu = ({ menuItems }) => {
    const classes = useStyles();

    return (
        <Box component="nav" display="flex" flexDirection="column">
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

MobileMenu.propTypes = {
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default MobileMenu;
