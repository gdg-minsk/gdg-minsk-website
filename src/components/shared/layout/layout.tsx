import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import Header from './header/header';
import Footer from './footer/footer';

const useStyles = makeStyles(() => ({
    root: {
        minHeight: '100vh',
        backgroundColor: '#fff',

        display: 'flex',
        flexDirection: 'column',

        '&::after': {
            content: '""',
            backgroundImage: 'url(/svg/stork-with-polygons.svg)',
            backgroundPosition: 'right bottom',
            backgroundRepeat: 'no-repeat',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'fixed',
            opacity: 0.5,
        },
    },
    pageWrapper: {
        marginTop: 64,
        zIndex: 2,
        flexGrow: 1,
        display: 'flex',
    },
    pageContentContainer: {
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    '@media (max-width: 600px)': {
        root: {
            '&::after': {
                backgroundImage: 'none',
            },
        },
    },
}));

const Layout = ({ children, isSocialIconsVisible }): ReactElement => {
    const classes = useStyles();

    return (
        <Box className={classes.root} display="flex" flexDirection="column">
            <CssBaseline />

            <Header />

            <Box className={classes.pageWrapper}>
                <Container maxWidth="lg" className={classes.pageContentContainer}>
                    {children}
                </Container>
            </Box>

            <Footer isSocialIconsVisible={isSocialIconsVisible} />
        </Box>
    );
};

Layout.defaultProps = {
    isSocialIconsVisible: true,
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    isSocialIconsVisible: PropTypes.bool,
};

export default Layout;
