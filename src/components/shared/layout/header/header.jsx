import React, { useState, useCallback, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Menu from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import Link from '../../link';

const useStyles = makeStyles(() => ({
    appBar: {
        backgroundColor: '#fff',
        boxShadow: 'none',
    },
    drawerPaper: {
        width: 260,
    },
    headerLogo: {
        height: 59,
    },
}));

const Header = ({ title, desktopMenu, mobileMenu }) => {
    const classes = useStyles();

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = useCallback(() => {
        setMobileOpen(!mobileOpen);
    }, [mobileOpen]);

    const brandComponent = (
        <Link to="/" className={classes.brandLink} underline="none">
            <img className={classes.headerLogo} src="/img/gdg-logo.png" alt={title} />
        </Link>
    );

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Container maxWidth="lg">
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1}>{brandComponent}</Box>
                        <Box>
                            <Hidden smDown implementation="css">
                                {desktopMenu}
                            </Hidden>
                        </Box>
                        <Box>
                            <Hidden mdUp>
                                <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle}>
                                    <Menu />
                                </IconButton>
                            </Hidden>
                        </Box>
                    </Box>
                </Container>
            </Toolbar>
            <Hidden mdUp implementation="js">
                <Drawer
                    variant="temporary"
                    anchor="right"
                    open={mobileOpen}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    onClose={handleDrawerToggle}
                >
                    {mobileMenu}
                </Drawer>
            </Hidden>
        </AppBar>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    desktopMenu: PropTypes.node.isRequired,
    mobileMenu: PropTypes.node.isRequired,
};

export default Header;
