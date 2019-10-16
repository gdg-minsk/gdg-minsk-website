import React from 'react';
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
    transparentAppBar: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        marginTop: 10,
        transition: 'all 1s',
    },
    drawerPaper: {
        width: 260,
    },
    brandLink: {
        color: 'white',
    },
}));

const Header = ({ title, desktopMenu, mobileMenu, changeHeaderStyleHeight, isParallax }) => {
    const classes = useStyles();

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isTransparentMode, setTransparentMode] = React.useState(true);

    const handleDrawerToggle = React.useCallback(() => {
        setMobileOpen(!mobileOpen);
    }, [mobileOpen]);

    if (isParallax) {
        const headerColorChange = React.useCallback(() => {
            setTransparentMode(window.pageYOffset < changeHeaderStyleHeight);
        }, [changeHeaderStyleHeight]);

        React.useEffect(() => {
            window.addEventListener('scroll', headerColorChange);

            return () => {
                window.removeEventListener('scroll', headerColorChange);
            };
        });
    }

    const brandComponent = (
        <Link to="/" className={classes.brandLink} underline="none">
            <Typography variant="h4" component="span">
                {title}
            </Typography>
        </Link>
    );

    const appBarClasses = classNames({
        [classes.transparentAppBar]: isParallax && isTransparentMode,
    });

    return (
        <AppBar position="fixed" className={appBarClasses}>
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
    changeHeaderStyleHeight: PropTypes.number,
    isParallax: PropTypes.bool,
};

Header.defaultProps = {
    changeHeaderStyleHeight: 0,
    isParallax: false,
};

export default Header;
